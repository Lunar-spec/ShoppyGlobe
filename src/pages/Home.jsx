import { GiDiplodocus } from "react-icons/gi"
import hero from "../assets/hero.avif"
import ProductList from "../components/ProductList"
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div className="flex flex-col md:gap-4 gap-2 container">
            <div className="relative flex h-screen w-full">
                <img src={hero} alt="Hero" className="object-cover object-center h-full w-full" />
                <div className="absolute text-5xl font-bold text-white md:flex flex-1 flex-col items-center bottom-24 md:right-14 text-center">
                    <h1 className="px-4 py-2">Shop for a happy experience!</h1>
                    <h1 className="text-6xl flex items-center">Shop with Dino <GiDiplodocus /></h1>
                    {/* Shop Now -> Navigating to Products */}
                    <Link to="/products">
                        <button className="bg-orange-500 hover:bg-orange-400 text-2xl text-white font-bold py-2 px-4 rounded-full">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </div>
            <div className="md:px-32 px-14 flex flex-col gap-2">
                <div className="flex justify-between md:justify-normal md:gap-8 items-center">
                    <h1 className="md:text-4xl text-3xl font-bold text-orange-500">Our Products</h1>
                    {/* View All -> Navigating to Products */}
                    <Link to="/products">
                        <button className="text-sm font-medium">View All</button>
                    </Link>
                </div>
                <div className="text-sm text-gray-400 text-left">
                    Browse our selection of products for your every need.
                </div>
                {/* Product List */}
                <ProductList />
            </div>
        </div>
    )
}

export default Home