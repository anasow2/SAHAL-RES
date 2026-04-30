import { MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-burgundy rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="absolute inset-0 somali-pattern opacity-10"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-16 text-cream">
              <h2 className="font-serif text-4xl font-bold mb-4">Let's Talk</h2>
              <p className="text-cream/80 mb-12">
                Have questions about our catering? Want to discuss a custom menu? Reach out to us, and we'll be happy to assist you in planning the perfect feast.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-saffron mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Service Area</h4>
                    <p className="text-cream/70">Oslo and surrounding regions (Norway)</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-saffron mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Phone / WhatsApp</h4>
                    <p className="text-cream/70">+47 96967293</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 text-saffron mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg">Email</h4>
                    <p className="text-cream/70">anassalah818@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-12 border-t border-cream/20">
                <h4 className="font-bold mb-4">Follow our culinary journey</h4>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-saffron transition-colors text-cream hover:text-burgundy">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-saffron transition-colors text-cream hover:text-burgundy">
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-ivory p-12 md:p-16 flex flex-col justify-center border-l border-cream/10 z-10">
              <h3 className="font-serif text-2xl font-bold text-burgundy mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-white font-sans text-gray-800" />
                </div>
                <div>
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-white font-sans text-gray-800" />
                </div>
                <div>
                  <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-white font-sans text-gray-800"></textarea>
                </div>
                <button type="submit" className="w-full bg-terracotta text-cream py-4 rounded-lg font-bold hover:bg-burgundy transition-colors shadow-md">
                  Send Message
                </button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm mb-3">Or chat with us directly</p>
                <a href="https://wa.me/4796967293" target="_blank" rel="noopener noreferrer" className="inline-flex flex-row items-center justify-center w-full bg-[#25D366] text-white py-4 rounded-lg font-bold hover:bg-[#1DA851] transition-colors shadow-md">
                  <Phone size={20} className="mr-2" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
