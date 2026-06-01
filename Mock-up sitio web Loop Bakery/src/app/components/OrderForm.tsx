import { useState } from 'react';
import { X, Calendar, User, Phone, MessageCircle, CreditCard } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface OrderFormProps {
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  pickupDate: string;
}

export function OrderForm({ onClose }: OrderFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [selectedDate, setSelectedDate] = useState('');

  const onSubmit = (data: FormData) => {
    const message = `Hola! Quisiera hacer un pedido:\n\nNombre: ${data.firstName} ${data.lastName}\nTeléfono: ${data.phone}\nFecha de retiro: ${data.pickupDate}\n\n¡Gracias!`;
    const whatsappUrl = `https://wa.me/5491167905119?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getNextDays = (count: number) => {
    const days = [];
    for (let i = 1; i <= count; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('es-AR', options);
  };

  const nextDays = getNextDays(14);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-2xl mb-1">Formulario de Pedido</h2>
            <p className="text-sm opacity-90">Completa tus datos para confirmar</p>
          </div>
          <button onClick={onClose} className="hover:bg-primary-foreground/20 p-2 rounded-lg transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Datos Personales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm">Nombre</label>
                <input
                  type="text"
                  {...register('firstName', { required: 'El nombre es obligatorio' })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none transition-colors bg-input-background"
                  placeholder="Tu nombre"
                />
                {errors.firstName && (
                  <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm">Apellido</label>
                <input
                  type="text"
                  {...register('lastName', { required: 'El apellido es obligatorio' })}
                  className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none transition-colors bg-input-background"
                  placeholder="Tu apellido"
                />
                {errors.lastName && (
                  <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Número de Teléfono
              </label>
              <input
                type="tel"
                {...register('phone', {
                  required: 'El teléfono es obligatorio',
                  pattern: {
                    value: /^[0-9+\s()-]+$/,
                    message: 'Formato de teléfono inválido'
                  }
                })}
                className="w-full px-4 py-3 rounded-lg border-2 border-accent focus:border-primary outline-none transition-colors bg-input-background"
                placeholder="+54 11 1234-5678"
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Pickup Date */}
          <div>
            <h3 className="mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Fecha de Retiro (Take Away)
            </h3>

            <div className="max-h-48 overflow-y-auto border-2 border-accent rounded-lg">
              {nextDays.map((date, index) => {
                const dateString = date.toISOString().split('T')[0];
                const isSelected = selectedDate === dateString;

                return (
                  <label
                    key={index}
                    className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-accent last:border-b-0 ${
                      isSelected ? 'bg-primary/10' : 'hover:bg-accent/30'
                    }`}
                  >
                    <input
                      type="radio"
                      value={dateString}
                      {...register('pickupDate', { required: 'Debes seleccionar una fecha' })}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-4 h-4 text-primary"
                    />
                    <span className={isSelected ? 'text-primary' : ''}>
                      {formatDate(date)}
                    </span>
                  </label>
                );
              })}
            </div>
            {errors.pickupDate && (
              <p className="text-destructive text-sm mt-2">{errors.pickupDate.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl text-lg transform hover:scale-[1.02]"
            >
              <MessageCircle className="w-6 h-6" />
              Confirmar y Pedir por WhatsApp
            </button>

            <button
              type="button"
              onClick={() => {
                const message = 'Hola! Quisiera información sobre métodos de pago.';
                window.open(`https://wa.me/5491167905119?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white py-4 rounded-lg transition-colors flex items-center justify-center gap-3"
            >
              <CreditCard className="w-5 h-5" />
              Pagar por WhatsApp
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full border-2 border-accent py-3 rounded-lg hover:border-primary transition-colors"
            >
              Cancelar
            </button>
          </div>

          <p className="text-sm text-muted-foreground text-center mt-4">
            Al confirmar tu pedido serás redirigido a WhatsApp para coordinar los detalles finales.
          </p>
        </form>
      </div>
    </div>
  );
}
