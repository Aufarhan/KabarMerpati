import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NewsItem from "../components/NewsItem";

const Saved = () => {
  const savedArticles = useSelector((state) => state.saved.savedArticles);

  return (
    <div className="bg-gray-300  flex items-start justify-center min-h-screen py-[6dvh]">
      <div className="w-[90dvw]">
        <div className="flex flex-col items-center justify-center my-[4dvh] p-8 bg-gray-400/20 rounded-[0.5rem]">
          <h1 className="text-4xl font-extrabold text-slate-600">
            Saved <span className="text-red-500">News</span>
          </h1>
        </div>
        {savedArticles.length === 0 ? (
          <div className="text-center">
            <p className="pb-2">No articles saved. Try saving some!</p>
            <Link to="/" className="text-blue-500 underline underline-offset-4">
              Go back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {savedArticles.slice().reverse().map((article) => (
              <NewsItem key={article.url} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
