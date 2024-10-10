import { useEffect } from "react"
import ProductItem from "./ProductItem"
import toast from "react-hot-toast"
import axios from "axios"
import { useCallback } from "react"
import { useState } from "react"

const ProductList = () => {
    const [products, setProducts] = useState([])

    // fetching product data from api
    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get("https://dummyjson.com/products?limit=12")

            if (res.data) {
                toast.success("Data fetched successfully!")
                setProducts(res.data.products)
            } else {
                toast.error("Unable to fetch data!")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!")
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className="grid md:grid-cols-6 grid-cols-2 gap-4">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductList