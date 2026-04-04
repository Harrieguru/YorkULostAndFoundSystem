import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import SearchInventoryPage from "./pages/SearchInventoryPage";
import ReportMissingPage from "./pages/ReportMissingPage";
import StaffAddItemPage from "./pages/StaffAddItemPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchInventoryPage />} />
          <Route path="/report" element={<ReportMissingPage />} />
          <Route
            path="/staff/add"
            element={
              // <ProtectedRoute>
              <StaffAddItemPage />
              // </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
