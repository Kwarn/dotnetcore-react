export interface IActivity {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
  city: string;
  venue: string;
}

export type CategoryType =
  | 'culture'
  | 'drinks'
  | 'film'
  | 'food'
  | 'music'
  | 'travel';

export interface ServerError {
  statusCode: number;
  message: string;
  details: string;
}
