export interface Seller {
  id: string;
  name: string;
  phoneNumber: string;
  region: string[];
}

// Sample seller data
const sellers: Seller[] = [
  {
    id: 'seller1',
    name: 'João Silva',
    phoneNumber: '5511999999991',
    region: ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto']
  },
  {
    id: 'seller2',
    name: 'Maria Oliveira',
    phoneNumber: '5511999999992',
    region: ['São Paulo', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Guarulhos']
  },
  {
    id: 'seller3',
    name: 'Pedro Santos',
    phoneNumber: '5521999999993',
    region: ['Rio de Janeiro', 'Niterói', 'São Gonçalo', 'Duque de Caxias']
  },
  {
    id: 'seller4',
    name: 'Ana Costa',
    phoneNumber: '5521999999994',
    region: ['Rio de Janeiro', 'Nova Iguaçu', 'Petrópolis', 'Volta Redonda']
  },
  {
    id: 'seller5',
    name: 'Carlos Ferreira',
    phoneNumber: '5531999999995',
    region: ['Belo Horizonte', 'Contagem', 'Betim']
  },
  {
    id: 'seller6',
    name: 'Default Seller',
    phoneNumber: '5500999999999',
    region: ['Capital'] // This seller will handle all default cities
  }
];

// Store the last seller index used for each city (for distribution)
const citySellerDistribution: Record<string, number> = {};

// Get seller for a specific city with distribution logic
export const getSellerForCity = (city: string): Seller | null => {
  // Find all sellers that cover this city
  const availableSellers = sellers.filter(seller => 
    seller.region.includes(city)
  );
  
  // If no specific sellers found, return the default seller
  if (availableSellers.length === 0) {
    return sellers.find(seller => seller.id === 'seller6') || null;
  }
  
  // If only one seller, return them
  if (availableSellers.length === 1) {
    return availableSellers[0];
  }
  
  // If multiple sellers (distribution logic)
  // Get the last index used for this city, or -1 if none
  const lastIndex = citySellerDistribution[city] ?? -1;
  
  // Calculate the next index (round-robin)
  const nextIndex = (lastIndex + 1) % availableSellers.length;
  
  // Store this selection for next time
  citySellerDistribution[city] = nextIndex;
  
  // Return the selected seller
  return availableSellers[nextIndex];
};

// Get all sellers for admin view
export const getAllSellers = (): Seller[] => {
  return [...sellers];
};