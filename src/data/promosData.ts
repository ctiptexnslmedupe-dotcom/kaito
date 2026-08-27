import { PromoBanner } from '../types';

export const PROMOTIONS_DATA: PromoBanner[] = [
  {
    id: 'promo-barra-libre-flash',
    title: 'BARRA LIBRE ALL YOU CAN EAT',
    subtitle: 'Makis, nigiris, alitas, gyozas y baos ilimitados',
    tag: '⚡ PROMO ESTRELLA',
    price: 'S/. 59.90',
    description: 'Come todo lo que quieras durante 2 horas continuas con refill de bebida. Disponible todos los días en Miraflores y Surco.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    badge: 'MÁS POPULAR',
    terms: 'Válido por persona. No acumulable con otras promociones.',
  },
  {
    id: 'promo-happy-hour-cocteles',
    title: 'HAPPY HOUR 2X S/. 35 EN CÓCTELES',
    subtitle: 'KAI-TO Sour, Chilcanos & Gin Tonics Nikkei',
    tag: '🍹 4:00 PM A 8:00 PM',
    price: '2x S/. 35',
    description: 'Disfruta de nuestros cócteles de autor con macerados de la casa en el mejor ambiente de Lima.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    badge: 'DE LUNES A VIERNES',
    terms: 'Aplica en cócteles seleccionados de la carta de bar.',
  },
  {
    id: 'promo-cumpleanos-kaito',
    title: '¡CUMPLEAÑERO COME GRATIS!',
    subtitle: 'Festeja tu día a lo grande con tus amigos',
    tag: '🎉 GRUPOS DE 4+',
    price: 'GRATIS',
    description: 'Trae a 4 amigos con barra libre y el cumpleañero no paga su barra libre + shot flameado de cortesía.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    badge: 'CELEBRA CON NOSOTROS',
    terms: 'Presentando DNI en la semana del cumpleaños.',
  },
];

export const BARRA_LIBRE_FEATURES = [
  'Más de 25 variedades de Makis Nikkei en rotación continua',
  'Entradas calientes ilimitadas: Gyozas, Alitas Nikkei, Baos al vapor',
  'Nigiris flameados al soplete en mesa',
  'Refill ilimitado de Té Helado o Chicha Morada',
  'Duración de 2 horas para disfrutar sin apuros',
];
