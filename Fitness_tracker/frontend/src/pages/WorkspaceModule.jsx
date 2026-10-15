import { useState } from "react";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  HeartPulse,
  Moon,
  Plus,
  Send,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Watch,
} from "lucide-react";
import "./WorkspaceModule.css";

const moduleDetails = {
  programs: {
    eyebrow: "TRAINING LIBRARY",
    title: "Programs built around real progress.",
    description: "Create a clear path from the first workout to the next personal best.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1400&q=90",
    accent: "#ff6a21",
    stats: [["Active programs", "18", "+3 this month"], ["Members enrolled", "642", "+12.8%"], ["Avg. completion", "76%", "+5.2%"]],
  },
  nutrition: {
    eyebrow: "FOOD & FUEL",
    title: "Better everyday choices, made visible.",
    description: "Keep meals, hydration and nutrient targets in one calm, easy-to-read log.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=90",
    accent: "#b9d978",
    stats: [["Meals logged", "1,284", "This week"], ["Daily goal hit", "78%", "+6.4%"], ["Avg. protein", "112g", "Per member"]],
  },
  goals: {
    eyebrow: "MEMBER MILESTONES",
    title: "Small wins add up to big change.",
    description: "Follow meaningful goals, celebrate consistency and keep every member moving forward.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=90",
    accent: "#ff8a54",
    stats: [["Goals in progress", "386", "+24 this week"], ["Milestones reached", "124", "This month"], ["On-track members", "82%", "+9.1%"]],
  },
  "health-metrics": {
    eyebrow: "HEALTH OVERVIEW",
    title: "See the signals behind the effort.",
    description: "Bring movement, heart health and recovery into one connected member snapshot.",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1400&q=90",
    accent: "#76c9ad",
    stats: [["Connected devices", "846", "Syncing today"], ["Avg. daily steps", "8,420", "+8.2%"], ["Recovery score", "84", "Across members"]],
  },
  analytics: {
    eyebrow: "FITNESS INTELLIGENCE",
    title: "Turn activity into a smarter plan.",
    description: "Understand attendance, retention and growth with a clear view of the numbers that matter.",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=1400&q=90",
    accent: "#ff7543",
    stats: [["Member retention", "92%", "+4.8%"], ["Session attendance", "86%", "+7.2%"], ["Monthly revenue", "₹2.4L", "+14.2%"]],
  },
  "ai-coach": {
    eyebrow: "FITFLOW INTELLIGENCE",
    title: "A thoughtful next step for every member.",
    description: "Use activity and goals to shape practical coaching ideas your team can act on.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1400&q=90",
    accent: "#e6a76b",
    stats: [["Plans suggested", "214", "This week"], ["Member check-ins", "68", "Ready to review"], ["Goal momentum", "89%", "+11.3%"]],
  },
  billing: {
    eyebrow: "REVENUE & MEMBERSHIPS",
    title: "A healthier view of your business.",
    description: "Keep an eye on recurring revenue, upcoming renewals and recent payments.",
    image: "https://images.unsplash.com/photo-1571019613576-2b22c76fd955?auto=format&fit=crop&w=1400&q=90",
    accent: "#e1b96d",
    stats: [["Monthly revenue", "₹2.4L", "+14.2%"], ["Renewals due", "28", "Next 7 days"], ["Payment success", "96.8%", "+2.1%"]],
  },
  settings: {
    eyebrow: "WORKSPACE PREFERENCES",
    title: "Make FitFlow work your way.",
    description: "Manage your studio profile, notifications and the preferences your team shares.",
    image: "https://images.unsplash.com/photo-1517838277536-fc4c6a0f19a9?auto=format&fit=crop&w=1400&q=90",
    accent: "#ff7543",
    stats: [["Workspace", "Active", "All systems go"], ["Team members", "24", "4 admin roles"], ["Last updated", "Today", "Preferences saved"]],
  },
};

const programCards = [
  { name: "Strength Foundations", type: "Strength", level: "Beginner", weeks: "8 weeks", members: 124, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85" },
  { name: "HIIT Performance", type: "Conditioning", level: "Advanced", weeks: "6 weeks", members: 86, image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85" },
  { name: "Everyday Mobility", type: "Mobility", level: "All levels", weeks: "4 weeks", members: 97, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85" },
];

const meals = [
  { name: "Green power bowl", meal: "LUNCH · HIGH PROTEIN", calories: "520 kcal", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=85" },
  { name: "Berry oat breakfast", meal: "BREAKFAST · HIGH FIBER", calories: "380 kcal", image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=85" },
  { name: "Balanced recovery plate", meal: "DINNER · RECOVERY FUEL", calories: "610 kcal", image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=85" },
];

const goalCards = [
  { name: "Build consistent strength", members: "128 members", progress: 78, image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85" },
  { name: "Move 8,000 steps a day", members: "204 members", progress: 64, image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=85" },
  { name: "Improve weekly recovery", members: "54 members", progress: 86, image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85" },
];

const invoiceRows = [
  ["INV-2026-042", "FitFlow Performance Club", "Oct 08, 2026", "₹18,500", "Paid"],
  ["INV-2026-041", "Northside Training Co.", "Oct 06, 2026", "₹12,000", "Paid"],
  ["INV-2026-040", "Core Studio", "Oct 03, 2026", "₹9,500", "Pending"],
  ["INV-2026-039", "Peak Wellness", "Sep 28, 2026", "₹22,000", "Paid"],
];

const analyticsBars = [
  { month: "May", members: 48, revenue: 34 },
  { month: "Jun", members: 61, revenue: 49 },
  { month: "Jul", members: 56, revenue: 58 },
  { month: "Aug", members: 74, revenue: 63 },
  { month: "Sep", members: 68, revenue: 76 },
  { month: "Oct", members: 88, revenue: 84 },
];

function ModuleHero({ details }) {
  return (
    <section className="workspace-hero" style={{ "--module-accent": details.accent }}>
      <img src={details.image} alt="" />
      <div className="workspace-hero-shade" />
      <div className="workspace-hero-copy">
        <span className="workspace-eyebrow">{details.eyebrow}</span>
        <h2>{details.title}</h2>
        <p>{details.description}</p>
      </div>
      <div className="workspace-hero-mark"><Activity size={22} /></div>
    </section>
  );
}

function ModuleStats({ stats }) {
  return (
    <div className="workspace-stats">
      {stats.map(([label, value, note], index) => (
        <article className="workspace-stat" key={label}>
          <span>{label}</span>
          <strong>{value}</strong>
          <small className={index === 2 ? "" : "workspace-positive"}>{note}</small>
        </article>
      ))}
    </div>
  );
}

function ProgramsContent() {
  const [filter, setFilter] = useState("All programs");
  const [selected, setSelected] = useState("");
  const filters = ["All programs", "Strength", "Conditioning", "Mobility"];
  const visiblePrograms = filter === "All programs" ? programCards : programCards.filter((program) => program.type === filter);

  return (
    <>
      <div className="workspace-section-heading">
        <div><span>THE TRAINING FLOOR</span><h3>Explore programs</h3></div>
        <button className="workspace-action" onClick={() => setSelected("New program draft") }><Plus size={16} /> Create program</button>
      </div>
      <div className="workspace-filters" role="group" aria-label="Filter programs">
        {filters.map((item) => <button className={filter === item ? "selected" : ""} key={item} onClick={() => setFilter(item)}>{item}</button>)}
      </div>
      <div className="workspace-card-grid">
        {visiblePrograms.map((program) => (
          <article className="library-card" key={program.name}>
            <img src={program.image} alt={`${program.name} workout`} />
            <div className="library-card-body">
              <div className="library-card-meta"><span>{program.type}</span><span>{program.level}</span></div>
              <h4>{program.name}</h4>
              <div className="library-card-footer"><span><Clock3 size={14} />{program.weeks}</span><span><Users size={14} />{program.members} members</span></div>
              <button onClick={() => setSelected(program.name)}>View plan <ArrowUpRight size={15} /></button>
            </div>
          </article>
        ))}
      </div>
      {selected && <p className="workspace-feedback"><Check size={16} /> {selected} selected.</p>}
    </>
  );
}

function NutritionContent() {
  const [loggedMeal, setLoggedMeal] = useState("");
  return (
    <>
      <div className="workspace-section-heading">
        <div><span>DAILY NUTRITION</span><h3>Fuel that fits your goals</h3></div>
        <button className="workspace-action" onClick={() => setLoggedMeal("Snack added to today's food log") }><Plus size={16} /> Log a meal</button>
      </div>
      <div className="nutrition-dashboard-grid">
        <article className="workspace-panel calorie-panel">
          <div className="workspace-panel-heading"><div><span>CALORIES TODAY</span><strong>1,510 <small>/ 2,200 kcal</small></strong></div><div className="calorie-ring"><span>69%</span></div></div>
          <div className="nutrient-list">
            <div><span>Protein</span><strong>92g <small>/ 140g</small></strong><i><b style={{ width: "66%" }} /></i></div>
            <div><span>Carbohydrates</span><strong>148g <small>/ 220g</small></strong><i><b style={{ width: "67%" }} /></i></div>
            <div><span>Healthy fats</span><strong>46g <small>/ 70g</small></strong><i><b style={{ width: "66%" }} /></i></div>
          </div>
          <p className="nutrition-tip"><Sparkles size={16} /> You are on track to hit your protein goal.</p>
        </article>
        <div className="workspace-meal-grid">
          {meals.map((meal) => <article className="workspace-meal" key={meal.name}><img src={meal.image} alt={meal.name} /><div><span>{meal.meal}</span><h4>{meal.name}</h4><strong>{meal.calories}</strong></div></article>)}
        </div>
      </div>
      {loggedMeal && <p className="workspace-feedback"><Check size={16} /> {loggedMeal}</p>}
    </>
  );
}

function GoalsContent({ onNavigate }) {
  return (
    <>
      <div className="workspace-section-heading">
        <div><span>GOAL MOMENTUM</span><h3>Progress worth celebrating</h3></div>
        <button className="workspace-action" onClick={() => onNavigate("health-metrics")}><Target size={16} /> Review health metrics</button>
      </div>
      <div className="workspace-goal-grid">
        {goalCards.map((goal) => <article className="workspace-goal-card" key={goal.name}><img src={goal.image} alt="" /><div className="workspace-goal-shade" /><div className="workspace-goal-copy"><span>{goal.members}</span><h4>{goal.name}</h4><div className="goal-progress-copy"><span>Average progress</span><strong>{goal.progress}%</strong></div><i><b style={{ width: `${goal.progress}%` }} /></i></div></article>)}
      </div>
    </>
  );
}

function HealthContent() {
  const metrics = [
    { icon: FootprintsIcon, label: "Steps", value: "8,420", note: "84% of daily goal", bars: [35, 48, 43, 68, 56, 79, 84] },
    { icon: HeartPulse, label: "Resting heart rate", value: "72 bpm", note: "Within your usual range", bars: [70, 65, 58, 62, 55, 57, 52] },
    { icon: Moon, label: "Sleep", value: "7h 48m", note: "Recovery looking good", bars: [48, 65, 56, 72, 68, 81, 78] },
  ];
  return (
    <>
      <div className="workspace-section-heading"><div><span>CONNECTED HEALTH</span><h3>Signals from the last 7 days</h3></div><span className="device-status"><span /> 846 devices synced today</span></div>
      <div className="workspace-health-grid">{metrics.map(({ icon: Icon, label, value, note, bars }) => <article className="workspace-health-card" key={label}><div className="health-card-top"><span><Icon size={18} /></span><span>{label}</span><button aria-label={`More ${label} options`}><ChevronRight size={17} /></button></div><strong>{value}</strong><small>{note}</small><div className="health-sparkline">{bars.map((height, index) => <i key={`${label}-${index}`} style={{ height: `${height}%` }} />)}</div><div className="health-days"><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span></div></article>)}</div>
      <div className="workspace-device-banner"><Watch size={20} /><div><strong>Wearable sync is active</strong><span>Last sync 4 minutes ago · 846 member devices connected</span></div><span className="sync-pill">SYNCED</span></div>
    </>
  );
}

function FootprintsIcon(props) {
  return <Activity {...props} />;
}

function AnalyticsContent() {
  return (
    <>
      <div className="workspace-section-heading"><div><span>GROWTH REPORT</span><h3>Member growth & revenue</h3></div><button className="workspace-period">Last 6 months <ChevronRight size={15} /></button></div>
      <div className="workspace-analytics-grid">
        <article className="workspace-panel analytics-chart"><div className="chart-legend"><span><i /> Members</span><span><i /> Revenue</span></div><div className="analytics-bars">{analyticsBars.map((item) => <div className="analytics-month" key={item.month}><div className="analytics-bar-pair"><i style={{ height: `${item.members}%` }} /><b style={{ height: `${item.revenue}%` }} /></div><span>{item.month}</span></div>)}</div><div className="chart-axis"><span>0</span><span>25</span><span>50</span><span>75</span><span>100</span></div></article>
        <article className="workspace-panel insight-panel"><div className="insight-icon"><TrendingUp size={19} /></div><span>THIS MONTH</span><h4>Momentum is building.</h4><p>Member attendance and recurring revenue are both trending above your 90-day average.</p><div><strong>+14.2%</strong><small>revenue growth</small></div></article>
      </div>
    </>
  );
}

function CoachContent() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const submitPrompt = (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    setAnswer(`Start with three manageable sessions this week, protect one recovery day, and check in on progress after each workout. Your coach can tailor this plan with member health history.`);
  };
  return (
    <>
      <div className="workspace-section-heading"><div><span>COACHING STUDIO</span><h3>Build a practical next step</h3></div><span className="coach-availability"><span /> READY</span></div>
      <div className="coach-workspace">
        <article className="workspace-panel coach-panel"><div className="coach-panel-heading"><span><Sparkles size={18} /></span><div><strong>Ask FitFlow Coach</strong><small>Suggestions are starting points for your coaching team.</small></div></div><form onSubmit={submitPrompt}><label htmlFor="coach-prompt">What would you like help with?</label><textarea id="coach-prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="e.g. Create a gentle 3-day plan for a member returning after a break" /><button type="submit" className="workspace-action"><Send size={15} /> Generate suggestion</button></form>{answer && <div className="coach-answer"><span>COACHING SUGGESTION</span><p>{answer}</p></div>}</article>
        <div className="coach-prompts"><span>TRY A STARTER</span>{["Improve member consistency", "Plan a recovery week", "Celebrate a new milestone"].map((item) => <button key={item} onClick={() => setPrompt(item)}>{item}<ArrowRight size={15} /></button>)}</div>
      </div>
    </>
  );
}

function BillingContent() {
  return (
    <>
      <div className="workspace-section-heading"><div><span>PAYMENT ACTIVITY</span><h3>Recent invoices</h3></div><a className="workspace-action" href="data:text/csv;charset=utf-8,Invoice%2CCustomer%2CDate%2CTotal%2CStatus%0AINV-2026-042%2CFitFlow%20Performance%20Club%2COct%2008%2C18500%2CPaid" download="fitflow-invoices.csv"><ArrowDownToLine size={16} /> Export CSV</a></div>
      <div className="workspace-panel invoice-panel"><div className="invoice-table-wrap"><table className="invoice-table"><thead><tr><th>INVOICE</th><th>CUSTOMER</th><th>DATE</th><th>AMOUNT</th><th>STATUS</th></tr></thead><tbody>{invoiceRows.map(([id, customer, date, amount, status]) => <tr key={id}><td>{id}</td><td>{customer}</td><td>{date}</td><td>{amount}</td><td><span className={`invoice-status ${status.toLowerCase()}`}>{status}</span></td></tr>)}</tbody></table></div><div className="billing-summary"><span><CircleDollarSign size={16} /> NEXT PAYOUT</span><strong>₹48,200</strong><small>Scheduled for Oct 15, 2026</small></div></div>
    </>
  );
}

function SettingsContent() {
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ email: true, weekly: false });
  return (
    <>
      <div className="workspace-section-heading"><div><span>STUDIO PROFILE</span><h3>Workspace settings</h3></div><span className="settings-saved"><Check size={15} /> {saved ? "Changes saved" : "All changes saved"}</span></div>
      <div className="settings-layout">
        <form className="workspace-panel settings-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}><label>Studio name<input defaultValue="FitFlow Performance Club" onChange={() => setSaved(false)} /></label><label>Contact email<input type="email" defaultValue="hello@fitflow.club" onChange={() => setSaved(false)} /></label><label>Time zone<select defaultValue="Asia/Kolkata" onChange={() => setSaved(false)}><option value="Asia/Kolkata">India Standard Time (IST)</option><option value="Europe/London">Greenwich Mean Time (GMT)</option><option value="America/New_York">Eastern Time (ET)</option></select></label><button className="workspace-action" type="submit"><Check size={15} /> Save preferences</button></form>
        <article className="workspace-panel notification-settings"><span>NOTIFICATIONS</span><h4>Stay in the loop</h4>{[["email", "Member and payment updates"], ["weekly", "Weekly performance summary"]].map(([key, label]) => <label className="toggle-row" key={key}><span>{label}</span><input type="checkbox" checked={notifications[key]} onChange={() => setNotifications((current) => ({ ...current, [key]: !current[key] }))} /></label>)}</article>
      </div>
    </>
  );
}

export default function WorkspaceModule({ module, onNavigate }) {
  const details = moduleDetails[module] ?? moduleDetails.programs;
  const moduleContent = {
    programs: <ProgramsContent />,
    nutrition: <NutritionContent />,
    goals: <GoalsContent onNavigate={onNavigate} />,
    "health-metrics": <HealthContent />,
    analytics: <AnalyticsContent />,
    "ai-coach": <CoachContent />,
    billing: <BillingContent />,
    settings: <SettingsContent />,
  }[module];

  return (
    <div className="workspace-module" style={{ "--module-accent": details.accent }}>
      <ModuleHero details={details} />
      <ModuleStats stats={details.stats} />
      <section className="workspace-module-content">{moduleContent}</section>
    </div>
  );
}
