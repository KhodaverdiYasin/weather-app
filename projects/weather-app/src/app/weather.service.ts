import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '482944e26d320a80bd5e4f23b3de7d1f';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?q=${city}&units=imperial&appid=${this.apiKey}`);
  }

  getForecast(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&units=imperial&appid=${this.apiKey}`);
  }
}
