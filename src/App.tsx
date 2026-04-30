import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedDishes from './components/FeaturedDishes';
import Packages from './components/Packages';
import OrderForm from './components/OrderForm';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import { ChatBot } from './components/ChatBot';

function LandingPage() {
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
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
