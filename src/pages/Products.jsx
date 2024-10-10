import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ProductItem from "../components/ProductItem";

const Products = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchString, setSearchString] = useState("");

    // fetching product data from api
    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get("https://dummyjson.com/products?limit=48");

            if (res.data) {
                toast.success("Data fetched successfully!");
                setAllProducts(res.data.products);
                setFilteredProducts(res.data.products);
            } else {
                toast.error("Unable to fetch data!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }, []);

    // fetching product data
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // filtering products based on search string
    useEffect(() => {
        const filtered = allProducts.filter((product) =>
            product.title.toLowerCase().includes(searchString.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchString, allProducts]);

    // handling search string change
    const handleSearchChange = (e) => {
        setSearchString(e.target.value);
    };

    return (
        <div className="md:mx-20 p-2 flex gap-2 flex-col justify-center items-center">
            <div className="flex items-center justify-center w-full">
                <input
                    value={searchString}
                    onChange={handleSearchChange}
                    type="text"
                    className="border border-orange-500 focus-within:outline-orange-500 px-2 py-1 rounded-full w-1/2"
                    placeholder="Search for products"
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {filteredProducts.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                        <ProductItem product={product} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Products;