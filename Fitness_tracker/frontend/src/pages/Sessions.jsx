import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  Clock3,
  MapPin,
  Search,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Users,
  Dumbbell,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";

import "./Sessions.css";

const API_URL = "http://localhost:8080/api/sessions";

const emptyForm = {
  sessionTitle: "",
  memberName: "",
  trainerName: "",
  sessionDate: "",
  sessionTime: "",
  sessionType: "Strength Training",
  location: "Studio A",
  status: "SCHEDULED",
  notes: "",
};

export default function Sessions({ onNavigate }) {

  const [sessions, setSessions] = useState([]);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("ALL");

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingSession, setEditingSession] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [message, setMessage] = useState("");

  // =====================================================
  // LOAD SESSIONS
  // =====================================================

  const loadSessions = async () => {

    try {

      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load sessions");
      }

      const data = await response.json();

      setSessions(data);

    } catch (error) {

      console.error(error);

      setMessage("Unable to connect to backend.");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    loadSessions();
  }, []);

  // =====================================================
  // FORM
  // =====================================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // =====================================================
  // OPEN ADD
  // =====================================================

  const openAddModal = () => {

    setEditingSession(null);

    setForm({
      ...emptyForm,
      sessionDate: new Date().toISOString().split("T")[0],
    });

    setMessage("");

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEditModal = (session) => {

    setEditingSession(session);

    setForm({
      sessionTitle: session.sessionTitle || "",
      memberName: session.memberName || "",
      trainerName: session.trainerName || "",
      sessionDate: session.sessionDate || "",
      sessionTime: session.sessionTime || "",
      sessionType: session.sessionType || "Strength Training",
      location: session.location || "Studio A",
      status: session.status || "SCHEDULED",
      notes: session.notes || "",
    });

    setMessage("");

    setShowModal(true);
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const url = editingSession
        ? `${API_URL}/${editingSession.id}`
        : API_URL;

      const method = editingSession ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to save session");
      }

      setShowModal(false);

      setEditingSession(null);

      setForm(emptyForm);

      await loadSessions();

    } catch (error) {

      console.error(error);

      setMessage("Could not save session.");

    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const deleteSession = async (id) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this session?"
    );

    if (!confirmed) return;

    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      await loadSessions();

    } catch (error) {

      console.error(error);

      setMessage("Could not delete session.");

    }
  };

  // =====================================================
  // FILTER
  // =====================================================

  const filteredSessions = useMemo(() => {

    return sessions.filter((session) => {

      const text = search.toLowerCase();

      const matchesSearch =
        session.sessionTitle
          ?.toLowerCase()
          .includes(text) ||
        session.memberName
          ?.toLowerCase()
          .includes(text) ||
        session.trainerName
          ?.toLowerCase()
          .includes(text);

      const matchesStatus =
        statusFilter === "ALL" ||
        session.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [sessions, search, statusFilter]);

  // =====================================================
  // STATS
  // =====================================================

  const totalSessions = sessions.length;

  const scheduledSessions = sessions.filter(
    (s) => s.status === "SCHEDULED"
  ).length;

  const completedSessions = sessions.filter(
    (s) => s.status === "COMPLETED"
  ).length;

  const cancelledSessions = sessions.filter(
    (s) => s.status === "CANCELLED"
  ).length;

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatTime = (time) => {

    if (!time) return "-";

    const [hours, minutes] = time.split(":");

    const date = new Date();

    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));

    return date.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });

  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const statusClass = (status) => {

    if (status === "COMPLETED") {
      return "status completed";
    }

    if (status === "CANCELLED") {
      return "status cancelled";
    }

    return "status scheduled";
  };

  return (
    <div className="sessions-page">

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sessions-sidebar">

        <div className="sessions-logo">

          <div className="sessions-logo-mark">
            F
          </div>

          <span>FITFLOW</span>

        </div>

        <div className="sessions-nav">

          <button
            onClick={() => onNavigate("dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => onNavigate("members")}
          >
            Members
          </button>

          <button
            onClick={() => onNavigate("trainers")}
          >
            Trainers
          </button>

          <button className="active">
            Sessions
          </button>

          <button
            onClick={() => onNavigate("programs")}
          >
            Programs
          </button>

          <button
            onClick={() => onNavigate("nutrition")}
          >
            Nutrition
          </button>

          <button
            onClick={() => onNavigate("goals")}
          >
            Goals
          </button>

          <button
            onClick={() => onNavigate("health-metrics")}
          >
            Health Metrics
          </button>

          <button
            onClick={() => onNavigate("analytics")}
          >
            Analytics
          </button>

          <button
            onClick={() => onNavigate("ai-coach")}
          >
            AI Coach
          </button>

          <button
            onClick={() => onNavigate("billing")}
          >
            Billing
          </button>

          <button
            onClick={() => onNavigate("settings")}
          >
            Settings
          </button>

        </div>

        <button
          className="sessions-back"
          onClick={() => onNavigate("dashboard")}
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>

      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="sessions-main">

        {/* TOP BAR */}

        <header className="sessions-topbar">

          <div>

            <span className="page-label">
              FITNESS OPERATIONS
            </span>

            <h1>Sessions</h1>

            <p>
              Schedule and manage training sessions.
            </p>

          </div>

          <button
            className="sessions-add-btn"
            onClick={openAddModal}
          >
            <Plus size={18} />
            Add Session
          </button>

        </header>

        {/* MESSAGE */}

        {message && (
          <div className="sessions-message">
            {message}
          </div>
        )}

        {/* =================================================
            KPI CARDS
        ================================================= */}

        <section className="sessions-stats">

          <div className="session-stat-card">

            <div className="session-stat-icon">
              <CalendarDays size={22} />
            </div>

            <div>
              <span>TOTAL SESSIONS</span>
              <strong>{totalSessions}</strong>
            </div>

          </div>

          <div className="session-stat-card">

            <div className="session-stat-icon">
              <Clock3 size={22} />
            </div>

            <div>
              <span>SCHEDULED</span>
              <strong>{scheduledSessions}</strong>
            </div>

          </div>

          <div className="session-stat-card">

            <div className="session-stat-icon">
              <CheckCircle2 size={22} />
            </div>

            <div>
              <span>COMPLETED</span>
              <strong>{completedSessions}</strong>
            </div>

          </div>

          <div className="session-stat-card">

            <div className="session-stat-icon">
              <XCircle size={22} />
            </div>

            <div>
              <span>CANCELLED</span>
              <strong>{cancelledSessions}</strong>
            </div>

          </div>

        </section>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <section className="sessions-toolbar">

          <div className="sessions-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search sessions, members or trainers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">
              All Status
            </option>

            <option value="SCHEDULED">
              Scheduled
            </option>

            <option value="COMPLETED">
              Completed
            </option>

            <option value="CANCELLED">
              Cancelled
            </option>
          </select>

          <button
            className="refresh-btn"
            onClick={loadSessions}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </section>

        {/* =================================================
            SESSION LIST
        ================================================= */}

        <section className="session-list">

          {loading ? (

            <div className="sessions-empty">
              Loading sessions...
            </div>

          ) : filteredSessions.length === 0 ? (

            <div className="sessions-empty">

              <CalendarDays size={45} />

              <h3>No sessions found</h3>

              <p>
                Create your first training session.
              </p>

              <button
                className="sessions-add-btn"
                onClick={openAddModal}
              >
                <Plus size={17} />
                Add Session
              </button>

            </div>

          ) : (

            filteredSessions.map((session) => (

              <div
                className="session-card"
                key={session.id}
              >

                <div className="session-date-box">

                  <CalendarDays size={22} />

                  <strong>
                    {formatDate(session.sessionDate)}
                  </strong>

                  <span>
                    {formatTime(session.sessionTime)}
                  </span>

                </div>

                <div className="session-details">

                  <div className="session-title-row">

                    <div>

                      <span className="session-type">
                        {session.sessionType}
                      </span>

                      <h3>
                        {session.sessionTitle}
                      </h3>

                    </div>

                    <span
                      className={statusClass(
                        session.status
                      )}
                    >
                      {session.status}
                    </span>

                  </div>

                  <div className="session-info">

                    <span>
                      <Users size={15} />
                      {session.memberName}
                    </span>

                    <span>
                      <Dumbbell size={15} />
                      {session.trainerName}
                    </span>

                    <span>
                      <MapPin size={15} />
                      {session.location}
                    </span>

                  </div>

                  {session.notes && (
                    <p className="session-notes">
                      {session.notes}
                    </p>
                  )}

                </div>

                <div className="session-actions">

                  <button
                    onClick={() =>
                      openEditModal(session)
                    }
                    title="Edit"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    className="delete"
                    onClick={() =>
                      deleteSession(session.id)
                    }
                    title="Delete"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            ))

          )}

        </section>

      </main>

      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {showModal && (

        <div
          className="session-modal-overlay"
          onClick={() => setShowModal(false)}
        >

          <div
            className="session-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="session-modal-header">

              <div>

                <span>FITFLOW</span>

                <h2>
                  {editingSession
                    ? "Edit Session"
                    : "Schedule Session"}
                </h2>

              </div>

              <button
                onClick={() => setShowModal(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-group full">

                  <label>
                    Session Title
                  </label>

                  <input
                    name="sessionTitle"
                    value={form.sessionTitle}
                    onChange={handleChange}
                    placeholder="Personal Training"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Member
                  </label>

                  <input
                    name="memberName"
                    value={form.memberName}
                    onChange={handleChange}
                    placeholder="Rahul Sharma"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Trainer
                  </label>

                  <input
                    name="trainerName"
                    value={form.trainerName}
                    onChange={handleChange}
                    placeholder="Arjun Kumar"
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    name="sessionDate"
                    value={form.sessionDate}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Time
                  </label>

                  <input
                    type="time"
                    name="sessionTime"
                    value={form.sessionTime}
                    onChange={handleChange}
                    required
                  />

                </div>

                <div className="form-group">

                  <label>
                    Session Type
                  </label>

                  <select
                    name="sessionType"
                    value={form.sessionType}
                    onChange={handleChange}
                  >
                    <option>
                      Strength Training
                    </option>

                    <option>
                      HIIT
                    </option>

                    <option>
                      Personal Training
                    </option>

                    <option>
                      Cardio
                    </option>

                    <option>
                      Yoga
                    </option>

                    <option>
                      Mobility
                    </option>

                  </select>

                </div>

                <div className="form-group">

                  <label>
                    Location
                  </label>

                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Studio A"
                  />

                </div>

                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="SCHEDULED">
                      Scheduled
                    </option>

                    <option value="COMPLETED">
                      Completed
                    </option>

                    <option value="CANCELLED">
                      Cancelled
                    </option>

                  </select>

                </div>

                <div className="form-group full">

                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Add session notes..."
                    rows="3"
                  />

                </div>

              </div>

              <div className="session-form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-session-btn"
                >
                  {editingSession
                    ? "Update Session"
                    : "Create Session"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}