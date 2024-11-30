import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShareDateService {
  private dateData = new BehaviorSubject('');
  currentDateData = this.dateData.asObservable();

  constructor() {}

  setDateData(dateData: string) {
    this.dateData.next(dateData);
  }
}
