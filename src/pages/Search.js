import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchNewsItem } from "../utils/api";
import NewsItem from "../components/NewsItem";

const Search = () => {
  const { query } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0); 
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        setIsLoading(true);
        const fetchedArticles = await fetchNewsItem(query, page);
        setArticles(fetchedArticles);
        setHasMore(fetchedArticles.length > 0);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [query, page]); 

  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <div className="bg-gray-300 flex items-center justify-center min-h-screen pb-[4dvh]">
      <div className="w-[90dvw]">
        <div className="flex flex-col items-center justify-center my-[4dvh] p-8 bg-gray-400/20 rounded-[0.5rem]">
          <h1 className="text-4xl font-extrabold text-slate-600">
            "{query}" <span className="text-red-500">News</span>
          </h1>
        </div>
        <div className="my-4 flex gap-2 justify-center">
          <button onClick={handlePrev} disabled={page === 0} className="text-gray- font-semibold flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>Previous
          </button>
          <p>|</p>
          <button onClick={handleNext} disabled={!hasMore} className="text-gray- font-semibold flex flex-row">
            Next<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
          </button>
        </div>
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {articles.length === 0 ? (
              <p>No results found.</p>
            ) : (
              articles.map((article) => <NewsItem key={article.url} article={article} />)
            )}
          </div>
        )}
        <div className="my-4 flex gap-2 justify-center">
          <button onClick={handlePrev} disabled={page === 0} className="text-gray- font-semibold flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>Previous
          </button>
          <p>|</p>
          <button onClick={handleNext} disabled={!hasMore} className="text-gray- font-semibold flex flex-row">
            Next<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
