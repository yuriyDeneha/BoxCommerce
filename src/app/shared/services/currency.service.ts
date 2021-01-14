import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  api = 'https://api.exchangeratesapi.io/';

  constructor(
    private http: HttpClient
  ) {
  }

  getLatest(): Observable<any> {
    return this.http.get(`${this.api}latest`);
  }

  getHistory(start: Date, end: Date): Observable<any> {
    const s = start.toISOString().slice(0, 10);
    const e = end.toISOString().slice(0, 10);
    return this.http.get(`${this.api}history?start_at=${s}&end_at=${e}`);
  }
}
