import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Mail, Lock, Eye, EyeOff, ArrowLeft, Users, UserCheck, Shield } from "lucide-react";
import "@/styles/login.css";
//import api from "@/api/axios"; // ✅ added
import api from "../api/axios";
import { toast } from "sonner";
import { User } from "lucide-react";




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    role:"",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const roles = [
    { id: "STUDENT", label: "Student", icon: GraduationCap, description: "Current or prospective student" },
    { id: "PARENT", label: "Parent", icon: Users, description: "Parent/Guardian of student" },
    { id: "ADMIN", label: "Admin", icon: Shield, description: "College/DTE administrator" },
  ];

  // ✅ Handle login
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/app/login", {
      email,
      password,
      role: selectedRole.toUpperCase(), // backend expects uppercase
    });

    const { status, msg, data } = res.data;

    if (status && data?.token) {
      const { id, firstName, role, token } = data;

      // 🟩 Save all details properly
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem(
  "user",
  JSON.stringify({
    id,
    firstName,
    role,
    token
  })
);

      toast.success(msg || "Login successful!");
      navigate("/dashboard");
    } else {
      toast.error(msg || "Login failed");
    }
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Login failed");
  }
};

// ✅ Handle signup
const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/app/register", signupData);
    console.log("Signup Response:", res.data);

    if (res.data.status) {
      toast.success(res.data.msg || "Account created! Please sign in.");
    } else {
      toast.error(res.data.msg || "Signup failed");
    }
  } catch (err) {
    toast.error("Signup failed. Please try again.");
  }
};


  return (
    <div className="login-page">
      <div className="login-container">
        <Card className="login-card">
          <div className="login-header">
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <div className="login-icon">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h1 className="login-title">Welcome to DTE AI Assistant</h1>
            <p className="login-subtitle">Sign in to access personalized features</p>
          </div>

          <div className="card-content">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="tabs-list flex w-full">
                <TabsTrigger value="signin" className="tabs-trigger flex-1">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="tabs-trigger flex-1">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In */}
              <TabsContent value="signin" className="space-y-6 mt-6">
                <div className="role-selection">
                  <h3>Select Your Role</h3>
                  <div className="grid gap-2">
                    {roles.map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => setSelectedRole(role.id)}
                        className={`role-button ${selectedRole === role.id ? "selected" : ""}`}
                      >
                        <div className="role-content">
                          <role.icon className="role-icon" />
                          <div className="role-text">
                            <div className="role-label">{role.label}</div>
                            <div className="role-description">{role.description}</div>
                          </div>
                          {selectedRole === role.id && <UserCheck className="role-check" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <form className="form-section" onSubmit={handleLogin}>
                  <div className="form-group">
                    <Label className="form-label">Email Address</Label>
                    <div className="form-input">
                      <Mail className="icon" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Label className="form-label">Password</Label>
                    <div className="form-input">
                      <Lock className="icon" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button className="submit-button" variant="gradient" type="submit">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up */}
              <TabsContent value="signup" className="space-y-6 mt-6">
                <form className="form-section" onSubmit={handleSignup}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <Label className="form-label">First Name</Label>
                      <div className="form-input">
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <Label className="form-label">Last Name</Label>
                      <div className="form-input">
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
 
                   


                  <div className="form-group">
                    <Label className="form-label">Email Address</Label>
                    <div className="form-input">
                      <Mail className="icon" />
                      <Input
                        id="signupEmail"
                        type="email"
                        placeholder="your.email@example.com"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <Label className="form-label">Password</Label>
                    <div className="form-input">
                      <Lock className="icon" />
                      <Input
                        id="signupPassword"
                        type="password"
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                           <Label className="form-label">Role</Label>
                         <div className="form-input relative">
                             
                            <select
                              id="role"
                              name="role"
                              value={signupData.role}
                              onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                              required
                              className={`w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 
                                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white 
                                    appearance-none text-gray-700 
                                      ${signupData.role === "" ? "text-gray-400" : "text-gray-700"}`}
                                  >

                              <option value=""disabled hidden>Select Role</option>
                              <option value="PARENT">Parent</option>
                              <option value="STUDENT">Student</option>
                            </select>
                             
                              
                            
                          </div>
                    </div>

                  <Button className="submit-button" variant="gradient" type="submit">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </Card>

        <div className="login-footer">
          <Link to="/chat">Continue as Guest without signing in</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
