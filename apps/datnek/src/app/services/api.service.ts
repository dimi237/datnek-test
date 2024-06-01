import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const events:any = [];
    return { events };
  }
}
