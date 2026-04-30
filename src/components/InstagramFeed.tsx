import { Instagram } from 'lucide-react';

const instagramPosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80',
    alt: 'Somali cooking preparation',
    likes: 124,
    comments: 12
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1549488344-c1044439cba9?auto=format&fit=crop&q=80',
    alt: 'Bariis Iskukaris presentation',
    likes: 245,
    comments: 28
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80',
    alt: 'Freshly baked sambusas',
    likes: 89,
    comments: 5
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80',
    alt: 'Traditional Somali tea settings',
    likes: 156,
    comments: 18
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Follow Our Culinary Journey</h2>
            <p className="text-gray-600">Catch a glimpse of behind-the-scenes and our latest events on Instagram.</p>
          </div>
          <a 
            href="#" 
            className="mt-6 md:mt-0 inline-flex items-center gap-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            <Instagram className="w-5 h-5" />
            <span>@SahalCatering</span>
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <a 
              key={post.id} 
              href="#" 
              className="group relative block aspect-square overflow-hidden bg-gray-100 rounded-xl"
            >
              <img 
                src={post.image} 
                alt={post.alt} 
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white">
                <div className="flex items-center gap-2 font-semibold">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                  <span>{post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
