export interface Product {
  name: string;
  category:
    | 'cooking-lower'
    | 'cooking-higher'
    | 'solar-pv'
    | 'pue'
    | 'water-pumping'
    | 'street-lights'
    | 'power-backup'
    | 'advisory';
  subcategory?: string;
  price: number;
  rating: number;
  tags: string[];
  description: string;
  sale: boolean;
  oldPrice: number | null;
  badge: string | null;
  targetUsers?: string[];
  applications?: string[];
  specifications?: {
    power?: string;
    capacity?: string;
    warranty?: string;
    efficiency?: string;
  };
}

// Lazy load products data to reduce initial bundle size
export const getProducts = async (): Promise<Product[]> => {
  // This will be code-split automatically by Next.js
  const { products } = await import('./products-data');
  return products;
};

// Essential products for initial render (reduce to top 6 most important)
export const essentialProducts: Product[] = [
  {
    name: 'Mirt Stove Deluxe',
    category: 'cooking-lower',
    subcategory: 'Injera Baking',
    price: 2500,
    rating: 4.7,
    tags: ['CleanCooking', 'Injera', 'EcoStove', 'Efficient'],
    description:
      'The enhanced Mirt stove is made from durable sand and cement mortar, designed for Ethiopian households to bake injera efficiently and reduce fuel use.',
    sale: false,
    oldPrice: null,
    badge: 'ECO-FRIENDLY',
    targetUsers: ['Ethiopian households', 'Rural communities', 'Traditional cooking'],
    applications: [
      'Injera baking',
      'Traditional cooking',
      'Fuel-efficient cooking',
    ],
    specifications: {
      capacity: 'Bakes up to 30 injeras per day',
      efficiency: '50% fuel savings',
      warranty: '5 years lifespan with proper maintenance',
    },
  },
  {
    name: 'Household Solar System',
    category: 'solar-pv',
    subcategory: 'Residential',
    price: 16500,
    rating: 4.7,
    tags: ['Solar', 'Off-grid', 'Household'],
    description:
      'Complete solar PV system for households including panels, battery, inverter, and lighting.',
    sale: true,
    oldPrice: 19000,
    badge: 'POPULAR',
    targetUsers: ['Rural households', 'Off-grid communities'],
    applications: ['Home lighting', 'Phone charging', 'Small appliances'],
    specifications: {
      capacity: '100Ah battery',
      warranty: '5 years panels, 2 years battery',
    },
  },
  {
    name: 'Electric Induction Cookstove',
    category: 'cooking-higher',
    subcategory: 'Electric Stoves',
    price: 4500,
    rating: 4.8,
    tags: ['Electric', 'Zero Emissions', 'Modern'],
    description:
      'High-efficiency electric induction cookstove with precise temperature control and minimal emissions.',
    sale: false,
    oldPrice: null,
    badge: 'PREMIUM',
    targetUsers: ['Modern households', 'Grid-connected areas'],
    applications: [
      'All cooking needs',
      'Professional cooking',
      'Clean cooking',
    ],
    specifications: {
      power: '2000W',
      efficiency: '90% energy efficiency',
      warranty: '3 years',
    },
  },
  {
    name: 'Solar Water Pump',
    category: 'pue',
    subcategory: 'Water Pumping',
    price: 28000,
    rating: 4.6,
    tags: ['Solar', 'Water Pump', 'Agriculture'],
    description:
      'Solar-powered water pump for irrigation and livestock watering, designed for smallholder farmers.',
    sale: false,
    oldPrice: null,
    badge: 'FARMING',
    targetUsers: ['Smallholder farmers', 'Agricultural cooperatives'],
    applications: ['Irrigation', 'Livestock watering', 'Garden watering'],
    specifications: {
      capacity: '2000L/hour flow rate',
      warranty: '3 years',
    },
  },
  {
    name: 'Solar Street Light',
    category: 'street-lights',
    subcategory: 'Standard',
    price: 8500,
    rating: 4.5,
    tags: ['Solar', 'Street Lighting', 'LED', 'Automatic'],
    description:
      'Standalone solar street light with LED technology and automatic dusk-to-dawn operation.',
    sale: false,
    oldPrice: null,
    badge: null,
    targetUsers: ['Municipalities', 'Communities', 'Private developments'],
    applications: ['Street lighting', 'Pathway lighting', 'Public spaces'],
    specifications: {
      capacity: '12V 40Ah battery',
      warranty: '3 years',
    },
  },
  {
    name: 'Home Backup System',
    category: 'power-backup',
    subcategory: 'Residential',
    price: 45000,
    rating: 4.6,
    tags: ['Backup Power', 'Inverter', 'Battery', 'Home Use'],
    description:
      'Complete backup power system for homes with inverter and battery bank for essential appliances.',
    sale: false,
    oldPrice: null,
    badge: 'RELIABLE',
    targetUsers: ['Homeowners', 'Small businesses', 'Clinics'],
    applications: ['Power outages', 'Essential appliances', 'Emergency power'],
    specifications: {
      capacity: '200Ah battery bank',
      warranty: '3 years inverter, 2 years battery',
    },
  },
];

// Legacy export for backward compatibility
export const products = essentialProducts;
