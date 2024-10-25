import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "../components/sidebar";

export default function Navigation() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Always keep sidebar open on larger screens
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen font-changa w-full overflow-hidden">
      {/* <Sidebar isOpen={sidebarOpen} onToggle={handleSidebarToggle} /> */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ${
          isMobile && sidebarOpen ? "blur-sm" : ""
        }`}
        onClick={() => isMobile && sidebarOpen && handleSidebarToggle()}
      >
        {/* <div className="bg-white p-4 flex justify-between items-center shadow-md"></div> */}
        <div
          //   style={{ maxWidth: window.innerWidth, overflow: "scroll" }}
          className="bg-secondary text-white flex-1 overflow-y-auto"
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
