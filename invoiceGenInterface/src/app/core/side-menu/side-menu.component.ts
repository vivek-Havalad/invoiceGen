import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Invoice } from '../../dashboard/constants/invoice';
import { PublishService } from '../../dashboard/services/publish.service';
import { InvoiceService } from '../../dashboard/services/invoice.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnDestroy {
  public menuItems: Invoice[] = [];
  private subscription: Subscription;

  constructor(private _InvoiceService: InvoiceService,
              private _publishService: PublishService) {
  }

  public ngOnInit() {
    this.loadInvoicees();
    this.subscription = this._publishService.on('Invoice-updated').subscribe((item) => {
      this.loadInvoicees();
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onClickItem(Invoice: Invoice): void {
    this._publishService.select(Invoice);
  }

  private loadInvoicees(): void {
    this.menuItems = this._InvoiceService.getAll();
  }
}
