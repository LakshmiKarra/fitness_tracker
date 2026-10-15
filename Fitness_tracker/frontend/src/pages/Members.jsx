import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  Clock3,
  UserPlus,
  X,
  Dumbbell,
} from "lucide-react";
import "./Members.css";

const API_URL = "http://localhost:8080/api/members";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  membershipPlan: "Premium",
  trainer: "",
  status: "ACTIVE",
  joinDate: "",
  renewalDate: "",
  goal: "",
};

export default function Members({ onNavigate }) {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Load members
  const loadMembers = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load members");
      }

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      setMessage("Unable to connect to the FitFlow backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  // Form change
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  // Open add modal
  const openAddModal = () => {
    setEditingMember(null);
    setForm(emptyForm);
    setMessage("");
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (member) => {
    setEditingMember(member);

    setForm({
      fullName: member.fullName || "",
      email: member.email || "",
      phone: member.phone || "",
      membershipPlan: member.membershipPlan || "Premium",
      trainer: member.trainer || "",
      status: member.status || "ACTIVE",
      joinDate: member.joinDate || "",
      renewalDate: member.renewalDate || "",
      goal: member.goal || "",
    });

    setMessage("");
    setShowModal(true);
  };

  // Save member
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");

      const url = editingMember
        ? `${API_URL}/${editingMember.id}`
        : API_URL;

      const method = editingMember ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Save failed");
      }

      await loadMembers();

      setShowModal(false);
      setEditingMember(null);
      setForm(emptyForm);
    } catch (error) {
      setMessage("Unable to save member.");
    } finally {
      setSaving(false);
    }
  };

  // Delete member
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      await loadMembers();
    } catch (error) {
      setMessage("Unable to delete member.");
    }
  };

  // Filter members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        member.fullName?.toLowerCase().includes(searchText) ||
        member.email?.toLowerCase().includes(searchText) ||
        member.trainer?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" ||
        member.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [members, search, statusFilter]);

  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "ACTIVE"
  ).length;

  const expiringMembers = members.filter(
    (member) => member.status === "EXPIRING"
  ).length;

  const newMembers = members.filter((member) => {
    if (!member.joinDate) return false;

    const joined = new Date(member.joinDate);
    const now = new Date();

    const difference =
      (now - joined) / (1000 * 60 * 60 * 24);

    return difference <= 30;
  }).length;

  const getInitials = (name) => {
    if (!name) return "M";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="members-page">

      {/* SIDEBAR */}
      <aside className="members-sidebar">

        <div className="brand">
          FIT<span>FLOW</span>
        </div>

        <div className="brand-subtitle">
          WELLNESS OS
        </div>

        <nav>
          <button onClick={() => onNavigate?.("dashboard")}>
            Dashboard
          </button>

          <button className="active">
            <Users size={18} />
            Members
          </button>

          <button onClick={() => onNavigate?.("trainers")}>
            Trainers
          </button>

          <button onClick={() => onNavigate?.("sessions")}>
            Sessions
          </button>

          <button onClick={() => onNavigate?.("programs")}>
            Programs
          </button>

          <button onClick={() => onNavigate?.("nutrition")}>
            Nutrition
          </button>

          <button onClick={() => onNavigate?.("goals")}>
            Goals
          </button>

          <button onClick={() => onNavigate?.("health-metrics")}>
            Health Metrics
          </button>

          <button onClick={() => onNavigate?.("analytics")}>
            Analytics
          </button>

          <button onClick={() => onNavigate?.("ai-coach")}>
            AI Coach
          </button>

          <button onClick={() => onNavigate?.("billing")}>
            Billing
          </button>

          <button onClick={() => onNavigate?.("settings")}>
            Settings
          </button>
        </nav>

      </aside>

      {/* MAIN */}
      <main className="members-main">

        {/* HEADER */}
        <header className="members-header">

          <div>
            <div className="eyebrow">
              MEMBER MANAGEMENT
            </div>

            <h1>Members</h1>

            <p>
              Manage your members, memberships and engagement.
            </p>
          </div>

          <button
            className="add-member-button"
            onClick={openAddModal}
          >
            <Plus size={19} />
            ADD MEMBER
          </button>

        </header>

        {/* KPI CARDS */}
        <section className="member-stats">

          <div className="member-stat-card">
            <div className="stat-icon">
              <Users size={21} />
            </div>

            <div>
              <span>TOTAL MEMBERS</span>
              <strong>{totalMembers}</strong>
              <small>All registered members</small>
            </div>
          </div>

          <div className="member-stat-card">
            <div className="stat-icon">
              <UserCheck size={21} />
            </div>

            <div>
              <span>ACTIVE MEMBERS</span>
              <strong>{activeMembers}</strong>
              <small>Currently active</small>
            </div>
          </div>

          <div className="member-stat-card">
            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <div>
              <span>EXPIRING SOON</span>
              <strong>{expiringMembers}</strong>
              <small>Need renewal attention</small>
            </div>
          </div>

          <div className="member-stat-card">
            <div className="stat-icon">
              <UserPlus size={21} />
            </div>

            <div>
              <span>NEW MEMBERS</span>
              <strong>{newMembers}</strong>
              <small>Joined in last 30 days</small>
            </div>
          </div>

        </section>

        {/* TABLE CARD */}
        <section className="members-card">

          <div className="members-toolbar">

            <div className="search-box">
              <Search size={19} />

              <input
                type="text"
                placeholder="Search members, email or trainer..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRING">Expiring</option>
              <option value="EXPIRED">Expired</option>
            </select>

            <button
              className="refresh-button"
              onClick={loadMembers}
            >
              Refresh
            </button>

          </div>

          {message && (
            <div className="members-message">
              {message}
            </div>
          )}

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>MEMBER</th>
                  <th>PLAN</th>
                  <th>TRAINER</th>
                  <th>JOINED</th>
                  <th>RENEWAL</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td colSpan="7" className="empty-row">
                      Loading members...
                    </td>
                  </tr>
                ) : filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="empty-row">
                      <Dumbbell size={28} />
                      <strong>No members found</strong>
                      <span>
                        Add your first member to get started.
                      </span>
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id}>

                      <td>
                        <div className="member-cell">

                          <div className="member-avatar">
                            {getInitials(member.fullName)}
                          </div>

                          <div>
                            <strong>{member.fullName}</strong>
                            <span>{member.email}</span>
                          </div>

                        </div>
                      </td>

                      <td>
                        <span className="plan-badge">
                          {member.membershipPlan}
                        </span>
                      </td>

                      <td>
                        {member.trainer || "Unassigned"}
                      </td>

                      <td>
                        {formatDate(member.joinDate)}
                      </td>

                      <td>
                        {formatDate(member.renewalDate)}
                      </td>

                      <td>
                        <span
                          className={`status-badge ${member.status?.toLowerCase()}`}
                        >
                          <i></i>
                          {member.status}
                        </span>
                      </td>

                      <td>
                        <div className="table-actions">

                          <button
                            onClick={() =>
                              openEditModal(member)
                            }
                            title="Edit member"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            className="delete-action"
                            onClick={() =>
                              handleDelete(member.id)
                            }
                            title="Delete member"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

          <div className="table-footer">
            Showing {filteredMembers.length} of {members.length} members
          </div>

        </section>

      </main>

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
            }
          }}
        >

          <div className="member-modal">

            <div className="modal-header">

              <div>
                <span className="eyebrow">
                  {editingMember
                    ? "MEMBER MANAGEMENT"
                    : "NEW MEMBER"}
                </span>

                <h2>
                  {editingMember
                    ? "Edit Member"
                    : "Add Member"}
                </h2>
              </div>

              <button
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-field full">
                  <label>FULL NAME</label>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>EMAIL</label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="member@email.com"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>PHONE</label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                  />
                </div>

                <div className="form-field">
                  <label>MEMBERSHIP PLAN</label>

                  <select
                    name="membershipPlan"
                    value={form.membershipPlan}
                    onChange={handleChange}
                  >
                    <option>Premium</option>
                    <option>6 Months</option>
                    <option>9 Months</option>
                    <option>1 Year</option>
                    <option>Basic</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>TRAINER</label>

                  <input
                    name="trainer"
                    value={form.trainer}
                    onChange={handleChange}
                    placeholder="Trainer name"
                  />
                </div>

                <div className="form-field">
                  <label>STATUS</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="EXPIRING">Expiring</option>
                    <option value="EXPIRED">Expired</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>JOIN DATE</label>

                  <input
                    type="date"
                    name="joinDate"
                    value={form.joinDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field">
                  <label>RENEWAL DATE</label>

                  <input
                    type="date"
                    name="renewalDate"
                    value={form.renewalDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-field full">
                  <label>FITNESS GOAL</label>

                  <input
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    placeholder="Weight loss, muscle gain, strength..."
                  />
                </div>

              </div>

              {message && (
                <div className="modal-message">
                  {message}
                </div>
              )}

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowModal(false)}
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="save-button"
                  disabled={saving}
                >
                  {saving
                    ? "SAVING..."
                    : editingMember
                      ? "UPDATE MEMBER"
                      : "CREATE MEMBER"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}