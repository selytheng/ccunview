
export interface Course {
    id: number;
    name: string;
    description: string;
    image: string; 
  }

export interface Partner {
    id: number | string;
    name: string;
    description: string;
    logo: string;
}
  
export interface Major {
  id: number;
  name: string;
  description: string;
}
export interface Event {
  id: number;
  title: string;
  description: string;
  image?: string;
  date: string; 
}
