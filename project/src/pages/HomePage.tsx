import React from 'react';
import VendorRedirectForm from '../components/VendorRedirectForm';
import { MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 text-center md:text-left fade-in">
            <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
              <MessageSquare className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Conecte-se com nossos especialistas
            </h1>
            <p className="text-gray-600 mb-6">
              Selecione sua localização e fale diretamente com o vendedor responsável pela sua região através do WhatsApp.
            </p>
            <div className="hidden md:block">
              <div className="flex items-center gap-4 mt-8">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-700 font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">Selecione seu estado e cidade</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-700 font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Clique no botão de WhatsApp</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                  <span className="text-green-700 font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium">Converse com seu vendedor regional</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <VendorRedirectForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;