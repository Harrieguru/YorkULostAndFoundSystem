import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export const MainLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-6xl mx-auto p-6">
          <Outlet /> {/*Each page renders here*/}
        </main>
      </div>
    </>
  );
};

export default MainLayout;
