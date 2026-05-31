import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
const location = useLocation();
const navigate = useNavigate();

const menuItems = [
{
name: "Dashboard",
path: "/dashboard-admin",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M3 13h8V3H3v10zm10 8h8V11h-8v10zm0-18v4h8V3h-8zM3 21h8v-6H3v6z"
       /> </svg>
),
},
{
name: "Studentët",
path: "/students",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422A12.083 12.083 0 0118 20.055c-1.79.62-3.65.945-5.5.945s-3.71-.325-5.5-.945a12.083 12.083 0 01-.16-9.477L12 14z"
       /> </svg>
),
},
{
name: "Profesorët",
path: "/teachers",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-4-4H11a4 4 0 00-4 4v2m10 0H7m8-10a3 3 0 11-6 0 3 3 0 016 0z"
       /> </svg>
),
},
{
name: "Kurset",
path: "/courses",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 6.253v13m0-13C10.832 5.483 9.246 5 7.5 5S4.168 5.483 3 6.253v13C4.168 18.483 5.754 18 7.5 18s3.332.483 4.5 1.253m0-13C13.168 5.483 14.754 5 16.5 5s3.332.483 4.5 1.253v13C19.832 18.483 18.246 18 16.5 18s-3.332.483-4.5 1.253"
       /> </svg>
),
},
{
name: "Semestrat",
path: "/semesters",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
       /> </svg>
),
},
{
name: "Shto Orar",
path: "/add-schedule",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 4v16m8-8H4"
       /> </svg>
),
},
{
name: "Departamentet",
path: "/departments",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 12h.01M9 15h.01M15 9h.01M15 12h.01M15 15h.01"
       /> </svg>
),
},
{
name: "Lista e Pritjes",
path: "/waiting-list",
icon: ( <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={2}
         d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
       /> </svg>
),
},
];

const handleLogout = () => {
localStorage.clear();
navigate("/");
};

return ( <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 shadow-sm">

```
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
          Admin Panel
        </p>
      </div>
    </div>
  </div>

  <nav
    className="flex-1 px-4 py-5 space-y-1 overflow-y-auto no-scrollbar"
    style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
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
          className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 no-underline ${
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

export default Sidebar;
