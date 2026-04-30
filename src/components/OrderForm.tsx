import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    guests: '',
    location: '',
    package: '',
    dietary: '',
    name: '',
    email: '',
    phone: '',
    requests: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="order" className="py-24 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 rounded-3xl shadow-xl border border-ivory"
          >
            <div className="w-20 h-20 bg-saffron rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-serif text-4xl font-bold text-burgundy mb-4">Request Sent Successfully!</h3>
            <p className="text-gray-600 mb-8">Thank you, {formData.name}. We have received your catering request and will be in touch within 24 hours to confirm details.</p>
            <button
              onClick={() => { setIsSuccess(false); setStep(1); }}
              className="bg-burgundy text-cream px-8 py-3 rounded-full font-semibold hover:bg-terracotta transition-colors"
            >
              Submit Another Request
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="py-24 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 somali-pattern"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-burgundy mb-4">Book Your Event</h2>
          <p className="text-terracotta font-semibold tracking-wider uppercase text-sm">Let us handle the feast</p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-ivory/50">
          {/* Progress Bar */}
          <div className="flex border-b border-gray-100 relative">
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-saffron to-terracotta transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }}></div>
            <div className={`flex-1 py-4 text-center font-bold ${step === 1 ? 'text-burgundy' : 'text-gray-400'}`}>
              Step 1: Event Details
            </div>
            <div className={`flex-1 py-4 text-center font-bold ${step === 2 ? 'text-burgundy' : 'text-gray-400'}`}>
              Step 2: Package & Info
            </div>
          </div>

          <div className="p-8 md:p-12">
            <form onSubmit={step === 2 ? handleSubmit : (e) => e.preventDefault()}>
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-burgundy mb-2">Event Type</label>
                        <select name="eventType" value={formData.eventType} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50">
                          <option value="">Select Event Type</option>
                          <option value="wedding">Wedding / Aroos</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="family">Family Gathering</option>
                          <option value="graduation">Graduation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-burgundy mb-2">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-burgundy mb-2">Guest Count</label>
                        <input type="number" name="guests" min="10" max="1000" placeholder="e.g. 50" value={formData.guests} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-burgundy mb-2">Location (Oslo Region)</label>
                        <input type="text" name="location" placeholder="Venue or Suburb" value={formData.location} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50" />
                      </div>
                    </div>
                    <div className="pt-6 flex justify-end">
                      <button type="button" onClick={handleNext} className="bg-burgundy text-cream px-8 py-3 rounded-full font-semibold hover:bg-terracotta transition-colors flex items-center">
                        Next Step
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-burgundy mb-2">Select Package</label>
                        <select name="package" value={formData.package} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50">
                          <option value="">Select a Package</option>
                          <option value="intimate">Intimate Gathering (20-30 guests)</option>
                          <option value="celebration">Celebration Feast (50-75 guests)</option>
                          <option value="grand">Grand Event (100+ guests)</option>
                          <option value="custom">Custom Package</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-burgundy mb-2">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-burgundy mb-2">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-burgundy mb-2">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-burgundy mb-2">Dietary Requirements / Special Requests</label>
                        <textarea name="requests" rows={3} value={formData.requests} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-terracotta focus:border-transparent outline-none bg-gray-50"></textarea>
                      </div>
                    </div>
                    <div className="pt-6 flex justify-between">
                      <button type="button" onClick={handlePrev} className="text-gray-500 font-semibold hover:text-burgundy px-4 py-2 transition-colors">
                        Back
                      </button>
                      <button type="submit" disabled={isSubmitting} className={`bg-burgundy text-cream px-8 py-3 rounded-full font-semibold hover:bg-terracotta transition-colors flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
