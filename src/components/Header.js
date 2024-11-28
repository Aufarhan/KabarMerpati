import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  const savedArticles = useSelector((state) => state.saved.savedArticles);
  const hasSavedArticles = savedArticles.length > 0;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <header className="bg-gray-800 flex justify-center py-4">
      <div className="flex justify-between items-center w-[90dvw]">
        <div className="flex flex-row items-center">
          <h1 className="text-2xl text-red-500 tracking-tight">
            Berita<span className="font-bold text-gray-300">Merpati</span>
          </h1>
          <div className="text-red-500 px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-origami"
            >
              <path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025" />
              <path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009" />
              <path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027" />
            </svg>
          </div>
          <nav className="flex px-8 gap-12 text-gray-300 items-center tracking-wide text-sm font-semibold uppercase">
            <Link className="hover:text-md hover:text-red-500 transition duration-200" to="/">
              Indonesia
            </Link>
            <Link className="hover:text-md hover:text-red-500 transition duration-200" to="/programming">
              Programming
            </Link>
            <Link
              className={`hover:text-md hover:text-red-500 transition duration-200 ${hasSavedArticles ? "animate-pulse text-red-500" : ""}`} 
              to="/saved"
            >
              Saved
            </Link>
          </nav>
        </div>
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="p-2 rounded-l-[0.6rem] placeholder-gray-400 text-gray-400 bg-gray-900 ring ring-gray-700 w-[15dvw] px-4"
          />
          <button
            type="submit"
            className="bg-red-500 ring ring-red-500 text-white px-4 py-2 rounded-r-[0.6rem] w-[6dvw]"
          >
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
