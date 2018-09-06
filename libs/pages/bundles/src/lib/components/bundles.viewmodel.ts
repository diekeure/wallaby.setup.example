import { Resolve } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BundlesViewModel implements Resolve<boolean> {
  constructor() {}

  resolve(): Observable<boolean> {
    // TODO update
    return new BehaviorSubject<boolean>(true).pipe(take(1));
  }
}
