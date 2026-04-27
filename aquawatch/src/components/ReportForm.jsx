import React, { useState } from 'react';
import { MapPin, Camera, FileText, Send, Map } from 'lucide-react';
import toast from 'react-hot-toast';
import { useApp } from '../context/AppContext';

export default function ReportForm() {
  const { addReport, CATEGORIES, currentUser } = useApp();
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    photoUrl: '',
    latitude: 28.6139,
    longitude: 77.2090,
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          toast.success('📍 Location detected!');
        },
        () => {
          toast.error('Could not detect location. Using default location.');
        }
      );
    } else {
      toast.error('Geolocation not supported by your browser.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.description) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate a brief delay for realism
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addReport(formData);
      toast.success('🎉 Report submitted successfully! +10 points earned!');
      
      // Reset form
      setFormData({
        category: '',
        description: '',
        photoUrl: '',
        latitude: 28.6139,
        longitude: 77.2090,
        address: ''
      });
    } catch (error) {
      toast.error('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-2">
          <FileText size={28} />
          <h1 className="text-2xl font-bold">Report a WASH Issue</h1>
        </div>
        <p className="text-primary-100">
          Help your community by reporting water and sanitation problems. 
          Your report will be visible on the map and tracked until resolution.
        </p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
        {/* Reporter Info */}
        {currentUser && (
          <div className="bg-primary-50 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-600 font-medium">Reporting as</p>
              <p className="text-primary-800 font-semibold">{currentUser.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-600">Current Points</p>
              <p className="text-2xl font-bold text-primary-700">{currentUser.points}</p>
            </div>
          </div>
        )}

        {/* Category Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Issue Category *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(CATEGORIES).map(([key, cat]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: key }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.category === key
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <span className="text-2xl block mb-1">{cat.icon}</span>
                <span className="text-sm font-medium text-gray-700">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the issue in detail. Include location specifics if helpful..."
            rows={4}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Enter address or landmark"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleLocationDetect}
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Map size={18} />
              <span>Detect Location</span>
            </button>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Coordinates: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
          </div>
        </div>

        {/* Photo Upload (Simplified) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Photo Evidence (Optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
            <Camera className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-sm text-gray-500">
              Photo upload coming soon! For now, describe the issue in detail.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Send size={20} />
              <span>Submit Report</span>
            </>
          )}
        </button>
      </form>

      {/* Tips Card */}
      <div className="bg-blue-50 rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-blue-800 mb-3">💡 Tips for a Great Report</h3>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Be specific about the location and the issue</li>
          <li>• Include any health impacts you've observed</li>
          <li>• Note how long the issue has been present</li>
          <li>• Photos are helpful when available</li>
        </ul>
      </div>
    </div>
  );
}
