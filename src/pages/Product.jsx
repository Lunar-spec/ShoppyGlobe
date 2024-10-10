import axios from "axios";
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import ProductDetail from "../components/ProductDetail";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer";

const Product = () => {
    // using params to get id
    const params = useParams();

    const { id } = params;

    const [productData, setProductData] = useState({});

    // fetching product data from api
    const fetchProduct = useCallback(async () => {
        try {
            const res = await axios.get(`https://dummyjson.com/products/${id}`)
            if (res.data) {
                setProductData(res.data)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong!")
        }
    }, [id])

    useEffect(() => {
        fetchProduct()
    }, [id, fetchProduct])

    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();

        // dispatching action to reducer
        dispatch(addToCart(productData));
    }

    return (
        <div className="px-16 py-4">
            {productData && Object.keys(productData).length > 0 && (
                <div>
                    <div className="flex justify-between items-center">
                        <h1 className="md:text-3xl text-xl font-bold text-orange-500">Details about {productData.title}</h1>
                        <button onClick={handleAddToCart} className="font-semibold md:text-base text-sm">
                            Add to Cart
                        </button>
                    </div>
                    {/* Navigating to ProductDetail */}
                    <ProductDetail product={productData} />
                </div>
            )}
        </div>
    )
}

export default Product