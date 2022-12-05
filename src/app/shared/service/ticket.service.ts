import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/app/app.constant';

@Injectable({ providedIn: 'root' })
export class TicketService {
  SERVER_URL = SERVER_URL;

  constructor(private http: HttpClient) {}

  getTicket() {
    return this.http.get(`${this.SERVER_URL}/tickets/me`);
  }

  deleteTicket(id: string) {
    return this.http.delete(`${this.SERVER_URL}/tickets/${id}`);
  }

  searchTicket(vehicle: any) {
    return this.http.post(`${this.SERVER_URL}/tickets/search`, vehicle);
  }
}
