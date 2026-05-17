import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Sparkles, Shield, Church, Star, Anchor, BookOpen, Youtube, Instagram, Facebook } from 'lucide-react';
import { RegistrationForm } from '@/components/registration';

export function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="floating-shapes">
        <div className="floating-shape w-[600px] h-[600px] top-[-200px] left-[-200px]" style={{ animationDelay: '0s' }} />
        <div className="floating-shape w-[500px] h-[500px] top-1/3 right-[-150px]" style={{ animationDelay: '2s' }} />
        <div className="floating-shape w-[400px] h-[400px] bottom-[-100px] left-1/4" style={{ animationDelay: '4s' }} />
        <div className="floating-shape w-[300px] h-[300px] top-1/2 left-1/2" style={{ animationDelay: '6s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation Bar */}
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-4 flex-shrink-0"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-600/10 group-hover:from-gold-400/30 group-hover:to-gold-600/20 transition-all duration-300">
                <Church className="w-5 h-5 text-gold-400" />
              </div>
              <span className="text-gradient-static text-sm font-bold tracking-wide">TOPS CHAPTER</span>
            </div>
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border border-white/20 hover:border-gold-400/50 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white group"
            >
              <Shield className="w-4 h-4 group-hover:text-gold-400 transition-colors" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </div>
        </motion.nav>

        {/* Main Content - Two Column Layout */}
        <main className="flex-1 px-4 py-6 flex">
          <div className="max-w-7xl mx-auto w-full flex-1 flex">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full flex-1">

              {/* Left Column - Event Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col"
              >
                {/* Single Card matching right column height */}
                <div className="glass-card p-6 md:p-8 flex-1 flex flex-col justify-between relative overflow-hidden hover-lift">
                  {/* Decorative corner elements with glow */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-gold-400/40 rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gold-400/40 rounded-br-3xl" />

                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 via-transparent to-primary-400/5 pointer-events-none" />

                  {/* Top Section - Logo & Church Name */}
                  <div className="text-center relative">
                    {/* Logo with enhanced styling */}
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="inline-block bg-white rounded-2xl p-3 shadow-2xl mb-4 relative group"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <img 
                        src="/logo.png" 
                        alt="Cherubim & Seraphim Unification Church Logo" 
                        className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10"
                      />
                    </motion.div>

                    {/* Church Name */}
                    <div className="mb-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Church className="w-4 h-4 text-gold-400" />
                        <span className="text-gradient-static text-sm font-semibold tracking-wider uppercase">
                          Cherubim & Seraphim Church
                        </span>
                        <Church className="w-4 h-4 text-gold-400" />
                      </div>
                      <p className="text-white/80 text-sm font-medium">
                        Unification Campus Fellowship
                      </p>
                      <p className="text-white/60 text-xs">
                        The Oke-Ogun Polytechnic, Saki (TOPS)
                      </p>
                    </div>

                    {/* Registration Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-400/30 rounded-full text-gold-300 text-sm">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      <span>Registration Now Open</span>
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                  </div>

                  {/* Middle Section - Event Title & Theme */}
                  <div className="text-center py-4">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Star className="w-4 h-4 text-gold-400" />
                      <Star className="w-5 h-5 text-gold-400" />
                      <Star className="w-4 h-4 text-gold-400" />
                    </div>

                    <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
                      <span className="text-white">Anniversary &</span>
                      <br />
                      <span className="text-gradient">Covenant Service</span>
                      <br />
                      <span className="text-white text-xl md:text-2xl lg:text-3xl">2026</span>
                    </h1>

                    {/* Theme */}
                    <div className="mb-3 p-3 bg-gold-500/10 border border-gold-400/20 rounded-xl">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Anchor className="w-4 h-4 text-gold-400" />
                        <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Theme</span>
                      </div>
                      <p className="text-white font-display text-lg md:text-xl font-bold">
                        Christ Our Living Anchor
                      </p>
                    </div>

                    {/* Scripture */}
                    <div className="mb-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <BookOpen className="w-4 h-4 text-gold-400" />
                        <span className="text-gold-400 text-xs font-semibold uppercase tracking-wider">Scripture</span>
                      </div>
                      <p className="text-white/90 text-sm italic leading-relaxed">
                        "Which hope we have as an anchor of the soul, both sure and stedfast, and which entereth into that within the veil"
                      </p>
                      <p className="text-gold-400 text-xs mt-1 font-medium">— Hebrews 6:19 (KJV)</p>
                    </div>

                    {/* Church Motto */}
                    <div className="p-2 bg-white/5 border border-white/10 rounded-lg">
                      <p className="text-white/60 text-xs italic">
                        <span className="text-gold-400 font-medium">Motto:</span> "Remember now thy Creator in the days of thy youth"
                      </p>
                      <p className="text-white/40 text-xs">— Ecclesiastes 12:1</p>
                    </div>
                  </div>

                  {/* Bottom Section - Event Details & Social */}
                  <div>
                    {/* Venue */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mb-3 p-4 rounded-xl text-center relative overflow-hidden group"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-gold-400" />
                        <span className="text-gradient-static text-xs font-semibold uppercase tracking-wider">Venue</span>
                      </div>
                      <p className="text-white/90 text-sm font-medium">Behind Apeeki Palace, Otun Area</p>
                      <p className="text-white/60 text-xs">Saki, Oyo State</p>
                    </motion.div>

                    {/* Date & Duration */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-3 p-4 rounded-xl text-center relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
                        border: '1px solid rgba(251, 191, 36, 0.25)',
                        boxShadow: '0 0 30px rgba(251, 191, 36, 0.1)'
                      }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gold-400 animate-pulse" />
                        <span className="text-gradient-static text-xs font-semibold uppercase tracking-wider">Event Dates</span>
                      </div>
                      <p className="text-white font-display text-xl font-bold glow-text">June 17 - 21, 2026</p>
                      <div className="mt-3 pt-3 border-t border-gold-400/20">
                        <p className="text-gold-300 text-sm font-medium">🕊️ Covenant Service</p>
                        <p className="text-white font-bold text-lg">June 20, 2026</p>
                      </div>
                    </motion.div>

                    {/* Social Media Links */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mb-3 p-4 rounded-xl"
                      style={{ 
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                    >
                      <p className="text-white/60 text-xs text-center mb-3">Follow us on social media</p>
                      <div className="flex items-center justify-center gap-3">
                        <a 
                          href="https://youtube.com/@CnsUnificationTopsChapter" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2.5 bg-red-500/20 hover:bg-red-500/40 rounded-xl transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-red-500/20"
                          title="YouTube"
                        >
                          <Youtube className="w-4 h-4 text-red-400 group-hover:text-red-300" />
                        </a>
                        <a 
                          href="https://instagram.com/CnsUnificationTopsChapter" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2.5 bg-pink-500/20 hover:bg-pink-500/40 rounded-xl transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-pink-500/20"
                          title="Instagram"
                        >
                          <Instagram className="w-4 h-4 text-pink-400 group-hover:text-pink-300" />
                        </a>
                        <a 
                          href="https://facebook.com/CnsUnificationTopsChapter" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2.5 bg-blue-500/20 hover:bg-blue-500/40 rounded-xl transition-all duration-300 group hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                          title="Facebook"
                        >
                          <Facebook className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
                        </a>
                        <a 
                          href="https://tiktok.com/@unificationtops" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 group hover:scale-110"
                          title="TikTok"
                        >
                          <svg className="w-4 h-4 text-white/80 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                          </svg>
                        </a>
                      </div>
                      <p className="text-white/40 text-xs text-center mt-3">@CnsUnificationTopsChapter • @unificationtops</p>
                    </motion.div>

                    {/* Footer Info */}
                    <div className="hidden lg:block text-center pt-2 border-t border-white/10">
                      <p className="text-white/50 text-xs">
                        © 2026 TOPS CHAPTER • 
                        <Link to="/login" className="hover:text-gold-400 transition-colors ml-1">
                          Admin Access
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Registration Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col"
              >
                <div className="glass-card p-6 md:p-8 flex-1 relative overflow-hidden hover-lift">
                  {/* Decorative corner elements with enhanced glow */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-gold-400/40 rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-gold-400/40 rounded-br-3xl" />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 via-transparent to-primary-400/5 pointer-events-none" />

                  <div className="text-center mb-6 relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 rounded-full text-gold-400 text-xs mb-3">
                      <Sparkles className="w-3 h-3" />
                      SECURE YOUR SPOT
                    </div>
                    <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-1">
                      Register Now
                    </h2>
                    <p className="text-white/60 text-sm">
                      All fields marked with * are required
                    </p>
                  </div>

                  <RegistrationForm />
                </div>

                {/* Mobile Footer */}
                <div className="lg:hidden mt-6 glass-card p-4 text-center">
                  <p className="text-white/60 text-xs mb-1">
                    Cherubim & Seraphim Church Unification Campus Fellowship
                  </p>
                  <p className="text-white/40 text-xs mb-2">
                    The Oke-Ogun Polytechnic, Saki (TOPS)
                  </p>
                  <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
                    <span>© 2026 TOPS CHAPTER</span>
                    <span>•</span>
                    <Link to="/login" className="hover:text-gold-400 transition-colors">
                      Admin Access
                    </Link>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
