import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BsDatepickerModule, BsDropdownModule } from 'ngx-bootstrap';
import { FormModalComponent } from './form-modal/form-modal.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@NgModule({
  imports: [
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CommonModule,
    FormsModule,
    BrowserModule
  ],
  declarations: [FormModalComponent, SideMenuComponent],
  exports: [FormModalComponent, SideMenuComponent]
})
export class CoreModule { }
