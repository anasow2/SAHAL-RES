import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import Packages from './components/Packages';
import OrderForm from './components/OrderForm';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-sans text-gray-900 bg-cream min-h-screen">
      <Navigation />
      <Hero />
      <FeaturedDishes />
      <Packages />
      <OrderForm />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
