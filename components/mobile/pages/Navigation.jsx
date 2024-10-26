import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import "../../../styles/index.css";

export default function Navigation({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    // Set initial mobile state based on the window width
    const initialIsMobile = window.innerWidth < 768;
    setIsMobile(initialIsMobile);
    setSidebarOpen(!initialIsMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      setIsMobile(newIsMobile);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
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
    <>
      {domLoaded && (
        <div className="flex h-screen font-changa w-full overflow-hidden">
          <div
            className={`flex flex-col flex-1 transition-all duration-300 ${
              isMobile && sidebarOpen ? "blur-sm" : ""
            }`}
            onClick={() => isMobile && sidebarOpen && handleSidebarToggle()}
          >
            <div className="bg-secondary text-white flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
