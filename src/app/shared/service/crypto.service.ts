import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/app/app.constant';
import * as CryptoJS from 'crypto-js';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class CryptoService {
  SERVER_URL = SERVER_URL;
  encrypted: any;
  decrypted: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  hashSHA256(token: string): void {
    console.log(
      CryptoJS.HmacSHA256(token, 'luongdung').toString(CryptoJS.enc.Hex)
    );
    this.storageService.store(
      CryptoJS.HmacSHA256(token, 'luongdung').toString(CryptoJS.enc.Hex)
    );
  }

  encrypt(plainText: string, privateKey: string): any {
    this.encrypted = CryptoJS.AES.encrypt(plainText, privateKey);
    return this.encrypted.toString();
  }

  decript(encrypted: any, privateKey: string): any {
    var decrypted = CryptoJS.AES.decrypt(encrypted, privateKey);
    this.decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    console.log('decripted', this.decrypted);
    return this.decrypted;
  }

  getProfileAES() {
    return this.http.get(`${this.SERVER_URL}/users/account`);
  }

  getTripAES(page?: number) {
    if (page) {
      return this.http.get(`${this.SERVER_URL}/trips/all?pageNumber=${page}`);
    }
    return this.http.get(`${this.SERVER_URL}/trips/all`);
  }

  searchTripAES(trip: any) {
    return this.http.post(`${this.SERVER_URL}/trips/search`, trip);
  }

  verifyPass(pass?: string) {
    return this.http.post(`${this.SERVER_URL}/trips/search`, { pass: pass });
  }

  pushPublicKeyandData(key?: string, clientId?: string) {
    return this.http.post(`${this.SERVER_URL}/trips/search`, {
      publickey: key,
      clientId: clientId,
    });
  }
}
