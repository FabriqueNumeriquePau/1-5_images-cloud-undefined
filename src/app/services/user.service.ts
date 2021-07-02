import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

export interface Account {
  id: number;
  username: string;
}

export interface AuthOuput {
  account: Account;
}

export interface AuthInput {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSubject$ = new ReplaySubject<Account | undefined>(1)
  user$ = this.userSubject$.asObservable();
  storageKey = 'user';
  constructor(private readonly localStorage: LocalStorageService) {
    const item = this.localStorage.getItem(this.storageKey);
    this.userSubject$.next(
      item !== undefined
        ? item as Account
        : undefined
    )
  }


  login$(login: AuthInput): Observable<AuthOuput> {
    return timer(1000)
      .pipe(switchMap(() => {
        return of({
          account: {
            id: 1,
            username: login.username
          } as Account,
        } as AuthOuput)
      }));
  }

  updateAccount(account: Account): void {
    this.userSubject$.next(account);
  }

}
