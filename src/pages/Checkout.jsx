import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCreditCard, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/reducer';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.items);
    const total = cartItems.reduce((acc, item) => acc + (item.discountedPrice * item.quantity), 0);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/');
            toast.error('Cart is empty');
        }
    }, [cartItems, navigate]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(clearCart());
        toast.success('Order submitted successfully', {
            icon: "🛍️",
            position: 'top-center',
            duration: 3000
        });
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                placeholder="Full Name"
                                className="w-full p-2 border rounded"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full p-2 border rounded mt-2"
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                className="w-full p-2 border rounded mt-2"
                                required
                            />
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    placeholder="City"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleInputChange}
                                    placeholder="ZIP Code"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
                            <div className="flex items-center border rounded p-2">
                                <FaCreditCard className="text-gray-400 mr-2" />
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleInputChange}
                                    placeholder="Card Number"
                                    className="w-full outline-none"
                                    required
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="text"
                                    name="expiryDate"
                                    value={formData.expiryDate}
                                    onChange={handleInputChange}
                                    placeholder="MM/YY"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                                <input
                                    type="text"
                                    name="cvv"
                                    value={formData.cvv}
                                    onChange={handleInputChange}
                                    placeholder="CVV"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors">
                            Place Order
                        </button>
                    </form>
                </div>
                <div className="md:w-1/3">
                    <div className="bg-gray-100 p-4 rounded-md">
                        <h2 className="text-xl font-semibold mb-2 flex items-center">
                            <FaShoppingCart className="mr-2" />
                            Order Summary
                        </h2>
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center mb-2">
                                <span>{item.title} x {item.quantity}</span>
                                <span>${(item.discountedPrice * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between items-center font-semibold">
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;