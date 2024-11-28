import React, { useEffect, useState } from "react";
import { fetchPopularArticles } from "../utils/api";

const PopularArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getPopularArticles = async () => {
      try {
        const data = await fetchPopularArticles();
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularArticles();
  }, []);

  return (
    <div className="p-4 bg-gray-400/20 rounded-[0.5rem]">
      <h2 className="text-2xl font-bold tracking-tight mb-4 text-red-500">Popular Articles</h2>
      <div className="flex flex-col gap-y-4 items-center">
        {articles.map((article) => (
          <div key={article.url} className="bg-gray-100/20 shadow-md ring-1 ring-gray-400/10 w-full flex rounded-[.5rem] p-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <img
                src={article.multimedia || "https://via.placeholder.com/100"}
                alt={article.title}
                className="w-20 h-20 object-cover rounded shadow-lg"
              />
              <div className="px-4">
                <h3 className="text-lg font-medium">{article.title}</h3>
                <p className="text-sm text-gray-600">
                  Published: {new Date(article.publishedDate).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularArticles;
