import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  activeSubject = new BehaviorSubject({ active: false });
  active$ = this.activeSubject.asObservable();

  show() {
    this.activeSubject.next({ active: true });
  }

  hide() {
    this.activeSubject.next({ active: false });
  }
}
