import { Link, useNavigate } from "react-router-dom";
import yorkLogo from "../assets/york-logo.png";
import { useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isStaff = user.role === "staff";

  const NAV_LINKS = isStaff
    ? [
        { label: "Main", to: "/" },
        { label: "Search Inventory", to: "/search" },
        { label: "Add Item", to: "/staff/add" },
      ]
    : [
        { label: "Main", to: "/" },
        { label: "Search Inventory", to: "/search" },
        { label: "Report Missing Item", to: "/report" },
      ];

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  }

  useEffect(() => {
    console.log(user.username);

    

  }, []);

    let loginFeedback = '';


    if(user.username == undefined){
      loginFeedback = "Welcome, Guest";
    }
    else if(user.username != undefined && isStaff == true){
      loginFeedback = "Welcome, Staff Member: " + user.username;
    }
    else{
      loginFeedback = "Welcome, User: " + user.username;
    }


  return (
    <>
      <header className="bg-red-500 text-white">
        {/* top bar with york logo */}
        <div className="flex justify-between items-center px-6 py-2 bg-white border-b">
          <img src={yorkLogo} alt="York University" className="h-25" />
          <p className="text-sm text-gray-600 rounded-sm "> 
            {loginFeedback} </p>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:bg-gray-400 cursor-pointer rounded-sm p-2"
            >
              Login/Logout
            </button>
        </div>

        {/* title bar */}
        <div className="px-4 py-3">
          <h1 className="text-medium text-left font-semibold">
            Lost and found management system
          </h1>
        </div>

        {/* nav links */}
        <nav className="text-left flex gap-1 px-6 pb-2 bg-red-600">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="px-4 py-1.5 text-sm rounded hover:bg-red-500 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
