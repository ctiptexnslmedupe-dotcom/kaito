export type DishCategory = 
  | 'todos'
  | 'desayunos-huanka'
  | 'almuerzos-novoandinos'
  | 'risottos-criollos'
  | 'piqueos-tablas'
  | 'cocteleria-autor'
  | 'cafeteria-postres';

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  nativeOrigin?: string; // e.g. "Chiclayo • Maíz & Hierbas Andinas"
  description: string;
  ingredients: string[];
  price: number; // in PEN (S/.)
  portionText?: string; // e.g. "Plato Personal Generoso", "Para 2 a 3 personas"
  image: string;
  tags: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  flavorNotes?: string;
  pairingRecommendation?: string;
  isHouseFavorite?: boolean;
  isBreakfastAvailable?: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  badge: string;
  price: number;
  originalPrice?: number;
  subtitle: string;
  description: string;
  includes: string[];
  image: string;
  channel: 'Salón & Delivery' | 'Solo Salón' | 'Delivery & Para Llevar';
  highlightColor: 'terracotta' | 'gold' | 'emerald' | 'berry';
  timeSlot?: string; // e.g. "8:00 AM - 12:00 PM" o "4:00 PM - 10:00 PM"
}

export interface LocationInfo {
  id: string;
  name: string;
  city: string;
  address: string;
  reference: string;
  hoursBreakfast: string;
  hoursLunchDinner: string;
  phone: string;
  whatsapp: string;
  googleMapsEmbedUrl?: string;
  googleMapsLink: string;
  photos: string[];
  features: string[];
  ambiance: string;
}

export interface Testimonial {
  id: string;
  name: string;
  instagram: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteDish: string;
  verifiedVisit: boolean;
  dateText: string;
}

export interface CustomTableSelection {
  mainDishes: Dish[];
  piqueos: Dish[];
  drinks: Dish[];
  peopleCount: number;
}

