// Sample city data
const citiesData: Record<string, string[]> = {
  'SP': [
    'São Paulo',
    'Campinas',
    'Santos',
    'Ribeirão Preto',
    'São José dos Campos',
    'Sorocaba',
    'São Bernardo do Campo',
    'Santo André',
    'Osasco',
    'Guarulhos'
  ],
  'RJ': [
    'Rio de Janeiro',
    'Niterói',
    'São Gonçalo',
    'Duque de Caxias',
    'Nova Iguaçu',
    'Petrópolis',
    'Volta Redonda',
    'Campos dos Goytacazes',
    'Belford Roxo',
    'São João de Meriti'
  ],
  'MG': [
    'Belo Horizonte',
    'Uberlândia',
    'Contagem',
    'Juiz de Fora',
    'Betim',
    'Montes Claros',
    'Ribeirão das Neves',
    'Uberaba',
    'Governador Valadares',
    'Ipatinga'
  ],
  'BA': [
    'Salvador',
    'Feira de Santana',
    'Vitória da Conquista',
    'Camaçari',
    'Itabuna',
    'Juazeiro',
    'Ilhéus',
    'Lauro de Freitas',
    'Jequié',
    'Teixeira de Freitas'
  ],
  'PR': [
    'Curitiba',
    'Londrina',
    'Maringá',
    'Ponta Grossa',
    'Cascavel',
    'São José dos Pinhais',
    'Foz do Iguaçu',
    'Colombo',
    'Guarapuava',
    'Paranaguá'
  ],
  'RS': [
    'Porto Alegre',
    'Caxias do Sul',
    'Pelotas',
    'Canoas',
    'Santa Maria',
    'Gravataí',
    'Viamão',
    'Novo Hamburgo',
    'São Leopoldo',
    'Rio Grande'
  ],
  'PE': [
    'Recife',
    'Jaboatão dos Guararapes',
    'Olinda',
    'Caruaru',
    'Petrolina',
    'Paulista',
    'Cabo de Santo Agostinho',
    'Camaragibe',
    'Garanhuns',
    'Vitória de Santo Antão'
  ],
  'CE': [
    'Fortaleza',
    'Caucaia',
    'Juazeiro do Norte',
    'Maracanaú',
    'Sobral',
    'Crato',
    'Itapipoca',
    'Maranguape',
    'Iguatu',
    'Quixadá'
  ]
};

// For all other states, use these default cities
const defaultCities = ['Capital', 'Cidade Interior 1', 'Cidade Interior 2', 'Cidade Interior 3'];

export const getCitiesByState = (stateCode: string): string[] => {
  return citiesData[stateCode] || defaultCities;
};