export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  originalPrice: number;
  description: string;
  features: string[];
  imageUrl: string;
  badge?: string;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "smartwatch-amoled-pro",
    name: "Smartwatch AMOLED Pro",
    shortName: "Smartwatch AMOLED",
    category: "Gadgets & Eletrônicos",
    price: 169,
    originalPrice: 220,
    description: "Smartwatch com tela AMOLED de alta resolução, monitor cardíaco 24h, GPS integrado e autonomia de até 7 dias. Compatível com Android e iOS. À prova d'água IP68.",
    features: ["Tela AMOLED 1.96\" 60Hz", "Monitor cardíaco e SpO2", "GPS integrado", "Bateria 7 dias", "À prova d'água IP68", "Compatível Android e iOS"],
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    badge: "Mais Vendido",
    inStock: true,
  },
  {
    id: "2",
    slug: "camera-wifi-360",
    name: "Câmera de Segurança Wi-Fi 360°",
    shortName: "Câmera Wi-Fi 360°",
    category: "Automação Residencial",
    price: 189,
    originalPrice: 250,
    description: "Câmera IP Wi-Fi com rotação 360°, visão noturna colorida, detecção de movimento com alerta no celular e armazenamento em nuvem. Fácil instalação em qualquer ambiente.",
    features: ["Rotação 360° pan + tilt", "Resolução Full HD 1080p", "Visão noturna colorida", "Detecção de movimento", "Alerta em tempo real", "App gratuito"],
    imageUrl: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?w=600&q=80",
    badge: "Lançamento",
    inStock: true,
  },
  {
    id: "3",
    slug: "lanterna-tatica-recarregavel",
    name: "Lanterna Tática Recarregável USB-C",
    shortName: "Lanterna Tática",
    category: "Camping & Aventura",
    price: 89,
    originalPrice: 130,
    description: "Lanterna tática militar com 5 modos de iluminação, alcance de 500m e recarga USB-C. Corpo em alumínio aeronáutico resistente a impactos e imersão em água.",
    features: ["5.000 lúmens", "Alcance 500 metros", "5 modos de iluminação", "Recarga USB-C rápida", "Alumínio aeronáutico", "Resistente à água IPX6"],
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    inStock: true,
  },
  {
    id: "4",
    slug: "filtro-agua-portatil",
    name: "Filtro de Água Portátil Survival",
    shortName: "Filtro de Água Portátil",
    category: "Camping & Aventura",
    price: 129,
    originalPrice: 180,
    description: "Filtro de água portátil com capacidade de filtrar até 2.000 litros. Remove 99,9% de bactérias, protozoários e partículas. Ideal para trilhas, camping e emergências.",
    features: ["Filtra até 2.000 litros", "Remove 99,9% de bactérias", "Peso apenas 57g", "Inclui canudo e saco", "Sem necessidade de bateria", "Certificado FDA"],
    imageUrl: "https://images.unsplash.com/photo-1536466528142-fc33cdd40aa8?w=600&q=80",
    badge: "Essencial",
    inStock: true,
  },
  {
    id: "5",
    slug: "fechadura-digital-biometrica",
    name: "Fechadura Digital Biométrica",
    shortName: "Fechadura Digital",
    category: "Automação Residencial",
    price: 269,
    originalPrice: 380,
    description: "Fechadura inteligente com biometria, senha numérica, cartão RFID e chave de emergência. Controle pelo app, histórico de acessos e bateria com autonomia de 1 ano.",
    features: ["Biometria + senha + RFID", "App com histórico de acessos", "Bateria 1 ano de autonomia", "Aviso de bateria fraca", "Fácil instalação", "Compatível portas 35–80mm"],
    imageUrl: "https://images.unsplash.com/photo-1609743522653-52354461eb27?w=600&q=80",
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
