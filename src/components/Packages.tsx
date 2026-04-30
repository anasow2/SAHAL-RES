import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const packages = [
  {
    name: 'Intimate Gathering',
    guests: '20-30 guests',
    price: '450 NOK',
    priceDesc: 'per person',
    features: [
      '2 Main Dishes (Rice/Pasta)',
      '1 Meat Dish (Suqaar/Hilib)',
      '1 Appetizer (Sabaayad)',
      '1 Dessert (Xalwo)',
      'Somali Tea & Drinks',
    ],
    popular: false,
  },
  {
    name: 'Celebration Feast',
    guests: '50-75 guests',
    price: '400 NOK',
    priceDesc: 'per person',
    features: [
      '3 Main Dishes',
      '2 Meat Dishes',
      '2 Appetizers',
      '2 Desserts (Xalwo & Basbousa)',
      'Salads & Dips',
      'Somali Tea, Coffee & Drinks',
    ],
    popular: true,
  },
  {
    name: 'Grand Event',
    guests: '100+ guests',
    price: '350 NOK',
    priceDesc: 'per person',
    features: [
      'Full Banquet Buffet',
      'Live Station (Canjeero/Sabaayad)',
      'Premium Meats',
      'Unlimited Desserts Assortment',
      'Welcome Drink Station',
      'Dedicated Service Staff',
    ],
    popular: false,
  },
];

export default function Packages() {
  return (
    <section id="packages" className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-burgundy mb-4">Catering Packages</h2>
          <p className="text-terracotta font-semibold tracking-wider uppercase text-sm">Tailored for your occasions</p>
          <div className="mt-4 w-24 h-1 bg-saffron mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                pkg.popular
                  ? 'bg-burgundy text-cream shadow-2xl scale-105 border-2 border-saffron md:z-10'
                  : 'bg-white text-burgundy shadow-lg border border-gray-100'
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-saffron text-burgundy text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className={`font-serif text-3xl font-bold mb-2 ${pkg.popular ? 'text-saffron' : 'text-burgundy'}`}>
                {pkg.name}
              </h3>
              <p className={`font-semibold mb-6 ${pkg.popular ? 'text-cream/80' : 'text-terracotta'}`}>
                {pkg.guests}
              </p>
              <div className="mb-8">
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className={`text-sm ${pkg.popular ? 'text-cream/60' : 'text-gray-500'} ml-2`}>
                  {pkg.priceDesc}
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check
                      className={`h-5 w-5 mr-3 shrink-0 ${pkg.popular ? 'text-saffron' : 'text-terracotta'}`}
                    />
                    <span className={pkg.popular ? 'text-cream/90' : 'text-gray-700'}>{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#order"
                className={`block w-full text-center py-4 rounded-full font-bold transition-colors ${
                  pkg.popular
                    ? 'bg-saffron text-burgundy hover:bg-cream'
                    : 'bg-burgundy text-cream hover:bg-terracotta'
                }`}
              >
                Select Package
              </a>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Need something specific?</p>
          <a href="#contact" className="text-terracotta font-bold hover:text-burgundy transition-colors uppercase tracking-wider text-sm border-b-2 border-saffron pb-1">
            Request a Custom Package
          </a>
        </div>
      </div>
    </section>
  );
}
