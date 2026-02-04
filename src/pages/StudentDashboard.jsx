import { useEffect, useState } from "react";
import axios from "axios";
import "./StudentDashBoard.css";

function StudentDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [issues, setIssues] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ Base URL from env
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 🔹 Fetch student's own issues
  const fetchMyIssues = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/issues/my`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIssues(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchMyIssues();
    }
  }, [token]);

  // 🔹 Create issue
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image) formData.append("image", image);

      await axios.post(
        `${BASE_URL}/api/issues`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Issue created successfully");

      setTitle("");
      setDescription("");
      setImage(null);

      fetchMyIssues(); // refresh list
    } catch (err) {
      console.error(err);
      alert("Error creating issue");
    }
  };

  return (
    <div className="student-page">
      <h2 className="page-title">Student Dashboard</h2>

      <div className="dashboard-grid">
        {/* Create Issue */}
        <div className="card">
          <h3>Create New Issue</h3>

          <input
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Issue Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            className="primary-btn"
            onClick={handleSubmit}
            disabled={!title || !description}
          >
            Submit Issue
          </button>
        </div>

        {/* My Issues */}
        <div className="card">
          <h3>My Issues</h3>

          {issues
            .filter((issue) => issue.status !== "completed")
            .map((issue) => (
              <div className="issue-card" key={issue._id}>
                <div className="issue-header">
                  <h4>{issue.title}</h4>
                  <span className={`status ${issue.status}`}>
                    {issue.status}
                  </span>
                </div>

                <p>{issue.description}</p>

                {issue.image && (
                  <img src={issue.image} alt="issue" />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
