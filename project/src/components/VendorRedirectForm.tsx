import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Send, ChevronDown } from 'lucide-react';
import { locationData } from '../data/locations';
import { getVendorNumber } from '../data/vendors';
import { FormData } from '../types';

const VendorRedirectForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    state: '',
    city: ''
  });
  const [cities, setCities] = useState<string[]>([]);
  const [isStateSelected, setIsStateSelected] = useState(false);
  const [isCitySelected, setIsCitySelected] = useState(false);
  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  useEffect(() => {
    if (formData.state) {
      setCities(locationData[formData.state] || []);
      setIsStateSelected(true);
      setFormData(prev => ({ ...prev, city: '' }));
      setIsCitySelected(false);
    } else {
      setCities([]);
      setIsStateSelected(false);
    }
  }, [formData.state]);

  useEffect(() => {
    if (formData.city) {
      setIsCitySelected(true);
    } else {
      setIsCitySelected(false);
    }
  }, [formData.city]);

  const handleStateChange = (state: string) => {
    setFormData(prev => ({ ...prev, state }));
    setStateDropdownOpen(false);
  };

  const handleCityChange = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
    setCityDropdownOpen(false);
  };

  const handleRedirect = () => {
    if (formData.city) {
      const vendorNumber = getVendorNumber(formData.city);
      const message = encodeURIComponent(`Olá! Vim do site e gostaria de mais informações.`);
      window.open(`https://wa.me/${vendorNumber}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-xl shadow-lg scale-in">
      <div className="text-center mb-8 fade-in">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Fale com um Vendedor</h1>
        <p className="text-gray-600">Selecione sua localização para ser direcionado ao vendedor responsável</p>
      </div>

      <div className="space-y-6">
        {/* State Selection */}
        <div className="relative slide-in" style={{ animationDelay: '0.1s' }}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <div 
            className={`relative border ${stateDropdownOpen ? 'border-green-500' : 'border-gray-300'} rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-green-400 transition-colors`}
            onClick={() => setStateDropdownOpen(!stateDropdownOpen)}
          >
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-500 mr-2" />
              <span className={formData.state ? 'text-gray-800' : 'text-gray-500'}>
                {formData.state || 'Selecione o estado'}
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${stateDropdownOpen ? 'transform rotate-180' : ''}`} />
          </div>

          {stateDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-auto scale-in">
              {Object.keys(locationData).map(state => (
                <div 
                  key={state}
                  className="p-3 hover:bg-green-50 cursor-pointer transition-colors"
                  onClick={() => handleStateChange(state)}
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* City Selection - Only visible after state is selected */}
        {isStateSelected && (
          <div className="relative slide-in" style={{ animationDelay: '0.2s' }}>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
            <div 
              className={`relative border ${cityDropdownOpen ? 'border-green-500' : 'border-gray-300'} rounded-lg p-3 flex items-center justify-between cursor-pointer hover:border-green-400 transition-colors`}
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
            >
              <div className="flex items-center">
                <Navigation className="w-5 h-5 text-gray-500 mr-2" />
                <span className={formData.city ? 'text-gray-800' : 'text-gray-500'}>
                  {formData.city || 'Selecione a cidade'}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${cityDropdownOpen ? 'transform rotate-180' : ''}`} />
            </div>

            {cityDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 max-h-60 overflow-auto scale-in">
                {cities.map(city => (
                  <div 
                    key={city}
                    className="p-3 hover:bg-green-50 cursor-pointer transition-colors"
                    onClick={() => handleCityChange(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* WhatsApp Button - Only visible after city is selected */}
        {isCitySelected && (
          <button 
            onClick={handleRedirect}
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 slide-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Send className="w-5 h-5" />
            Falar com Vendedor via WhatsApp
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorRedirectForm;