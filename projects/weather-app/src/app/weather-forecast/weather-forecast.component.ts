import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  @Input() weatherData: any;
  @Input() forecastData: any;

  currentWeather: any;
  hourlyForecast: any[] = [];
  dailyForecast: any[] = [];

  ngOnInit(): void {
    this.setCurrentWeather();
    this.setHourlyForecast();
    this.setDailyForecast();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weatherData'] && changes['weatherData'].currentValue) {
      this.setCurrentWeather();
    }

    if (changes['forecastData'] && changes['forecastData'].currentValue) {
      this.setHourlyForecast();
      this.setDailyForecast();
    }
  }

  setCurrentWeather(): void {
    if (this.weatherData) {
      this.currentWeather = {
        temp: this.weatherData.main.temp,
        description: this.weatherData.weather[0].description,
        icon: this.weatherData.weather[0].icon
      };
    }
  }

  setHourlyForecast(): void {
    if (this.forecastData && this.forecastData.list) {
      this.hourlyForecast = this.forecastData.list.slice(0, 8);
    }
  }

  setDailyForecast(): void {
    if (this.forecastData && this.forecastData.list) {
      this.dailyForecast = this.forecastData.list.filter((item: any, index: number) => index % 8 === 0);
    }
  }

  getIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
}
