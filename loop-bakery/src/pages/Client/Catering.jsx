import React from 'react';
import { MOCK_PRODUCTS } from '../../data/mockData';
import { Users, Calendar, UtensilsCrossed } from 'lucide-react';

const Catering = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-dark tracking-tight">
          Servicio de <span className="text-primary italic">Fiesta y Cáterin</span>
        </h1>
        <p className="text-neutral-dark max-w-2xl mx-auto text-lg">
          Llevamos la magia de Loop Bakery a tus eventos. Nos encargamos de todo para que disfrutes con tus invitados.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {MOCK_PRODUCTS.catering.map((plan) => (
          <div key={plan.id} className="flex flex-col bg-white rounded-3xl border border-primary/10 overflow-hidden hover:shadow-2xl transition-all duration-500">
            <div className="h-56 overflow-hidden">
              <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 flex-grow space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-primary-dark">{plan.name}</h3>
                <div className="bg-primary-light/20 text-primary-dark px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Users size={14} />
                  {plan.people}
                </div>
              </div>
              <p className="text-neutral text-sm leading-relaxed">
                {plan.description}
              </p>
              <div className="pt-4 border-t border-primary/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-primary-dark">
                    ${plan.pricePerPerson.toLocaleString()}
                  </span>
                  <span className="text-neutral text-xs uppercase font-bold"> / persona</span>
                </div>
              </div>
              <button className="w-full bg-primary text-cream py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                <Calendar size={20} />
                Consultar Disponibilidad
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary-dark rounded-[3rem] p-8 md:p-16 text-cream text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-32 -mb-32" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center mb-4">
            <UtensilsCrossed size={48} className="text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold">¿Tienes un evento especial?</h2>
          <p className="text-cream/80 text-lg">
            Creamos presupuestos a medida según tus necesidades. Desde Coffee Breaks corporativos hasta bodas y cumpleaños temáticos.
          </p>
          <button className="bg-white text-primary-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-cream transition-all shadow-xl">
            Solicitar Presupuesto Personalizado
          </button>
        </div>
      </div>
    </div>
  );
};

export default Catering;
