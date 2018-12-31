var bodyParser = require('body-parser');
function invoiceSetup(express ,app , config , invoiceGen) {
  var router = express.Router();
  app.use(bodyParser.urlencoded({
      limit: '100mb',
      extended: true
  }));
  app.use(bodyParser.json());
  router.use(function timeLog (req, res, next) {
    console.log('(Time log:) :- requested url : ' , req.url);
    next()
  });
  router.get('/',(req , res) => {
    res.render('htmltemplate')
  });

  router.post("/invoiceGen" , (req , res) => {
    let jsonData = req.body;
    console.log(jsonData);
    try{

      jsonData = JSON.parse(Object.keys(jsonData));
    }catch{
      try{

        jsonData = JSON.parse(Object.values(jsonData));
      }catch{jsonData = {}}
    }
    if(!Object.keys(jsonData).length){
      jsonData = {};
    }
    let sendData = {
      "name" : jsonData.name || 'name',
      "description" : jsonData.fromAddress || "india",
      "amount" : jsonData.invoiceAmount || "500"
    }
    invoiceGen.genNSend(sendData,() => {
      res.status(200).send("Done");
    })
  })
  return router;
}

module.exports = invoiceSetup;
