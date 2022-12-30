import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_URL } from 'src/app/app.constant';

@Injectable({ providedIn: 'root' })
export class SeatService {
  SERVER_URL = SERVER_URL;

  constructor(private http: HttpClient) {}

  getSeat(page?: number) {
    if (page) {
      return this.http.get(`${this.SERVER_URL}/seats/all?pageNumber=${page}`);
    }
    return this.http.get(`${this.SERVER_URL}/seats/all`);
  }

  searchSeat(seat: any) {
    return this.http.post(`${this.SERVER_URL}/seats/search`, seat);
  }

  creatSeat(seat: any) {
    return this.http.post(`${this.SERVER_URL}/seats`, seat);
  }

  updateSeat(seats: any, id: string) {
    return this.http.put(`${this.SERVER_URL}/seats/${id}`, seats);
  }

  deleteSeat(id: string) {
    return this.http.delete(`${this.SERVER_URL}/seats/${id}`);
  }

  getAllSeat() {
    return this.http.get(`${this.SERVER_URL}/seats/all`);
  }

  getSeatId(id: string) {
    return this.http.get(`${this.SERVER_URL}/seats/${id}`);
  }
}
