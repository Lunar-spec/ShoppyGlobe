import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-5xl font-bold text-orange-500">404</h1>
            <h1 className="text-3xl font-bold text-orange-300">Page Not Found</h1>
            <h1 className="text-2xl font-bold text-orange-200">The page you are looking for does not exist</h1>
            <h1 className="text-xl font-bold text-orange-100">Please check the URL and try again</h1>
            <h1 className="text-xl font-bold text-orange-50">or go to the homepage</h1>

            <Link to="/">
                <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-md">
                    Go Home
                </button>
            </Link>
        </div>
    )
}

export default NotFound