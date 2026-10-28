import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/useCart';
import { SafeImage } from '../menu/SafeImage';

export function CheckoutView({ onBackToMenu, onOrderSuccess }) {
  const { items, subtotal, tax, total, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    diningTime: 'Tonight // 19:30 Table Service',
    notes: '',
  });

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation clearance
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let error = null;
    if (name === 'customerName') {
      if (!value.trim()) error = 'Guest name is required.';
      else if (value.trim().length < 2) error = 'Please enter at least 2 characters.';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = 'Email address is required.';
      else if (!emailRegex.test(value.trim())) error = 'Please enter a valid email address.';
    } else if (name === 'phone') {
      const phoneClean = value.replace(/[^0-9]/g, '');
      if (!value.trim()) error = 'Phone number is required.';
      else if (phoneClean.length < 7) error = 'Please enter a valid telephone number.';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const nameErr = validateField('customerName', formData.customerName);
    const emailErr = validateField('email', formData.email);
    const phoneErr = validateField('phone', formData.phone);

    setTouched({ customerName: true, email: true, phone: true });

    if (nameErr || emailErr || phoneErr) {
      return;
    }

    if (items.length === 0) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement delay
    setTimeout(() => {
      const randomRef = 'NOC-' + Math.floor(1000 + Math.random() * 9000) + '-7X';
      const orderPayload = {
        reference: randomRef,
        customerName: formData.customerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        diningTime: formData.diningTime,
        notes: formData.notes.trim(),
        items: [...items],
        subtotal,
        tax,
        total,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      // Clear the cart
      clearCart();
      setIsSubmitting(false);

      // Invoke success callback
      onOrderSuccess(orderPayload);
    }, 1000);
  };

  // If user navigated to checkout with 0 items
  if (items.length === 0) {
    return (
      <section className="relative w-full min-h-screen py-28 px-4 flex flex-col items-center justify-center z-20 text-center">
        <div className="w-16 h-16 rounded-full border border-[#d4af37]/30 bg-[#17130e] flex items-center justify-center mb-4">
          <ShoppingBag className="w-7 h-7 text-[#d4af37]/70" />
        </div>
        <h2 className="font-serif text-2xl text-[#f5efe2] tracking-[0.15em] mb-3">
          NO ITEMS TO CHECK OUT
        </h2>
        <p className="font-sans text-xs text-[#8c8273] tracking-[0.1em] max-w-sm mb-6">
          Your order is empty. Please select dishes from our signature menu before proceeding to checkout.
        </p>
        <button
          onClick={onBackToMenu}
          className="px-6 py-2.5 rounded-full border border-[#d4af37]/60 bg-[#1c1610] text-xs font-sans tracking-[0.2em] uppercase text-[#fbf6ec] hover:border-[#d4af37] transition-all cursor-pointer"
        >
          RETURN TO MENU
        </button>
      </section>
    );
  }

  return (
    <section className="relative w-full min-h-screen pt-24 sm:pt-28 pb-36 px-4 sm:px-8 max-w-6xl mx-auto z-20 flex flex-col items-center text-[#f5efe2]">
      {/* Top Navigation Back */}
      <div className="w-full flex items-center justify-between mb-8">
        <button
          onClick={onBackToMenu}
          className="group flex items-center gap-2 text-xs font-sans tracking-[0.2em] uppercase text-[#9c9486] hover:text-[#fbf6ec] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#d4af37] group-hover:-translate-x-1 transition-transform" />
          <span>BACK TO SIGNATURE MENU</span>
        </button>

        <span className="font-sans text-[10px] tracking-[0.25em] text-[#d4af37] uppercase font-semibold">
          DEMO CHECKOUT // STEP 2 OF 2
        </span>
      </div>

      {/* Main Grid: Form Left, Order Summary Right */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Guest Details Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 rounded-3xl border border-white/5 bg-[#120f0c]/90 backdrop-blur-md p-6 sm:p-8 shadow-2xl"
        >
          <div className="border-b border-white/5 pb-4 mb-6">
            <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.15em] text-[#fbf6ec] font-normal">
              GUEST RESERVATION &amp; DETAILS
            </h1>
            <p className="font-editorial italic text-xs sm:text-sm text-[#9c9486] tracking-[0.1em] mt-1">
              Please enter your reservation particulars for this demonstration tasting service.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="customerName"
                className="block font-sans text-[11px] tracking-[0.2em] uppercase text-[#b8afa0] font-medium mb-1.5"
              >
                GUEST FULL NAME <span className="text-[#d4af37]">*</span>
              </label>
              <input
                id="customerName"
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Lord / Lady Sterling Vance"
                className={`w-full px-4 py-3 rounded-xl border bg-black/60 text-sm font-sans tracking-[0.05em] text-[#fbf6ec] placeholder-[#575046] focus:outline-none transition-all ${
                  touched.customerName && errors.customerName
                    ? 'border-red-500/70 focus:border-red-500'
                    : 'border-white/10 focus:border-[#d4af37]'
                }`}
              />
              {touched.customerName && errors.customerName && (
                <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-sans">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.customerName}</span>
                </p>
              )}
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-sans text-[11px] tracking-[0.2em] uppercase text-[#b8afa0] font-medium mb-1.5"
                >
                  EMAIL ADDRESS <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="guest@nocturne.atelier"
                  className={`w-full px-4 py-3 rounded-xl border bg-black/60 text-sm font-sans tracking-[0.05em] text-[#fbf6ec] placeholder-[#575046] focus:outline-none transition-all ${
                    touched.email && errors.email
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-white/10 focus:border-[#d4af37]'
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-sans">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block font-sans text-[11px] tracking-[0.2em] uppercase text-[#b8afa0] font-medium mb-1.5"
                >
                  CONTACT TELEPHONE <span className="text-[#d4af37]">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+1 (555) 849-2000"
                  className={`w-full px-4 py-3 rounded-xl border bg-black/60 text-sm font-sans tracking-[0.05em] text-[#fbf6ec] placeholder-[#575046] focus:outline-none transition-all ${
                    touched.phone && errors.phone
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-white/10 focus:border-[#d4af37]'
                  }`}
                />
                {touched.phone && errors.phone && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 mt-1.5 font-sans">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Dining Time Selection */}
            <div>
              <label
                htmlFor="diningTime"
                className="block font-sans text-[11px] tracking-[0.2em] uppercase text-[#b8afa0] font-medium mb-1.5"
              >
                PREFERRED SERVICE TIME
              </label>
              <select
                id="diningTime"
                name="diningTime"
                value={formData.diningTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#d4af37] bg-black/60 text-sm font-sans tracking-[0.05em] text-[#fbf6ec] focus:outline-none cursor-pointer"
              >
                <option value="Tonight // 19:30 Table Service">Tonight // 19:30 Salon Service</option>
                <option value="Tonight // 21:00 Nocturne Late Service">Tonight // 21:00 Nocturne Late Service</option>
                <option value="Tomorrow // 20:00 Sommelier Tasting">Tomorrow // 20:00 Sommelier Tasting</option>
                <option value="Private Chauffeur Courier Service">Private Chauffeur Courier Service</option>
              </select>
            </div>

            {/* Special Requests / Order Notes */}
            <div>
              <label
                htmlFor="notes"
                className="block font-sans text-[11px] tracking-[0.2em] uppercase text-[#b8afa0] font-medium mb-1.5"
              >
                DIETARY RESTRICTIONS &amp; SOMMELIER INSTRUCTIONS (OPTIONAL)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                placeholder="e.g., Shellfish allergy, preference for vintage Burgundy, private alcove table..."
                className="w-full px-4 py-3 rounded-xl border border-white/10 focus:border-[#d4af37] bg-black/60 text-sm font-sans tracking-[0.05em] text-[#fbf6ec] placeholder-[#575046] focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Explicit Demo Notice */}
            <div className="p-4 rounded-xl border border-[#d4af37]/25 bg-[#17130e]/80 flex items-start gap-3 text-xs text-[#c8bea9] leading-relaxed">
              <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#e5c67d] uppercase tracking-[0.1em] block">
                  DEMONSTRATION CHECKOUT MODE
                </span>
                No real payment or financial details will be collected or processed. Submitting this
                form generates a simulated confirmation receipt for test purposes.
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full py-4 px-6 rounded-full border border-[#d4af37]/60 bg-gradient-to-r from-[#211a12] via-[#352718] to-[#211a12] hover:from-[#2d2215] hover:to-[#42311d] text-[#fbf6ec] font-sans text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2 shadow-[0_6px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>RECORDING DEMO RESERVATION...</span>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 text-[#d4af37]" />
                  <span>COMPLETE DEMO RESERVATION — ${total.toFixed(2)}</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Order Summary Box */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 rounded-3xl border border-white/5 bg-[#120f0c]/90 backdrop-blur-md p-6 sm:p-7 shadow-2xl sticky top-28"
        >
          <div className="border-b border-white/5 pb-3 mb-4">
            <h2 className="font-serif text-lg tracking-[0.15em] text-[#fbf6ec] font-normal">
              ORDER SUMMARY
            </h2>
            <span className="font-sans text-[10px] tracking-[0.2em] text-[#787063] uppercase">
              {items.length} {items.length === 1 ? 'DISH SELECTED' : 'DISHES SELECTED'}
            </span>
          </div>

          {/* Items Preview */}
          <div className="max-h-64 overflow-y-auto divide-y divide-white/5 pr-1 custom-scrollbar mb-4">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-white/10">
                  <SafeImage src={item.image} alt={item.name} className="w-full h-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-xs text-[#f5efe2] truncate tracking-[0.05em]">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-sans text-[#8c8273]">
                    Qty: {item.quantity} × ${item.price}
                  </span>
                </div>
                <span className="font-serif text-xs tracking-[0.1em] text-[#e5c67d] font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Calculation Breakdown */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-xs font-sans tracking-[0.1em]">
            <div className="flex items-center justify-between text-[#8c8273]">
              <span>SUBTOTAL</span>
              <span className="font-serif text-[#e0d6c3]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-[#736a5c]">
              <span>SERVICE &amp; DINING TAX (8.5%)</span>
              <span className="font-serif text-[#c8bea9]">${tax.toFixed(2)}</span>
            </div>
            <div className="h-[1px] bg-white/5 my-1" />
            <div className="flex items-center justify-between text-base font-serif font-bold text-[#fbf6ec]">
              <span>TOTAL</span>
              <span className="text-[#e5c67d] text-lg">${total.toFixed(2)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
