import { useEffect, useState } from "react";
import axios from "axios";
import "./admindashboard.css";

function AdminDashboard() {
  const [issues, setIssues] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ Base URL from env
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch all unresolved issues
  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/issues`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const activeIssues = res.data.filter(
        (issue) => issue.status !== "resolved"
      );

      setIssues(activeIssues);
    } catch (err) {
      console.error(err);
      alert("Error fetching issues");
    }
  };

  useEffect(() => {
    if (token) {
      fetchIssues();
    }
  }, [token]);

  // Mark issue as resolved
  const markCompleted = async (id) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/issues/${id}/status`,
        { status: "resolved" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchIssues();
    } catch (err) {
      console.error(err);
      alert("Error updating issue");
    }
  };

  return (
    <div className="admin-page">
      <h1 className="admin-title">Admin Dashboard</h1>

      {issues.length === 0 && (
        <p className="empty-text">No pending issues</p>
      )}

      <div className="issues-grid">
        {issues.map((issue) => (
          <div key={issue._id} className="issue-card">
            <div className="issue-header">
              <h3>{issue.title}</h3>
              <span className="status pending">
                {issue.status}
              </span>
            </div>

            <p className="issue-desc">{issue.description}</p>

            <p className="reporter">
              <b>Reported by:</b>{" "}
              {issue.createdBy?.name} ({issue.createdBy?.email})
            </p>

            {issue.image && (
              <img
                src={issue.image}
                alt="issue"
                className="issue-image clickable"
                onClick={() => setPreviewImage(issue.image)}
              />
            )}

            <button
              className="resolve-btn"
              onClick={() => markCompleted(issue._id)}
            >
              Mark as Resolved
            </button>
          </div>
        ))}
      </div>

      {/* 🔍 IMAGE PREVIEW MODAL */}
      {previewImage && (
        <div
          className="image-modal"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="preview"
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          />
          <span
            className="close-btn"
            onClick={() => setPreviewImage(null)}
          >
            ✕
          </span>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
