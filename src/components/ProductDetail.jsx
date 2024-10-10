import PropTypes from 'prop-types';
import { useState } from 'react';
import { LuRotateCcw, LuStar, LuTruck } from 'react-icons/lu';

const ProductDetail = ({ product }) => {
    // destructure product
    const {
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        tags,
        sku,
        weight,
        dimensions,
        warrantyInformation,
        shippingInformation,
        availabilityStatus,
        reviews,
        returnPolicy,
        minimumOrderQuantity,
        images,
        thumbnail
    } = product;

    // state for main image
    const [mainImage, setMainImage] = useState(thumbnail);

    // handle image click
    const handleImageClick = (image) => {
        setMainImage(image);
    };

    // calculate discounted price
    const discountedPrice = price - (price * discountPercentage / 100);

    return (
        <div className="mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img src={mainImage} alt={title} className="w-full h-auto rounded-lg shadow-md mb-4" />
                    <div className="grid grid-cols-4 gap-2">
                        {[thumbnail, ...images].map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${title} ${index + 1}`}
                                className={`w-full h-auto rounded-lg shadow-sm cursor-pointer ${image === mainImage ? 'border-2 border-orange-500' : ''
                                    }`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <p className="text-gray-600 mb-4">{description}</p>
                    <div className="flex items-center mb-4">
                        <span className="text-2xl font-bold mr-2">${discountedPrice.toFixed(2)}</span>
                        <span className="text-gray-500 line-through">${price.toFixed(2)}</span>
                        <span className="ml-2 text-green-600">({discountPercentage}% off)</span>
                    </div>
                    <div className="flex items-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <LuStar key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                        ))}
                        <span className="ml-2 text-gray-600">({rating})</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p>Category: <span className="font-semibold">{category}</span></p>
                        <p>Tags: {tags.map((tag) => (
                            <span key={tag} className="font-semibold rounded-full bg-gray-200 px-2 py-1 mr-2 text-xs">{tag}</span>
                        ))}</p>
                        <p>SKU: {sku}</p>
                        <p>Weight: {weight}g</p>
                        <p>Dimensions: {dimensions.width}W x {dimensions.height}H x {dimensions.depth}D cm</p>
                        <p>Stock: {stock} available</p>
                        <div className="flex items-center">
                            <LuTruck className="w-5 h-5 mr-2" />
                            <span>{shippingInformation}</span>
                        </div>
                        <div className="flex items-center">
                            <LuRotateCcw className="w-5 h-5 mr-2" />
                            <span>{returnPolicy}</span>
                        </div>
                        <p>Warranty: {warrantyInformation}</p>
                        <p>Availability: <span className="font-semibold text-green-600">{availabilityStatus}</span></p>
                        <p>Minimum Order Quantity: {minimumOrderQuantity}</p>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                    {reviews.map((review, index) => (
                        <div key={index} className="mb-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <LuStar key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
                                ))}
                                <span className="ml-2 font-semibold">{review.reviewerName}</span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

ProductDetail.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        discountPercentage: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        sku: PropTypes.string.isRequired,
        weight: PropTypes.number.isRequired,
        dimensions: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            depth: PropTypes.number.isRequired,
        }).isRequired,
        warrantyInformation: PropTypes.string.isRequired,
        shippingInformation: PropTypes.string.isRequired,
        availabilityStatus: PropTypes.string.isRequired,
        reviews: PropTypes.arrayOf(
            PropTypes.shape({
                rating: PropTypes.number.isRequired,
                comment: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                reviewerName: PropTypes.string.isRequired,
                reviewerEmail: PropTypes.string.isRequired,
            })
        ).isRequired,
        returnPolicy: PropTypes.string.isRequired,
        minimumOrderQuantity: PropTypes.number.isRequired,
        meta: PropTypes.shape({
            createdAt: PropTypes.string.isRequired,
            updatedAt: PropTypes.string.isRequired,
            barcode: PropTypes.string.isRequired,
            qrCode: PropTypes.string.isRequired,
        }).isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        thumbnail: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProductDetail;