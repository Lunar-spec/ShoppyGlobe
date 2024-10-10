import { FaCartShopping } from "react-icons/fa6"
import Cart from "./Cart"
import { useState } from "react"
import { GiDiplodocus } from "react-icons/gi"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Header = () => {
    const [openCart, setOpenCart] = useState(false);

    const cartItems = useSelector(state => state.cart.items)
    
    // cart count
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="flex relative justify-between items-center p-4 bg-orange-500 text-white">
            <Link to="/">
                <div className="font-bold text-3xl flex gap-2 items-center">
                    ShoppyGlobe
                    <GiDiplodocus className="text-5xl" />
                </div>
            </Link>
            <div
                className={`cursor-pointer p-2 relative rounded-full transition-all duration-300 ${openCart
                    ? "bg-white"
                    : "hover:bg-white/10"
                    }`}
                onClick={() => setOpenCart(!openCart)}
            >

                {cartCount > 0 && (
                    <span className="absolute top-1 left-6 text-white text-xs bg-red-500 rounded-full px-1">
                        {cartCount}
                    </span>
                )}

                <FaCartShopping
                    className={`text-xl ${openCart
                        ? "text-orange-500"
                        : "text-white"
                        }`}
                />
            </div>
            {openCart && (
                <div className="absolute right-14 top-10">
                    <Cart />
                </div>
            )}
        </div>
    )
}

export default Header