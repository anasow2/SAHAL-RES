export default function Footer() {
  return (
    <footer className="bg-burgundy text-cream border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-3xl font-bold mb-4 text-saffron">Sahal</h3>
            <p className="text-cream/70 max-w-sm mb-6">
              The Art of Somali Hospitality in Oslo. Bringing authentic flavors, warmth, and tradition to your most cherished occasions.
            </p>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4 text-sm text-terracotta">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#menu" className="text-cream/70 hover:text-saffron transition-colors">Our Menu</a></li>
              <li><a href="#packages" className="text-cream/70 hover:text-saffron transition-colors">Packages</a></li>
              <li><a href="#about" className="text-cream/70 hover:text-saffron transition-colors">Our Story</a></li>
              <li><a href="#order" className="text-cream/70 hover:text-saffron transition-colors">Book Now</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase tracking-wider mb-4 text-sm text-terracotta">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-cream/70 hover:text-saffron transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-cream/70 hover:text-saffron transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-cream/70 hover:text-saffron transition-colors">Halal Certification</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-cream/50 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Sahal Catering. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed in Oslo, Norway</p>
        </div>
      </div>
    </footer>
  );
}
