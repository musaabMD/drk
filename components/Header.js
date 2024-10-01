"use client";

import { useState, useEffect } from 'react';
import { Menu, Bookmark, BookOpen } from 'lucide-react';
import { createClient } from '@/libs/supabase/client';

// A sample Header component
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProButtonClicked, setIsProButtonClicked] = useState(false);
  const [isBookmarkClicked, setIsBookmarkClicked] = useState(false);
  const [user, setUser] = useState(null);

  // Initialize Supabase client
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, [supabase]);

  return (
    <nav className="bg-[#FCFCF9] shadow-md" style={{ height: '80px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="bg-black text-white font-bold py-2 px-4 rounded-full text-xl">
              DrKard
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <a href="#" className="border-transparent text-[#5f7d95] hover:border-[#14343B] hover:text-[#14343B] inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium">iOS</a>
            <a href="#" className="border-transparent text-[#5f7d95] hover:border-[#14343B] hover:text-[#14343B] inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium">Android</a>
            <a href="#" className="border-transparent text-[#5f7d95] hover:border-[#14343B] hover:text-[#14343B] inline-flex items-center px-1 pt-1 border-b-2 text-lg font-medium">Web</a>
          </div>
        </div>

        {/* Right Section: Icons and Profile */}
        <div className="flex items-center">
          <button
            type="button"
            className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14343B]"
            onClick={() => setIsBookmarkClicked(!isBookmarkClicked)}
          >
            <Bookmark
              className={`h-6 w-6 ${isBookmarkClicked ? 'fill-current text-black' : ''}`}
              aria-hidden="true"
            />
          </button>
          
          <button type="button" className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#14343B]">
            <BookOpen className="h-6 w-6" aria-hidden="true" />
          </button>

          <button
            onClick={() => setIsProButtonClicked(!isProButtonClicked)}
            className={`ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
              isProButtonClicked ? 'bg-[#22808D]' : 'bg-[#22808D] hover:bg-[#1A616F]'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1A616F]`}
          >
            Get Pro
          </button>

          {/* Profile Image */}
          <div className="ml-3 relative">
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="User profile"
                className="h-10 w-10 rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                {user?.email?.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="-mr-2 flex items-center sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#14343B]"
            aria-controls="mobile-menu"
            aria-expanded="false"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="block h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">iOS</a>
            <a href="#" className="border-transparent text-[#5f7d95] hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Android</a>
            <a href="#" className="border-transparent text-[#5f7d95] hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Web</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="User profile"
                  className="h-10 w-10 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium text-gray-700">
                  {user?.email?.charAt(0)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
