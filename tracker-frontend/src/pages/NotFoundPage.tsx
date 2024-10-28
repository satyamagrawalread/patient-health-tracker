import { HomeIcon, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* SVG Illustration */}
      <div className="w-64 h-64 mb-8">
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M250 450C361.127 450 450 361.127 450 250C450 138.873 361.127 50 250 50C138.873 50 50 138.873 50 250C50 361.127 138.873 450 250 450Z" 
            fill="#F3F4F6"
          />
          <path 
            d="M160 200C160 189.333 168 180 180 180H200V320H180C168 320 160 310.667 160 300V200Z" 
            fill="#6B7280"
          />
          <path 
            d="M340 200C340 189.333 332 180 320 180H300V320H320C332 320 340 310.667 340 300V200Z" 
            fill="#6B7280"
          />
          <path 
            d="M220 180H280V320H220V180Z" 
            fill="#6B7280"
          />
          <path 
            d="M250 140L290 180H210L250 140Z" 
            fill="#6B7280"
          />
        </svg>
      </div>

      {/* Error Message */}
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        Oops! The page you're looking for seems to have gone on vacation. 
        Don't worry, these things happen to the best of us.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </button>

        <button 
          onClick={() => window.location.href = '/'}
          className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <HomeIcon className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        <button 
          onClick={() => window.location.href = '/search'}
          className="flex items-center justify-center px-6 py-3 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <Search className="w-4 h-4 mr-2" />
          Search Site
        </button>
      </div>

      {/* Additional Help Text */}
      <p className="mt-8 text-sm text-gray-500 text-center">
        If you believe this is a mistake, please{' '}
        <a href="/contact" className="text-indigo-600 hover:text-indigo-800 underline">
          contact our support team
        </a>
      </p>
    </div>
  )
}
