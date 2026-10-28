import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Utensils, ArrowLeft, Calendar, User, Mail, Phone, Clock } from 'lucide-react';

export function OrderConfirmation({ orderData, onReturnToMenu, onReturnToDining }) {
  if (!orderData) return null;

  return (
    <section className="relative w-full min-h-screen pt-24 sm:pt-28 pb-36 px-4 sm:px-8 max-w-4xl mx-auto z-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full rounded-3xl border border-[#d4af37]/40 bg-[#120f0c] shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-10 flex flex-col items-center text-center text-[#f5efe2]"
      >
        {/* Animated Gold Checkmark */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#d4af37]/60 bg-[#1f170f] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#d4af37]" />
        </div>

        {/* Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/40 bg-[#1c1610] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
            DEMONSTRATION ORDER CONFIRMED
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#fffaf0] via-[#e5c67d] to-[#8f6d2f] tracking-[0.18em] font-normal mb-2">
          THE SANCTUARY AWAITS
        </h1>

        <p className="font-editorial italic text-sm sm:text-base text-[#b8afa0] tracking-[0.15em] mb-6">
          Your demonstration tasting service has been logged into the Nocturne guestbook.
        </p>

        {/* Order Reference Box */}
        <div className="w-full max-w-md py-4 px-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md flex flex-col items-center mb-8">
          <span className="font-sans text-[10px] tracking-[0.25em] text-[#787063] uppercase mb-1">
            DEMO REFERENCE CODE
          </span>
          <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#fbf6ec] font-bold">
            {orderData.reference}
          </span>
          <span className="font-sans text-[10px] tracking-[0.15em] text-[#5e584f] uppercase mt-1 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-[#d4af37]" />
            TIMESTAMP: {orderData.timestamp}
          </span>
        </div>

        {/* Guest & Reservation Details */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 text-left p-6 rounded-2xl border border-white/5 bg-[#17130f] mb-8 text-xs font-sans tracking-[0.1em]">
          <div className="flex items-start gap-3">
            <User className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#787063] block uppercase text-[10px] tracking-[0.2em]">
                GUEST NAME
              </span>
              <span className="text-[#f5efe2] font-medium text-sm">{orderData.customerName}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#787063] block uppercase text-[10px] tracking-[0.2em]">
                EMAIL CONFIRMATION
              </span>
              <span className="text-[#f5efe2] font-medium text-sm">{orderData.email}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#787063] block uppercase text-[10px] tracking-[0.2em]">
                CONTACT PHONE
              </span>
              <span className="text-[#f5efe2] font-medium text-sm">{orderData.phone}</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
            <div>
              <span className="text-[#787063] block uppercase text-[10px] tracking-[0.2em]">
                SERVICE TIME
              </span>
              <span className="text-[#f5efe2] font-medium text-sm">{orderData.diningTime}</span>
            </div>
          </div>

          {orderData.notes && (
            <div className="sm:col-span-2 pt-3 border-t border-white/5">
              <span className="text-[#787063] block uppercase text-[10px] tracking-[0.2em] mb-1">
                SPECIAL DIETARY &amp; PREPARATION NOTES
              </span>
              <span className="text-[#c8bea9] italic">{orderData.notes}</span>
            </div>
          )}
        </div>

        {/* Order Compositions Breakdown */}
        <div className="w-full text-left p-6 rounded-2xl border border-white/5 bg-[#17130f] mb-8">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 text-[10px] font-sans tracking-[0.25em] text-[#787063] uppercase">
            <span>SELECTED COMPOSITIONS</span>
            <span>LINE TOTAL</span>
          </div>

          <div className="divide-y divide-white/5 text-xs font-sans">
            {orderData.items?.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-serif text-[#f5efe2] font-medium">{item.name}</span>
                  <span className="text-[#8c8273] ml-2 font-mono">× {item.quantity}</span>
                </div>
                <span className="font-serif text-[#e5c67d] font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 mt-3 flex flex-col gap-1.5 text-xs font-sans">
            <div className="flex items-center justify-between text-[#8c8273]">
              <span>SUBTOTAL</span>
              <span className="font-serif text-[#e0d6c3]">${orderData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[#736a5c]">
              <span>SERVICE &amp; DINING TAX (8.5%)</span>
              <span className="font-serif text-[#c8bea9]">${orderData.tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm sm:text-base font-serif font-bold text-[#fbf6ec] pt-2 border-t border-white/5">
              <span>FINAL TOTAL</span>
              <span className="text-[#e5c67d]">${orderData.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Mandatory Explicit Disclaimer */}
        <div className="w-full p-4 rounded-xl border border-yellow-500/30 bg-yellow-950/20 text-yellow-200/90 text-[11px] font-sans tracking-[0.08em] leading-relaxed mb-8">
          <span className="font-bold uppercase tracking-[0.15em] block mb-1">
            Notice: Frontend Demonstration Only
          </span>
          This is an interactive simulation of the Nocturne dining platform. No monetary payment
          was charged, no credit card information was requested or stored, and no actual restaurant
          reservation or delivery order was transmitted.
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button
            onClick={onReturnToMenu}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-[#d4af37]/60 bg-gradient-to-r from-[#1f170f] to-[#2d2215] hover:from-[#2d2215] hover:to-[#3b2d1c] text-[#fbf6ec] text-xs font-sans tracking-[0.2em] uppercase font-semibold transition-all cursor-pointer shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4af37]" />
            <span>RETURN TO SIGNATURE MENU</span>
          </button>

          <button
            onClick={onReturnToDining}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 hover:border-[#d4af37]/40 bg-black/40 text-[#c8bea9] hover:text-white text-xs font-sans tracking-[0.2em] uppercase transition-all cursor-pointer"
          >
            <Utensils className="w-4 h-4 text-[#d4af37]" />
            <span>EXPLORE DINING SALON</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
