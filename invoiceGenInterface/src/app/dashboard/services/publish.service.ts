import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Invoice } from '../constants/invoice';

@Injectable()
export class PublishService {
  private subjects: Subject<any>[] = [];
  private _menu$ = new Subject<any>();

  public publish(eventName: string) {
    this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
    this.subjects[eventName].next();
  }

  public on(eventName: string): Observable<any> {
    this.subjects[eventName] = this.subjects[eventName] || new Subject<any>();
    return this.subjects[eventName].asObservable();
  }


  public select(speech) {
    this._menu$.next(speech);
  }

  public get selectInvoice():Observable<Invoice> {
    return this._menu$.asObservable();
  }
}
