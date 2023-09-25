import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    // <div className="bg-white z-10 sticky top-0 text-center border border-green-600 my-4">
    //   <h1 className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent font-bold text-5xl py-4 ">
    //     Bulletin Board
    //   </h1>
    // </div>
    <div className="navbar flex justify-between sticky top-0 z-10 bg-white rounded">
      {/* <div className="navbar-start">
      <button className="btn btn-ghost btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div> */}
      <div className="navbar-center">
        <Link className="btn btn-ghost normal-case bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent text-2xl">Bulletin Board</Link>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-left dropdown-bottom">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to='/'>Homepage</Link></li>
            {/* <li><Link>Portfolio</Link></li>
            <li><Link>About</Link></li> */}
          </ul>
        </div>
      </div>
  </div>
  );
};

export default Navbar;
