export interface Dish {
  id: string;
  name: string;
  category: 'barra-libre' | 'makis' | 'nigiris' | 'ceviches-tiraditos' | 'calientes' | 'cocteles-bebidas' | 'postres';
  description: string;
  price: number;
  image: string;
  tags: string[];
  spicyLevel?: 0 | 1 | 2 | 3;
  isVegetarian?: boolean;
  isSignature?: boolean;
  isGlutenFree?: boolean;
  piecesCount?: number;
  ingredients: string[];
  pairingRecommendation?: string;
  flavorNotes?: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  district: string;
  address: string;
  reference: string;
  phone: string;
  whatsapp: string;
  hoursWeekday: string;
  hoursWeekend: string;
  isBuffetAvailable: boolean;
  features: string[];
  googleMapsEmbedUrl: string;
  googleMapsLink: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  rating: number;
  comment: string;
  favoriteDish: string;
  instagram?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  price: string;
  description: string;
  image: string;
  badge: string;
  terms: string;
}
