import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[3/2] lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80"
                alt="Somali cultural cooking"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-burgundy/10"></div>
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-saffron rounded-full -z-10 blur-[100px] opacity-60"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-burgundy mb-6">Our Heritage</h2>
            <p className="text-xl font-sans text-gray-700 leading-relaxed mb-6">
              "Sahal" is more than just a name; carrying the meaning of 'easy' or 'simple' in Somali, it represents our promise to make your special occasions effortless. We seamlessly blend this convenience with the deep-rooted tradition of hosting guests with exceptional generosity, honor, and warmth.
            </p>
            <p className="text-gray-600 leading-relaxed mb-10">
              Founded in Oslo, we bring authentic family recipes passed down through generations to your special occasions. We believe that sharing a meal is sharing a story, and our goal is to make every event a beautiful memory steeped in our cultural heritage.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-serif text-3xl font-bold text-terracotta mb-2">100%</h4>
                <p className="font-bold text-burgundy uppercase tracking-wider text-sm">Halal Certified</p>
                <p className="text-sm text-gray-500 mt-1">Strict adherence to dietary laws.</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl font-bold text-terracotta mb-2">15+</h4>
                <p className="font-bold text-burgundy uppercase tracking-wider text-sm">Signature Dishes</p>
                <p className="text-sm text-gray-500 mt-1">A diverse menu of traditions.</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl font-bold text-terracotta mb-2">100s</h4>
                <p className="font-bold text-burgundy uppercase tracking-wider text-sm">Of Happy Guests</p>
                <p className="text-sm text-gray-500 mt-1">Serving the Oslo region proudly.</p>
              </div>
              <div>
                <h4 className="font-serif text-3xl font-bold text-terracotta mb-2">Authentic</h4>
                <p className="font-bold text-burgundy uppercase tracking-wider text-sm">Family Recipes</p>
                <p className="text-sm text-gray-500 mt-1">Preserving true Somali flavors.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
