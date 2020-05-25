import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  get isLoading(): Observable<boolean> {
    return this.loading$;
  }

  setIsLoading(isLoading: boolean): void {
    this.loading$.next(isLoading);
  }
}
