import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import React, { useRef, useState, useEffect } from "react";
import { 
  MessageSquare, 
  Search, 
  GraduationCap, 
  DollarSign, 
  Award, 
  TrendingUp, 
  FileText, 
  History,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  Users,
  BookOpen
} from "lucide-react";

// Import the custom CSS
import "../styles/dashboard.css";

const Dashboard = () => {
  const fileInputRef = useRef(null);

  const role = localStorage.getItem("role") || "STUDENT";

const navigate = useNavigate();

const token = localStorage.getItem("token");

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  navigate("/login");
};

useEffect(() => {

 const storedUser = JSON.parse(localStorage.getItem("user"));

fetch(`http://localhost:8080/api/documents/${userId}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch documents");
      }
      return res.json();
    })
    .then((data) => {
      setUploadedFiles(data);
    })
    .catch((err) => {
      console.error(err);
    });

}, []);
const [uploadedFiles, setUploadedFiles] = useState([]);

const handleFileUpload = async (event) => {

  const file = event.target.files[0];

  if (!file) return;

  const formData = new FormData();

  formData.append("file", file);
  formData.append("userId", userId);

const user = JSON.parse(localStorage.getItem("user"));
console.log(user);


  try {

    const response = await fetch(
  "http://localhost:8080/api/documents/upload",
  {

    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,

  }
);

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.text();

alert("File uploaded successfully!");

console.log(data);

setUploadedFiles((prev) => [...prev, file.name]);

  } catch (error) {

    console.error(error);

    alert("File upload failed");
  }
};

// Get logged in user
const storedUser = localStorage.getItem("user");

let userName = "User";
let userRole = role;
let userId = null;

try {
  if (storedUser) {
    const parsed = JSON.parse(storedUser);

    if (parsed.firstName) {
      userName = parsed.firstName;
    }

    if (parsed.role) {
      userRole = parsed.role;
    }

    if (parsed.id) {
      userId = parsed.id;
    }
  }
} catch (err) {
  console.error("Error parsing user:", err);
}
  
  const services = [
    {
      title: "Start Chat",
      description: "Get instant answers from our AI assistant",
      icon: MessageSquare,
      color: "primary",
      link: "/chat",
      badge: "AI Powered"
    },
    {
      title: "College Finder",
      description: "Find the perfect college for your goals",
      icon: Search,
      color: "secondary",
      link: "/college-finder",
      badge: "Popular"
    },
    {
      title: "Admission Info",
      description: "Complete admission process guidance",
      icon: GraduationCap,
      color: "accent",
      link: "/admission-fees",
      badge: null
    },
    {
      title: "Fee Structure",
      description: "Detailed fee information for all courses",
      icon: DollarSign,
      color: "success",
      link: "/admission-fees",
      badge: null
    },
    {
      title: "Scholarships",
      description: "Discover available scholarship opportunities",
      icon: Award,
      color: "warning",
      link: "/scholarships-placement",
      badge: "Updated"
    },
    {
      title: "Placement Info",
      description: "Placement records and career guidance",
      icon: TrendingUp,
      color: "secondary",
      link: "/scholarships-placement",
      badge: null
    },
    {
  title: "My Documents",
  description: "Upload and manage documents",
  icon: FileText,
  color: "muted",
  action: "upload",
  badge: null
},
    {
      title: "Query History",
      description: "View your past conversations",
      icon: History,
      color: "primary",
      link: "/query-history",
      badge: null
    },
  ];

  

  const recentActivity = [
    { type: "chat", title: "Asked about MBA admission criteria", time: "2 hours ago" },
    { type: "search", title: "Searched for engineering colleges in Pune", time: "1 day ago" },
    { type: "document", title: "Uploaded mark sheet", time: "3 days ago" },
  ];

  const notifications = [
    { title: "New scholarship scheme announced", time: "1 hour ago", type: "info" },
    { title: "Admission deadline reminder", time: "1 day ago", type: "warning" },
    { title: "Profile completion pending", time: "2 days ago", type: "alert" },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="flex items-center justify-between">
            <div className="header-brand">
              <div className="brand-icon">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="brand-text">
                <h1>DTE AI Assistant</h1>
                <p>Dashboard</p>
              </div>
            </div>
            <div className="header-actions">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-header">
            <div className="welcome-text">
              <h1>Welcome back, {userName}! 👋</h1>
              <p>Ready to continue your educational journey? Let's help you find what you need.</p>
            </div>
            <div className="user-badge">
              <Users className="w-3 h-3" />
              {userRole}
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon primary">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="stat-info">
                  <div className="stat-value">24</div>
                  <div className="stat-label">Chat Sessions</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon secondary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="stat-info">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Colleges Saved</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon accent">
                  <Award className="w-5 h-5" />
                </div>
                <div className="stat-info">
                  <div className="stat-value">8</div>
                  <div className="stat-label">Scholarships</div>
                </div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-content">
                <div className="stat-icon success">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="stat-info">
                  <div className="stat-value">6</div>
                  <div className="stat-label">Documents</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Main Services */}
          <div className="services-section">
            <h2 className="services-title">Services</h2>
            <div className="services-grid">
             {services.map((service, index) => {

  const cardContent = (
    <div className="service-card">

      <div className="service-header">
        <div className={`service-icon ${service.color}`}>
          <service.icon className="w-6 h-6" />
        </div>

        {service.badge && (
          <div className="service-badge">
            {service.badge}
          </div>
        )}
      </div>

      <div className="service-content">
        <h3 className="service-title">
          {service.title}
        </h3>

        <p className="service-description">
          {service.description}
        </p>
      </div>

      <ChevronRight className="service-arrow w-4 h-4 mt-3" />
    </div>
  );

  return service.action === "upload" ? (

    <div
      key={index}
      onClick={() => fileInputRef.current?.click()}
      style={{ cursor: "pointer" }}
    >
      {cardContent}
    </div>

  ) : (

    <Link key={index} to={service.link}>
      {cardContent}
    </Link>

  );
})}
            </div>
          </div>

          {/* Sidebar */}
<div className="sidebar">

  {/* Recent Activity */}
  <div className="sidebar-card">
    <div className="sidebar-card-header">
      <h3 className="sidebar-card-title">
        <Clock className="w-5 h-5" />
        Recent Activity
      </h3>
    </div>

    <div className="sidebar-card-content">
      {recentActivity.map((activity, index) => (
        <div key={index} className="activity-item">

          <div className="activity-icon">
            {activity.type === "chat" && (
              <MessageSquare className="w-4 h-4" />
            )}

            {activity.type === "search" && (
              <Search className="w-4 h-4" />
            )}

            {activity.type === "document" && (
              <FileText className="w-4 h-4" />
            )}
          </div>

          <div className="activity-content">
            <p className="activity-title">{activity.title}</p>
            <p className="activity-time">{activity.time}</p>
          </div>

        </div>
      ))}

      <Button variant="ghost" className="w-full text-sm">
        View All Activity
      </Button>
    </div>
  </div>

  {/* Notifications */}
  <div className="sidebar-card">
    <div className="sidebar-card-header">
      <h3 className="sidebar-card-title">
        <Bell className="w-5 h-5" />
        Notifications
      </h3>
    </div>

    <div className="sidebar-card-content">
      {notifications.map((notification, index) => (
        <div key={index} className="notification-item">

          <div className="notification-header">

            <div className="notification-content">
              <p className="notification-title">
                {notification.title}
              </p>

              <p className="notification-time">
                {notification.time}
              </p>
            </div>

            <div
              className={`notification-indicator ${notification.type}`}
            />

          </div>

        </div>
      ))}

      <Button variant="ghost" className="w-full text-sm">
        View All Notifications
      </Button>
    </div>
  </div>

  {/* Uploaded Documents */}
  <div className="sidebar-card">

    <div className="sidebar-card-header">
      <h3 className="sidebar-card-title">
        <FileText className="w-5 h-5" />
        Uploaded Documents
      </h3>
    </div>

    <div className="sidebar-card-content">

      {uploadedFiles.length === 0 ? (

        <p className="text-sm text-gray-500">
          No documents uploaded yet
        </p>

      ) : (

        uploadedFiles.map((file, index) => (

          <a
            key={index}
            href={`http://localhost:8080/api/documents/download/${file.id}`}
            target="_blank"
            rel="noreferrer"
            className="block p-2 hover:bg-gray-100 rounded text-sm"
          >
            {file.fileName}
          </a>

        ))

      )}

    </div>
  </div>

  {/* Help Card */}
  <div className="help-card">

    <h3 className="help-title">
      Need Help?
    </h3>

    <p className="help-description">
      Our AI assistant is here to answer any questions you might have.
    </p>

    <Link to="/chat">

      <Button
        variant="secondary"
        className="help-button"
      >
        <MessageSquare className="w-4 h-4" />
        Start Chat
      </Button>

    </Link>

  </div>

</div>

            


          <input
  ref={fileInputRef}
  type="file"
  className="hidden"
  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
  onChange={handleFileUpload}
/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;