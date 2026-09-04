import { FaExclamationTriangle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

export const PageNotFound = ({ urlCategory }: { urlCategory: string }) => {
    const navigate = useNavigate()

    return (
        <section id="catalog" className="py-50 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <FaExclamationTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-6" />
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        The page  "{urlCategory}" does not exist or has been removed.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/laptops')}
                            className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Explore others
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}