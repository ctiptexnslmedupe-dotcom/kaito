import { LocationInfo } from '../types';

export const LOCATIONS_DATA: LocationInfo[] = [
  {
    id: 'miraflores',
    name: 'Sede Miraflores',
    district: 'Miraflores, Lima',
    address: 'Calle Bolognesi 143, Miraflores',
    reference: 'A 2 cuadras del Parque Kennedy y Av. Pardo',
    hoursWeekday: 'Lunes a Jueves: 12:30 PM - 10:30 PM',
    hoursWeekend: 'Viernes, Sábados y Domingos: 12:30 PM - 11:30 PM',
    phone: '+51 951 770 377',
    whatsapp: '51951770377',
    googleMapsLink: 'https://maps.google.com/?q=Calle+Bolognesi+143+Miraflores+Lima',
    photos: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Pared Neón de Fotos', 'Barra Omakase', 'Música Urbana & Lo-Fi', 'Pet Friendly en Terraza', 'WiFi Alta Velocidad'],
    ambiance: 'Vibrante, moderno, luces de neón temáticas para fotos y barra frontal para ver a los sushimen en acción.'
  },
  {
    id: 'surco',
    name: 'Sede Surco',
    district: 'Santiago de Surco, Lima',
    address: 'Av. Caminos del Inca 3252, Surco',
    reference: 'Frente a zona comercial y gastronómica de Caminos del Inca',
    hoursWeekday: 'Lunes a Jueves: 1:00 PM - 10:30 PM',
    hoursWeekend: 'Viernes a Domingo: 12:30 PM - 11:00 PM',
    phone: '+51 951 770 377',
    whatsapp: '51951770377',
    googleMapsLink: 'https://maps.google.com/?q=Av+Caminos+del+Inca+3252+Surco+Lima',
    photos: [
      'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80'
    ],
    features: ['Salón Amplio para Grupos', 'Zona Neon Photobooth', 'Estacionamiento Cerca', 'Aire Acondicionado', 'Atención para Cumpleaños'],
    ambiance: 'Ideal para compartir en grupo, celebrar cumpleaños con amigos y disfrutar de las rondas infinitas de makis.'
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't1',
    name: 'Eduardo Ramos',
    instagram: '@eduu.nvs',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: '¡La mejor barra libre de Lima sin dudarlo! El Maki Dragón Tartar y el Acevichado son de otro planeta. La atención en Miraflores es rápida y la pared de neón queda increíble en las historias.',
    favoriteDish: 'Maki Dragón Tartar',
    verifiedVisit: true,
    dateText: 'Hace 3 días'
  },
  {
    id: 't2',
    name: 'Valeria Mendoza',
    instagram: '@valemendoza.nikkei',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Fuimos 6 amigos a Surco por la promo de S/. 95 y salimos felices. Los flameados en la mesa son un espectáculo y las alitas nikkei súper crujientes.',
    favoriteDish: 'Volcano Flameado & Alitas',
    verifiedVisit: true,
    dateText: 'Hace 1 semana'
  },
  {
    id: 't3',
    name: 'José Mejía',
    instagram: '@josemejia.31',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'La combinación de sabores japo-peruanos está en su punto. Muy fresco todo, arroz shari bien sazonado y el ambiente con la música y luces te mete en el mood.',
    favoriteDish: 'Salmón Trufado',
    verifiedVisit: true,
    dateText: 'Hace 2 semanas'
  }
];
