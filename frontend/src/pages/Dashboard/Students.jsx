import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DashboardStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/students")
      .then(res => setStudents(res.data))
      .catch(err => console.log("Gabim:", err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-200 font-sans">

      {/* SIDEBAR (SI NË FOTO) */}
      <aside className="w-64 bg-indigo-600 text-white flex flex-col justify-between rounded-r-3xl shadow-xl">

        {/* TOP */}
        <div>
          <div className="p-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-indigo-600 rounded-xl flex items-center justify-center font-bold text-lg">
              A
            </div>
            <span className="text-lg font-bold">Akademi</span>
          </div>

          <nav className="mt-6 px-3 space-y-2">

            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-500 transition">
              🏠 Dashboard
            </Link>

            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-indigo-600 font-semibold shadow">
              👨‍🎓 Studentët
            </Link>

            <Link to="/DashboardTeacher" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-500 transition">
               Teachers
            </Link>


            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-500 transition">
              📚 Kurset
            </Link>

            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-indigo-500 transition">
              📢 Njoftimet
            </Link>

          </nav>
        </div>

        {/* BOTTOM BUTTON */}
        <div className="p-4">
          <button className="w-full bg-white text-indigo-600 py-2 rounded-xl font-semibold hover:bg-gray-100 transition">
            Visit site ↗
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">

        {/* CARD (SI NË FOTO) */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

          {/* HEADER */}
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-800">
              Add New Teacher
            </h2>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-gray-100">🔔</button>
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>

          {/* FORM STYLE CONTENT */}
          <div className="p-6">

            <h3 className="text-md font-semibold text-white bg-indigo-600 px-4 py-2 rounded-lg mb-6">
              Personal Details
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">

              <input placeholder="First Name" className="border p-3 rounded-lg w-full" />
              <input placeholder="Last Name" className="border p-3 rounded-lg w-full" />

              <input placeholder="Email" className="border p-3 rounded-lg w-full" />
              <input placeholder="Phone" className="border p-3 rounded-lg w-full" />

              <textarea placeholder="Address" className="border p-3 rounded-lg col-span-2"></textarea>

              <input type="date" className="border p-3 rounded-lg w-full" />
              <input placeholder="Place of Birth" className="border p-3 rounded-lg w-full" />

            </div>

            <h3 className="text-md font-semibold text-white bg-indigo-600 px-4 py-2 rounded-lg mb-6">
              Education
            </h3>

            <div className="grid grid-cols-2 gap-6 mb-6">

              <input placeholder="University" className="border p-3 rounded-lg w-full" />
              <input placeholder="Degree" className="border p-3 rounded-lg w-full" />

              <input type="date" className="border p-3 rounded-lg w-full" />
              <input placeholder="City" className="border p-3 rounded-lg w-full" />

            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-4">
              <button className="px-6 py-2 rounded-xl border font-semibold">
                Save as Draft
              </button>
              <button className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-semibold">
                Submit
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default DashboardStudents;