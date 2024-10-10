import PropTypes from 'prop-types';
import { FaCartPlus, FaStar } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/reducer';

const ProductItem = ({ product }) => {
    const dispatch = useDispatch();

    // adding product to cart
    const handleAddToCart = (e) => {
        e.preventDefault();
        dispatch(addToCart(product));
    }

    return (
        <Link to={`/product/${product.id}`} className="flex relative h-64 w-48 flex-col justify-center items-center gap-2 group rounded-sm hover:border-orange-500 shadow-md p-2 border-2 border-transparent transition-all duration-300 ease-in-out">
            <div className='absolute top-2 left-2 right-2 flex items-center justify-between z-20 w-[calc(100%-16px)]'>
                <div className='gap-1 rounded-sm bg-orange-500 flex items-center text-white px-1 py-0.5'>
                    <FaStar className='text-yellow-400' />
                    {product.rating}
                </div>
                <div className='flex items-center'>
                    <h2 className='text-base font-medium rounded-sm text-orange-500 group-hover:bg-white px-1 py-0.5'>${Number(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</h2>
                    <div
                        onClick={handleAddToCart}
                        className='z-20 cursor-pointer text-orange-500 p-2 rounded-full hover:bg-white'>
                        <FaCartPlus className='text-xl' />
                    </div>
                </div>
            </div>

            <img src={product.thumbnail} alt={product.title} className="h-full w-full object-contain" />
            <div className='group-hover:flex hidden absolute items-center justify-center h-full w-full bg-black/35 inset-0 text-white transition-all duration-300 ease-in-out'>
                <h1 className='text-base truncate text-ellipsis px-4'>{product.title}...</h1>
            </div>
        </Link>
    )
}

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        images: PropTypes.array.isRequired,
        description: PropTypes.string,
        category: PropTypes.string,
        rating: PropTypes.number.isRequired,
        thumbnail: PropTypes.string.isRequired,
        discountPercentage: PropTypes.number
    }).isRequired
}

export default ProductItem