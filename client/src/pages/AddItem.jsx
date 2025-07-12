import { useState } from 'react';
import { Upload, Plus } from 'lucide-react';

const AddItem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    pointsValue: '',
    brand: '',
    color: '',
    material: '',
    location: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement item creation
    console.log('Form data:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Add New Item</h1>
        <p className="text-gray-600 text-sm md:text-base">Share your gently used clothing with the community</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
          <label className="block text-sm font-medium text-gray-700 mb-2 md:mb-4">
            Item Images
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 text-center">
            <Upload className="mx-auto h-8 w-8 md:h-12 md:w-12 text-gray-400" />
            <p className="mt-2 text-xs md:text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB each</p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-base md:text-lg font-medium text-gray-900">Basic Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              placeholder="e.g., Vintage Denim Jacket"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              placeholder="Describe your item..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              >
                <option value="">Select category</option>
                <option value="Tops">Tops</option>
                <option value="Bottoms">Bottoms</option>
                <option value="Dresses">Dresses</option>
                <option value="Outerwear">Outerwear</option>
                <option value="Shoes">Shoes</option>
                <option value="Accessories">Accessories</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              >
                <option value="">Select size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="One Size">One Size</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Condition</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              >
                <option value="">Select condition</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Points Value</label>
              <input
                type="number"
                name="pointsValue"
                value={formData.pointsValue}
                onChange={handleChange}
                min="10"
                max="500"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
                placeholder="10-500"
              />
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-base md:text-lg font-medium text-gray-900">Additional Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
                placeholder="e.g., Nike, H&M"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
                placeholder="e.g., Blue, Red"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Material</label>
            <input
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              placeholder="e.g., Cotton, Polyester"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm md:text-base"
              placeholder="e.g., New York, NY"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 md:px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center text-sm md:text-base"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem; 