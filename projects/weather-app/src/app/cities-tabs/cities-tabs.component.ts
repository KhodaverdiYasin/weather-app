import { MatTabChangeEvent } from '@angular/material/tabs';
import { Component, ViewEncapsulation } from '@angular/core';

import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-cities-tabs',
  templateUrl: './cities-tabs.component.html',
  styleUrls: ['./cities-tabs.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CitiesTabsComponent {
  cities = ['Rio de Janeiro', 'Beijing', 'Los Angeles'];
  selectedCity = this.cities[0];
  weatherData?: any;
  forecastData?: any;
  isLoading: boolean = false;

  constructor(private weatherService: WeatherService) {
    this.getWeatherData(this.selectedCity);
  }

  onCityTabSelected(event: MatTabChangeEvent): void {
    const selectedCity = this.cities[event.index];
    this.getWeatherData(selectedCity);
  }

  selectCity(city: string) {
    this.selectedCity = city;
    this.getWeatherData(city);
  }

  getWeatherData(city: string) {
    this.isLoading = true;
    this.weatherService.getWeather(city).subscribe(data => {
      this.weatherData = data;
      this.isLoading = false;
    }, () => this.isLoading = false);
    this.weatherService.getForecast(city).subscribe(data => {
      this.forecastData = data;
      this.isLoading = false;
    }, () => this.isLoading = false);
  }
}
