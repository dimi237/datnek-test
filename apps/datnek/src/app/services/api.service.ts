import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const events: any = [
      {
        description: "sdfasdfasdfasdfasdfasdfasdfasdf",
        end_date: '',
        end_hour: '',
        id: 1,
        link: "http://google.com",
        name: "R&D",
        organizer: "Espoir Eding",
        start_date: "2024-06-17",
        start_hour: "22:23",
        type: "ONLINE",
      }
    ];
    return { events };
  }
}
