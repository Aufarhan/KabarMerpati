import React, { useEffect, useState } from "react";
import { fetchNewsItem } from "../utils/api";
import NewsItem from "../components/NewsItem";
import PopularArticles from "../components/PopularArticles";

const Programming = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedArticles = await fetchNewsItem("Programming", page);
      setArticles(fetchedArticles);
      setHasMore(fetchedArticles.length > 0);
    };
    fetchData();
  }, [page]);

  const handleNext = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-gray-300  flex items-center justify-center min-h-screen pb-[4dvh]">
      <div className="w-[90dvw]">
        <div className="h-[24dvh] relative overflow-hidden shadow-lg rounded-[1rem] my-[2dvh]">
          <div className="h-full w-full flex bg-gradient-to-t from-gray-800/90 via-gray-800/70 to-gray-800/90 absolute"></div>
          <img src="/images/heroProgramming.jpg" alt="Contoh" className="h-full w-full object-cover" />
          <div className="text-red-500 px-2 absolute w-full h-full left-0 top-0 flex items-end justify-center pb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-origami"><path d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025"/><path d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009"/><path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027"/></svg>
          </div>
          <div className="absolute w-full h-full left-0 top-0 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-200">Today's</h1>
            <h1 className="text-4xl font-extrabold text-gray-200">Programming <span className="text-red-500">News</span></h1>
        </div>
        </div>
        <div className="my-4 flex gap-2">
          <button onClick={handlePrev} disabled={page === 0} className="text-gray- font-semibold flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>Previous
          </button>
          <p>|</p>
          <button onClick={handleNext} disabled={!hasMore} className="text-gray- font-semibold flex flex-row">
            Next<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
          </button>
        </div>
        <div className="grid grid-cols-3 gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 col-span-2">
          {articles.length > 0 && (
            <div className="lg:col-span-3">
              <NewsItem article={articles[0]} large />
            </div>
          )}
          {articles.slice(1).map((article, index) => (
            <NewsItem key={index} article={article} />
          ))}
          </div>
          <div className="col-span-1" id="popularArtikel">
            <PopularArticles />
          </div>
        </div>
        <div className="my-4 flex gap-2">
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


export default Programming;
