import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Share2, MessageCircle } from 'lucide-react';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch item details from API
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-56 md:h-96 bg-gray-200 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-md animate-pulse h-12 md:h-20"></div>
              ))}
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2">Item Title</h1>
              <p className="text-base md:text-lg text-gray-600">Item description will appear here...</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
              <div className="text-lg md:text-2xl font-bold text-green-600">150 points</div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-red-500">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Item Details</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs md:text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1 text-sm text-gray-900">Tops</dd>
                </div>
                <div>
                  <dt className="text-xs md:text-sm font-medium text-gray-500">Size</dt>
                  <dd className="mt-1 text-sm text-gray-900">M</dd>
                </div>
                <div>
                  <dt className="text-xs md:text-sm font-medium text-gray-500">Condition</dt>
                  <dd className="mt-1 text-sm text-gray-900">Good</dd>
                </div>
                <div>
                  <dt className="text-xs md:text-sm font-medium text-gray-500">Brand</dt>
                  <dd className="mt-1 text-sm text-gray-900">Nike</dd>
                </div>
                <div>
                  <dt className="text-xs md:text-sm font-medium text-gray-500">Color</dt>
                  <dd className="mt-1 text-sm text-gray-900">Blue</dd>
                </div>
                <div>
                  <dt className="text-xs md:text-sm font-medium text-gray-500">Material</dt>
                  <dd className="mt-1 text-sm text-gray-900">Cotton</dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Owner</h3>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full"></div>
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-900">Owner Name</p>
                  <p className="text-xs md:text-sm text-gray-500">Location</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button className="flex-1 bg-green-600 text-white py-2 md:py-3 px-4 rounded-md hover:bg-green-700 transition-colors text-sm md:text-base">
                Request Swap
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 md:py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center text-sm md:text-base">
                <MessageCircle className="h-5 w-5 mr-2" />
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 text-sm md:text-base">Item detail features coming soon...</p>
      </div>
    </div>
  );
};

export default ItemDetail; 