import React from "react";
import "./StudentDashboard.css";

function StudentDashboard() {
  const emri = localStorage.getItem("userName") || "Alyssa";

  return (
    <div className="container">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Caplen</h2>

        <ul className="menu">
          <li className="active">Dashboard</li>
          <li>Schedule</li>
          <li>Courses</li>
          <li>Messages</li>
          <li>Settings</li>
        </ul>

        <div className="logout">Log out</div>
      </aside>

      {/* MAIN */}
      <div className="main">

        {/* TOPBAR */}
          <div className="topbar">
          <input
            type="text"
            placeholder="Kërko për kurse.."
            className="search"
          />
          <div className="icons">
              🔔 👤
          </div>
        </div>

        {/* HERO */}
        <div className="hero">
          <div className="hero-text">
            <p>Hi, {emri}!</p>
            <h1>You have completed <br />6 lessons this week!</h1>
            <button>See all</button>
          </div>

          <div className="hero-cards">
            <div className="mini-card purple">
              <span>01</span>
              <h4>Design Composition</h4>
              <p>12 lessons | 54%</p>
            </div>

            <div className="mini-card beige">
              <span>02</span>
              <h4>UX Design Foundations</h4>
              <p>17 lessons | 83%</p>
            </div>

            <div className="mini-card green">
              <span>03</span>
              <h4>3D Design Foundations</h4>
              <p>13 lessons | 21%</p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* LEFT */}
          <div className="left">

            {/* STATS */}
            <h3>Statistics</h3>
            <div className="stats">
              <div className="stat-box">
                <h2>2</h2>
                <p>Certifikata të Fituara</p>
              </div>

              <div className="stat-box">
                <h2>3</h2>
                <p>Kurse Aktive</p>
              </div>

              <div className="stat-box">
                <h2>8.5</h2>
                <p>Pikët e Fitura</p>
              </div>
            </div>

            {/* ASSIGNMENTS */}
            <h3>My Assignments</h3>

            <div className="assignment">
              <div>
                <strong>UX Design Foundations</strong>
                <p>Afati: Edhe 2 ditë</p>
              </div>
              <span>21 Oct, 2022</span>
            </div>

            <div className="assignment">
              <div>
                <strong>Design Composition</strong>
                <p>E dorëzuar</p>
              </div>
              <span>21 Oct, 2022</span>
            </div>

          </div>

          {/* RIGHT */}
          <div className="right">

            <div className="calendar">
              <h3>Calendar</h3>
              <input type="date" className="calendar-input" />
            </div>

            <div className="upcoming">
              <h4>Upcoming</h4>
              <div className="upcoming-card">
                <p>10:00 - 12:30</p>
                <strong>3D Design Foundations</strong>
                <p>Test Level 1</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;