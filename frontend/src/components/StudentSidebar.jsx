import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Profili Im",
      path: "/student-dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2 7-7 7 7 2 2M5 10v10a1 1 0 001 1h3m8 0h3a1 1 0 001-1V10"
          />
        </svg>
      ),
    },
    {
      name: "Regjistro Kurset",
      path: "/register-course",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.483 9.246 5 7.5 5S4.168 5.483 3 6.253v13C4.168 18.483 5.754 18 7.5 18s3.332.483 4.5 1.253m0-13C13.168 5.483 14.754 5 16.5 5s3.332.483 4.5 1.253v13C19.832 18.483 18.246 18 16.5 18s-3.332.483-4.5 1.253"
          />
        </svg>
      ),
    },
    {
      name: "Orari Im",
      path: "/schedule",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      name: "Mesazhet",
      path: "/messages",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h8m-8 4h5m8 6l-3.5-3.5A8.96 8.96 0 0021 10c0-4.971-4.03-9-9-9S3 5.029 3 10s4.03 9 9 9a8.96 8.96 0 006.5-2.5L21 20z"
          />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 shadow-sm">
      
      {/* LOGO */}
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-black text-lg">S</span>
          </div>

          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              STUDENTIX
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.15em] font-medium">
              Student Panel
            </p>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="px-4 py-5 space-y-1">
        {menuItems.map((item) => {
          const isActive =
            location.pathname.toLowerCase() === item.path.toLowerCase();

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-blue-600 rounded-r-full"></span>
              )}

              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="px-4 pt-4 mt-2 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Dil nga sistemi
        </button>
      </div>
    </aside>
  );
}

export default StudentSidebar;