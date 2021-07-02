import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  setItem(key: string, data: unknown): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  getItem(key: string): unknown | undefined {
    const item = window.localStorage.getItem(key);
    return item !== null
      ? item as unknown
      : undefined;
  }


}
