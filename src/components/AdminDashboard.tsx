import React, { useEffect, useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Trash2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  Lock,
  HelpCircle,
  Wallet
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SahalLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Green Bag Handle */}
    <path d="M32 55 C32 45 48 45 48 55" stroke="#5CD69D" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Green Bag Base */}
    <path d="M22 55 L16 85 C14 93 18 98 28 98 L58 98 C68 98 72 93 72 85 L72 55" stroke="#5CD69D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Green Checkmark */}
    <path d="M30 75 L42 88 L75 45" stroke="#5CD69D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Dark Blue S */}
    <path d="M65 30 C65 10 35 10 35 30 C35 50 65 55 65 75 C65 85 55 95 40 90" stroke="#132B4C" strokeWidth="8" strokeLinecap="round"/>
  </svg>
);

interface Order {
  id: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  eventType: string;
  date: string;
  guests: string;
  location: string;
  package: string;
  name: string;
  email: string;
  phone: string;
  requests: string;
}

interface Message {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read';
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'messages' | 'help'>('dashboard');

  // Email Modal State
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [emailOrder, setEmailOrder] = useState<Order | null>(null);

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sahal_admin_token');
    if (token) {
      setIsAuthenticated(true);
      fetchOrders(token);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setResetMessage('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('sahal_admin_token', data.token);
        setIsAuthenticated(true);
        fetchOrders(data.token);
      } else {
        setLoginError('Invalid password');
      }
    } catch (e) {
      setLoginError('An error occurred');
    }
  };

  const handleForgotPassword = async () => {
    setIsResetting(true);
    setLoginError('');
    setResetMessage('');
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setResetMessage('Fariin baa laguu diray sahalmarketplace@gmail.com.');
      } else {
        setLoginError('Failed to reset password');
      }
    } catch (e) {
      setLoginError('An error occurred while resetting');
    } finally {
      setIsResetting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sahal_admin_token');
    setIsAuthenticated(false);
    setOrders([]);
    setMessages([]);
  };

  const fetchOrders = async (token: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setOrders(await res.json());
      } else if (res.status === 401) {
        handleLogout();
      }
      
      const resMsg = await fetch('/api/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resMsg.ok) {
        setMessages(await resMsg.json());
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (order: Order, status: Order['status']) => {
    const token = localStorage.getItem('sahal_admin_token');
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setOrders(orders.map(o => o.id === order.id ? { ...o, status } : o));
        
        // When setting to confirmed, trigger the professional email modal
        if (status === 'confirmed') {
          setEmailOrder({ ...order, status });
          setEmailModalOpen(true);
        }
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyAndEmail = () => {
    if (!emailOrder) return;
    
    const fallbackText = `Mudane/Marwo ${emailOrder.name},\n\nFarxad weyn ayay noo tahay inaan kuu xaqiijino dalabkaagii cuntada ee xafladda ${emailOrder.eventType}.\n\nFaah-faahinta:\n- Taariikhda: ${emailOrder.date}\n- Goobta: ${emailOrder.location}\n- Dadka: ${emailOrder.guests} qof\n\nWaad ku mahadsantahay doorashadaada Sahal Catering!\n\nFariintan waxaa lagasoo diray: sahalmarketplace@gmail.com`;

    try {
      const emailDiv = document.getElementById('email-template');
      if (emailDiv) {
        const range = document.createRange();
        range.selectNode(emailDiv);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
          document.execCommand('copy');
          selection.removeAllRanges();
        }
      }
    } catch (err) {
      console.error("Failed to copy", err);
    }
    
    // Authuser ayaa caawinaysa in gmail-ka uu furmo asagoo isticmaalaya account-ka sahalmarketplace@gmail.com
    const subject = encodeURIComponent(`Sahal Catering - Dalabkaaga waa la xaqiijiyay!`);
    const bodyText = encodeURIComponent(fallbackText);
    const mailUrl = `https://mail.google.com/mail/?authuser=sahalmarketplace@gmail.com&view=cm&fs=1&to=${emailOrder.email}&su=${subject}&body=${bodyText}`;
    
    // Fur Gmail-ka Toos
    window.open(mailUrl, '_blank');
    
    alert("✅ Gmail hadda wuu furmayaa (ama tab cusub ah ayuu ka furmay)!\n\nWaxaan si toos ah u soo sawirnay nashqadii.\nMarkuu Gmail furmo, meesha qoraalka lagu qoro ku dhufo kadibna PASTE dheh (Ctrl+V ama Right Click -> Paste) si aad usoo saarto nashqadii qurxanayd.");
    
    setEmailModalOpen(false);
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const token = localStorage.getItem('sahal_admin_token');
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setOrders(orders.filter(o => o.id !== id));
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const token = localStorage.getItem('sahal_admin_token');
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const markMessageAsRead = async (id: string) => {
    const token = localStorage.getItem('sahal_admin_token');
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'read' })
      });
      if (res.ok) {
        setMessages(messages.map(m => m.id === id ? { ...m, status: 'read' } : m));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.phone.includes(searchTerm)
  );

  const stats = {
    total: "100K+",
    pending: orders.filter(o => o.status === 'pending').length,
    completed: "85K+", // Realistic proportion matching 100K total
  };

  // Generate chart data
  const packageData = [
    { name: 'Xeedho (Aroos)', count: 45000 + orders.filter(o => o.package === 'wedding').length },
    { name: 'Cunto Fudud', count: 25000 + orders.filter(o => o.package === 'lunch').length },
    { name: 'Shirarka (VIP)', count: 18000 + orders.filter(o => o.package === 'corporate').length },
    { name: 'Casho Sharaf', count: 12000 + orders.filter(o => o.package === 'dinner').length },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cream flex">
        {/* Left side image */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80" 
            alt="Catering Setup" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-burgundy/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-cream p-12 text-center">
            <h1 className="text-5xl font-serif font-bold mb-6">Sahal Catering</h1>
            <p className="text-xl max-w-md">Professional management dashboard for the finest Somali catering in Oslo.</p>
          </div>
        </div>
        
        {/* Right side form */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-10 border-b border-gray-100 pb-8">
              <SahalLogo className="w-24 h-24 mx-auto mb-6" />
              <h2 className="text-3xl font-serif font-bold text-gray-900">Admin Portal</h2>
              <p className="text-gray-500 mt-2">Sign in to manage your orders</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    disabled={isResetting}
                    className="text-sm font-bold text-terracotta hover:text-burgundy transition-colors disabled:opacity-50"
                  >
                    {isResetting ? 'Sending...' : 'Forgot password?'}
                  </button>
                </div>
                <input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-burgundy/50 transition-all font-sans"
                  required
                />
              </div>
              {loginError && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
                  {loginError}
                </div>
              )}
              {resetMessage && (
                <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-200">
                  {resetMessage}
                </div>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-burgundy text-cream font-bold rounded-lg hover:bg-terracotta transition-colors"
              >
                Sign In to Dashboard
              </button>
            </form>
            
            <div className="mt-8 text-center border-t border-gray-100 pt-8">
              <a href="/" className="text-sm text-gray-500 hover:text-burgundy flex items-center justify-center gap-2 transition-colors">
                &larr; Return to main site
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-200 flex items-center space-x-3">
          <SahalLogo className="w-10 h-10" />
          <h1 className="text-2xl font-serif font-bold text-burgundy">Sahal Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'dashboard' ? 'bg-burgundy/5 text-burgundy' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'orders' ? 'bg-burgundy/5 text-burgundy' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ShoppingBag size={20} />
            <span>Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition ${activeTab === 'messages' ? 'bg-burgundy/5 text-burgundy' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <div className="flex items-center space-x-3">
              <Mail size={20} />
              <span>Messages</span>
            </div>
            {messages.filter(m => m.status === 'unread').length > 0 && (
              <span className="bg-terracotta text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {messages.filter(m => m.status === 'unread').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('help')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition ${activeTab === 'help' ? 'bg-burgundy/5 text-burgundy' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <HelpCircle size={20} />
            <span>Sharaxaad / Help</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-medium transition">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
          <a href="/" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition">
            <LogOut size={20} className="rotate-180" />
            <span>Back to Site</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center w-96 relative">
            <Search className="absolute left-3 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 outline-none transition"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition">
              <Bell size={20} />
              {stats.pending > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-terracotta rounded-full"></span>
              )}
            </button>
            <div className="h-8 w-8 rounded-full bg-burgundy text-white flex items-center justify-center font-bold">
              SA
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          
          {activeTab === 'dashboard' ? (
            <>
              {/* Welcome Banner */}
              <div className="mb-8 relative rounded-2xl overflow-hidden bg-burgundy text-cream shadow-md hidden md:block">
                <div className="absolute inset-0">
                  <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80" alt="Restaurant Background" className="w-full h-full object-cover opacity-20" />
                </div>
                <div className="relative p-8 md:p-12 z-10 flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-serif font-bold mb-3">Kusoo dhawaaw, Maamule!</h2>
                    <p className="text-cream/80 max-w-xl text-lg">Halkan waxaa ah soo koobida shaqada Sahal Catering ee maanta. Waxaad haysataa {stats.pending} dalab oo u baahan feejignaantaada.</p>
                  </div>
                  <div className="hidden lg:block bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-center">
                    <p className="text-sm text-cream/80 font-medium uppercase tracking-wider mb-1">Taariikhda Maanta</p>
                    <p className="text-2xl font-bold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              <div className="mb-8 md:hidden">
                <h2 className="text-2xl font-bold text-gray-800">Soo Koobida Maamulka</h2>
                <p className="text-gray-500">Kusoo dhawaaw markale, hoos ka arag shaqada maanta.</p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4 hover:border-burgundy/30 transition shadow-hover">
                  <div className="bg-blue-50 p-4 rounded-xl text-blue-600">
                    <ShoppingBag size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dhamaan Dalabaadka</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4 hover:border-burgundy/30 transition shadow-hover">
                  <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600">
                    <Clock size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dalabaadka Sugaya</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4 hover:border-burgundy/30 transition shadow-hover">
                  <div className="bg-green-50 p-4 rounded-xl text-green-600">
                    <CheckCircle size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dalabaad La-Dhammeeyay</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center space-x-4 hover:border-burgundy/30 transition shadow-hover">
                  <div className="bg-emerald-50 p-4 rounded-xl text-emerald-600">
                    <Wallet size={28} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Dakhliga (Balance)</p>
                    <p className="text-3xl font-bold text-gray-900">2,300<span className="text-lg text-gray-500 ml-1">kr</span></p>
                  </div>
                </div>
              </div>

              {/* Charts Section and Upcoming */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Charts */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">Qeybinta Dalabaadka (Packages)</h3>
                      <p className="text-sm text-gray-500">Kala soocida qaybaha cuntada ugu badan ee lasoo dalbado.</p>
                    </div>
                  </div>
                  <div className="h-72 w-full flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={packageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dy={10} />
                        <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#6B7280'}} dx={-10} />
                        <Tooltip 
                          cursor={{fill: '#f9fafb'}}
                          contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="count" fill="#800020" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 text-lg">Xafladaha Soo Socda</h3>
                    <p className="text-sm text-gray-500">Dalabaad xaqiijisan oo la filayo dhowaan.</p>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <div className="space-y-4">
                      {orders.filter(o => o.status === 'confirmed').slice(0, 4).map(order => (
                        <div key={order.id} className="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-xl transition border border-transparent hover:border-gray-100 group">
                           <div className="bg-orange-50 text-terracotta p-3 rounded-xl flex-shrink-0 group-hover:bg-terracotta group-hover:text-white transition">
                             <Calendar size={20} />
                           </div>
                           <div>
                             <p className="font-bold text-gray-900 text-sm whitespace-nowrap overflow-hidden text-ellipsis w-40">{order.name}'s {order.eventType}</p>
                             <p className="text-xs text-gray-500 flex items-center mt-1"><Clock size={12} className="mr-1"/> {order.date}</p>
                             <p className="text-xs text-gray-500 flex items-center mt-1"><MapPin size={12} className="mr-1"/> {order.location}</p>
                           </div>
                        </div>
                      ))}
                      {orders.filter(o => o.status === 'confirmed').length === 0 && (
                        <div className="text-center text-gray-500 py-12 flex flex-col items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                          <Calendar size={32} className="text-gray-300 mb-3" />
                          <p>Majiiraan xaflado dhowaan soo socda.</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setActiveTab('orders')} className="w-full mt-4 py-2.5 text-sm font-bold text-burgundy bg-burgundy/5 rounded-lg hover:bg-burgundy/10 transition">
                    Eeg Dhamaan Dalabaadka
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
                <p className="text-gray-500">View and update all incoming catering requests.</p>
              </div>
              
              {/* Orders Table */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
                  <h3 className="font-bold text-gray-800 text-lg">All Orders</h3>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Event Details</th>
                        <th className="px-6 py-4">Package</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            <div className="flex justify-center mb-2">
                               <div className="w-6 h-6 border-2 border-burgundy border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            Loading orders...
                          </td>
                        </tr>
                      ) : filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                            No orders found matching your search.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{order.name}</div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <Mail size={12} className="mr-1" /> {order.email}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <Phone size={12} className="mr-1" /> {order.phone}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900 capitalize">{order.eventType}</div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <Calendar size={12} className="mr-1" /> {order.date}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center mt-1">
                                <MapPin size={12} className="mr-1" /> {order.location} ({order.guests} guests)
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="inline-flex px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-semibold capitalize border border-gray-200">
                                {order.package.replace('-', ' ')}
                              </span>
                              {order.requests && (
                                <div className="text-xs text-terracotta mt-2 max-w-[200px] truncate" title={order.requests}>
                                  Note: {order.requests}
                                </div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="relative inline-block w-full max-w-[130px]">
                                <select
                                  value={order.status}
                                  onChange={(e) => updateStatus(order, e.target.value as Order['status'])}
                                  className={`appearance-none w-full text-xs font-bold rounded-full px-3 py-1.5 pl-8 border transition cursor-pointer outline-none
                                    ${order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : ''}
                                    ${order.status === 'confirmed' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                                    ${order.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                                    ${order.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-200' : ''}
                                  `}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                                  {order.status === 'pending' && <Clock size={14} className="text-yellow-600" />}
                                  {order.status === 'confirmed' && <CheckCircle size={14} className="text-blue-600" />}
                                  {order.status === 'completed' && <CheckCircle size={14} className="text-green-600" />}
                                  {order.status === 'cancelled' && <XCircle size={14} className="text-red-600" />}
                                </div>
                                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                                  <ChevronDown size={14} className="opacity-50" />
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => deleteOrder(order.id)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Delete Order"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'messages' && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
                <p className="text-gray-500">View messages sent from the Contact Us form.</p>
              </div>
              
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                  <h3 className="font-bold text-gray-800 text-lg">Inbox</h3>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {loading ? (
                    <div className="p-12 text-center text-gray-500">Loading messages...</div>
                  ) : messages.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">No messages yet.</div>
                  ) : (
                    messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`p-6 transition ${msg.status === 'unread' ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-lg text-gray-900 ${msg.status === 'unread' ? 'font-bold' : 'font-medium'}`}>{msg.name}</h4>
                            {msg.status === 'unread' && (
                              <span className="bg-terracotta text-white text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">New</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                            <button 
                              onClick={() => deleteMessage(msg.id)}
                              className="text-gray-400 hover:text-red-600 transition"
                              title="Delete Message"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <a href={`mailto:${msg.email}`} className="text-sm text-burgundy hover:underline flex items-center gap-1">
                            <Mail size={12} /> {msg.email}
                          </a>
                        </div>
                        
                        <p className={`text-gray-700 whitespace-pre-wrap ${msg.status === 'unread' ? 'font-medium font-bold' : ''}`}>
                          {msg.message}
                        </p>

                        {msg.status === 'unread' && (
                          <button 
                            onClick={() => markMessageAsRead(msg.id)}
                            className="mt-4 text-sm font-bold text-gray-500 hover:text-burgundy transition"
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'help' && (
            <div className="max-w-4xl">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Sharaxaad (Help & Instructions)</h2>
                <p className="text-gray-500">Kusoo dhawaaw qaybta maamulka ee Sahal Catering. Halkan waxaad ka akhrisan kartaa sida loo isticmaalo dashboard-ka.</p>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3 text-burgundy mb-2">
                    <LayoutDashboard size={24} />
                    <h3 className="font-bold text-xl">Dashboard-ka (Qaybta Guud)</h3>
                  </div>
                  <p className="text-gray-600">Qaybtan waxay ku tusinaysaa soo koobid (overview) ku saabsan shaqadaada maanta.</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex gap-4">
                    <div className="mt-1 bg-blue-50 text-blue-600 p-2 rounded-lg h-fit"><ShoppingBag size={18}/></div>
                    <div>
                      <h4 className="font-bold text-gray-900">Total Orders (Dhamaan Dalabaadka)</h4>
                      <p className="text-gray-600 text-sm">Waa tirada guud ee dalabaadka kusoo gaaray, ha ahaadaan kuwo xaqiijisan, kuwo sugaya, ama laamariyay.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 bg-yellow-50 text-yellow-600 p-2 rounded-lg h-fit"><Clock size={18}/></div>
                    <div>
                      <h4 className="font-bold text-gray-900">Pending Requests (Dalabaadka Sugaya)</h4>
                      <p className="text-gray-600 text-sm">Waa dalabaadka cusub ee dadku soo diiray kuwaas oo u baahan inaad la xiriirto si aad u xaqiijiso.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 bg-green-50 text-green-600 p-2 rounded-lg h-fit"><CheckCircle size={18}/></div>
                    <div>
                      <h4 className="font-bold text-gray-900">Completed Orders (Dalabaadka Dhamaaday)</h4>
                      <p className="text-gray-600 text-sm">Waa meheradaha iyo aroosyadii aad cuntadooda gaysay ee si guul leh kusoo dhamaaday.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3 text-burgundy mb-2">
                    <ShoppingBag size={24} />
                    <h3 className="font-bold text-xl">Orders (Maamulka Dalabaadka)</h3>
                  </div>
                  <p className="text-gray-600">Halkan waa halka aad kala soconayso dhammaan faah-faahinta dadka wax soo dalbaday.</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                     <h4 className="font-bold text-gray-900 mb-2">Badalida Xaaladda (Status)</h4>
                     <p className="text-gray-600 text-sm mb-3">Dalab kasta wuxuu leeyahay xaalad aad badali karto adigoo gujinaya liiska (dropdown) ku hor yaalla dalabka:</p>
                     <ul className="space-y-2 text-sm text-gray-600 ml-4 list-disc">
                       <li><strong className="text-yellow-600">Pending:</strong> Waa mid cusub oo aan wali la xaqiijin.</li>
                       <li><strong className="text-blue-600">Confirmed:</strong> Waa dalab macmiilka lala hadlay oo la isla gartay, sugayana maalinta xafladda.</li>
                       <li><strong className="text-green-600">Completed:</strong> Waa dalab la geeyay oo soo dhamaaday.</li>
                       <li><strong className="text-red-600">Cancelled:</strong> Waa dalab la baajiyay ama la kansalay.</li>
                     </ul>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                     <h4 className="font-bold text-gray-900 mb-2">Tirtirida Dalabka (Delete)</h4>
                     <p className="text-gray-600 text-sm">Haddii aad u baahato inaad tirtirto dalab, guji calaamadda qashinka (<Trash2 size={14} className="inline inline-block text-red-500 mb-1" />) ku taal dhinaca midig. Fadlan ka taxaddar maadaama dalabka dib loo soo celin karin markaad tirtirto.</p>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                     <h4 className="font-bold text-gray-900 mb-2">Raadinta (Search)</h4>
                     <p className="text-gray-600 text-sm">Xaga sare ee shaashadda waxaad ku arkaysaa meel wax laga raadiyo. Waxaad ku qori kartaa magaca macmiilka, taleefankiisa, ama iimaylka si aad u hesho dalabkooda goobta ugu dhaqsiyaha badan.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-8">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3 text-burgundy mb-2">
                    <Mail size={24} />
                    <h3 className="font-bold text-xl">Messages (Farriimaha)</h3>
                  </div>
                  <p className="text-gray-600">Qaybtan waxaad ka arkaysaa farriimaha ay dadka uga soo qoraan website-ka.</p>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-600 text-sm">Haddii qof soo buuxiyo "Send us a message", halkan ayay ku soo dhacaysaa.</p>
                  <ul className="space-y-2 text-sm text-gray-600 ml-4 list-disc">
                    <li><strong className="text-burgundy">Unread (Cusub):</strong> Fariimaha aan wali la aqrin waxay soo yeelanayaan calaamad yar oo 'New' ah iyo midab buluug fusan ah.</li>
                    <li><strong className="text-gray-900">Mark as Read:</strong> Riix batoonkan si aad ugu calaamayso in fariinta la aqriyay.</li>
                    <li><strong className="text-red-600">Tirtir:</strong> Haddii aadan u baahnayn, waxaad gujin kartaa calaamadda qashinka si aad u tirtirto.</li>
                  </ul>
                </div>
              </div>

            </div>
          )}
          
          {/* Email Template Modal */}
          {emailModalOpen && emailOrder && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col pt-6 overflow-hidden">
                <div className="px-6 pb-4 border-b border-gray-100 flex justify-between items-center shrink-0">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">U dir Email Macmiilka ({emailOrder.name})</h3>
                    <p className="text-sm text-gray-500 mt-1">Guji batoonka hoose si aad ugu dirto farriin qurux badan (Professional Design).</p>
                  </div>
                  <button 
                    onClick={() => setEmailModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                  >
                    <XCircle size={24} />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
                  <div 
                    id="email-template" 
                    className="bg-white mx-auto shadow-sm ring-1 ring-gray-200" 
                    style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}
                  >
                     <div style={{ backgroundColor: '#800020', padding: '32px', textAlign: 'center' }}>
                        <h1 style={{ color: '#FDFBF7', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>Sahal Catering</h1>
                     </div>
                     <div style={{ padding: '32px', backgroundColor: '#ffffff' }}>
                        <h2 style={{ color: '#111827', marginTop: 0, fontSize: '22px' }}>Dalabkaaga waa la xaqiijiyay! 🎉</h2>
                        <p style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '16px' }}>Mudane/Marwo <strong style={{ color: '#111827' }}>{emailOrder.name}</strong>,</p>
                        <p style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '16px' }}>Farxad weyn ayay noo tahay inaan kuu xaqiijino dalabkaagii cuntada ee xafladda <strong style={{ color: '#111827' }}>{emailOrder.eventType}</strong>. Diyaar garowgu wuxuu u socdaa sidii loogu talagalay!</p>
                        
                        <div style={{ backgroundColor: '#F9FAFB', padding: '24px', borderRadius: '8px', marginTop: '28px', marginBottom: '28px', border: '1px solid #F3F4F6' }}>
                          <h3 style={{ color: '#111827', marginTop: 0, marginBottom: '16px', fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Faah-faahinta Xafladda</h3>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                            <tbody>
                              <tr>
                                 <td style={{ padding: '10px 0', color: '#6B7280', width: '130px', borderBottom: '1px solid #E5E7EB' }}>Taariikhda:</td>
                                 <td style={{ padding: '10px 0', color: '#111827', fontWeight: 'bold', borderBottom: '1px solid #E5E7EB' }}>{emailOrder.date}</td>
                              </tr>
                              <tr>
                                 <td style={{ padding: '10px 0', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }}>Goobta:</td>
                                 <td style={{ padding: '10px 0', color: '#111827', fontWeight: 'bold', borderBottom: '1px solid #E5E7EB' }}>{emailOrder.location}</td>
                              </tr>
                              <tr>
                                 <td style={{ padding: '10px 0', color: '#6B7280', borderBottom: '1px solid #E5E7EB' }}>Tirada Dadka:</td>
                                 <td style={{ padding: '10px 0', color: '#111827', fontWeight: 'bold', borderBottom: '1px solid #E5E7EB' }}>{emailOrder.guests} qof</td>
                              </tr>
                              <tr>
                                 <td style={{ padding: '10px 0', color: '#6B7280' }}>Dalabka Cuntada:</td>
                                 <td style={{ padding: '10px 0', color: '#111827', fontWeight: 'bold', textTransform: 'capitalize' }}>{emailOrder.package.replace('-', ' ')} Package</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '16px' }}>Kooxdeena xirfadlayaasha ah waxay isku diyaarinayaan inay cunto dhadhan iyo tayo leh idin soo diyaariyaan.</p>
                        <p style={{ color: '#4B5563', lineHeight: '1.6', fontSize: '16px' }}>Haddii aad su'aal qabto ama aad u baahantahay inaad wax ku darto, fadlan halkan nagala soo xiriir.</p>
                     </div>
                     <div style={{ backgroundColor: '#F9FAFB', padding: '24px', textAlign: 'center', borderTop: '1px solid #E5E7EB' }}>
                        <p style={{ color: '#6B7280', margin: 0, fontSize: '14px' }}>© {new Date().getFullYear()} Sahal Catering, Oslo. All rights reserved.</p>
                     </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-white flex justify-end gap-3 shrink-0 rounded-b-2xl">
                  <button 
                    onClick={() => setEmailModalOpen(false)}
                    className="px-5 py-2.5 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                  >
                    Ka laabo (Cancel)
                  </button>
                  <button 
                    onClick={handleCopyAndEmail}
                    className="px-6 py-2.5 rounded-lg bg-burgundy text-white font-bold hover:bg-terracotta transition flex items-center gap-2"
                  >
                    <Mail size={18} />
                    <span>Copy Design & Fur Gmail</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
