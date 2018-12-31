import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../constants/invoice';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class InvoiceService {

  constructor(private http: HttpClient) {

  }
  public getAll() {
    return this.getinvoices();
  }

  public getById(id: number) {
    return this.getinvoices().find(product => product.id === id);
  }

  public save(invoice: any) {
    let allInvoices = this.getinvoices();
    if (invoice.id) {
      // update existing invoice
      for (var i = 0; i < allInvoices.length; i++) {
        if (allInvoices[i].id === invoice.id) {
          allInvoices[i] = invoice;
          break;
        }
      }
      this.setinvoices(allInvoices);
    } else {
      // assign id
      const lastProduct = allInvoices[allInvoices.length - 1] || { id: 0 };
      invoice.id = lastProduct.id + 1;
      allInvoices.push(invoice);
      this.setinvoices(allInvoices);
    }
  }

  public deleteInvoice(id: number) {
    let invoices = this.getinvoices();
    invoices = invoices.filter((invoice) => invoice.id !== id);
    this.setinvoices(invoices);
    window.location.reload()
  }
  extractData(res: Response) {
    console.log("here")
    return
  }
  handleErrorObservable (error: Response | any) {
    console.error("here");
    return
  }
  public saveInvoice(invoice: Invoice): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
      })
    };
    const body = invoice;
    const url = 'http://localhost:9000/invoice/invoiceGen';
    return this.http.post(url, body, httpOptions)
  }
  // private helper methods

  private getinvoices(): any[] {
    if (!localStorage.getItem('invoices')) {
      localStorage.setItem('invoices', JSON.stringify([]));
    }

    return JSON.parse(localStorage.getItem('invoices'));
  }

  private setinvoices(products: any[]) {
    localStorage.setItem('invoices', JSON.stringify(products));
  }
}
