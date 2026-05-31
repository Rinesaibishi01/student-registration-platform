import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function TeacherSidebar() {
const location = useLocation();
const navigate = useNavigate();

const menuItems = [
  {
    name: "Përmbledhja",
    path: "/teacher-dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 13h8V3H3v10zm10 8h8V11h-8v10zm0-18v4h8V3h-8zM3 21h8v-6H3v6z" />
      </svg>
    ),
  },
  {
    name: "Lëndët e Mia",
    path: "/teacher-courses",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.483 9.246 5 7.5 5S4.168 5.483 3 6.253v13C4.168 18.483 5.754 18 7.5 18s3.332.483 4.5 1.253m0-13C13.168 5.483 14.754 5 16.5 5s3.332.483 4.5 1.253v13C19.832 18.483 18.246 18 16.5 18s-3.332.483-4.5 1.253" />
      </svg>
    ),
  },
  {
    name: "Studentët e Regjistruar",
    path: "/EnrolledStudents",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-4-4H11a4 4 0 00-4 4v2m10 0H7m8-10a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    name: "Krijo Njoftim",
    path: "/create-announcement",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M11 5.882V19.24a1 1 0 001.447.894l4.553-2.276A2 2 0 0018 16.065V8.935a2 2 0 00-1.106-1.789l-4.553-2.276A1 1 0 0011 5.882zM5 10h2m-2 4h2" />
      </svg>
    ),
  },
  {
    name: "Orari Im",
    path: "/professor-schedule",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const handleLogout = () => {
localStorage.clear();
navigate("/");
};

return ( <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 shadow-sm">

```
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
          Teacher Panel
        </p>
      </div>
    </div>
  </div>

  {/* NAVIGATION */}
  <nav
    className="flex-1 px-4 py-5 space-y-1 overflow-y-auto no-scrollbar"
    style={{ scrollbarWidth: "none" }}
  >
    <style>
      {`.no-scrollbar::-webkit-scrollbar { display: none; }`}
    </style>

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

          <span className="text-base">{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      );
    })}
  </nav>

  {/* LOGOUT */}
  <div className="px-4 pt-4 mt-2 border-t border-slate-100">
    <button
      onClick={handleLogout}
      className="w-full py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
    >
      Dil nga sistemi
    </button>
  </div>
</aside>


);
}

export default TeacherSidebar;
