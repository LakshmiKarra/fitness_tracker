import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CalendarDays,
  ClipboardList,
  Apple,
  Target,
  HeartPulse,
  BarChart3,
  Sparkles,
  CreditCard,
  Settings,
  LogOut,
  Search,
  Bell,
  ArrowRight,
  TrendingUp,
  Clock,
  ChevronRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import WorkspaceModule from "./WorkspaceModule";

const attendanceData = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 85 },
  { day: "Wed", value: 68 },
  { day: "Thu", value: 91 },
  { day: "Fri", value: 78 },
  { day: "Sat", value: 96 },
  { day: "Sun", value: 82 },
];

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Members", icon: Users },
  { label: "Trainers", icon: Dumbbell },
  { label: "Sessions", icon: CalendarDays },
  { label: "Programs", icon: ClipboardList },
  { label: "Nutrition", icon: Apple },
  { label: "Goals", icon: Target },
  { label: "Health Metrics", icon: HeartPulse },
  { label: "Analytics", icon: BarChart3 },
  { label: "AI Coach", icon: Sparkles },
  { label: "Billing", icon: CreditCard },
];

export default function Dashboard({ onLogout, onNavigate, activeModule = "dashboard" }) {
  const moduleTitles = {
    programs: "Programs",
    nutrition: "Nutrition",
    goals: "Goals",
    "health-metrics": "Health Metrics",
    analytics: "Analytics",
    "ai-coach": "AI Coach",
    billing: "Billing",
    settings: "Settings",
  };
  const isDashboard = activeModule === "dashboard";

  const navigationMap = {
    Dashboard: "dashboard",
    Members: "members",
    Trainers: "trainers",
    Sessions: "sessions",
    Programs: "programs",
    Nutrition: "nutrition",
    Goals: "goals",
    "Health Metrics": "health-metrics",
    Analytics: "analytics",
    "AI Coach": "ai-coach",
    Billing: "billing",
  };

  return (
    <div className="dashboard-shell">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">

        <div className="brand">
          FIT<span>FLOW</span>
        </div>

        <div className="workspace-label">
          FITNESS OS
        </div>

        <nav className="sidebar-nav">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={navigationMap[item.label] === activeModule ? "sidebar-item active" : "sidebar-item"}
                onClick={() =>
                  onNavigate(navigationMap[item.label])
                }
              >
                <Icon size={18} />

                <span>{item.label}</span>

                {navigationMap[item.label] === activeModule && (
                  <span className="active-dot"></span>
                )}
              </button>
            );
          })}

        </nav>

        {/* SIDEBAR BOTTOM */}
        <div className="sidebar-bottom">

          <button
            className={activeModule === "settings" ? "sidebar-item active" : "sidebar-item"}
            onClick={() => onNavigate("settings")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>

          <button
            className="sidebar-item logout-item"
            onClick={onLogout}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>

        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* TOP BAR */}
        <header className="dashboard-header">

          <div>
            <h1>{isDashboard ? "Good morning, Lakshmi 👋" : moduleTitles[activeModule]}</h1>

            <p>
              {isDashboard ? "Here's your fitness business overview" : "Your fitness workspace, all in one place"}
            </p>
          </div>

          <div className="header-actions">

            <div className="search-box">
              <Search size={17} />

              <input
                type="text"
                placeholder="Search..."
              />
            </div>

            <button className="icon-button">
              <Bell size={19} />

              <span className="notification-dot"></span>
            </button>

            <div className="profile-avatar">
              LK
            </div>

          </div>

        </header>

        {isDashboard ? (
          <>

        <section className="dashboard-photo-banner">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1800&q=90"
            alt="Members training together in a modern fitness studio"
          />
          <div className="dashboard-photo-shade" />
          <div className="dashboard-banner-copy">
            <span><Sparkles size={15} /> YOUR FITNESS WORKSPACE</span>
            <h2>Stronger, together.</h2>
            <p>Keep your coaches, members and daily momentum moving in the same direction.</p>
            <div className="dashboard-banner-actions">
              <button onClick={() => onNavigate("trainers")}>Meet the trainers <ArrowRight size={15} /></button>
              <button onClick={() => onNavigate("programs")}>Explore programs <ArrowRight size={15} /></button>
            </div>
          </div>
          <div className="dashboard-banner-progress">
            <span>WEEKLY ACTIVITY GOAL</span>
            <strong>84%</strong>
            <i><b /></i>
            <small>Members are building consistency</small>
          </div>
        </section>

        {/* KPI CARDS */}
        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon">
                <Users size={20} />
              </div>

              <span className="stat-change positive">
                +8.4%
              </span>

            </div>

            <p>Total Members</p>

            <h2>1,248</h2>

            <span className="stat-footer">
              <TrendingUp size={13} />
              92 new this month
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon">
                <Dumbbell size={20} />
              </div>

              <span className="stat-change positive">
                +2
              </span>

            </div>

            <p>Active Trainers</p>

            <h2>24</h2>

            <span className="stat-footer">
              <TrendingUp size={13} />
              2 joined this month
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon">
                <CalendarDays size={20} />
              </div>

              <span className="stat-change positive">
                +12.5%
              </span>

            </div>

            <p>Today's Sessions</p>

            <h2>38</h2>

            <span className="stat-footer">
              <Clock size={13} />
              6 sessions remaining
            </span>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <div className="stat-icon">
                <CreditCard size={20} />
              </div>

              <span className="stat-change positive">
                +14.2%
              </span>

            </div>

            <p>Monthly Revenue</p>

            <h2>₹2.4L</h2>

            <span className="stat-footer">
              <TrendingUp size={13} />
              ₹28K more than last month
            </span>

          </div>

        </section>


        {/* MAIN GRID */}
        <section className="dashboard-grid">

          {/* ATTENDANCE */}
          <div className="dashboard-card attendance-card">

            <div className="card-header">

              <div>
                <h3>Attendance Analytics</h3>

                <p>
                  Weekly member attendance
                </p>
              </div>

              <button className="period-button">
                This Week
                <ChevronRight size={15} />
              </button>

            </div>

            <div className="chart-wrapper">

              <ResponsiveContainer
                width="100%"
                height={270}
              >

                <AreaChart data={attendanceData}>

                  <defs>

                    <linearGradient
                      id="attendanceGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#ff5a00"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="100%"
                        stopColor="#ff5a00"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#777",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "#777",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#151515",
                      border:
                        "1px solid rgba(255,90,0,.3)",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ff5a00"
                    strokeWidth={3}
                    fill="url(#attendanceGradient)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* AI INSIGHT */}
          <div className="dashboard-card ai-card">

            <div className="ai-heading">

              <div className="ai-icon">
                <Sparkles size={21} />
              </div>

              <div>
                <span>AI INSIGHT</span>

                <p>
                  FitFlow Intelligence
                </p>
              </div>

            </div>

            <div className="ai-content">

              <h3>
                Member engagement needs attention
              </h3>

              <p>
                12 members haven't attended a session
                in the last 7 days. Consider sending
                personalized follow-up reminders.
              </p>

              <div className="ai-stat">

                <strong>12</strong>

                <span>
                  members need follow-up
                </span>

              </div>

              {/* CONNECTED TO MEMBERS */}
              <button
                className="ai-button"
                onClick={() => onNavigate("members")}
              >
                View Members
                <ChevronRight size={16} />
              </button>

            </div>

          </div>

        </section>


        {/* BOTTOM GRID */}
        <section className="dashboard-grid bottom-grid">

          {/* TODAY'S SESSIONS */}
          <div className="dashboard-card sessions-card">

            <div className="card-header">

              <div>
                <h3>Today's Sessions</h3>

                <p>
                  Your upcoming fitness sessions
                </p>
              </div>

              <button className="view-all">
                View All
                <ChevronRight size={15} />
              </button>

            </div>

            <div className="session-list">

              <div className="session-row">

                <div className="session-time">
                  <strong>09:00</strong>
                  <span>AM</span>
                </div>

                <div className="session-info">
                  <strong>HIIT Training</strong>

                  <span>
                    12 Members • Coach Arjun
                  </span>
                </div>

                <span className="session-status">
                  Active
                </span>

              </div>


              <div className="session-row">

                <div className="session-time">
                  <strong>11:30</strong>
                  <span>AM</span>
                </div>

                <div className="session-info">

                  <strong>
                    Strength Training
                  </strong>

                  <span>
                    8 Members • Coach Priya
                  </span>

                </div>

                <span className="session-status">
                  Upcoming
                </span>

              </div>


              <div className="session-row">

                <div className="session-time">
                  <strong>04:00</strong>
                  <span>PM</span>
                </div>

                <div className="session-info">

                  <strong>
                    Yoga & Mobility
                  </strong>

                  <span>
                    16 Members • Coach Ananya
                  </span>

                </div>

                <span className="session-status">
                  Upcoming
                </span>

              </div>


              <div className="session-row">

                <div className="session-time">
                  <strong>06:30</strong>
                  <span>PM</span>
                </div>

                <div className="session-info">

                  <strong>
                    Personal Training
                  </strong>

                  <span>
                    4 Members • Coach Rahul
                  </span>

                </div>

                <span className="session-status">
                  Upcoming
                </span>

              </div>

            </div>

          </div>


          {/* GOAL PROGRESS */}
          <div className="dashboard-card goals-card">

            <div className="card-header">

              <div>

                <h3>
                  Goal Progress
                </h3>

                <p>
                  Overall member goal completion
                </p>

              </div>

              <Target
                size={22}
                className="orange-icon"
              />

            </div>

            <div className="goal-main">

              <div className="goal-circle">

                <div>

                  <strong>
                    78%
                  </strong>

                  <span>
                    Complete
                  </span>

                </div>

              </div>

              <div className="goal-details">

                <div className="goal-line">

                  <span>
                    Weight Loss
                  </span>

                  <strong>
                    84%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    style={{
                      width: "84%",
                    }}
                  ></div>

                </div>


                <div className="goal-line">

                  <span>
                    Muscle Gain
                  </span>

                  <strong>
                    72%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    style={{
                      width: "72%",
                    }}
                  ></div>

                </div>


                <div className="goal-line">

                  <span>
                    General Fitness
                  </span>

                  <strong>
                    79%
                  </strong>

                </div>

                <div className="progress-bar">

                  <div
                    style={{
                      width: "79%",
                    }}
                  ></div>

                </div>

              </div>

            </div>

            <button className="goal-button">

              View Goal Analytics

              <ChevronRight size={16} />

            </button>

          </div>

        </section>

          </>
        ) : (
          <WorkspaceModule module={activeModule} onNavigate={onNavigate} />
        )}


        {/* FOOTER */}
        <footer className="dashboard-footer">

          <span>
            FITFLOW © 2026
          </span>

          <span>
            AI-powered fitness management platform
          </span>

        </footer>

      </main>

    </div>
  );
}