import { Plus, Minus, Trash2 } from 'lucide-react';
import { SafeImage } from '../menu/SafeImage';
import { useCart } from '../../context/useCart';

export function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="relative flex items-center gap-4 py-4 border-b border-white/5 last:border-0 group">
      {/* Thumbnail */}
      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
        <SafeImage
          src={item.image}
          alt={item.name}
          className="w-full h-full"
        />
      </div>

      {/* Item Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-serif text-sm text-[#f5efe2] tracking-[0.08em] font-medium truncate">
            {item.name}
          </h4>
          <button
            onClick={() => removeFromCart(item.id)}
            aria-label={`Remove ${item.name} from order`}
            className="p-1 text-[#6b6255] hover:text-[#d4af37] transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="font-editorial italic text-xs text-[#a39b8e] tracking-[0.1em] mb-2">
          ${item.price} each
        </div>

        {/* Quantity Controls & Line Total */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 p-0.5 rounded-full border border-white/10 bg-[#16120e]">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Decrease quantity"
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-[#c8bea9] transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-sans text-xs font-medium w-5 text-center text-[#fbf6ec]">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Increase quantity"
              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/10 text-[#c8bea9] transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <span className="font-serif text-sm tracking-[0.1em] text-[#e5c67d] font-semibold">
            ${item.price * item.quantity}
          </span>
        </div>
      </div>
    </div>
  );
}
