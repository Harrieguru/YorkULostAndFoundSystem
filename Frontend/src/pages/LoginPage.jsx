import React from "react";
import yorkLogo from "../assets/york-logo.png";
import passportYork from "../assets/PassportYork.jpg";

export const LoginPage = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <header className="bg-red-600 text-white">
        {/* york logo */}
        <div className="flex justify-between items-center px-6 py-2 bg-white border-b">
          <img src={yorkLogo} alt="york university logo" className="h-25" />
        </div>

        {/* passport york title */}
        <div className="px-4 py-3">
          <h1 className="text-sm text-left font-semibold">Passport York</h1>
        </div>
      </header>

      <div className="">
        <div className="flex justify-center items-center">
          <img src={passportYork} alt="passport york logo" className="h-25" />
          <p className="text-left text-black ">
            <h4 className="flex inline-block text-lg font-bold">
              Passport York
            </h4>{" "}
            authenticates you as a member of the York community and gives you
            access to a wide range of computing resources and services
          </p>
        </div>

        <div></div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div className="">
            <label htmlFor="username" className="w-32 text-black text-lg mr-20">
              Username:
            </label>
            <input
              className="border p-2 cursor-pointer"
              type="text"
              id="username"
            />
          </div>

          <div className="">
            <label htmlFor="password" className="w-32 text-black text-lg mr-20">
              Password:
            </label>
            <input
              className="border p-2 cursor-pointer"
              type="password"
              id="password"
            />
          </div>

          <div className="flex flex-start ml-42">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-700 p-2 w-20 cursor-pointer"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
