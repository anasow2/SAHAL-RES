import { motion } from 'motion/react';

const dishes = [
  {
    somaliName: 'Bariis iyo Hilib',
    englishName: 'Spiced Rice & Tender Meat',
    description: 'Fragrant basmati rice cooked in rich stock, served with slow-roasted goat or lamb, raisins, and caramelized onions.',
    image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?auto=format&fit=crop&q=80',
  },
  {
    somaliName: 'Suqaar',
    englishName: 'Sautéed Meat Cubes',
    description: 'Tender cubes of beef or chicken pan-fried with bell peppers, onions, and our signature Sahal spice blend.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80',
  },
  {
    somaliName: 'Maraq',
    englishName: 'Hearty Bone Broth',
    description: 'A comforting, rich bone broth simmered for hours with root vegetables, perfect as a starter.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80',
  },
  {
    somaliName: 'Canjeero',
    englishName: 'Somali Sourdough Pancakes',
    description: 'Spongy, slightly sour flatbrean perfect for soaking up stews and sauces, often enjoyed for breakfast or dinner.',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80',
  },
  {
    somaliName: 'Sabaayad',
    englishName: 'Flaky Flatbread',
    description: 'Crispy on the outside, soft and layered on the inside. Pan-fried to golden perfection.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80',
  },
  {
    somaliName: 'Xalwo (Halwa)',
    englishName: 'Somali Sweet Jelly',
    description: 'The crown jewel of Somali sweets. A rich, cardamom and nutmeg spiced confection made for celebrations.',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80',
  },
  {
    somaliName: 'Kac-Kac',
    englishName: 'Sweet Fried Dough',
    description: 'Crispy, diamond-shaped pastries lightly sweetened and spiced with cardamom. A perfect pairing with Somali tea.',
    image: 'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80',
  },
  {
    somaliName: 'Basbousa',
    englishName: 'Semolina Cake',
    description: 'A moist coconut and semolina cake soaked in aromatic syrup, melting instantly in your mouth.',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&q=80',
  },
];

export default function FeaturedDishes() {
  return (
    <section id="menu" className="py-24 bg-cream bg-opacity-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-burgundy mb-4">Our Signature Dishes</h2>
          <p className="text-terracotta font-semibold tracking-wider uppercase text-sm">Flavors of the Horn of Africa</p>
          <div className="mt-4 w-24 h-1 bg-saffron mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {dishes.map((dish, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-ivory"
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.englishName}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy/90 via-burgundy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 relative">
                <h3 className="font-serif text-2xl font-bold text-burgundy mb-1">{dish.somaliName}</h3>
                <p className="text-saffron text-sm font-semibold mb-3">{dish.englishName}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{dish.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
