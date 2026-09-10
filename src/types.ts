export interface BusinessProfile {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  secondaryCategory: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  isVerified: boolean;
  address: string;
  district: string;
  city: string;
  country: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  phone: string;
  whatsapp: string;
  website: string;
  googleMapsShortUrl: string;
  hours: {
    status: 'open' | 'closed';
    closesAt: string;
    schedule: { day: string; hours: string; isToday?: boolean }[];
  };
  description: string;
  coverPhotos: {
    url: string;
    caption: string;
    tag: string;
  }[];
  attributes: {
    serviceOptions: string[];
    offerings: string[];
    diningOptions: string[];
    amenities: string[];
    atmosphere: string[];
    crowd: string[];
    payments: string[];
  };
  metrics: {
    monthlySearches: number;
    directionsRequested: number;
    callClicks: number;
    profileViews: number;
    localPackRank: number;
  };
}

export interface SocialPost {
  id: string;
  type: 'menu' | 'star-dish' | 'trust';
  badge: string;
  headline: string;
  copy: string;
  ctaText: string;
  ctaLink: string;
  likes: number;
  shares: number;
  timeAgo: string;
  image: string;
  tags: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  isPopular?: boolean;
  badge?: string;
  portion?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  isLocalGuide?: boolean;
  reviewsCount: number;
  rating: number;
  timeAgo: string;
  comment: string;
  photos?: string[];
  likes: number;
  response?: {
    ownerName: string;
    date: string;
    text: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'bot' | 'owner';
  text: string;
  timestamp: string;
  isQuickReply?: boolean;
}
