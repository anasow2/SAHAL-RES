import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-burgundy">
      {/* Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-burgundy via-burgundy to-terracotta opacity-90"></div>
      <div className="absolute inset-0 somali-pattern"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-cream">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-saffron uppercase tracking-[0.2em] font-semibold mb-4 text-sm md:text-base">
            The Art of Somali Hospitality
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 drop-shadow-lg">
            Authentic Somali Catering
            <br />
            <span className="text-saffron">for Special Occasions</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-cream/90 font-light mb-10">
            From intimate gatherings to grand celebrations, we bring the warmth, tradition, and exquisite flavors of Somalia to your table in Oslo.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="#order"
              className="px-8 py-4 bg-saffron text-burgundy font-bold rounded-full hover:bg-cream transition-colors duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto"
            >
              Order Catering
            </a>
            <a
              href="#menu"
              className="px-8 py-4 border-2 border-cream/50 text-cream font-bold rounded-full hover:bg-cream hover:text-burgundy transition-all duration-300 w-full sm:w-auto"
            >
              View Menu
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Wave/Curve - Optional */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[50px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,123.63,200.7,114.88,241.6,109.77,282.88,103.5,321.39,56.44Z"
            className="fill-cream"
          ></path>
        </svg>
      </div>
    </div>
  );
}
