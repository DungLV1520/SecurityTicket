import { Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Injectable({ providedIn: 'root' })
export class StorageService {
  PRIVATE_KEY_HASH = 'PRIVATE_KEY_HASH';
  PUBLIC_KEY = 'PUBLIC_KEY';
  CLIENT_ID = 'CLIENT_ID';

  constructor(private sessionStorage: SessionStorageService) {}

  store(privateKey: string): void {
    this.sessionStorage.store(this.PRIVATE_KEY_HASH, privateKey);
  }

  storePublicKey(privateKey: string): void {
    this.sessionStorage.store(this.PUBLIC_KEY, privateKey);
  }

  storeClientId(privateKey: string): void {
    this.sessionStorage.store(this.CLIENT_ID, privateKey);
  }

  retrieve(): string {
    return this.sessionStorage.retrieve(this.PRIVATE_KEY_HASH);
  }

  retrievePublicKey(): string {
    return this.sessionStorage.retrieve(this.PUBLIC_KEY);
  }

  retrieveClientId(): string {
    return this.sessionStorage.retrieve(this.CLIENT_ID);
  }

  clear(): void {
    this.sessionStorage.clear(this.PRIVATE_KEY_HASH);
  }
}
