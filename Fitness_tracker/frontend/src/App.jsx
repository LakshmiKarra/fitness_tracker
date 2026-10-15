import { useState } from "react";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Trainers from "./pages/Trainers";
import Sessions from "./pages/Sessions";

import {
  ArrowRight,
  Play,
  Check,
  Users,
  CalendarDays,
  Brain,
  BarChart3,
  HeartPulse,
  Sparkles,
  ChevronRight,
  Activity,
  Apple,
  Footprints,
  Moon,
  Watch,
} from "lucide-react";

import "./index.css";

// =========================================================
// PROGRAMS
// =========================================================

const programs = [
  {
    title: "Strength Training",
    subtitle: "BUILD POWER",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "HIIT Performance",
    subtitle: "PUSH LIMITS",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Mobility & Wellness",
    subtitle: "MOVE BETTER",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
  },
];

const nutritionMeals = [
  {
    name: "Green power bowl",
    type: "LUNCH · HIGH PROTEIN",
    calories: "520 kcal",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Berry oat breakfast",
    type: "BREAKFAST · HIGH FIBER",
    calories: "380 kcal",
    image:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Balanced plate",
    type: "DINNER · RECOVERY FUEL",
    calories: "610 kcal",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  },
];

// =========================================================
// FEATURES
// =========================================================

const features = [
  {
    icon: Users,
    title: "Member Management",
    text: "Manage members, memberships, profiles and engagement from one workspace.",
  },
  {
    icon: CalendarDays,
    title: "Smart Scheduling",
    text: "Create sessions, manage trainers and keep your entire schedule organized.",
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    text: "Track revenue, attendance, retention and business performance.",
  },
  {
    icon: Brain,
    title: "AI Fitness Coach",
    text: "Get intelligent insights and personalized recommendations using AI.",
  },
];

// =========================================================
// APP
// =========================================================

function App() {
  const [page, setPage] = useState("landing");
  const [dashboardModule, setDashboardModule] = useState("dashboard");

  // =======================================================
  // CENTRAL NAVIGATION
  // =======================================================

  const handleNavigate = (target) => {
    // Dashboard
    if (target === "dashboard") {
      setDashboardModule("dashboard");
      setPage("dashboard");
      return;
    }

    // Members
    if (target === "members") {
      setPage("members");
      return;
    }

    // Trainers
    if (target === "trainers") {
      setPage("trainers");
      return;
    }

    // Sessions
    if (target === "sessions") {
      setPage("sessions");
      return;
    }

    if ([
      "programs",
      "nutrition",
      "goals",
      "health-metrics",
      "analytics",
      "ai-coach",
      "billing",
      "settings",
    ].includes(target)) {
      setDashboardModule(target);
      setPage("dashboard");
      return;
    }

    // Landing page
    if (target === "landing") {
      setPage("landing");
      return;
    }

    // Future modules
    alert(`${target} module is coming next.`);
  };

  // =======================================================
  // MEMBERS PAGE
  // =======================================================

  if (page === "members") {
    return (
      <Members
        onNavigate={handleNavigate}
      />
    );
  }

  // =======================================================
  // TRAINERS PAGE
  // =======================================================

  if (page === "trainers") {
    return (
      <Trainers
        onNavigate={handleNavigate}
      />
    );
  }

  // =======================================================
  // SESSIONS PAGE
  // =======================================================

  if (page === "sessions") {
    return (
      <Sessions
        onNavigate={handleNavigate}
      />
    );
  }

  // =======================================================
  // DASHBOARD PAGE
  // =======================================================

  if (page === "dashboard") {
    return (
      <Dashboard
        onLogout={() => setPage("landing")}
        onNavigate={handleNavigate}
        activeModule={dashboardModule}
      />
    );
  }

  // =======================================================
  // LOGIN PAGE
  // =======================================================

  if (page === "login") {
    return (
      <Login
        onBack={() => setPage("landing")}
        onSuccess={() => setPage("dashboard")}
      />
    );
  }

  // =======================================================
  // REGISTER PAGE
  // =======================================================

  if (page === "register") {
    return (
      <Register
        onLogin={() => setPage("login")}
      />
    );
  }

  // =======================================================
  // LANDING PAGE
  // =======================================================

  return (
    <div className="app">

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <header className="navbar">

        <div className="logo">
          <div className="logo-mark">
            F
          </div>

          <span>
            FITFLOW
          </span>
        </div>

        <nav className="nav-links">

          <a href="#programs">
            Programs
          </a>

          <a href="#nutrition">
            Nutrition
          </a>

          <a href="#features">
            Features
          </a>

          <a href="#solutions">
            Solutions
          </a>

          <a href="#pricing">
            Pricing
          </a>

        </nav>

        <div className="nav-actions">

          <button
            className="login-btn"
            onClick={() => setPage("login")}
          >
            Sign In
          </button>

          <button
            className="orange-btn small"
            onClick={() => setPage("register")}
          >
            Start Free Trial

            <ArrowRight size={16} />
          </button>

        </div>

      </header>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main>

        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <div className="eyebrow">

              <span></span>

              AI FITNESS & WELLNESS PLATFORM

            </div>

            <h1>

              BUILD YOUR

              <br />

              <strong>
                STRONGEST SELF.
              </strong>

            </h1>

            <p>
              One powerful platform to manage members,
              training, wellness and business growth —
              all in one place.
            </p>

            <div className="hero-buttons">

              <button
                className="orange-btn"
                onClick={() => setPage("register")}
              >

                Start Free Trial

                <ArrowRight size={19} />

              </button>

              <button className="outline-btn">

                <Play
                  size={17}
                  fill="currentColor"
                />

                Watch Demo

              </button>

            </div>

            <div className="hero-trust">

              <span>
                ✓ No credit card required
              </span>

              <span>
                ✓ 14-day free trial
              </span>

              <span>
                ✓ Setup in minutes
              </span>

            </div>

          </div>

          <div className="hero-bottom">

            <div className="stat">

              <strong>
                10K+
              </strong>

              <span>
                Active Members
              </span>

            </div>

            <div className="stat">

              <strong>
                50+
              </strong>

              <span>
                Expert Trainers
              </span>

            </div>

            <div className="stat">

              <strong>
                98%
              </strong>

              <span>
                Success Rate
              </span>

            </div>

            <div className="scroll-indicator">

              <span>
                SCROLL
              </span>

              <div className="scroll-line"></div>

            </div>

          </div>

        </section>

        {/* =================================================
            TRUST SECTION
        ================================================= */}

        <section className="trust-section">

          <p>
            POWERING THE NEXT GENERATION OF FITNESS BUSINESSES
          </p>

          <div className="trust-items">

            <span>
              FITZONE
            </span>

            <span>
              ATHLETICA
            </span>

            <span>
              POWERLAB
            </span>

            <span>
              CORE360
            </span>

            <span>
              MOVE+
            </span>

          </div>

        </section>

        {/* =================================================
            PROGRAMS
        ================================================= */}

        <section
          className="section"
          id="programs"
        >

          <div className="section-heading">

            <div>

              <div className="section-label">

                <span></span>

                TRAINING PROGRAMS

              </div>

              <h2>

                Train smarter.

                <br />

                <em>
                  Get stronger.
                </em>

              </h2>

            </div>

            <p>
              Powerful programs designed for modern
              fitness businesses and their members.
            </p>

          </div>

          <div className="program-grid">

            {programs.map((program) => (

              <div
                className="program-card"
                key={program.title}
              >

                <img
                  src={program.image}
                  alt={program.title}
                />

                <div className="program-gradient"></div>

                <div className="program-content">

                  <span>
                    {program.subtitle}
                  </span>

                  <h3>
                    {program.title}
                  </h3>

                  <button>

                    Explore Program

                    <ArrowRight size={17} />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

        {/* =================================================
            NUTRITION
        ================================================= */}

        <section
          className="section nutrition-section"
          id="nutrition"
        >

          <div className="section-heading">

            <div>

              <div className="section-label">

                <span></span>

                NUTRITION & RECOVERY

              </div>

              <h2>

                Eat well.

                <br />

                <em>
                  Feel unstoppable.
                </em>

              </h2>

            </div>

            <p>
              Make every meal part of your progress with
              simple food logging, calorie goals and a
              clearer view of your daily nutrients.
            </p>

          </div>

          <div className="nutrition-overview">

            <div className="nutrition-summary">

              <div className="nutrition-summary-top">

                <div className="nutrition-summary-icon">
                  <Apple size={21} />
                </div>

                <div>
                  <span>TODAY'S INTAKE</span>
                  <strong>1,510 <small>/ 2,200 kcal</small></strong>
                </div>

                <span className="nutrition-progress">69%</span>

              </div>

              <div className="macro-row">
                <div><span>Protein</span><strong>92g <small>/ 140g</small></strong></div>
                <div className="macro-track"><span className="protein-fill"></span></div>
              </div>

              <div className="macro-row">
                <div><span>Carbs</span><strong>148g <small>/ 220g</small></strong></div>
                <div className="macro-track"><span className="carbs-fill"></span></div>
              </div>

              <div className="macro-row">
                <div><span>Healthy fats</span><strong>46g <small>/ 70g</small></strong></div>
                <div className="macro-track"><span className="fats-fill"></span></div>
              </div>

              <div className="nutrition-note">
                <Sparkles size={16} />
                On track to hit your protein goal today.
              </div>

            </div>

            <div className="meal-grid">

              {nutritionMeals.map((meal) => (

                <article className="meal-card" key={meal.name}>

                  <img src={meal.image} alt={meal.name} />

                  <div className="meal-card-content">
                    <span>{meal.type}</span>
                    <h3>{meal.name}</h3>
                    <strong>{meal.calories}</strong>
                  </div>

                </article>

              ))}

            </div>

          </div>

        </section>

        {/* =================================================
            ACTIVITY & WEARABLES
        ================================================= */}

        <section className="activity-section" id="activity">

          <img
            className="activity-image"
            src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=2000&q=90"
            alt="Runner tracking an outdoor workout"
          />

          <div className="activity-shade"></div>

          <div className="activity-content">

            <div className="section-label">
              <Activity size={17} />
              YOUR HEALTH, IN SYNC
            </div>

            <h2>
              Every move.
              <br />
              <em>Part of the picture.</em>
            </h2>

            <p>
              Bring workouts, daily movement and recovery
              together. Sync a wearable to follow the
              signals that help you feel your best.
            </p>

            <div className="activity-devices">
              <Watch size={16} />
              WORKS WITH YOUR FAVORITE WEARABLES
            </div>

          </div>

          <div className="activity-metrics">

            <div className="activity-metric">
              <Footprints size={19} />
              <span>DAILY STEPS</span>
              <strong>8,420 <small>/ 10,000</small></strong>
              <div className="activity-meter"><span></span></div>
            </div>

            <div className="activity-metric">
              <HeartPulse size={19} />
              <span>HEART RATE</span>
              <strong>72 <small>bpm resting</small></strong>
              <p>Within your usual range</p>
            </div>

            <div className="activity-metric">
              <Moon size={19} />
              <span>SLEEP LAST NIGHT</span>
              <strong>7h 48m</strong>
              <p>Recovery looking good</p>
            </div>

          </div>

        </section>

        {/* =================================================
            FEATURES
        ================================================= */}

        <section
          className="section features-section"
          id="features"
        >

          <div className="center-heading">

            <div className="section-label center">

              <span></span>

              ONE PLATFORM

              <span></span>

            </div>

            <h2>

              Everything your

              <br />

              <em>
                fitness business needs.
              </em>

            </h2>

            <p>
              FitFlow brings your members, trainers,
              programs, analytics and AI into one
              intelligent workspace.
            </p>

          </div>

          <div className="features-grid">

            {features.map((feature) => {

              const Icon = feature.icon;

              return (

                <div
                  className="feature-card"
                  key={feature.title}
                >

                  <div className="feature-icon">

                    <Icon size={25} />

                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                  <p>
                    {feature.text}
                  </p>

                  <button>

                    Learn more

                    <ChevronRight size={16} />

                  </button>

                </div>

              );

            })}

          </div>

        </section>

        {/* =================================================
            AI SECTION
        ================================================= */}

        <section
          className="ai-section"
          id="solutions"
        >

          <div className="ai-glow"></div>

          <div className="ai-content">

            <div className="section-label">

              <Sparkles size={17} />

              FITFLOW AI

            </div>

            <h2>

              Your business.

              <br />

              <em>
                Powered by intelligence.
              </em>

            </h2>

            <p>
              FitFlow AI analyzes member activity,
              attendance, goals and performance to
              surface insights that help your business
              make smarter decisions.
            </p>

            <div className="ai-points">

              <div>

                <Check size={17} />

                Member engagement insights

              </div>

              <div>

                <Check size={17} />

                Personalized fitness recommendations

              </div>

              <div>

                <Check size={17} />

                At-risk member detection

              </div>

              <div>

                <Check size={17} />

                AI-generated business reports

              </div>

            </div>

            <button className="orange-btn">

              Explore AI Coach

              <ArrowRight size={18} />

            </button>

          </div>

          <div className="ai-dashboard">

            <div className="ai-top">

              <div>

                <span>
                  FITFLOW AI
                </span>

                <h3>
                  Business Intelligence
                </h3>

              </div>

              <div className="ai-status">

                <span></span>

                LIVE

              </div>

            </div>

            <div className="insight-main">

              <div className="brain-circle">

                <Brain size={30} />

              </div>

              <div>

                <span>
                  AI INSIGHT
                </span>

                <h3>

                  Member engagement increased

                  <strong>
                    {" "}18.4%
                  </strong>

                </h3>

                <p>
                  Your Tuesday and Thursday sessions
                  are showing the highest retention.
                </p>

              </div>

            </div>

            <div className="mini-stats">

              <div>

                <span>
                  RETENTION
                </span>

                <strong>
                  92%
                </strong>

              </div>

              <div>

                <span>
                  ATTENDANCE
                </span>

                <strong>
                  86%
                </strong>

              </div>

              <div>

                <span>
                  ENGAGEMENT
                </span>

                <strong>
                  94%
                </strong>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            TESTIMONIAL
        ================================================= */}

        <section className="testimonial-section">

          <div className="quote-mark">
            "
          </div>

          <blockquote>

            FitFlow completely changed how we manage
            our fitness business. Our trainers, members
            and management team finally work from one
            place.

          </blockquote>

          <div className="testimonial-person">

            <div className="avatar">
              AK
            </div>

            <div>

              <strong>
                Arjun Kapoor
              </strong>

              <span>
                Founder, FitZone Studio
              </span>

            </div>

          </div>

        </section>

        {/* =================================================
            PRICING CTA
        ================================================= */}

        <section
          className="pricing-section"
          id="pricing"
        >

          <div className="pricing-content">

            <div className="section-label">

              <HeartPulse size={17} />

              START TODAY

            </div>

            <h2>

              Ready to build a

              <br />

              <em>
                stronger business?
              </em>

            </h2>

            <p>
              Start your free 14-day trial and experience
              the future of fitness business management.
            </p>

            <div className="pricing-buttons">

              <button
                className="orange-btn"
                onClick={() => setPage("register")}
              >

                Start Free Trial

                <ArrowRight size={18} />

              </button>

              <button className="outline-btn">
                Book a Demo
              </button>

            </div>

          </div>

        </section>

      </main>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer>

        <div className="footer-main">

          <div className="footer-brand">

            <div className="logo">

              <div className="logo-mark">
                F
              </div>

              <span>
                FITFLOW
              </span>

            </div>

            <p>
              AI-powered fitness and wellness
              management for modern businesses.
            </p>

          </div>

          <div className="footer-column">

            <h4>
              PRODUCT
            </h4>

            <a href="#features">
              Features
            </a>

            <a href="#programs">
              Programs
            </a>

            <a href="#nutrition">
              Nutrition
            </a>

            <a href="#solutions">
              AI Coach
            </a>

            <a href="#pricing">
              Pricing
            </a>

          </div>

          <div className="footer-column">

            <h4>
              COMPANY
            </h4>

            <a href="#">
              About
            </a>

            <a href="#">
              Careers
            </a>

            <a href="#">
              Contact
            </a>

            <a href="#">
              Blog
            </a>

          </div>

          <div className="footer-column">

            <h4>
              LEGAL
            </h4>

            <a href="#">
              Privacy
            </a>

            <a href="#">
              Terms
            </a>

            <a href="#">
              Security
            </a>

          </div>

        </div>

        <div className="footer-bottom">

          <span>
            © 2026 FitFlow. All rights reserved.
          </span>

          <span>
            AI FITNESS & WELLNESS OS
          </span>

        </div>

      </footer>

    </div>
  );
}

export default App;