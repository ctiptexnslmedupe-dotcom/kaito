import { Promotion } from '../types';

export const PROMOTIONS_DATA: Promotion[] = [
  {
    id: 'promo-salon-68',
    title: 'Super Promo Salón',
    badge: 'MÁS PEDIDA EN SALÓN',
    price: 68.00,
    originalPrice: 110.00,
    subtitle: '36 Makis + 6 Alitas Nikkei',
    description: 'La combinación favorita para compartir entre 2 a 3 personas en nuestros locales de Miraflores o Surco.',
    includes: [
      '3 Tablas completas a elección (36 makis cortes)',
      '1 Porción de Alitas Glaseadas Nikkei o Acevichadas (6 uds)',
      'Salsas de la casa: Acevichada, Tare y Soya artesanal',
      'Válido para consumo en salón de Lunes a Domingo'
    ],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    channel: 'Solo Salón',
    highlightColor: 'pink',
  },
  {
    id: 'promo-mega-95',
    title: 'Combo Experiencia Completa',
    badge: 'COMBO TODO INCLUIDO',
    price: 95.00,
    originalPrice: 145.00,
    subtitle: '36 Makis + 2 Complementos + 2 Bebidas',
    description: 'Banquete para disfrutar sin preocupaciones. Elige tus 3 tablas favoritas, 2 complementos y refrescos.',
    includes: [
      '3 Tablas de makis a tu elección (36 cortes)',
      '2 Complementos a elección (12 unidades: Alitas, Gyozas o Ebi Furai)',
      '2 Bebidas personales (Inca Kola, Coca-Cola o Chicha)',
      'Acompañamientos y dips completos'
    ],
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=800&q=80',
    channel: 'Salón & Delivery',
    highlightColor: 'cyan',
  },
  {
    id: 'promo-delivery-box-59',
    title: 'Kaito Box Delivery',
    badge: 'OFERTA DELIVERY & TAKE AWAY',
    price: 59.90,
    originalPrice: 98.00,
    subtitle: '36 Makis + 1 Complemento en Box Especial',
    description: 'Empacado con tecnología térmica para que tus makis y piqueos lleguen crujientes y frescos a tu casa.',
    includes: [
      '3 Tablas de makis seleccionados (36 cortes)',
      '1 Complemento (6 unidades)',
      'Palitos de bambú, jengibre encurtido gari y wasabi',
      'Packs herméticos con salsas selladas'
    ],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    channel: 'Delivery & Para Llevar',
    highlightColor: 'orange',
  },
  {
    id: 'promo-duo-69',
    title: 'Dúo Express Kaito',
    badge: 'IDEAL PARA DOS',
    price: 69.00,
    originalPrice: 95.00,
    subtitle: '24 Cortes (4 Medios Makis) + 1 Complemento',
    description: 'Perfecto para probar mayor variedad de sabores en porciones balanceadas.',
    includes: [
      '4 Medios makis de sabores distintos (24 cortes)',
      '1 Porción de Gyozas fritas o Ebi Furai (6 uds)',
      'Jarra personal de Chicha Morada',
      'Atención personalizada en barra'
    ],
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80',
    channel: 'Salón & Delivery',
    highlightColor: 'yellow',
  }
];

export const BARRA_LIBRE_FEATURES = {
  pricePerPerson: 59.90,
  priceWeekend: 64.90,
  rules: [
    {
      title: 'Rondas sin límite',
      description: 'Pide rondas de makis y complementos seleccionados tantas veces como desees durante tu turno.'
    },
    {
      title: 'Consumo responsable',
      description: 'Para evitar desperdicio de comida, cada ronda debe terminarse antes de ordenar la siguiente. (Corte no consumido tiene recargo de S/. 2).'
    },
    {
      title: 'Mesa completa',
      description: 'La modalidad de Barra Libre aplica para todos los comensales sentados en la misma mesa.'
    },
    {
      title: 'Tiempo de experiencia',
      description: '90 minutos de pura degustación ilimitada con servicio continuo directo de barra.'
    }
  ],
  includedDishesCount: 22
};
