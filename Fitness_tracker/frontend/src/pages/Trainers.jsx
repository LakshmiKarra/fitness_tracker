import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  Users,
  Award,
  Clock3,
  UserCheck,
  X,
  Mail,
  Phone,
  BadgeCheck,
} from "lucide-react";

import "./Trainers.css";

const API_URL = "http://localhost:8080/api/trainers";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  specialization: "Strength Training",
  experience: "",
  status: "ACTIVE",
  joiningDate: "",
  certification: "",
};

const trainerImages = [
  "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
];

const coachingFocus = [
  { label: "STRENGTH", title: "Build with intention", image: trainerImages[0], alt: "FitFlow strength coach" },
  { label: "PERFORMANCE", title: "Find your next level", image: trainerImages[1], alt: "FitFlow performance coach" },
  { label: "MOBILITY", title: "Move well. Feel strong.", image: trainerImages[2], alt: "FitFlow mobility coach" },
];

function getInitials(name = "") {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Trainers({ onNavigate }) {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrainer, setEditingTrainer] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadTrainers = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load trainers");
      }

      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error(error);
      alert("Unable to load trainers. Check the backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrainers();
  }, []);

  const filteredTrainers = useMemo(() => {
    return trainers.filter((trainer) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        trainer.fullName?.toLowerCase().includes(searchText) ||
        trainer.email?.toLowerCase().includes(searchText) ||
        trainer.specialization?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "ALL" || trainer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [trainers, search, statusFilter]);

  const totalTrainers = trainers.length;

  const activeTrainers = trainers.filter(
    (trainer) => trainer.status === "ACTIVE"
  ).length;

  const inactiveTrainers = trainers.filter(
    (trainer) => trainer.status === "INACTIVE"
  ).length;

  const averageExperience =
    trainers.length > 0
      ? (
          trainers.reduce(
            (sum, trainer) => sum + Number(trainer.experience || 0),
            0
          ) / trainers.length
        ).toFixed(1)
      : "0.0";

  const openAddModal = () => {
    setEditingTrainer(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (trainer) => {
    setEditingTrainer(trainer);

    setForm({
      fullName: trainer.fullName || "",
      email: trainer.email || "",
      phone: trainer.phone || "",
      specialization: trainer.specialization || "Strength Training",
      experience: trainer.experience || "",
      status: trainer.status || "ACTIVE",
      joiningDate: trainer.joiningDate || "",
      certification: trainer.certification || "",
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTrainer(null);
    setForm(emptyForm);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveTrainer = async (e) => {
    e.preventDefault();

    try {
      const url = editingTrainer
        ? `${API_URL}/${editingTrainer.id}`
        : API_URL;

      const method = editingTrainer ? "PUT" : "POST";

      const payload = {
        ...form,
        experience: Number(form.experience),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to save trainer");
      }

      closeModal();
      loadTrainers();
    } catch (error) {
      console.error(error);
      alert("Unable to save trainer.");
    }
  };

  const deleteTrainer = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete trainer");
      }

      loadTrainers();
    } catch (error) {
      console.error(error);
      alert("Unable to delete trainer.");
    }
  };

  const handleNavigation = (target) => {
    if (onNavigate) {
      onNavigate(target);
    }
  };

  return (
    <div className="trainers-page">
      {/* SIDEBAR */}

      <aside className="trainers-sidebar">
        <div className="trainers-brand">
          FIT<span>FLOW</span>
        </div>

        <div className="sidebar-label">WORKSPACE</div>

        <button
          className="trainer-nav-item"
          onClick={() => handleNavigation("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="trainer-nav-item"
          onClick={() => handleNavigation("members")}
        >
          Members
        </button>

        <button className="trainer-nav-item active">
          Trainers
        </button>

        {[
          ["Sessions", "sessions"],
          ["Programs", "programs"],
          ["Nutrition", "nutrition"],
          ["Goals", "goals"],
          ["Health Metrics", "health-metrics"],
          ["Analytics", "analytics"],
          ["AI Coach", "ai-coach"],
          ["Billing", "billing"],
          ["Settings", "settings"],
        ].map(([label, target]) => (
          <button
            key={target}
            className="trainer-nav-item"
            onClick={() => handleNavigation(target)}
          >
            {label}
          </button>
        ))}

        <div className="sidebar-bottom">
          <button
            className="trainer-nav-item logout"
            onClick={() => handleNavigation("landing")}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="trainers-main">
        <header className="trainers-header">
          <div>
            <div className="eyebrow">TEAM MANAGEMENT</div>

            <h1>
              Your <span>Trainers</span>
            </h1>

            <p>
              Build and manage your high-performance coaching team.
            </p>
          </div>

          <button className="add-trainer-btn" onClick={openAddModal}>
            <Plus size={19} />
            Add Trainer
          </button>
        </header>

        <section className="trainer-showcase" aria-label="Coaching specialties">
          {coachingFocus.map((focus) => (
            <article className="trainer-showcase-card" key={focus.label}>
              <img src={focus.image} alt={focus.alt} />
              <div className="trainer-showcase-shade" />
              <div className="trainer-showcase-copy">
                <span>{focus.label}</span>
                <h2>{focus.title}</h2>
              </div>
            </article>
          ))}
        </section>

        {/* STATS */}

        <section className="trainer-stats">
          <div className="trainer-stat-card">
            <div className="stat-icon">
              <Users size={21} />
            </div>

            <div>
              <span>Total Trainers</span>
              <strong>{totalTrainers}</strong>
            </div>
          </div>

          <div className="trainer-stat-card">
            <div className="stat-icon">
              <UserCheck size={21} />
            </div>

            <div>
              <span>Active Trainers</span>
              <strong>{activeTrainers}</strong>
            </div>
          </div>

          <div className="trainer-stat-card">
            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <div>
              <span>Avg. Experience</span>
              <strong>{averageExperience} yrs</strong>
            </div>
          </div>

          <div className="trainer-stat-card">
            <div className="stat-icon">
              <Award size={21} />
            </div>

            <div>
              <span>Inactive</span>
              <strong>{inactiveTrainers}</strong>
            </div>
          </div>
        </section>

        {/* TOOLBAR */}

        <section className="trainer-toolbar">
          <div className="trainer-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search trainers, specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <button
            className="refresh-btn"
            onClick={loadTrainers}
            title="Refresh trainers"
          >
            <RefreshCw size={18} />
          </button>
        </section>

        {/* TRAINERS */}

        {loading ? (
          <div className="trainer-empty">
            <div className="loading-ring"></div>
            <p>Loading trainers...</p>
          </div>
        ) : filteredTrainers.length === 0 ? (
          <div className="trainer-empty">
            <div className="empty-icon">
              <Users size={28} />
            </div>

            <h3>No trainers found</h3>

            <p>
              Add your first trainer to start building your coaching team.
            </p>

            <button
              className="add-trainer-btn"
              onClick={openAddModal}
            >
              <Plus size={18} />
              Add First Trainer
            </button>
          </div>
        ) : (
          <section className="trainer-grid">
            {filteredTrainers.map((trainer, index) => {
              const image =
                trainerImages[index % trainerImages.length];

              return (
                <article className="trainer-card" key={trainer.id}>
                  <div className="trainer-photo">
                    <img
                      src={image}
                      alt={trainer.fullName}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add(
                          "photo-fallback"
                        );
                      }}
                    />

                    <div className="photo-overlay"></div>

                    <div className="trainer-status">
                      <span
                        className={
                          trainer.status === "ACTIVE"
                            ? "status-dot active"
                            : "status-dot"
                        }
                      ></span>

                      {trainer.status}
                    </div>

                    <div className="trainer-initials">
                      {getInitials(trainer.fullName)}
                    </div>
                  </div>

                  <div className="trainer-card-body">
                    <div className="trainer-name-row">
                      <div>
                        <h3>{trainer.fullName}</h3>
                        <p>{trainer.specialization}</p>
                      </div>

                      <BadgeCheck
                        className="verified-icon"
                        size={21}
                      />
                    </div>

                    <div className="trainer-info">
                      <div>
                        <Mail size={15} />
                        <span>{trainer.email}</span>
                      </div>

                      <div>
                        <Phone size={15} />
                        <span>{trainer.phone || "Not provided"}</span>
                      </div>
                    </div>

                    <div className="trainer-meta">
                      <div>
                        <span>EXPERIENCE</span>
                        <strong>
                          {trainer.experience || 0} yrs
                        </strong>
                      </div>

                      <div>
                        <span>CERTIFICATION</span>
                        <strong>
                          {trainer.certification || "Not added"}
                        </strong>
                      </div>
                    </div>

                    <div className="trainer-actions">
                      <button
                        className="edit-trainer"
                        onClick={() => openEditModal(trainer)}
                      >
                        <Pencil size={15} />
                        Edit
                      </button>

                      <button
                        className="delete-trainer"
                        onClick={() => deleteTrainer(trainer.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      {/* MODAL */}

      {modalOpen && (
        <div className="trainer-modal-backdrop">
          <div className="trainer-modal">
            <div className="modal-header">
              <div>
                <span>FITFLOW TEAM</span>

                <h2>
                  {editingTrainer
                    ? "Edit Trainer"
                    : "Add New Trainer"}
                </h2>
              </div>

              <button onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={saveTrainer}>
              <div className="form-grid">
                <div className="form-field full">
                  <label>Full Name</label>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Arjun Kumar"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="trainer@fitflow.com"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Phone</label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                  />
                </div>

                <div className="form-field">
                  <label>Specialization</label>

                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                  >
                    <option>Strength Training</option>
                    <option>Weight Loss</option>
                    <option>HIIT</option>
                    <option>Yoga & Mobility</option>
                    <option>Functional Training</option>
                    <option>Nutrition Coaching</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Experience</label>

                  <input
                    type="number"
                    min="0"
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="5"
                    required
                  />
                </div>

                <div className="form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Joining Date</label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={form.joiningDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-field full">
                  <label>Certification</label>

                  <input
                    name="certification"
                    value={form.certification}
                    onChange={handleChange}
                    placeholder="e.g. ACE Certified"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="save-btn">
                  {editingTrainer
                    ? "Save Changes"
                    : "Create Trainer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}