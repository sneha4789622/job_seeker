// HERO SECTION--------------------------------------------

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

function Home({ setLogin }) {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const searchJobHandler = () => {
    console.log("Searching for jobs with query:", query);
    // Implement search functionality here
    dispatch(setSearchedQuery(query));
    navigate('/browse');

  }

  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-slate-900">
            Find Your <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Dream Job
            </span>
            , Faster.
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mt-5 max-w-xl">
            Search thousands of job opportunities in one place and get hired faster.
          </p>
          
          <div className="mt-8">
            <div className="gap-3">
              <input className="w-full md:w-3/4 px-5 py-4 border border-slate-300 rounded-xl focus:ring-2
               focus:ring-indigo-500 outline-none transition" type="text" 
               placeholder="Job Title or Keywords"
                onChange={(e) => setQuery(e.target.value)} />
              <button className="mx-4 px-7 py-3 bg-blue-950 text-white rounded-md  cursor-pointer" onClick={(searchJobHandler)}>Search</button>
            </div>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative animate-float">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-30"></div>

          <img
            src="src/assets/hero-img.png"
            alt="hero"
            className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}

export default Home;
