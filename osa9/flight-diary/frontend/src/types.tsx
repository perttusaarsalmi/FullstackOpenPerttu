export interface HeaderProps {
  headerText: string;
}

export interface Diary extends NewDiaryEntry {
  id: number;
}

export interface NewDiaryEntry {
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
