export interface HeaderProps {
  headerText: string;
}

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
