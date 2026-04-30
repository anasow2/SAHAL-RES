import { Play } from 'lucide-react';
import { useState, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Amina Hussein",
    event: "Wedding Reception",
    quote: "\"Sahal Catering made my wedding day absolutely perfect. The food was incredible and the service was flawless.\"",
    poster: "https://cdn.coverr.co/videos/coverr-deep-frying-schnitzels-67/thumbnail?width=1920",
    video: "https://cdn.coverr.co/videos/coverr-deep-frying-schnitzels-67/1080p.mp4"
  },
  {
    id: 2,
    name: "Omar & Fatima",
    event: "Anniversary Party",
    quote: "\"The authentic flavors brought us right back to Xamar. Everyone at our party kept asking who the caterer was!\"",
    poster: "https://cdn.coverr.co/videos/coverr-cooking-pot-over-the-fire-3907/thumbnail?width=1920",
    video: "https://cdn.coverr.co/videos/coverr-cooking-pot-over-the-fire-3907/1080p.mp4"
  },
  {
    id: 3,
    name: "Hassan Ali",
    event: "Corporate Retreat",
    quote: "\"Professional, punctual, and delicious. They handled our 200-person corporate event with ease.\"",
    poster: "https://cdn.coverr.co/videos/user-ai-generation-PGfH4ipygeer/thumbnail?width=1920",
    video: "https://cdn.coverr.co/videos/user-ai-generation-PGfH4ipygeer/1080p.mp4"
  }
];

export default function VideoTestimonials() {
  const [playing, setPlaying] = useState<number | null>(null);
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const handlePlay = (id: number) => {
    // Pause currently playing video if any
    if (playing !== null && playing !== id && videoRefs.current[playing]) {
      videoRefs.current[playing]?.pause();
    }
    
    setPlaying(id);
    videoRefs.current[id]?.play();
  };

  return (
    <section className="py-20 bg-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from those who have experienced the magic of Sahal Catering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] group bg-black">
                <video
                  ref={(el) => (videoRefs.current[testimonial.id] = el)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${playing === testimonial.id ? 'opacity-100' : 'opacity-60'}`}
                  poster={testimonial.poster}
                  src={testimonial.video}
                  controls={playing === testimonial.id}
                  onPause={() => setPlaying(null)}
                  onEnded={() => setPlaying(null)}
                />
                
                {playing !== testimonial.id && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={() => handlePlay(testimonial.id)}
                  >
                    <div className="w-16 h-16 bg-emerald-600/90 rounded-full flex items-center justify-center text-white transform group-hover:scale-110 transition-transform shadow-lg">
                      <Play className="w-6 h-6 ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 italic mb-4">
                  {testimonial.quote}
                </p>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-emerald-600 font-medium">{testimonial.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
