import React from 'react';
import { MessageSquare } from 'lucide-react';
import WhatsAppRedirect from './components/WhatsAppRedirect';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-500 p-3 rounded-full">
              <MessageSquare size={32} className="text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Fale com um Consultor</h1>
          <p className="text-gray-600">Selecione sua localização para conectar com um de nossos especialistas</p>
        </div>
        
        <WhatsAppRedirect />
      </div>
    </div>
  );
}

export default App;