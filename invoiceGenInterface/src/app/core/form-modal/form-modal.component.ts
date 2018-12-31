import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Invoice } from '../../dashboard/constants/invoice';
import { PublishService } from '../../dashboard/services/publish.service';
import { InvoiceService } from '../../dashboard/services/invoice.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss']
})
export class FormModalComponent implements OnInit, OnDestroy {
  public invoice: Invoice;
  private _menuSubscription$: Subscription;

  constructor(private _invoiceService: InvoiceService,
              private _publishService: PublishService) {
    this._sideMenuObserver = this._sideMenuObserver.bind(this);
  }

  public ngOnInit() {
    this._menuSubscription$ = this._publishService.selectInvoice.subscribe(this._sideMenuObserver);
    this.resetForm();
  }

  public ngOnDestroy() {
    this._menuSubscription$.unsubscribe();
  }

  public saveInvoice(invoice: Invoice): void {
    this._invoiceService.save(invoice);
    this._invoiceService.saveInvoice(invoice).subscribe((res)=> {
      console.log('============>', res);
    })
    this.resetForm();
    this._publishService.publish('invoice-updated');
  }

  public resetForm(): void {
    this.invoice = <Invoice> {};
  }

  public deleteinvoice(invoice): void {
    this._invoiceService.deleteInvoice(invoice.id);
    this.resetForm();
    this._publishService.publish('invoice-updated');
  }

  private _sideMenuObserver(selectedinvoice): void {
    this.invoice = selectedinvoice;
  }
}
