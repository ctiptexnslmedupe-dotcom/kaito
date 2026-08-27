export type DishCategory = 
  | 'todos'
  | 'makis-nikkei'
  | 'makis-flameados'
  | 'makis-crocantes'
  | 'entradas-alitas'
  | 'piqueos-gyozas'
  | 'bebidas-cocteles'
  | 'postres';

export interface Dish {
  id: string;
  name: string;
  category: DishCategory;
  japaneseName?: string;
  description: string;
  ingredients: string[];
  price: number; // in PEN (S/.)
  piecesText?: string; // e.g. "10 cortes (Tabla completa)"
  image: string;
  tags: ('Favorito de la Casa' | 'Flameado en Mesa' | 'Picante' | 'Crocante' | 'Nuevo' | 'Acevichado' | 'Barra Libre Included' | 'De Autor')[];
  spicyLevel?: 0 | 1 | 2 | 3;
  flavorNotes?: string;
  pairingRecommendation?: string;
  isIncludedInBarraLibre: boolean;
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
  highlightColor: 'pink' | 'cyan' | 'orange' | 'yellow';
}

export interface LocationInfo {
  id: string;
  name: string;
  district: string;
  address: string;
  reference: string;
  hoursWeekday: string;
  hoursWeekend: string;
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

export interface RoundBuilderSelection {
  tables: Dish[];
  complement?: Dish;
  drinks: string[];
  numberOfPeople: number;
}
