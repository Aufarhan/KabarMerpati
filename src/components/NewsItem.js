import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveArticle, unsaveArticle } from "../redux/slices/savedSlice";
import { toast } from "react-toastify"; 
const NewsItem = ({ article, large }) => {
  const dispatch = useDispatch();
  const savedArticles = useSelector((state) => state.saved.savedArticles);
  const isSaved = savedArticles.some((item) => item.url === article.url);

  const handleSave = () => {
    if (isSaved) {
      dispatch(unsaveArticle(article));
      toast.info("News removed from saved.");
    } else {
      dispatch(saveArticle(article));
      toast.success("News saved!");
    }
  };

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const imageUrl = article.multimedia?.[0]?.url
    ? `https://www.nytimes.com/${article.multimedia[0].url}`
    : `https://via.placeholder.com/200`;

  return (
    <div
      className={`rounded-[1rem] bg-gray-100/20 shadow-md ring-1 ring-gray-400/10 overflow-hidden ${
        large ? "lg:flex lg:flex-row-reverse gap-4" : "flex flex-col"
      }`}
    >
      <img
        src={imageUrl}
        alt={article.title}
        className={`${
          large
            ? "w-[30dvw] h-[40dvh] object-cover rounded-[1rem] shadow-lg"
            : "w-full h-[30dvh] object-cover rounded-[1rem] shadow-lg"
        }`}
      />
      <div className="flex flex-col justify-between">
        <div className="p-8 pt-8">
          <h2 className={`font-bold ${large ? "text-2xl" : "text-lg"}`}>
            {article.title}
          </h2>
          <div className="flex flex-col items-start justify-center gap-1 mt-1 text-slate-600">
            <p className="flex flex-row items-center gap-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-user-round-pen"
              >
                <path d="M2 21a8 8 0 0 1 10.821-7.487" />
                <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                <circle cx="10" cy="8" r="5" />
              </svg>
              {article.author}
            </p>
            <p className="flex flex-row items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-calendar-1"
              >
                <path d="M11 14h1v4" />
                <path d="M16 2v4" />
                <path d="M3 10h18" />
                <path d="M8 2v4" />
                <rect x="3" y="4" width="18" height="18" rx="2" />
              </svg>
              {formatDate(article.publishedDate)}
            </p>
          </div>
          <p className="text-gray-700 mt-4 mb-8">
            {truncate(article.content, 200)}
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold tracking-tight text-md underline underline-offset-2 px-1 text-blue-500"
            >
              NEWS PAGE
            </a>
          </p>
          <button
            onClick={handleSave}
            className={`px-8 tracking-wider text-sm font-semibold py-1 rounded-[0.3rem] uppercase ${
              isSaved ? "bg-red-500" : "bg-green-600"
            } text-gray-200`}
          >
            {isSaved ? "Un-Save" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
