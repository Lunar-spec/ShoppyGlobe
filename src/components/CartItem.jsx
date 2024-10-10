import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa6';
import { removeFromCart, updateQuantity } from '../redux/reducer';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity < 1) {
            dispatch(removeFromCart(item));
        } else {
            dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
        }
    }

    return (
        <div className="flex items-center gap-4 mb-4 p-2 hover:bg-gray-50 rounded-md">
            <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1 text-orange-500">
                <h3 className="text-base font-medium truncate">{item.title}</h3>
                <p className="text-orange-500 font-medium">
                    ${item.discountedPrice.toFixed(2)}
                    {item.discountPercentage > 0 && (
                        <span className="text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
                    )}
                </p>
                <div className="flex items-center justify-between gap-2 mt-1">
                    <div className='flex gap-2 items-center'>
                        <button
                            onClick={() => handleQuantityChange(item.quantity - 1)}
                            className="px-2 py-1 bg-gray-300 rounded-sm hover:bg-gray-200"
                        >
                            -
                        </button>
                        <span className='text-orange-500'>{item.quantity}</span>
                        <button
                            onClick={() => handleQuantityChange(item.quantity + 1)}
                            className="px-2 py-1 bg-gray-300 rounded-sm hover:bg-gray-200"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => dispatch(removeFromCart(item))}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white"
                    >
                        <FaTrash />
                    </button>
                </div>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discountedPrice: PropTypes.number.isRequired,
        discountPercentage: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        quantity: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
    }).isRequired,
};

export default CartItem;