export const MOCK_PRODUCTS = {
  boxes: [
    {
      id: 'box-1',
      name: 'Caja Romance',
      description: 'Selección premium de macarons, bombones y mini tortas para compartir.',
      price: 12500,
      discountPrice: 10000,
      image: 'https://images.unsplash.com/photo-1551024605-7673962f1666?auto=format&fit=crop&w=400&q=80',
      category: 'box'
    },
    {
      id: 'box-2',
      name: 'Caja Fiesta',
      description: 'Variedad de alfajores, brownies y cookies ideales para reuniones.',
      price: 15000,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1488471926399-856a9d563318?auto=format&fit=crop&w=400&q=80',
      category: 'box'
    },
    {
      id: 'box-3',
      name: 'Caja Degustación',
      description: 'Un recorrido por nuestros sabores más vendidos en formato mini.',
      price: 8000,
      discountPrice: 7000,
      image: 'https://images.unsplash.com/photo-1576611152473-7f1e97f77517?auto=format&fit=crop&w=400&q=80',
      category: 'box'
    },
  ],
  others: [
    {
      id: 'prod-1',
      name: 'Alfajor de Maicena',
      description: 'El clásico casero con mucho dulce de leche y coco.',
      price: 1200,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1558961363-865c33f2fed6?auto=format&fit=crop&w=400&q=80',
      category: 'other'
    },
    {
      id: 'prod-2',
      name: 'Cheesecake de Frutos Rojos',
      description: 'Porción cremosa con coulis de frutos rojos naturales.',
      price: 3500,
      discountPrice: 3000,
      image: 'https://images.unsplash.com/photo-15331342起来- la-imagen-no-es-real-usa-unsplash', // Fixing this
      category: 'other'
    },
    {
      id: 'prod-3',
      name: 'Brownie Chocolate Belga',
      description: 'Intenso chocolate belga con nueces crocantes.',
      price: 2200,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1606313567308-6a18e5777a6a?auto=format&fit=crop&w=400&q=80',
      category: 'other'
    },
    {
      id: 'prod-4',
      name: 'Macaron Pistacho',
      description: 'Sutil equilibrio entre dulzor y el sabor intenso del pistacho.',
      price: 800,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1558326770-7a93e8652d75?auto=format&fit=crop&w=400&q=80',
      category: 'other'
    },
  ],
  catering: [
    {
      id: 'cat-1',
      name: 'Mini Evento',
      people: '10-20 personas',
      description: 'Incluye variedad de mini cakes, macarons y bocaditos dulces.',
      pricePerPerson: 4500,
      image: 'https://images.unsplash.com/photo-1530103043951-ed57a9d6950f?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'cat-2',
      name: 'Celebración Estándar',
      people: '20-50 personas',
      description: 'Mesa dulce completa con torta principal y variedad de postres.',
      pricePerPerson: 3800,
      image: 'https://images.unsplash.com/photo-1464349095413-2a1be2175f3c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'cat-3',
      name: 'Evento Premium',
      people: '50+ personas',
      description: 'Servicio completo con estación de café y repostería de autor.',
      pricePerPerson: 3200,
      image: 'https://images.unsplash.com/photo-1519225421980-715670efB12e?auto=format&fit=crop&w=400&q=80', // fixing url
    }
  ]
};
