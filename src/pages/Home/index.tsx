import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import { DebounceInput, Header } from "../../core/components";
import { clear } from "../../store/authentication/slice";
import ArrowDown from "../../assets/arrow-down.png";
import { useDispatch } from "react-redux";
import NotificationToastContext, {
  NotificationType,
} from "../../core/contexts/notification";
enum SortValue {
  Up = "UP",
  Down = "DOWN",
  None = "NONE",
}

export default function Home() {
  const [suggestions, setSuggestions] = useState<
    Array<{ title: string; id: number }>
  >([]);
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState<SortValue>(SortValue.None);
  const [news, setNews] = useState<Array<any>>([]);
  const [inputValue, setInputValue] = useState<any>(null);
  const newsCache = useRef([]);
  const { setViewNotification } = useContext(NotificationToastContext);

  const handlerSubmit = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue === "") {
      setSuggestions([]);
      return;
    }
    axios
      .get("https://62b16421196a9e987034823b.mockapi.io/suggestions")
      .then((response) => {
        const data = response.data;
        const searchValue = data.filter(
          (item: any): { title: string; id: number } =>
            item.title.includes(inputValue)
        );
        setSuggestions(searchValue);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inputValue]);

  const onLayoutClick = (e: any) => {
    if (e.target.id === "custom-home") setSuggestions([]);
  };

  const handlerPicking = (value: string) => {
    setSuggestions([]);
  };

  const getListNews = () => {
    axios
      .get("https://62b16421196a9e987034823b.mockapi.io/news")
      .then((response) => {
        console.log(response);

        const data = response.data;
        newsCache.current = data;
        setNews(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlerSort = () => {
    if (sortValue === SortValue.None) {
      const tempNews = [...news].sort((a, b) =>
        ("" + a.name).localeCompare(b.name)
      );
      setNews(tempNews);
      setSortValue(SortValue.Up);
    } else if (sortValue === SortValue.Up) {
      const tempNews = [...news].sort((a, b) =>
        ("" + b.name).localeCompare(a.name)
      );
      setNews(tempNews);
      setSortValue(SortValue.Down);
    } else if (sortValue === SortValue.Down) {
      setNews(newsCache.current);
      setSortValue(SortValue.None);
    }
  };

  return (
    <>
      <Header />
      <div
        className="w-full h-screen pt-5"
        id="custom-home"
        onClick={onLayoutClick}
      >
        <div className="md:container mx-auto ">
          <div className="relative">
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <DebounceInput onSubmit={handlerSubmit} />
              <button
                type="submit"
                onClick={getListNews}
                className="text-white absolute right-0 bottom-0 bg-slate-500 hover:bg-slate-600 duration-300 focus:outline-0 focus:ring-blue-300 font-medium rounded-r-lg  text-sm px-4 py-5 "
              >
                Search
              </button>
            </div>
            <div
              style={{
                height: `${
                  suggestions.length > 0
                    ? suggestions.length <= 4
                      ? suggestions.length * 3.5 + "rem"
                      : "50rem"
                    : "0rem"
                }`,
              }}
              className={`max-h-60 duration-150 bg-gray-100 rounded-b-lg shadow-md overflow-auto z-10 absolute w-full`}
            >
              {suggestions.map((item) => (
                <div
                  className="w-full p-4 h-14 border-b border-white items-center flex hover:bg-slate-200 cursor-pointer"
                  key={item.id}
                  onClick={() => {
                    handlerPicking(item.title);
                  }}
                >
                  <p className="text-gray-700 font-semibold">{item.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="w-full flex  justify-end mt-5 cursor-pointer duration-300"
            onClick={handlerSort}
          >
            <div className="items-center text-sm px-3 py-4 rounded-lg border border-gray-200 flex select-none">
              Sort by Author
              <img
                src={ArrowDown}
                style={{
                  width: `${sortValue === SortValue.None ? "0" : "1rem"} `,
                }}
                className={`h-4 duration-300 ${
                  sortValue === SortValue.Up ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </div>
          <div className="masonry sm:masonry-sm md:masonry-md lg:masonry-lg pt-5 xl:masonry-xl">
            {news.length > 0 &&
              news.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="group rounded-lg shadow-md break-inside mb-4 hover:text-white hover:bg-slate-700 hover:shadow-lg hover:-translate-y-2 duration-300 cursor-pointer"
                >
                  <img src={newsItem.image} className="rounded-t-lg h-auto" />
                  <p className="p-4">{newsItem.description}</p>
                  <div className="flex justify-between items-center p-4">
                    <p className="italic text-sm text-slate-500 group-hover:text-gray-400">
                      {newsItem.name}
                    </p>
                    <p className="font-semibold text-sm text-slate-700 group-hover:text-gray-200">
                      {new Date(newsItem.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
