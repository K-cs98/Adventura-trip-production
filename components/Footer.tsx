export default function Footer() {
  return (
    <footer className="bg-[#0B132B] text-slate-300 py-12 px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand / Info (Preserved from original) */}
        <div className="space-y-3">
          <h3 className="font-serif text-xl font-bold text-white">Adventura Trips</h3>
          <p className="text-xs text-slate-400">
            Curating exceptional luxury expeditions and bespoke travel experiences across the globe.
          </p>
        </div>

        {/* Column 2: Quick Links (Preserved from original) */}
        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-white uppercase tracking-wider">Navigation</h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li><a href="/#expeditions" className="hover:text-white transition-colors">Expeditions</a></li>
            <li><a href="/bespoke" className="hover:text-white transition-colors">Bespoke Curator</a></li>
            <li><a href="/journal" className="hover:text-white transition-colors">Journal</a></li>
            <li><a href="/reviews" className="hover:text-white transition-colors">Reviews</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Concierge (Original notice + newly added details with icons) */}
        <div className="space-y-3 md:col-span-2">
          <h4 className="font-semibold text-sm text-white uppercase tracking-wider">Contact</h4>
          
          {/* Original text notice preserved */}
          <p className="text-xs text-slate-400">
            Use the chat widget in the bottom-right corner and our team will respond by email.
          </p>

          {/* Newly Added Contact & Social Details with Icons */}
          <div className="pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Direct Contact Info (Email & Phone) */}
            <div className="space-y-2">
              <p className="font-medium text-slate-300">Direct Inquiries</p>
              
              {/* Email Icon + Link */}
              <div className="flex items-center space-x-2.5 text-slate-400">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:concierge@adventuratrips.com" className="hover:text-white transition-colors">
                  concierge@adventuratrips.com
                </a>
              </div>

              {/* Phone Icon + Link */}
              <div className="flex items-center space-x-2.5 text-slate-400">
                <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+1234567890" className="hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            {/* Social Channels (WhatsApp, TikTok, Instagram Icons) */}
            <div className="space-y-2">
              <p className="font-medium text-slate-300">Social Channels</p>
              <div className="flex items-center space-x-4 pt-1">
                
                {/* WhatsApp Icon */}
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>

                {/* TikTok Icon */}
                <a 
                  href="https://tiktok.com/@adventuratrips" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-white transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                  </svg>
                </a>

                {/* Instagram Icon */}
                <a 
                  href="https://instagram.com/@adventuratrips" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-pink-400 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

              </div>
            </div>

          </div>

          {/* Address with Live Map Directions Icon */}
          <div className="pt-2 text-xs text-slate-400">
            <p className="font-medium text-slate-300">Headquarters</p>
            <div className="flex items-start space-x-2 mt-1">
              <svg className="w-4 h-4 text-[#1E88E5] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p>123 Expedition Way, Suite 400, New York, NY</p>
                <a 
                  href="https://maps.google.com/?q=123+Expedition+Way+New+York+NY" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block text-[#1E88E5] hover:underline mt-0.5"
                >
                  Get live map directions →
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Copyright Bottom Bar & Restored Admin Access */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Adventura Trips. All rights reserved.</p>
        <a 
          href="/admin" 
          className="mt-3 sm:mt-0 text-slate-400 hover:text-white transition-colors bg-slate-900 px-3 py-1.5 rounded border border-slate-800"
        >
          Admin Portal
        </a>
      </div>
    </footer>
  );
}