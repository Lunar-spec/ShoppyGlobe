import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const calculateDiscountedPrice = (price, discountPercentage) => {
    return price - (price * (discountPercentage / 100));
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        // adding product to cart
        addToCart: (state, action) => {
            const { id, title, price, discountPercentage } = action.payload;
            const discountedPrice = calculateDiscountedPrice(price, discountPercentage);

            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
                toast.success(`Increased ${title} quantity to ${existingItem.quantity}`);
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                    discountedPrice
                });
                toast.success(`Added ${title} to cart`);
            }
        },
        // removing product from cart
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
            toast.success(`Removed ${action.payload.title} from cart`);
        },
        // updating product quantity
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            const item = state.items.find(item => item.id === id);

            if (item) {
                item.quantity = quantity;
                toast.success(`Updated ${item.title} quantity to ${quantity}`);
            }
        },
        // clearing cart
        clearCart: (state) => {
            state.items = [];
            toast.success('Cleared cart');
        }
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;