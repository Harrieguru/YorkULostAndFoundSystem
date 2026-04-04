import React from "react";
import { Link } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="flex flex-col min-h-[60vh]">
      <section className="text-black text-left">
        <h3 className="font-medium text-3xl mb-3">
          Have you lost an item on campus?{" "}
        </h3>
        <ul>
          <li>
            <Link
              to="/search"
              className="text-blue-600 hover:text-blue-400 transition-color leading-[2rem]"
            >
              Search our Inventory to see if it has been found
            </Link>
          </li>
          <li>
            <Link
              to="/report"
              className="text-blue-600 hover:text-blue-400 transition-color"
            >
              Report it missing so we can keep a look out for it
            </Link>
          </li>
        </ul>
      </section>

      <div className="flex justify-around items-center bg-gray-200 text-black mt-auto mb-10">
        <section className="leading-loose">
          <p>In Person Operation: </p>
          <p>South Ross building Room 107</p>
          <p>Monday to Friday 11:30 AM to 3:45 PM</p>
        </section>
        <section className="leading-loose">
          <p>Contact Us: </p>
          <p>Phone: 416 736 5534</p>
          <p>Email: lost@yorku.ca</p>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
