import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Users, Leaf } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="h-12 w-12 md:h-16 md:w-16 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              Sustainable Fashion
              <span className="text-green-600"> Exchange</span>
            </h1>
            <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
              Give your clothes a second life. Swap, trade, and redeem points for sustainable fashion 
              while reducing waste and building a community of conscious consumers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center text-base md:text-lg"
              >
                Browse Items
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/register"
                className="border-2 border-green-600 text-green-600 px-6 md:px-8 py-3 rounded-lg hover:bg-green-50 transition-colors text-base md:text-lg"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
              How ReWear Works
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to sustainable fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Upload Your Items
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Share your gently used clothing with detailed photos and descriptions
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Connect & Swap
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Find items you love and propose swaps or redeem with points
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Sustainable Impact
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Reduce fashion waste and contribute to a circular economy
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
            Ready to Start Your Sustainable Fashion Journey?
          </h2>
          <p className="text-green-100 mb-6 md:mb-8 text-base md:text-lg">
            Join thousands of users already making a difference
          </p>
          <Link
            to="/register"
            className="bg-white text-green-600 px-6 md:px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold text-base md:text-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 