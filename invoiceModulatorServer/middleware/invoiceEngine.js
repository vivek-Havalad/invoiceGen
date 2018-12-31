const fs = require('fs');
const pdfInvoice = require('./pdf-invoice/dist/index');
class invoiceGen {
  constructor(config) {
    this.document = {
      company: {
        email: config.fromAddress,
        name: 'invoiceGen',
      },
      customer: {
        name: config.customerName,
        email: config.customerName
      }
    };
    this.fileCnt = 0;
    this.basePath = config.pdfPath;
  }
  getFName() {
    let date = new Date();
    let day = date.getDay();
    let mon = date.getMonth() + 1;
    let year = date.getYear();
    if (mon < 10) {
      mon += "0" + mon;
    }
    this.fileCnt += 1;
    return [day, mon, year].join("_") + "_" + this.fileCnt;
  }
  genNSend(Senddict,callback) {
    let items = {"items":[Senddict]}
    let docTemp =  Object.assign(items , this.document);
    let pdfIObj = pdfInvoice(docTemp);
    pdfIObj.generate();
    let filePath = this.basePath + this.getFName() + "invoice.pdf"
    pdfIObj.pdfkitDoc.pipe(fs.createWriteStream(filePath))
    return callback("Done");
  }
}
module.exports = invoiceGen;
