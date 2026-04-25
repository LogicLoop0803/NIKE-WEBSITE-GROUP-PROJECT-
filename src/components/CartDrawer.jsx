import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems, updateQuantity, removeItem }) => {
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-dark-900 border-l border-dark-800 z-50 flex flex-col shadow-2xl"
          >
            
            <div className="flex items-center justify-between p-6 border-b border-dark-800">
              <h2 className="text-xl font-semibold tracking-wide flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Your Cart
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            
            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg">Your cart is empty.</p>
                  <button onClick={onClose} className="mt-6 text-white uppercase text-sm tracking-wider underline underline-offset-4">Continue Shopping</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex gap-4">
                      <div className="w-24 h-24 bg-dark-800 flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-400 mt-1">Size: {item.size}</p>
                          </div>
                          <p className="font-semibold">${item.price}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-dark-700 rounded-sm">
                            <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="p-1.5 text-gray-400 hover:text-white transition-colors disabled:opacity-50" disabled={item.quantity <= 1}>
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="p-1.5 text-gray-400 hover:text-white transition-colors">
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.cartId)} className="text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-wider">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

           
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-dark-800 bg-dark-900">
                <div className="flex justify-between text-lg font-medium mb-6">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">Shipping and taxes calculated at checkout.</p>
                <button className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
