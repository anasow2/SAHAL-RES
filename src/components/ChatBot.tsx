import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const CHAT_PROMPT = `Waxaad tahay caawiye (AI Support) u shaqeeya shirkadda Sahal Catering. 
Shirkadani waxay bixisaa adeegyo cunto weydiin/dalab ah sida aroosyada (Xeedho), cunto fudud, shirarka (VIP), iyo casho sharaf (Dinner). 
Fadlan ku hadal af Soomaali asluub leh, kana caawi macaamiisha su'aalahooda ku saabsan dalabaadka, liiska cuntada, iyo qaabka loola soo xiriiri karo.
Haddii wax dalab ah ay u baahan yihiin, usheeg inay buuxiyaan foomka dalabka (Order Form) ee website-ka ku yaal.
Haddii lagu weydiiyo qofka iska leh app-ka, ama shirkada, u sheeg inuu iska leeyahay 'Anas', waxaana lagala soo xiriiri karaa email-ka: anassalah818@gmail.com
Jawaabahaagu ha ahaadaan kuwo gaaban oo waxtar leh.`;

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Kusoo dhawaaw Sahal Catering! Sideen kuu caawin karaa maanta?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const contents = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: CHAT_PROMPT,
        }
      });

      const text = response.text || "Waan ka xumahay, cillad ayaa dhacday.";
      setMessages(prev => [...prev, { role: 'model', text: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Waan ka xumahay, cillad ayaa dhacday soo isku day mar kale." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-burgundy text-white rounded-full shadow-2xl hover:bg-terracotta transition-all duration-300 z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
        aria-label="Open support chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-burgundy text-white p-4 rounded-t-2xl flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-bold text-lg">AI Support</h3>
            <p className="text-cream/80 text-xs text-saffron">Sahal Catering</p>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-burgundy text-white rounded-tr-sm self-end' : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-sm self-start'}`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="max-w-[85%] p-3 rounded-2xl text-sm bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tl-sm self-start flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 rounded-b-2xl shrink-0">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Qor fariintaada..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-burgundy text-white rounded-full hover:bg-terracotta disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
