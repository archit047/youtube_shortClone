import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store)=>store.search);

  /**
   * 
   * searchCache = {
   * "iPhone":["iPhone 11","iphone 14"]
   * }
   * searchQuery = iphone
   */ 
  console.log(searchQuery);

  useEffect(() => {
    //Api call
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        console.log(searchCache[searchQuery]);
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);
    return () => {
      clearTimeout(timer);
    };
    // make an api call after every keypress
    // but if the difference between 2 api calls is <200ms
    // decline the api call
  }, [searchQuery]);

  /**
   *
   * key - i
   * - render the component
   * - useEffect();
   * - start timer => make api call after 200 ms
   *
   * key -ip
   * - destroy the component (useEffect return method)
   * - re-render the component
   * - useEffect()
   * - start timer => make api call after 200 ms
   *
   *  settimeout(200) - make an api call after 200 ms
   *
   */

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    console.log(json[1]);
    setSuggestions(json[1]);

    //update cache
    dispatch(cacheResults({
      // [searchQuery]:json[1],
      [searchQuery]:json[1]
    }));
  };

  const dispatch = useDispatch();

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col m-3 shadow-lg">
      <div className="flex col-span-1">
        <img
          onClick={() => toggleMenuHandler()}
          className="h-10 cursor-pointer"
          alt="menu"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkT0wieE1QTEq8ECvud1nLejeRb3gLOi9vcg&usqp=CAU"
        />
        <a href="/">
          <img
            className="h-10 mx-2"
            alt="youtube-logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbNq4ur4V24EVoI0UBhBdGWipSCpYshZou4A&usqp=CAU"
          />
        </a>
      </div>

      <div className="col-span-8 px-10">
        <div>
          <input
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setShowSuggestions(false)}
          />
          <button className="border border-gray-400 px-5 py-2 rounded-r-full bg-gray-100">
            Search
          </button>
          {showSuggestions && (
            <div className="fixed bg-white py-2 px-5 w-[37rem] shadow-lg rounded-lg border border-gray-100">
              <ul>
                {/* <li className="py-2 shadow-sm hover:bg-gray-100">🔎 Iphone</li>
              <li className="py-2 shadow-sm">🔎 Iphone</li>
              <li className="py-2 shadow-sm">🔎 Iphone</li>
              <li className="py-2 shadow-sm">🔎 Iphone</li>
              <li className="py-2 shadow-sm">🔎 Iphone</li>
              <li className="py-2 shadow-sm">🔎 Iphone</li> */}
                {suggestions.map((s) => (
                  <li key={s} className="py-2 shadow-sm hover:bg-gray-100">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div>
        <img
          className="h-10"
          alt="user"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5ArKQ5AIUqacA-5ofQ5nfPevwR0RtI7PBtg&usqp=CAU"
        />
      </div>
    </div>
  );
};

export default Head;
