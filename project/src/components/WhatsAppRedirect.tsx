import React, { useState, useEffect } from 'react';
import { ChevronRight, Send } from 'lucide-react';
import { states } from '../data/states';
import { getCitiesByState } from '../data/cities';
import { getSellerForCity, Seller } from '../data/sellers';

const WhatsAppRedirect: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (selectedState) {
      setCities(getCitiesByState(selectedState));
      setSelectedCity('');
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
  };

  const handleNext = () => {
    if (step === 1 && selectedState) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedState || !selectedCity) return;
    
    setIsLoading(true);
    
    // Get the appropriate seller based on city
    const seller: Seller | null = getSellerForCity(selectedCity);
    
    if (seller) {
      // Create WhatsApp link with pre-filled message
      const message = `Olá! Estou interessado em seus produtos/serviços. Sou de ${selectedCity}, ${selectedState}.`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/${seller.phoneNumber}?text=${encodedMessage}`;
      
      // Redirect to WhatsApp
      window.location.href = whatsappLink;
    } else {
      alert('Desculpe, não encontramos um consultor para sua região.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${step === 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">Selecione seu Estado</label>
          </div>
          <select
            id="state"
            value={selectedState}
            onChange={handleStateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-2 border"
            required
            disabled={step !== 1}
          >
            <option value="">Selecione um estado</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          
          {step === 1 && selectedState && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
              >
                Próximo <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          )}
        </div>

        {step === 2 && (
          <div className="mb-6 animate-fadeIn">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">2</div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Selecione sua Cidade</label>
            </div>
            <select
              id="city"
              value={selectedCity}
              onChange={handleCityChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 p-2 border"
              required
            >
              <option value="">Selecione uma cidade</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            
            {selectedCity && (
              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    'Conectando...'
                  ) : (
                    <>
                      Falar com Consultor <Send size={18} className="ml-2" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default WhatsAppRedirect;