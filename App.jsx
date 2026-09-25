import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Youtube,
  Lock,
  User,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Edit,
  Trash2,
  Plus,
  X,
  CheckCircle2,
  BookOpen,
  Award,
  Calendar,
  Clock,
  Calculator,
  Printer,
  FileText,
  Send,
  HelpCircle,
  Menu,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Users,
  Search,
  Check,
  ExternalLink,
  ChevronDown,
  LogOut,
  Layers,
  ArrowRight
} from 'lucide-react';

// Initial News Data
const INITIAL_NEWS = [
  {
    id: 1,
    title: "Penerimaan Santri Baru (PPDB) TA 2026/2027 Resmi Dibuka",
    category: "Pengumuman",
    date: "20 September 2026",
    author: "Panitia PPDB",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
    content: "Pondok Pesantren & SIT Al Firdaus Kemiling Permai dengan bangga membuka pendaftaran murid baru untuk jenjang TK, SD, SMP, SMA, dan Program Tahfidz Boarding School. Dapatkan diskon infaq pembangunan bagi pendaftar gelombang pertama!"
  },
  {
    id: 2,
    title: "Prestasi Gemilang! Santri Al Firdaus Raih Juara 1 Musabaqah Hifzil Qur'an 30 Juz",
    category: "Prestasi",
    date: "15 September 2026",
    author: "Humas Al Firdaus",
    image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=800",
    content: "Ananda Ahmad Fauzi, santri kelas XII SMA SIT Al Firdaus berhasil menorehkan prestasi membanggakan pada ajang MHQ Tingkat Provinsi. Keberhasilan ini menunjukkan komitmen program unggulan Tahfidz Al Firdaus."
  },
  {
    id: 3,
    title: "Pelatihan Digital Entrepreneurship bagi Santri Modern",
    category: "Kegiatan",
    date: "10 September 2026",
    author: "Tim Kemandirian",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    content: "Membekali santri dengan keahlian abad 21, Pondok Pesantren Al Firdaus menggelar workshop Pemrograman Web, AI, dan E-Commerce untuk melatih jiwa wirausaha berakhlak mulia."
  }
];

// Initial Hero Slides
const INITIAL_SLIDES = [
  {
    id: 1,
    badge: "Pendidikan Islami Terpadu & Unggul",
    title: "Mencetak Generasi Rabbani Berakhlak Mulia & Berprestasi",
    subtitle: "Pondok Pesantren & SIT Al Firdaus memadukan Kurikulum Merdeka Nasional dengan Pendidikan Tahfidz dan Kitab Kuning Berbasis Pesantren.",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=1600",
    ctaPrimary: "Daftar PPDB Online",
    ctaSecondary: "Jelajahi Program"
  },
  {
    id: 2,
    badge: "Program Tahfidz Al-Qur'an 30 Juz",
    title: "Lingkungan Asri & Kondusif Untuk Menghafal Al-Qur'an",
    subtitle: "Bimbingan sanad teruji, metode mutqin, serta fasilitas boarding school modern di kawasan sejuk Kemiling Permai, Bandar Lampung.",
    image: "https://images.unsplash.com/photo-1584282679149-711fcef72e54?auto=format&fit=crop&q=80&w=1600",
    ctaPrimary: "Lihat Jadwal Santri",
    ctaSecondary: "Simulasi Biaya"
  },
  {
    id: 3,
    badge: "SIT & Boarding School Modern",
    title: "Fasilitas Lengkap untuk Mengembangkan Potensi Santri",
    subtitle: "Laboratorium Komputer & Sains, Perpustakaan Digital, Lapangan Olahraga Serbaguna, dan Asrama Nyaman Ber-AC.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600",
    ctaPrimary: "Tur Galeri Fasilitas",
    ctaSecondary: "Hubungi Kami"
  }
];

// Schedule Routine Data
const DAILY_SCHEDULE = [
  { time: "03.30 - 04.30", title: "Qiyamul Lail & Sahur (Puasa Sunnah)", desc: "Sholat Tahajud bersama & persiapan sholat Subuh berjamaah", category: "Ibadah" },
  { time: "04.30 - 06.00", title: "Sholat Subuh & Setoran Tahfidz Morning", desc: "Zikir pagi, Muroja'ah, dan setoran hafalan baru Al-Qur'an", category: "Tahfidz" },
  { time: "06.00 - 07.15", title: "Mandi, Sarapan & Apel Pagi", desc: "Makan pagi bersama, persiapan sekolah formal, dan doa bersama", category: "Rutinitas" },
  { time: "07.15 - 12.00", title: "KBM Sekolah Formal (SIT Al Firdaus)", desc: "Pembelajaran Kurikulum Merdeka Terpadu & Sains Modern", category: "Formal" },
  { time: "12.00 - 13.00", title: "Sholat Zhuhur & Makan Siang", desc: "Sholat berjamaah di Masjid Al Firdaus dan makan siang teratur", category: "Ibadah" },
  { time: "13.00 - 15.00", title: "Pendalaman Kitab Kuning & Bahasa", desc: "Kajian Fiqih, Nahwu Shorof, Muhadatsah Bahasa Arab/Inggris", category: "Diniyah" },
  { time: "15.00 - 16.30", title: "Sholat Ashar & Ekstrakurikuler", desc: "Panahan, Berkuda, Pencak Silat, Coding, dan Olahraga", category: "Ekstra" },
  { time: "16.30 - 18.00", title: "Mandi, Istirahat & Persiapan Maghrib", desc: "Membaca Al-Matsurat sore dan persiapan sholat", category: "Rutinitas" },
  { time: "18.00 - 20.00", title: "Sholat Maghrib, Isya & Halaqah Tahfidz", desc: "Peningkatan mutu hafalan (Tashih & Murojaah 1 Juz/Hari)", category: "Tahfidz" },
  { time: "20.00 - 21.30", title: "Makan Malam & Belajar Mandiri", desc: "Pengerjaan tugas sekolah/pondok dan bimbingan wali asrama", category: "Formal" },
  { time: "21.30 - 03.30", title: "Istirahat Malam (Tidur)", desc: "Penerapan adab tidur sunnah Rasulullah SAW", category: "Rutinitas" }
];

export default function App() {
  // Theme & Layout States
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('beranda');

  // Admin CMS States
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [toast, setToast] = useState(null);

  // Dynamic Content States
  const [news, setNews] = useState(INITIAL_NEWS);
  const [slides, setSlides] = useState(INITIAL_SLIDES);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editingNews, setEditingNews] = useState(null);
  const [isAddingNews, setIsAddingNews] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);

  // Hero Slider States
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Cost Calculator States
  const [calcLevel, setCalcLevel] = useState('smp');
  const [calcType, setCalcType] = useState('boarding');
  const [hasSibling, setHasSibling] = useState(false);
  const [isTahfidzScholarship, setIsTahfidzScholarship] = useState(false);

  // PPDB Multi-Step Form State
  const [ppdbStep, setPpdbStep] = useState(1);
  const [ppdbData, setPpdbData] = useState({
    fullName: '',
    nik: '',
    birthPlace: '',
    birthDate: '',
    gender: 'Laki-laki',
    selectedLevel: 'SMP SIT (Boarding)',
    parentName: '',
    parentPhone: '',
    parentJob: '',
    address: 'Jl. Cempaka 168, Kemiling Permai',
    regId: ''
  });
  const [isPpdbSubmitted, setIsPpdbSubmitted] = useState(false);

  // Gallery Filter State
  const [galleryFilter, setGalleryFilter] = useState('semua');

  // Helper function for Toast Notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Hero Slider Auto-play effect
  useEffect(() => {
    let interval;
    if (isAutoplay) {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }, 5500);
    }
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  // Handle Admin Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (adminUsername === 'admin' && adminPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setLoginModalOpen(false);
      setAdminUsername('');
      setAdminPassword('');
      setLoginError('');
      showToast("Berhasil login sebagai Admin Super! Hak akses pengeditan terbuka.", "success");
    } else {
      setLoginError("Username atau Password salah! (Default: admin / admin123)");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    showToast("Anda telah keluar dari Portal Admin.", "info");
  };

  // Calculate Cost Function
  const calculateFees = () => {
    let baseSpp = 850000;
    let baseInfaq = 12000000;
    let pendaftaran = 350000;

    if (calcLevel === 'tk') { baseSpp = 450000; baseInfaq = 6000000; }
    else if (calcLevel === 'sd') { baseSpp = 650000; baseInfaq = 8500000; }
    else if (calcLevel === 'smp') { baseSpp = 950000; baseInfaq = 13500000; }
    else if (calcLevel === 'sma') { baseSpp = 1100000; baseInfaq = 15000000; }

    if (calcType === 'boarding') {
      baseSpp += 900000; // konsumsi + asrama
    }

    let discountPercent = 0;
    if (hasSibling) discountPercent += 10;
    if (isTahfidzScholarship) discountPercent += 25;

    const finalInfaq = baseInfaq * (1 - discountPercent / 100);
    return {
      pendaftaran,
      baseSpp,
      baseInfaq,
      discountPercent,
      finalInfaq,
      totalAwal: pendaftaran + finalInfaq + baseSpp
    };
  };

  const calculated = calculateFees();

  return (
    <div className={`${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'} min-h-screen font-sans transition-colors duration-300`}>
      
      {/* Toast Notification Floating */}
      {toast && (
        <div className="fixed top-20 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl bg-emerald-700 text-white animate-bounce">
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="font-medium text-sm">{toast.message}</span>
        </div>
      )}

      {/* Admin Top Banner Indicator */}
      {isAdminLoggedIn && (
        <div className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold flex justify-between items-center z-50 sticky top-0 shadow-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 animate-pulse" />
            <span>MODE ADMIN AKTIF: Anda dapat mengedit slides, berita, dan teks langsung.</span>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded flex items-center gap-1 transition"
          >
            <LogOut className="w-3 h-3" /> Keluar Admin
          </button>
        </div>
      )}

      {/* 1. TOP BAR HEADER */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-2.5 px-4 sm:px-8 border-b border-emerald-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          
          {/* Left Info: Maps & Phone */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6 text-emerald-200">
            <div className="flex items-center gap-1.5 hover:text-white transition cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Jl Cempaka 168, Kemiling Permai, Bandar Lampung</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>081234567890</span>
            </div>
          </div>

          {/* Right Info: Social Media Icons & Admin Login Icon */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-amber-400 transition" title="Facebook Al Firdaus">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition" title="Instagram @alfirdaus_kemiling">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-amber-400 transition" title="Youtube Channel">
                <Youtube className="w-4 h-4" />
              </a>
              {/* Custom TikTok Icon SVG */}
              <a href="#" className="hover:text-amber-400 transition" title="TikTok Official">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525 0h3.08c.12 1.056.634 1.956 1.547 2.68 1.08.857 2.294 1.1 3.848 1.15v3.13a7.31 7.31 0 0 1-3.32-.94 6.6 6.6 0 0 1-1.02-.68v9.17c0 1.833-.52 3.39-1.56 4.67-1.28 1.58-3.13 2.45-5.55 2.45-1.92 0-3.54-.56-4.86-1.68C3.38 18.77 2.6 17.06 2.6 14.91c0-2.22.84-4.02 2.52-5.4 1.68-1.38 3.65-1.98 5.91-1.8v3.29c-.84-.1-1.65.03-2.43.39-.78.36-1.35.93-1.71 1.71-.36.78-.45 1.62-.27 2.52.18.9.66 1.62 1.44 2.16.78.54 1.68.75 2.7.63.99-.12 1.83-.57 2.52-1.35.69-.78 1.05-1.74 1.08-2.88V0z"/>
                </svg>
              </a>
            </div>

            <div className="h-3 w-px bg-emerald-700"></div>

            {/* Admin Login Button Icon */}
            {isAdminLoggedIn ? (
              <button 
                onClick={() => setActiveTab('admin')} 
                className="flex items-center gap-1.5 text-amber-300 font-semibold hover:underline"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Panel Admin</span>
              </button>
            ) : (
              <button 
                onClick={() => setLoginModalOpen(true)}
                className="flex items-center gap-1.5 text-emerald-200 hover:text-amber-300 transition bg-emerald-800/80 px-2.5 py-1 rounded-full border border-emerald-700"
              >
                <Lock className="w-3 h-3 text-amber-400" />
                <span>Login Admin</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors ${
        darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('beranda')}>
            <div className="w-11 h-11 bg-gradient-to-tr from-emerald-700 to-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-500/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-xl tracking-tight leading-none bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-600 bg-clip-text text-transparent">
                  Pondok Pesantren & SIT
                </h1>
              </div>
              <span className="text-xl font-bold tracking-widest text-emerald-900 dark:text-emerald-400 font-serif leading-tight block">
                AL FIRDAUS
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-semibold">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'profil', label: 'Profil' },
              { id: 'program', label: 'Program' },
              { id: 'jadwal', label: 'Jadwal Santri' },
              { id: 'biaya', label: 'Biaya & Kalkulator' },
              { id: 'ppdb', label: 'PPDB Online' },
              { id: 'berita', label: 'Berita' },
              { id: 'galeri', label: 'Galeri' },
              { id: 'kontak', label: 'Kontak' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section: PPDB Badge, Dark Mode, Admin Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* PPDB Badge */}
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PPDB TA 2026/2027 DIBUKA</span>
            </div>

            {/* Dark/Light Mode Switch */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
              title="Toggle Tema"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-emerald-700" />}
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-3 bg-white dark:bg-slate-900 space-y-2 shadow-xl">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'profil', label: 'Profil' },
              { id: 'program', label: 'Program' },
              { id: 'jadwal', label: 'Jadwal Santri' },
              { id: 'biaya', label: 'Biaya & Kalkulator' },
              { id: 'ppdb', label: 'PPDB Online' },
              { id: 'berita', label: 'Berita' },
              { id: 'galeri', label: 'Galeri' },
              { id: 'kontak', label: 'Kontak' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-bold text-amber-500">PPDB 2026/2027 DIBUKA</span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-2"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />} Mode
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Dynamic Content Views based on activeTab */}
      {activeTab === 'beranda' && (
        <main>
          
          {/* 3. MODERN SLIDER HERO */}
          <section className="relative overflow-hidden bg-slate-900 text-white min-h-[580px] sm:min-h-[640px] flex items-center">
            {/* Background Slides */}
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Background Image with Zoom Effect */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
                
                {/* Overlay Modern Gradient & Glassmorphism Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-slate-950/80 to-transparent"></div>
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>

                {/* Hero Slide Content */}
                <div className="relative max-w-7xl mx-auto px-6 sm:px-12 h-full flex items-center pt-16 pb-20 z-20">
                  <div className="max-w-2xl space-y-6">
                    
                    {/* Slide Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-bold tracking-wide shadow-lg">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>{slide.badge}</span>
                    </div>

                    {/* Slide Headline */}
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                      {slide.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed drop-shadow">
                      {slide.subtitle}
                    </p>

                    {/* CTA Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => setActiveTab('ppdb')}
                        className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold shadow-lg shadow-emerald-900/40 transform hover:-translate-y-0.5 transition flex items-center gap-2"
                      >
                        <span>{slide.ctaPrimary}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('program')}
                        className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md text-white font-semibold transition"
                      >
                        {slide.ctaSecondary}
                      </button>

                      {/* Admin Quick Edit Button for Slide */}
                      {isAdminLoggedIn && (
                        <button
                          onClick={() => setEditingSlide(slide)}
                          className="px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold flex items-center gap-2 shadow-lg"
                        >
                          <Edit className="w-4 h-4" /> Edit Slide Ini
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            ))}

            {/* Slider Controls: Next / Prev */}
            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/40 hover:bg-emerald-600/80 text-white backdrop-blur-md border border-white/20 transition hidden sm:flex items-center justify-center"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-900/40 hover:bg-emerald-600/80 text-white backdrop-blur-md border border-white/20 transition hidden sm:flex items-center justify-center"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Controls: Dots & Autoplay Toggle */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-slate-900/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/10">
              
              {/* Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all ${
                      idx === currentSlideIndex ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40 hover:bg-white'
                    }`}
                  />
                ))}
              </div>

              <div className="h-4 w-px bg-white/20"></div>

              {/* Autoplay Switch */}
              <button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="text-slate-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
                title={isAutoplay ? "Jeda Slider" : "Putar Slider"}
              >
                {isAutoplay ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isAutoplay ? "Autoplay On" : "Autoplay Off"}</span>
              </button>

            </div>
          </section>

          {/* QUICK STATS COUNTER */}
          <section className="relative z-20 -mt-8 max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700">
              {[
                { number: "1.250+", label: "Santri Aktif", icon: Users },
                { number: "120+", label: "Hafiz 30 Juz", icon: Award },
                { number: "85+", label: "Ustaz & Pengajar", icon: GraduationCap },
                { number: "A", label: "Akreditasi Sekolah", icon: ShieldCheck }
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-4 p-2">
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-xl">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">{stat.number}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* PROFILE & DUAL CURRICULUM SECTION */}
          <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold tracking-wider uppercase">Keunggulan Pendidikan</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Kurikulum Ganda Berstandar Unggul</h2>
              <p className="text-slate-600 dark:text-slate-300">
                Pondok Pesantren & SIT Al Firdaus menggabungkan pendidikan karakter Islami, integrasi sains modern, dan pendalaman Al-Qur'an secara intensif.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1: SIT Kurikulum Merdeka */}
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl hover:border-emerald-500 transition space-y-6 relative overflow-hidden group">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">SIT (Sekolah Islam Terpadu)</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Pendidikan jenjang TK, SD, SMP, dan SMA berbasis Kurikulum Merdeka Nasional dengan penguatan pembelajaran STEAM, Digital Coding, Sastra, dan Bahasa Inggris Aktif.
                </p>
                <ul className="space-y-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Pembentukan Karakter Islami (Adab & Akhlak)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Laboratorium Sains & Komputer Tercanggih</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Bimbingan Olimpiade Sains & UTBK SBMPTN</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: Pesantren & Tahfidz */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-xl space-y-6 relative overflow-hidden">
                <div className="w-14 h-14 bg-white/10 text-amber-300 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Pondok Pesantren Al Firdaus</h3>
                <p className="text-emerald-100 text-sm leading-relaxed">
                  Program Boarding School khusus Tahfidzul Qur'an 30 Juz bersanad, kajian Kitab Kuning, serta pembiasaan Bahasa Arab sehari-hari di lingkungan asri Kemiling Permai.
                </p>
                <ul className="space-y-3 text-sm font-medium text-emerald-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Metode Muroja'ah Mutqin & Bimbingan Sanad</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Kajian Fiqih, Aqidah, Muhadatsah Arab/Inggris</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>Asrama Nyaman, Makan Sehat 3x Sehari, Pengawasan 24 Jam</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* LATEST NEWS & ANNOUNCEMENTS SECTION */}
          <section className="py-20 px-6 bg-emerald-50/50 dark:bg-slate-900/50 border-y border-emerald-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                <div>
                  <span className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold uppercase">Informasi Terkini</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold">Berita & Pengumuman Pesantren</h2>
                </div>

                {isAdminLoggedIn && (
                  <button
                    onClick={() => setIsAddingNews(true)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center gap-2 shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Tambah Berita Baru
                  </button>
                )}
              </div>

              {/* News Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-700 hover:shadow-xl transition flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition duration-500" />
                      <span className="absolute top-3 left-3 bg-emerald-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="text-xs text-slate-400 mb-2 flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-amber-500" />
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.author}</span>
                        </div>
                        <h3 className="font-bold text-lg leading-snug hover:text-emerald-600 transition cursor-pointer" onClick={() => setSelectedNews(item)}>
                          {item.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-xs mt-2 line-clamp-3">
                          {item.content}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedNews(item)}
                          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          Baca Selengkapnya <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        {/* Admin Action Buttons */}
                        {isAdminLoggedIn && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingNews(item)}
                              className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setNews(news.filter(n => n.id !== item.id));
                                showToast("Berita berhasil dihapus.", "info");
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          </section>

          {/* QUICK CTA TO PPDB */}
          <section className="py-16 px-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
            <div className="max-w-5xl mx-auto text-center space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold">Siap Menjadi Bagian Dari Keluarga Al Firdaus?</h2>
              <p className="text-emerald-100 max-w-2xl mx-auto text-base">
                Daftarkan putra-putri Anda sekarang untuk Tahun Ajaran 2026/2027. Kuota terbatas untuk menjaga kualitas pembimbingan santri.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('ppdb')}
                  className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold shadow-lg transition"
                >
                  Daftar PPDB Online
                </button>
                <button
                  onClick={() => setActiveTab('biaya')}
                  className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold backdrop-blur-md transition"
                >
                  Simulasi Biaya SPP & Infaq
                </button>
              </div>
            </div>
          </section>

        </main>
      )}

      {/* 4. PROFIL TAB */}
      {activeTab === 'profil' && (
        <section className="py-16 px-6 max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">Profil Pondok Pesantren & SIT Al Firdaus</h2>
            <p className="text-slate-600 dark:text-slate-300">Berlokasi asri di kawasan Kemiling Permai, Bandar Lampung.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 space-y-6">
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400">Visi & Misi</h3>
            <div className="space-y-4">
              <p className="font-semibold text-lg text-slate-800 dark:text-slate-100">
                "Mewujudkan Generasi Qur'ani yang Cerdas, Mandiri, Berakhlak Karimah, dan Menguasai Teknologi Abad 21."
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                <li>Menyelenggarakan pendidikan terpadu berbasis Al-Qur'an dan As-Sunnah.</li>
                <li>Mencetak hafiz/hafizah Al-Qur'an 30 Juz yang mutqin dan bersanad.</li>
                <li>Mengembangkan potensi akademik dan non-akademik santri sesuai minat bakat.</li>
                <li>Membina kemandirian, kepemimpinan, dan kecakapan kewirausahaan digital.</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 5. PROGRAM TAB */}
      {activeTab === 'program' && (
        <section className="py-16 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">Program Pendidikan Unggulan</h2>
            <p className="text-slate-600 dark:text-slate-300">Pilihan jenjang lengkap dari TK hingga Boarding School Senior.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "TK & SD SIT Al Firdaus", tag: "Pendidikan Dasar", desc: "Penanaman adab dasar, tahsin Al-Qur'an juz 30, hafalan doa harian, dan pembelajaran bilingual." },
              { title: "SMP & SMA SIT Boarding", tag: "Pendidikan Menengah", desc: "Integrasi Kurikulum Merdeka, sains, matematika, serta target hafalan 10-15 Juz Al-Qur'an." },
              { title: "Pesantren Tahfidz Khusus", tag: "Takhasus 30 Juz", desc: "Program karantina hafalan intensif 30 Juz dalam 2-3 tahun dilengkapi dengan pemahaman Kitab Kuning." }
            ].map((prog, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md space-y-4">
                <span className="text-xs font-bold px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded-full">{prog.tag}</span>
                <h3 className="text-xl font-bold">{prog.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{prog.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. JADWAL SANTRI TAB (24 HOURS TIMELINE) */}
      {activeTab === 'jadwal' && (
        <section className="py-16 px-6 max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">Jadwal & Rutinitas 24 Jam Santri</h2>
            <p className="text-slate-600 dark:text-slate-300">Kedisiplinan, ibadah teratur, dan keseimbangan kegiatan belajar di Al Firdaus.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
            {DAILY_SCHEDULE.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-700 last:border-0 last:pb-0">
                <div className="px-4 py-2 bg-emerald-700 text-white font-mono font-bold text-sm rounded-xl flex items-center gap-2 min-w-[150px] justify-center shadow">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{item.time}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">{item.title}</h3>
                    <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. BIAYA & KALKULATOR SIMULASI TAB */}
      {activeTab === 'biaya' && (
        <section className="py-16 px-6 max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">Simulasi Biaya Pendidikan</h2>
            <p className="text-slate-600 dark:text-slate-300">Hitung estimasi Infaq Pembangunan dan SPP bulanan secara transparan.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Input Form Options */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <Calculator className="w-5 h-5" /> Pilih Parameter Santri
              </h3>

              {/* Jenjang */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Jenjang Pendidikan</label>
                <select
                  value={calcLevel}
                  onChange={(e) => setCalcLevel(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 font-medium text-sm"
                >
                  <option value="tk">TK SIT Al Firdaus</option>
                  <option value="sd">SD SIT Al Firdaus</option>
                  <option value="smp">SMP SIT Al Firdaus</option>
                  <option value="sma">SMA SIT Al Firdaus</option>
                </select>
              </div>

              {/* Tipe Program */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Tipe Kehadiran</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCalcType('boarding')}
                    className={`py-2.5 rounded-xl font-bold text-xs border transition ${
                      calcType === 'boarding'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    Boarding (Asrama)
                  </button>
                  <button
                    onClick={() => setCalcType('fullday')}
                    className={`py-2.5 rounded-xl font-bold text-xs border transition ${
                      calcType === 'fullday'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                        : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    Full Day (Non-Asrama)
                  </button>
                </div>
              </div>

              {/* Diskon Toggles */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold uppercase text-slate-500">Potongan & Beasiswa</label>
                
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750">
                  <input
                    type="checkbox"
                    checked={hasSibling}
                    onChange={(e) => setHasSibling(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs font-medium">Diskon Saudara Kandung (10% Infaq)</span>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-750">
                  <input
                    type="checkbox"
                    checked={isTahfidzScholarship}
                    onChange={(e) => setIsTahfidzScholarship(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                  <span className="text-xs font-medium">Jalur Prestasi Tahfidz ≥ 5 Juz (25% Infaq)</span>
                </label>
              </div>
            </div>

            {/* Output Price Card */}
            <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-amber-400">Rincian Estimasi Biaya</h3>

                <div className="space-y-3 text-sm divide-y divide-white/10">
                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Pendaftaran & Tes Seleksi:</span>
                    <span className="font-mono font-bold">Rp {calculated.pendaftaran.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">Infaq Pembangunan (Sekali):</span>
                    <div className="text-right">
                      {calculated.discountPercent > 0 && (
                        <span className="line-through text-xs text-red-400 block">
                          Rp {calculated.baseInfaq.toLocaleString('id-ID')}
                        </span>
                      )}
                      <span className="font-mono font-bold text-amber-300">
                        Rp {calculated.finalInfaq.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between py-2">
                    <span className="text-slate-300">SPP Bulanan ({calcType}):</span>
                    <span className="font-mono font-bold text-emerald-300">Rp {calculated.baseSpp.toLocaleString('id-ID')} / bln</span>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20 mt-4">
                  <div className="text-xs text-slate-300">Total Masuk Pertama (Awal):</div>
                  <div className="text-3xl font-black text-amber-400 font-mono mt-1">
                    Rp {calculated.totalAwal.toLocaleString('id-ID')}
                  </div>
                </div>
              </div>

              <button
                onClick={() => showToast("Estimasi rincian biaya berhasil dicetak ke format PDF!", "success")}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition shadow-lg"
              >
                <Printer className="w-4 h-4" /> Unduh PDF Estimasi Biaya
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 8. PPDB ONLINE TAB */}
      {activeTab === 'ppdb' && (
        <section className="py-16 px-6 max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Pendaftaran Online</span>
            <h2 className="text-3xl font-extrabold">Formulir PPDB TA 2026/2027</h2>
            <p className="text-slate-600 dark:text-slate-300">Isi data calon santri dengan teliti dan lengkap.</p>
          </div>

          {/* Step Progress Bar */}
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  ppdbStep === step ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {step}
                </div>
                <span className="hidden sm:inline text-xs font-semibold">
                  {step === 1 ? "Data Santri" : step === 2 ? "Data Orang Tua" : "Kartu Pendaftaran"}
                </span>
                {step < 3 && <div className="w-8 h-0.5 bg-slate-300 dark:bg-slate-700"></div>}
              </div>
            ))}
          </div>

          {/* Form Container */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700">
            {ppdbStep === 1 && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400">Langkah 1: Data Calon Santri</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Nama Lengkap Santri</label>
                    <input
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      value={ppdbData.fullName}
                      onChange={(e) => setPpdbData({ ...ppdbData, fullName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Pilihan Jenjang & Program</label>
                    <select
                      value={ppdbData.selectedLevel}
                      onChange={(e) => setPpdbData({ ...ppdbData, selectedLevel: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm"
                    >
                      <option>TK SIT Al Firdaus</option>
                      <option>SD SIT Al Firdaus</option>
                      <option>SMP SIT (Boarding)</option>
                      <option>SMA SIT (Boarding)</option>
                      <option>Pesantren Tahfidz Takhasus</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setPpdbStep(2)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2"
                  >
                    Lanjut <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {ppdbStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400">Langkah 2: Data Orang Tua / Wali</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Nama Ayah / Ibu / Wali</label>
                    <input
                      type="text"
                      placeholder="Nama Wali Santri"
                      value={ppdbData.parentName}
                      onChange={(e) => setPpdbData({ ...ppdbData, parentName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Nomor WhatsApp / HP Active</label>
                    <input
                      type="text"
                      placeholder="08xxxxxxxxxx"
                      value={ppdbData.parentPhone}
                      onChange={(e) => setPpdbData({ ...ppdbData, parentPhone: e.target.value })}
                      className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <button
                    onClick={() => setPpdbStep(1)}
                    className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 rounded-xl font-bold text-sm"
                  >
                    Kembali
                  </button>
                  <button
                    onClick={() => {
                      setPpdbData({ ...ppdbData, regId: "PPDB-2026-" + Math.floor(1000 + Math.random() * 9000) });
                      setPpdbStep(3);
                      showToast("Pendaftaran berhasil disimpan!", "success");
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2"
                  >
                    Selesaikan Pendaftaran <Check className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {ppdbStep === 3 && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                
                <h3 className="text-2xl font-black">Kartu Pendaftaran Virtual</h3>
                
                <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl max-w-md mx-auto text-left border border-slate-300 dark:border-slate-700 space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-500">NO. REGISTRASI:</span>
                    <span className="font-bold text-emerald-600">{ppdbData.regId || "PPDB-2026-8891"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">NAMA SANTRI:</span>
                    <span className="font-bold">{ppdbData.fullName || "Ahmad Santri"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">JENJANG:</span>
                    <span className="font-bold">{ppdbData.selectedLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">WALI SANTRI:</span>
                    <span className="font-bold">{ppdbData.parentName || "Haji Ahmad"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">LOKASI TES:</span>
                    <span className="font-bold">Kemiling Permai</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" /> Cetak Kartu Pendaftaran
                  </button>
                  <button
                    onClick={() => setPpdbStep(1)}
                    className="px-6 py-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-bold"
                  >
                    Daftar Lagi
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. GALERI TAB */}
      {activeTab === 'galeri' && (
        <section className="py-16 px-6 max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">Galeri Kegiatan & Fasilitas</h2>
            <p className="text-slate-600 dark:text-slate-300">Suasana lingkungan islami dan fasilitas belajar modern Al Firdaus.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1585036156171-384164a8c675?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=600",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
            ].map((img, idx) => (
              <div key={idx} className="h-56 rounded-2xl overflow-hidden shadow-md group relative cursor-pointer">
                <img src={img} alt="Galeri Al Firdaus" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                  <span className="text-white text-xs font-bold">Fasilitas Al Firdaus Kemiling</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. KONTAK TAB */}
      {activeTab === 'kontak' && (
        <section className="py-16 px-6 max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold">Hubungi Kami & Peta Lokasi</h2>
            <p className="text-slate-600 dark:text-slate-300">Silakan berkunjung langsung atau hubungi sekretariat PPDB.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-6">
              <h3 className="font-bold text-xl text-emerald-700 dark:text-emerald-400">Informasi Sekretariat</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Alamat Kampus:</span>
                    <span className="text-slate-600 dark:text-slate-300">Jl Cempaka 168, Kemiling Permai, Kec. Kemiling, Kota Bandar Lampung, Lampung 35153</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="font-bold block">Telepon / WhatsApp PPDB:</span>
                    <span className="text-slate-600 dark:text-slate-300">081234567890</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Visual Placeholder */}
            <div className="bg-slate-200 dark:bg-slate-700 rounded-3xl overflow-hidden shadow-xl min-h-[280px] flex items-center justify-center relative">
              <div className="text-center p-6 space-y-2">
                <MapPin className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-bold text-lg">Peta Lokasi Kemiling Permai</h4>
                <p className="text-xs text-slate-500 dark:text-slate-300">Jl Cempaka 168, Kemiling Permai, Bandar Lampung</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 11. ADMIN CMS TAB CONTROL PANEL */}
      {activeTab === 'admin' && isAdminLoggedIn && (
        <section className="py-16 px-6 max-w-6xl mx-auto space-y-8">
          <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-2xl flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-black text-amber-600 dark:text-amber-400">Portal Control Panel Admin CMS</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">Kelola postingan berita, pengumuman, dan tampilan slider hero situs secara langsung.</p>
            </div>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs">
              Logout Admin
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="font-bold text-lg">Kelola Berita & Artikel</h3>
              <button
                onClick={() => setIsAddingNews(true)}
                className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Tambah Berita Baru
              </button>
              <p className="text-xs text-slate-500">Jumlah berita aktif: {news.length} postingan.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
              <h3 className="font-bold text-lg">Kelola Hero Carousel Slide</h3>
              <p className="text-xs text-slate-500">Edit teks headline, badge, dan gambar slider beranda.</p>
              <button
                onClick={() => setEditingSlide(slides[0])}
                className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" /> Edit Slide Utama
              </button>
            </div>
          </div>
        </section>
      )}

      {/* MODAL 1: ADMIN LOGIN */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 relative space-y-6">
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black">Login Admin CMS</h3>
              <p className="text-xs text-slate-500">Masukkan akun admin untuk mengedit konten website.</p>
            </div>

            {loginError && (
              <div className="p-3 bg-red-100 text-red-700 text-xs font-semibold rounded-xl text-center">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Username Admin</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500">Password</label>
                <input
                  type="password"
                  placeholder="admin123"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition text-sm"
              >
                Masuk Ke Panel Admin
              </button>
            </form>

            <div className="text-center text-[11px] text-slate-400">
              Default Credential Demo: <span className="font-mono text-emerald-600">admin</span> / <span className="font-mono text-emerald-600">admin123</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: DETAIL NEWS READ */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-64 object-cover rounded-2xl" />
            
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{selectedNews.category}</span>
              <h3 className="text-2xl font-black">{selectedNews.title}</h3>
              <div className="text-xs text-slate-400">{selectedNews.date} • Oleh {selectedNews.author}</div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {selectedNews.content}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD/EDIT NEWS (ADMIN) */}
      {(isAddingNews || editingNews) && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 relative space-y-4">
            <button
              onClick={() => { setIsAddingNews(false); setEditingNews(null); }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold">{isAddingNews ? "Tambah Berita Baru" : "Edit Berita"}</h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isAddingNews) {
                  const newEntry = {
                    id: Date.now(),
                    title: e.target.title.value,
                    category: e.target.category.value,
                    date: "25 September 2026",
                    author: "Admin Al Firdaus",
                    image: e.target.image.value || "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
                    content: e.target.content.value
                  };
                  setNews([newEntry, ...news]);
                  showToast("Berita baru berhasil dipublikasikan!", "success");
                } else {
                  setNews(news.map(n => n.id === editingNews.id ? {
                    ...n,
                    title: e.target.title.value,
                    category: e.target.category.value,
                    content: e.target.content.value
                  } : n));
                  showToast("Berita berhasil diperbarui!", "success");
                }
                setIsAddingNews(false);
                setEditingNews(null);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold">Judul Berita</label>
                <input name="title" defaultValue={editingNews?.title || ""} className="w-full p-2.5 rounded-xl border mt-1 dark:bg-slate-700" required />
              </div>
              <div>
                <label className="font-bold">Kategori</label>
                <input name="category" defaultValue={editingNews?.category || "Pengumuman"} className="w-full p-2.5 rounded-xl border mt-1 dark:bg-slate-700" required />
              </div>
              <div>
                <label className="font-bold">URL Gambar Image</label>
                <input name="image" defaultValue={editingNews?.image || ""} placeholder="https://..." className="w-full p-2.5 rounded-xl border mt-1 dark:bg-slate-700" />
              </div>
              <div>
                <label className="font-bold">Isi Konten Berita</label>
                <textarea name="content" rows="4" defaultValue={editingNews?.content || ""} className="w-full p-2.5 rounded-xl border mt-1 dark:bg-slate-700" required></textarea>
              </div>
              <button type="submit" className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl">
                Simpan Konten Berita
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: EDIT SLIDE (ADMIN) */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg p-8 rounded-3xl shadow-2xl relative space-y-4">
            <button onClick={() => setEditingSlide(null)} className="absolute top-4 right-4 text-slate-400">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold">Edit Slide Hero Slider</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSlides(slides.map(s => s.id === editingSlide.id ? {
                  ...s,
                  badge: e.target.badge.value,
                  title: e.target.title.value,
                  subtitle: e.target.subtitle.value
                } : s));
                setEditingSlide(null);
                showToast("Slide Hero berhasil diubah!", "success");
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-bold">Badge Teks</label>
                <input name="badge" defaultValue={editingSlide.badge} className="w-full p-2.5 rounded-xl border mt-1 dark:bg-slate-700" />
              </div>
              <div>
                <label className="font-bold">Judul Headline Utama</label>
                <input name="title" defaultValue={editingSlide.title} className="w-full p-2.5 rounded-xl border mt-1 dark:bg-slate-700" />
              </div>
              <div>
                <label className="font-bold">Deskripsi Subtitle</label>
                <textarea name="subtitle" rows="3" defaultValue={editingSlide.subtitle} className="w-full p-2.5 rounded-xl border mt-1 dark:bg-slate-700" />
              </div>
              <button type="submit" className="w-full py-3 bg-amber-500 text-slate-950 font-bold rounded-xl">
                Simpan Perubahan Slide
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 12. COMPREHENSIVE FOOTER */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80 text-sm">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-black text-white text-base leading-none">Pondok Pesantren & SIT</h2>
                <span className="text-amber-400 font-serif font-bold text-lg">AL FIRDAUS</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Membentuk generasi pembina peradaban Islam yang hafal Al-Qur'an, berilmu pengetahuan tinggi, dan berkarakter mulia.
            </p>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setActiveTab('profil')} className="hover:text-amber-400 transition">Profil & Visi Misi</button></li>
              <li><button onClick={() => setActiveTab('program')} className="hover:text-amber-400 transition">Program SIT & Tahfidz</button></li>
              <li><button onClick={() => setActiveTab('jadwal')} className="hover:text-amber-400 transition">Jadwal Santri 24 Jam</button></li>
              <li><button onClick={() => setActiveTab('biaya')} className="hover:text-amber-400 transition">Kalkulator Biaya SPP</button></li>
              <li><button onClick={() => setActiveTab('ppdb')} className="hover:text-amber-400 transition">PPDB TA 2026/2027</button></li>
            </ul>
          </div>

          {/* Col 3: Alamat & Kontak */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-base">Alamat Kampus</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Jl Cempaka 168, Kemiling Permai, Bandar Lampung</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>081234567890</span>
              </div>
            </div>
          </div>

          {/* Col 4: Sosmed Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-base">Ikuti Media Sosial</h4>
            <p className="text-xs text-slate-400">Dapatkan update foto & video kegiatan santri setiap hari.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-600 text-white rounded-lg transition" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-600 text-white rounded-lg transition" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-emerald-600 text-white rounded-lg transition" title="Youtube">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <div>© 2026 Pondok Pesantren & SIT Al Firdaus Kemiling Permai. Hak Cipta Dilindungi.</div>
          <div className="flex items-center gap-4">
            <button onClick={() => setLoginModalOpen(true)} className="hover:text-slate-300 transition">
              Akses Admin Portal
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
