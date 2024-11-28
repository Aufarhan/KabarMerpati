import axios from "axios";

const API_KEY = process.env.REACT_APP_NYTIMES_API_KEY;
const BASE_URL = "https://api.nytimes.com/svc";

export const fetchNewsItem = async (query, page = 0) => {
  let attempts = 0; 
  const maxAttempts = 3; 
  const backoffDelay = 2000; 

  while (attempts < maxAttempts) {
    try {
      const { data } = await axios.get(`${BASE_URL}/search/v2/articlesearch.json`, {
        params: {
          q: query,
          page,
          "api-key": API_KEY,
        },
      });
      return data.response.docs.map((doc) => ({
        title: doc.headline.main,
        abstract: doc.abstract,
        multimedia: doc.multimedia,
        url: doc.web_url,
        author: doc.byline?.original || "Unknown Author", 
        publishedDate: doc.pub_date, 
        content: doc.lead_paragraph,
      }));
    } catch (error) {
      if (error.response?.status === 429) {
        console.warn(`Rate limited. Retrying in ${backoffDelay / 1000} seconds...`);
        attempts++;
        await new Promise((resolve) => setTimeout(resolve, backoffDelay)); 
      } else {
        throw error;
      }
    }
  }
  throw new Error("Exceeded maximum retry attempts. Please try again later.");
};

export const fetchPopularArticles = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/mostpopular/v2/viewed/1.json`,
      {
        params: { "api-key": API_KEY },
      }
    );
    return data.results.map((article) => ({
      title: article.title,
      url: article.url,
      multimedia: article.media?.[0]?.["media-metadata"]?.[2]?.url,
      publishedDate: article.published_date,
    }));
  } catch (error) {
    console.error("Failed to fetch popular articles:", error);
    throw error;
  }
};