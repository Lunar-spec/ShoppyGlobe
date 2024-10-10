import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items);
    const total = cartItems.reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);

    return (
        <div className="flex flex-col md:h-96 md:w-96 w-72 h-72 shadow-lg animate-fade-left animate-duration-100 bg-white rounded-md transition-all ease-in-out duration-300">
            <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-orange-500 flex items-center gap-2">
                        <FaShoppingCart />
                        Your Cart
                    </h2>
                    <span className="text-gray-500">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} item(s)</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <FaShoppingCart className="text-4xl mb-2" />
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="p-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold text-orange-500">Total:</span>
                        <span className="font-semibold text-orange-500">${total.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" >
                        <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
                            Checkout
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Cart;