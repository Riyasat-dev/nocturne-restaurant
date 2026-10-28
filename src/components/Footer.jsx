import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { label: "Home", target: "lamp" },
  { label: "Dining", target: "dining" },
  { label: "Our Chef", target: "chef" },
  { label: "Menu", target: "menu" },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="relative overflow-hidden border-t border-[#c9a96e]/25 bg-[#0b0907] text-[#f5efe6]">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="font-serif text-3xl tracking-[0.2em] text-[#d4b477]">
              NOCTURNE
            </h2>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#a99a80]">
              Dining Beyond the Ordinary
            </p>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[#b7ada0]">
              An intimate dining experience where exceptional flavours, timeless
              elegance, and unforgettable moments come together.
            </p>
            <div className="mt-5 flex gap-3"></div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4b477]">
              Explore
            </h3>
            <ul className="mt-5 space-y-4">
              {quickLinks.map((link) => (
                <li key={link.target}>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(link.target)}
                    className="group flex items-center gap-2 text-sm text-[#b7ada0] transition hover:text-[#d4b477]"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4b477]">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-5 text-sm text-[#b7ada0]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#d4b477]" />
                <span>
                  24 Golden Avenue,
                  <br />
                  Karachi, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="shrink-0 text-[#d4b477]" />
                <a href="tel:+92210000000" className="hover:text-[#d4b477]">
                  +92 21 0000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="shrink-0 text-[#d4b477]" />
                <a
                  href="mailto:hello@nocturne.example"
                  className="break-all hover:text-[#d4b477]"
                >
                  hello@nocturne.example
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d4b477]">
              Opening Hours
            </h3>
            <div className="mt-5 flex items-start gap-3 text-sm text-[#b7ada0]">
              <Clock size={18} className="mt-0.5 shrink-0 text-[#d4b477]" />
              <div className="space-y-3">
                <p>
                  Monday – Sunday
                  <br />
                  <span className="mt-1 inline-block text-[#f5efe6]">
                    6:00 PM – 11:00 PM
                  </span>
                </p>
                <p className="text-xs leading-6 text-[#887d6c]">
                  Reservations recommended for an exceptional evening.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-center text-xs text-[#887d6c] sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} NOCTURNE. All rights reserved.</p>
          <p className="uppercase tracking-[0.18em]">
            Crafted for unforgettable evenings
          </p>
        </div>
      </div>
    </footer>
  );
}
