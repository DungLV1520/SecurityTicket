import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/app/app.constant';
import { Trip } from '../model/trip.model';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  SERVER_URL = SERVER_URL;

  constructor(private http: HttpClient) {}

  getTrip(page?: number) {
    if (page) {
      return this.http.get(`${this.SERVER_URL}/trips/all?pageNumber=${page}`);
    }
    return this.http.get(`${this.SERVER_URL}/trips/all`);
  }

  getTripId(id?: string) {
    return this.http.get(`${this.SERVER_URL}/trips/${id}`);
  }

  creatTrip(trips: Trip) {
    return this.http.post(`${this.SERVER_URL}/trips`, trips);
  }

  updateTrip(trips: Trip, id: string) {
    return this.http.put(`${this.SERVER_URL}/trips/${id}`, trips);
  }

  deleteTrip(id: string) {
    return this.http.delete(`${this.SERVER_URL}/trips/${id}`);
  }

  searchTrip(trip: any) {
    return this.http.post(`${this.SERVER_URL}/trips/search`, trip);
  }
}
