import { VendorData } from '../types';

// This is a sample mapping of cities to vendor WhatsApp numbers
// In a real implementation, this would be populated with actual vendor numbers
export const vendorData: VendorData = {
  // Sample data for SP cities with alternating vendors
  'São Paulo': ['5511999999991', '5511999999992'],
  'Campinas': ['5519999999991', '5519999999992'],
  'Guarulhos': '5511888888881',
  'Ribeirão Preto': '5516777777771',
  
  // Sample data for MG cities
  'Belo Horizonte': ['5531999999991', '5531999999992'],
  'Poços de Caldas': '5535888888881',
  
  // Sample data for RJ cities
  'Paraty': '5524777777771',
  'Angra dos Reis': ['5524666666661', '5524666666662']
};

// Default vendor if no specific vendor is assigned for a city
export const defaultVendor = '5511000000000';

// Function to get a vendor number with distribution logic
export const getVendorNumber = (city: string): string => {
  const vendor = vendorData[city] || defaultVendor;
  
  if (Array.isArray(vendor)) {
    // Simple distribution - alternate based on time
    const index = Math.floor(Date.now() / 1000) % 2;
    return vendor[index];
  }
  
  return vendor;
};