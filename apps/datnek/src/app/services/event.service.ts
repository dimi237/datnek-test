import { Injectable } from '@angular/core';
import { Event } from '../core/state/event/event.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EventService {
  BASE_URL: string;

  constructor(private http: HttpClient) {
    this.BASE_URL = `api/events`;
  }

  async create(data: Event): Promise<any> {
    return await this.http.post(`${this.BASE_URL}/`, data).toPromise();

  }
  async update(id: number, data: Event): Promise<any> {
    return await this.http.put(`${this.BASE_URL}`, { ...data, id }).toPromise();
  }

  async findAll(): Promise<any> {
    return this.http.get<any>(`${this.BASE_URL}/`).toPromise();
  }

  async deleteById(id?: number): Promise<any> {
    return await this.http.delete(`${this.BASE_URL}/${id}`).toPromise();
  }
}