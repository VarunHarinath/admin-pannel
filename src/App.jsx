import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./Components/SlideBar/SideBar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <BrowserRouter>
      <div className="flex">
        <SideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 ml-0 sm:ml-64 p-4">
          <button
            className="sm:hidden p-2 bg-gray-800 text-white rounded"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <Routes>
            <Route
              path="/secure/v3/ADMIN-PANNEL/:id"
              element={<div>Hi all</div>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
