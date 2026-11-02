import React from "react";

const NavBar = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-xs sticky top-0 z-40">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-sm shadow-purple-200">
            <i className="ri-links-line text-xl"></i>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-gray-950 text-xl font-bold tracking-tight">Shortly</span>
            </div>
            <p className="text-xs text-gray-600 font-medium hidden sm:block">Simple &amp; fast URL shortener</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <a
            href="https://github.com/sreedevrajendran/Shortly"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            title="View on GitHub"
          >
            <i className="ri-github-fill text-base"></i>
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
