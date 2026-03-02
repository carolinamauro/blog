"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [{
        name: 'Inicio',
        href: '/',
        pathname: '/',
    }, {
        name: 'Blog',
        href: 'blog',
        pathname: '/blog',
    }];

    const selectedStyle = 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white';
    const unselectedStyle = 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white';

    const pathname = usePathname();

    function isActive(currentPathname: string) {
        if (currentPathname === "/") {
          return pathname === "/";
        }
        return pathname.startsWith(currentPathname);
    }

    return (
        <nav className="relative bg-gray-800">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button 
                  type="button" 
                  data-command="--toggle" 
                  data-commandfor="mobile-menu" 
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className={`size-6 ${isMenuOpen ? 'hidden' : ''}`}>
                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className={`size-6 ${isMenuOpen ? '' : 'hidden'}`}>
                    <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                        <Link href={item.href} aria-current="page" key={item.name} className={isActive(item.pathname) ? selectedStyle : unselectedStyle}>{item.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="sm:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pt-2 pb-3">
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name} className={isActive(item.pathname) ? selectedStyle : unselectedStyle}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
    );
}