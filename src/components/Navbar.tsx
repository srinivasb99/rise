// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Menu, X, LogOut, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './Button'; // Assumes Button handles dark mode
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Correctly imported
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { cn } from '../utils/cn'; // Assuming cn utility

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme(); // Use theme context

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false); // Close mobile menu
      navigate('/login');
    } catch (error) {
      console.error('Logout Failed:', error);
    }
  };

  // Define SVG fill colors based on theme
  const svgFillColor = theme === 'dark' ? '#FFFFFF' : '#002B5B'; // White for dark, Blue for light

  return (
    // Navbar background and border
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm dark:bg-gray-900 dark:border-b dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" aria-label="Home" className="flex items-center">
              {/* SVG with dynamic fill */}
              <svg
                className="h-16 w-auto" // Keep size consistent
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1796 1004" // Use correct viewBox
                preserveAspectRatio="xMidYMid meet"
                // Set fill dynamically
                fill={svgFillColor}
              >
                {/* Make sure the 'g' element doesn't override the fill */}
                <g transform="translate(0.000000,1004.000000) scale(0.100000,-0.100000)" stroke="none">
                    {/* Paste your CORRECTED SVG <path> data here */}
                     <path d="M7525 6501 c-130 -23 -159 -33 -282 -97 -222 -115 -327 -204 -449 -378 -96 -139 -115 -174 -156 -285 -67 -183 -73 -222 -73 -451 1 -198 2 -209 32 -322 42 -153 128 -324 221 -433 234 -278 501 -421 828 -445 77 -5 151 -10 166 -10 26 0 28 6 114 267 64 192 85 268 76 271 -7 2 -45 28 -85 58 -40 29 -85 63 -102 74 -27 19 -115 84 -363 267 -40 30 -94 65 -120 79 -26 14 -51 29 -56 35 -32 31 58 38 557 38 277 1 359 4 362 14 25 81 250 771 260 797 7 19 18 35 25 35 7 0 23 -36 37 -80 32 -106 65 -210 163 -512 l82 -253 119 0 119 0 0 124 c0 189 -38 367 -116 535 -34 74 -101 183 -116 189 -4 2 -8 10 -8 17 0 7 -46 60 -102 118 -179 182 -394 300 -633 347 -130 26 -357 26 -500 1z"/>
                    <path d="M13270 6319 c-106 -22 -346 -80 -357 -87 -6 -4 -13 -21 -15 -37 l-3 -30 55 3 c30 2 70 0 88 -3 64 -12 62 13 62 -868 0 -584 -3 -803 -12 -828 -16 -45 -42 -66 -111 -87 -55 -16 -58 -18 -55 -47 l3 -30 325 -3 c179 -1 335 0 348 3 18 4 23 11 20 33 -3 23 -9 28 -53 38 -65 14 -88 27 -111 61 -18 27 -19 67 -24 946 -5 895 -6 919 -24 933 -22 16 -68 17 -136 3z"/>
                    <path d="M10059 6220 c-106 -12 -292 -77 -383 -134 -79 -49 -199 -170 -264 -268 -127 -188 -182 -425 -162 -688 21 -277 95 -451 263 -611 121 -117 273 -191 457 -224 155 -28 292 -30 409 -6 108 23 251 82 334 140 60 41 179 164 229 237 61 89 125 232 150 336 19 80 22 119 22 278 -1 263 -26 366 -125 531 -82 138 -230 271 -365 329 -27 12 -98 35 -159 52 -123 33 -272 43 -406 28z m284 -158 c134 -62 244 -197 305 -372 53 -152 67 -259 67 -505 0 -253 -12 -332 -75 -478 -43 -100 -85 -156 -162 -214 -85 -65 -154 -86 -279 -87 -102 -1 -107 0 -180 36 -258 128 -384 454 -366 953 4 126 11 181 31 259 39 152 74 216 164 305 113 113 186 142 342 137 72 -2 96 -7 153 -34z"/>
                    <path d="M1197 6192 c-136 -3 -150 -9 -128 -50 8 -15 26 -22 66 -27 64 -8 125 -47 152 -97 17 -31 18 -84 21 -763 l3 -730 -23 -44 c-31 -61 -63 -81 -143 -91 -37 -5 -71 -12 -76 -17 -5 -5 -5 -22 -1 -38 l8 -30 400 -3 c366 -2 400 -1 412 15 6 9 12 27 12 39 0 19 -8 24 -57 34 -82 17 -142 48 -164 84 -17 29 -19 55 -19 338 l0 306 50 7 c94 13 96 12 231 -183 229 -331 264 -377 352 -469 64 -66 108 -102 160 -130 l72 -38 240 0 240 0 0 25 c0 22 -13 32 -98 75 -192 98 -247 152 -477 465 -78 107 -156 210 -172 228 -16 19 -27 39 -26 44 2 6 48 26 102 44 111 37 149 60 224 134 150 148 182 384 83 597 -41 87 -74 126 -143 173 -91 61 -196 90 -368 101 -129 8 -573 9 -933 1z m813 -113 c92 -14 176 -62 218 -123 53 -79 67 -142 67 -301 0 -122 -3 -147 -23 -196 -32 -79 -81 -132 -160 -171 l-66 -33 -191 0 -190 0 -2 390 c-2 374 -2 391 17 413 11 13 31 27 44 30 35 10 207 4 286 -9z"/>
                    <path d="M3381 6193 c-30 -6 -90 -43 -114 -71 -69 -77 -55 -233 25 -282 40 -24 160 -28 213 -6 40 17 91 83 106 139 20 75 -13 162 -76 198 -32 19 -114 31 -154 22z"/>
                    <path d="M14026 6188 c-54 -15 -121 -84 -136 -140 -23 -82 5 -173 63 -208 25 -16 50 -20 113 -20 96 0 132 18 177 91 34 56 42 102 28 157 -29 104 -125 151 -245 120z"/>
                    <path d="M3340 5570 c-228 -46 -270 -57 -272 -73 0 -7 -2 -25 -2 -40 l-2 -28 81 6 c73 6 82 5 99 -14 29 -32 36 -171 32 -571 -5 -432 -5 -431 -122 -469 -54 -17 -59 -21 -59 -47 l0 -29 325 -3 c179 -1 335 0 348 3 16 4 22 13 22 35 0 27 -3 29 -47 35 -65 8 -93 24 -117 65 -20 34 -21 53 -26 593 -5 599 -3 578 -55 576 -11 -1 -103 -18 -205 -39z"/>
                    <path d="M13968 5565 c-113 -23 -213 -45 -222 -48 -11 -5 -16 -19 -16 -52 0 -25 3 -45 6 -45 3 0 33 7 65 15 65 17 86 12 113 -27 14 -20 16 -81 16 -463 0 -266 -4 -454 -10 -476 -13 -46 -26 -57 -103 -84 -57 -19 -62 -23 -62 -50 l0 -30 342 -3 343 -2 6 24 c8 35 0 43 -49 51 -63 10 -115 48 -121 87 -3 18 -8 275 -11 572 -4 387 -9 543 -18 557 -16 26 -36 24 -279 -26z"/>
                    <path d="M4392 5589 c-162 -21 -310 -100 -381 -203 -35 -51 -56 -146 -48 -221 15 -149 96 -230 407 -409 132 -76 179 -124 201 -206 11 -40 10 -51 -9 -92 -28 -65 -65 -82 -154 -75 -41 4 -91 16 -122 30 -85 39 -185 152 -247 280 -26 52 -43 58 -78 25 -23 -20 -23 -25 -17 -119 16 -229 58 -266 348 -310 139 -21 144 -21 242 -4 134 23 215 57 280 115 98 90 135 201 103 311 -36 122 -124 207 -351 341 -242 143 -312 238 -256 353 29 59 85 89 155 82 105 -11 180 -68 277 -212 45 -67 64 -81 98 -70 18 6 20 15 20 93 0 100 -19 194 -46 223 -23 25 -126 56 -234 69 -93 11 -97 11 -188 -1z"/>
                    <path d="M5644 5591 c-85 -14 -152 -41 -229 -92 -197 -132 -296 -327 -296 -582 0 -166 29 -271 106 -387 88 -133 212 -207 398 -240 111 -19 124 -19 217 -5 73 10 118 24 169 50 87 43 127 78 189 163 74 103 87 146 56 190 -25 37 -50 27 -93 -36 -49 -73 -107 -126 -157 -143 -64 -22 -190 -17 -264 11 -81 30 -174 115 -220 201 -30 58 -69 181 -70 222 0 16 25 17 394 17 234 0 405 4 420 10 15 5 31 21 38 35 24 52 -46 277 -113 364 -79 102 -186 181 -281 207 -67 18 -198 25 -264 15z m127 -112 c57 -18 105 -63 139 -132 33 -68 68 -212 57 -240 -6 -15 -30 -17 -257 -17 -225 0 -251 2 -257 17 -11 29 15 145 48 210 75 148 155 196 270 162z"/>
                    <path d="M15447 5590 c-103 -13 -160 -40 -270 -130 -38 -30 -70 -55 -73 -55 -3 0 -6 32 -8 70 -3 82 -18 115 -49 115 -23 0 -194 -34 -352 -71 -49 -11 -100 -22 -112 -25 -19 -4 -23 -11 -23 -44 l0 -40 68 3 c85 3 118 -13 132 -62 12 -44 13 -787 1 -849 -11 -57 -49 -95 -122 -122 -55 -20 -60 -24 -57 -48 l3 -27 331 -3 332 -2 4 24 c7 34 -1 43 -47 51 -107 20 -105 9 -105 477 l0 394 38 35 c99 93 171 125 256 115 75 -10 109 -34 142 -103 l29 -58 3 -367 c2 -243 -1 -380 -8 -407 -10 -37 -16 -43 -81 -73 -61 -29 -69 -36 -67 -58 l3 -25 324 -3 c340 -2 355 -1 349 42 -2 15 -18 24 -62 37 -69 21 -102 49 -116 98 -6 21 -10 184 -10 381 0 193 -5 374 -11 410 -28 173 -144 298 -290 315 -30 3 -63 7 -74 9 -11 2 -46 0 -78 -4z"/>
                    <path d="M16760 5591 c-190 -27 -378 -168 -461 -346 -54 -116 -70 -196 -70 -333 1 -138 15 -205 71 -319 83 -169 221 -265 440 -304 109 -19 120 -19 212 -5 134 22 215 61 298 145 41 42 79 93 102 139 36 69 37 75 23 102 -26 50 -65 53 -87 7 -25 -53 -114 -143 -158 -161 -180 -72 -401 18 -499 204 -32 61 -71 179 -71 216 l0 24 403 0 c446 0 440 -1 452 64 4 19 -1 62 -10 102 -54 219 -198 390 -372 444 -74 23 -194 32 -273 21z m145 -125 c60 -28 85 -54 120 -125 27 -54 61 -211 51 -237 -5 -12 -47 -14 -258 -12 l-253 3 -3 39 c-8 97 82 274 167 327 56 36 108 38 176 5z"/>
                    <path d="M11700 5575 c-30 -7 -122 -27 -205 -44 -195 -42 -195 -42 -195 -87 l0 -37 61 7 c74 9 122 -5 138 -40 8 -17 11 -150 11 -447 0 -391 -2 -425 -19 -463 -23 -50 -48 -69 -113 -85 -46 -12 -49 -15 -46 -44 l3 -30 330 0 330 0 0 30 c0 28 -4 31 -47 40 -59 13 -88 41 -99 96 -4 24 -8 207 -9 405 l0 362 56 51 c91 83 138 106 214 105 76 0 127 -21 159 -64 40 -54 46 -122 46 -500 0 -335 -1 -357 -20 -395 -17 -33 -27 -41 -60 -48 -59 -13 -70 -21 -70 -53 l0 -29 333 -3 332 -2 0 34 c0 32 -3 34 -47 45 -26 7 -59 21 -75 32 -57 41 -58 47 -58 416 0 475 -18 574 -124 671 -75 69 -116 85 -238 90 -88 4 -118 1 -176 -17 -70 -21 -155 -75 -220 -141 -42 -41 -52 -31 -52 55 0 103 -23 118 -140 90z"/>
                    <path d="M7144 3584 c-28 -13 -59 -33 -69 -44 -39 -43 -35 -153 8 -198 24 -26 102 -68 180 -97 101 -38 113 -143 22 -181 -61 -25 -117 -18 -175 21 -60 41 -66 42 -80 16 -20 -38 -11 -52 53 -80 83 -38 130 -44 195 -27 71 19 98 38 122 86 54 106 0 203 -145 256 -105 40 -145 74 -145 125 0 35 4 40 42 60 52 27 125 22 169 -10 36 -27 63 -24 67 7 5 32 -12 49 -66 66 -87 27 -123 27 -178 0z"/>
                    <path d="M11189 3586 c-68 -37 -99 -78 -99 -132 0 -88 43 -133 181 -194 87 -37 99 -46 114 -80 15 -33 15 -42 3 -66 -16 -35 -57 -56 -119 -62 -49 -5 -95 13 -137 51 -29 27 -57 13 -57 -29 0 -32 29 -51 124 -80 150 -46 302 73 262 206 -16 53 -82 109 -165 140 -82 30 -136 72 -136 105 0 88 103 124 199 70 54 -31 69 -31 77 0 8 33 -8 51 -64 69 -86 29 -132 29 -183 2z"/>
                    <path d="M7665 3586 c-16 -7 -51 -36 -77 -64 -62 -67 -83 -135 -75 -248 7 -93 22 -135 72 -204 45 -62 102 -90 178 -90 70 0 114 17 156 61 75 80 107 175 98 294 -9 123 -55 195 -152 241 -57 27 -150 32 -200 10z m212 -100 c53 -59 67 -107 60 -212 -9 -150 -65 -220 -174 -218 -97 3 -153 62 -172 186 -17 105 8 200 67 256 39 35 60 42 122 38 50 -3 57 -6 97 -50z"/>
                    <path d="M8574 3586 c-3 -8 -4 -112 -2 -233 3 -204 4 -221 26 -260 32 -61 56 -79 127 -98 58 -16 66 -16 118 -1 129 38 145 78 149 379 l3 217 -32 0 -31 0 -4 -222 c-3 -211 -4 -225 -26 -259 -12 -20 -36 -42 -52 -49 -41 -17 -125 -8 -151 16 -46 40 -53 76 -56 299 -2 115 -5 210 -6 211 -1 0 -14 4 -30 8 -19 5 -29 2 -33 -8z"/>
                    <path d="M10015 3581 c-115 -52 -178 -216 -142 -368 18 -79 70 -166 121 -201 35 -24 48 -27 121 -27 72 0 86 3 124 28 148 98 179 388 54 509 -77 74 -191 99 -278 59z m186 -64 c19 -12 47 -46 62 -75 25 -46 29 -63 28 -138 -1 -109 -15 -160 -55 -200 -99 -99 -256 -43 -286 102 -27 129 5 247 82 308 44 35 120 36 169 3z"/>
                    <path d="M10528 3593 c-20 -5 -26 -73 -23 -278 2 -77 3 -182 4 -233 l1 -93 33 3 32 3 -1 247 c0 136 3 245 6 243 4 -3 13 -19 20 -37 14 -34 194 -355 236 -420 20 -32 30 -38 59 -38 l35 0 2 285 c0 157 1 291 2 298 1 7 -14 13 -38 15 l-38 3 3 -250 c3 -137 3 -249 2 -248 -1 1 -25 47 -54 102 -78 151 -210 378 -227 393 -16 12 -24 13 -54 5z"/>
                    <path d="M8152 3293 l3 -298 165 0 165 0 0 30 0 30 -127 3 -128 3 -1 237 c-1 130 0 249 1 265 1 25 -1 27 -39 27 l-41 0 2 -297z"/>
                    <path d="M9112 3563 c3 -27 5 -28 63 -29 33 0 72 -1 88 -2 l27 -2 0 -270 0 -270 35 0 35 0 0 270 0 270 83 0 c90 0 111 8 105 36 -3 18 -17 19 -221 22 l-218 2 3 -27z"/>
                    <path d="M9658 3528 c-7 -96 -8 -490 -1 -515 4 -18 12 -23 39 -23 l34 0 0 300 0 300 -34 0 -34 0 -4 -62z"/>
                </g>
              </svg>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {/* Theme Toggle Button - Desktop */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Navigation Links with Dark Mode Styles */}
            <Link to="/" className={cn('transition-colors', isActive('/') ? 'text-primary dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white')}>Home</Link>
            <Link to="/about" className={cn('transition-colors', isActive('/about') ? 'text-primary dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white')}>About</Link>
            <Link to="/services" className={cn('transition-colors', isActive('/services') ? 'text-primary dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white')}>Services</Link>

            {/* Conditional Auth Links/Buttons */}
            {currentUser ? (
              <>
                <Link to="/dashboard" className={cn('transition-colors', isActive('/dashboard') ? 'text-primary dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white')}>
                  Dashboard
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                 <Link to="/login" className={cn('transition-colors', isActive('/login') ? 'text-primary dark:text-blue-300 font-medium' : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white')}>
                  Login
                </Link>
                <Link to="/signup">
                  <Button size="sm" onClick={() => setIsOpen(false)}>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button Area */}
          <div className="md:hidden flex items-center">
             {/* Theme Toggle Button - Mobile */}
             <button
                onClick={toggleTheme}
                className="p-2 mr-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary dark:focus-visible:ring-offset-gray-900 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            {/* Hamburger/Close Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Mobile Navigation Links */}
            <Link to="/" className={cn('block px-3 py-2 rounded-md text-base font-medium transition-colors', isActive('/') ? 'text-primary bg-blue-50 dark:text-blue-300 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-blue-50 dark:hover:text-white dark:hover:bg-gray-800')} onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" className={cn('block px-3 py-2 rounded-md text-base font-medium transition-colors', isActive('/about') ? 'text-primary bg-blue-50 dark:text-blue-300 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-blue-50 dark:hover:text-white dark:hover:bg-gray-800')} onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" className={cn('block px-3 py-2 rounded-md text-base font-medium transition-colors', isActive('/services') ? 'text-primary bg-blue-50 dark:text-blue-300 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-blue-50 dark:hover:text-white dark:hover:bg-gray-800')} onClick={() => setIsOpen(false)}>Services</Link>

            {/* Mobile Conditional Auth Links */}
            <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className={cn('block px-3 py-2 rounded-md text-base font-medium transition-colors', isActive('/dashboard') ? 'text-primary bg-blue-50 dark:text-blue-300 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-blue-50 dark:hover:text-white dark:hover:bg-gray-800')} onClick={() => setIsOpen(false)}>
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-blue-50 dark:hover:text-white dark:hover:bg-gray-800 flex items-center transition-colors">
                     <LogOut className="h-4 w-4 mr-2" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={cn('block px-3 py-2 rounded-md text-base font-medium transition-colors', isActive('/login') ? 'text-primary bg-blue-50 dark:text-blue-300 dark:bg-gray-800' : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-blue-50 dark:hover:text-white dark:hover:bg-gray-800')} onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <div className="px-3 py-2 mt-1">
                    <Link to="/signup">
                      <Button className="w-full" size="sm" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
