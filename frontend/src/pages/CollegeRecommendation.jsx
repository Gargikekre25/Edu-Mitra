import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users,
  DollarSign,
  ArrowLeft,
  GraduationCap,
  Building,
  Award,
  Filter,
  ChevronRight,
  ChevronDown
} from "lucide-react";

// Import the custom CSS
import "../styles/college-recommendation.css";

const CollegeRecommendation = () => {
  const [formData, setFormData] = useState({
    marks: [75],
    location: "",
    stream: "",
    preferences: "",
    budget: [500000],
    courseType: ""
  });
  
  const [showResults, setShowResults] = useState(false);
  const [filteredColleges, setFilteredColleges] = useState([]);

  const sampleColleges = [
    {
      id: "1",
      name: "College of Engineering Pune (COEP)",
      location: "Pune, Maharashtra",
      type: "Government",
      rating: 4.5,
      fees: { min: 80000, max: 120000 },
      placements: { average: 850000, highest: 2500000, percentage: 92 },
      courses: ["Computer Engineering", "Mechanical Engineering", "Electrical Engineering"],
      specializations: ["AI/ML", "Data Science", "Robotics"],
      established: 1854,
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400"
    },
    {
      id: "2",
      name: "Veermata Jijabai Technological Institute (VJTI)",
      location: "Mumbai, Maharashtra",
      type: "Government",
      rating: 4.4,
      fees: { min: 75000, max: 110000 },
      placements: { average: 780000, highest: 2000000, percentage: 88 },
      courses: ["Computer Engineering", "Information Technology", "Electronics"],
      specializations: ["Cybersecurity", "IoT", "Blockchain"],
      established: 1887,
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400"
    },
    {
      id: "3",
      name: "Pune Institute of Computer Technology (PICT)",
      location: "Pune, Maharashtra",
      type: "Private",
      rating: 4.3,
      fees: { min: 180000, max: 220000 },
      placements: { average: 950000, highest: 3000000, percentage: 95 },
      courses: ["Computer Engineering", "Information Technology"],
      specializations: ["AI/ML", "Data Science", "Cloud Computing"],
      established: 1999,
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"
    }
  ];

  const locations = [
    "Mumbai", "Pune", "Nashik", "Nagpur", "Aurangabad", "Solapur", "Kolhapur", "Sangli"
  ];

  const streams = [
    "Computer Science", "Information Technology", "Mechanical Engineering", 
    "Electrical Engineering", "Civil Engineering", "Electronics Engineering",
    "Chemical Engineering", "Instrumentation Engineering"
  ];

 const handleSearch = async () => {
  try {
    const token = localStorage.getItem("token");

    // ✅ Build the correct filters object from formData
    const filters = {
      marks: formData.marks[0],
      location: formData.location,
      stream: formData.stream,
      budget: formData.budget[0],
      courseType: formData.courseType,
      preferences: formData.preferences,
    };

    const response = await fetch("http://localhost:8080/colleges/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(filters),
    });

    if (response.ok) {
      const data = await response.json();

      // Normalize backend data to frontend format
      const transformedColleges = data.map((c) => ({
        id: c.id,
        name: c.collegeName,
        location: c.location,
        type: c.courseType || "Private",
        rating: c.rating || 0,
        fees: { min: c.budget || 0, max: c.budget || 0 },
        placements: {
          average: c.marks * 10000,
          highest: c.marks * 15000,
          percentage: Math.min(100, c.marks),
        },
        courses: [c.stream],
        specializations: [c.preferences || "General"],
        established: 2000 + (c.id % 20),
        image:
          "https://images.unsplash.com/photo-1562774053-701939374585?w=400",
      }));

      console.log("Transformed colleges:", transformedColleges);
      setFilteredColleges(transformedColleges);
      setShowResults(true);
    } else {
      console.error("Failed to fetch college data");
    }
  } catch (error) {
    console.error("Error fetching colleges:", error);
  }
};



  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="college-finder-container">
      {/* Header */}
      <header className="college-finder-header">
        <div className="header-content">
          <div className="flex items-center justify-between">
            <div className="header-left">
              <Link to="/dashboard" className="back-arrow">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="header-icon">
                <Search className="w-5 h-5 text-white" />
              </div>
              <div className="header-text">
                <h1>College Finder</h1>
                <p>Find your perfect college match</p>
              </div>
            </div>
            <div className="smart-recommendations">
              Smart Recommendations
            </div>
          </div>
        </div>
      </header>

      <div className="main-content-grid">
        {/* Left Sidebar - Filter Card */}
        <div className="lg:col-span-1">
          <Card className="filter-card">
            <CardContent className="filter-card-content">
              {/* Academic Marks/Percentage */}
              <div className="filter-section">
                <Label className="filter-label">Academic Marks/Percentage</Label>
                <div className="marks-slider-container">
                  <Slider
                    value={formData.marks}
                    onValueChange={(value) => setFormData({ ...formData, marks: value })}
                    max={100}
                    min={40}
                    step={1}
                    className="w-full"
                  />
                  <div className="marks-slider-labels">
                    <span className="marks-min">40%</span>
                    <span className="marks-current">{formData.marks[0]}%</span>
                    <span className="marks-max">100%</span>
                  </div>
                </div>
              </div>

              {/* Preferred Location */}
              <div className="filter-section">
                <Label className="filter-label">Preferred Location</Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                  <SelectTrigger className="course-type-select">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Engineering Stream */}
              <div className="filter-section">
                <Label className="filter-label">Engineering Stream</Label>
                <Select value={formData.stream} onValueChange={(value) => setFormData({ ...formData, stream: value })}>
                  <SelectTrigger className="course-type-select">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    {streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Annual Budget */}
              <div className="filter-section">
                <Label className="filter-label">Annual Budget</Label>
                <div className="budget-slider-container">
                  <Slider
                    value={formData.budget}
                    onValueChange={(value) => setFormData({ ...formData, budget: value })}
                    max={1000000}
                    min={50000}
                    step={25000}
                    className="w-full"
                  />
                  <div className="budget-slider-labels">
                    <span className="budget-min">₹50k</span>
                    <span className="budget-current">{formatCurrency(formData.budget[0])}</span>
                    <span className="budget-max">₹10L</span>
                  </div>
                </div>
              </div>

              {/* Course Type */}
              <div className="filter-section">
                <Label className="filter-label">Course Type</Label>
                <Select value={formData.courseType} onValueChange={(value) => setFormData({ ...formData, courseType: value })}>
                  <SelectTrigger className="course-type-select">
                    <SelectValue placeholder="Select course type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering (B.Tech)</SelectItem>
                    <SelectItem value="polytechnic">Polytechnic (Diploma)</SelectItem>
                    <SelectItem value="postgraduate">Post Graduate (M.Tech)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Additional Preferences (Optional) */}
              <div className="filter-section">
                <Label className="filter-label">Additional Preferences (Optional)</Label>
                <Input
                  placeholder="e.g., hostel facility, research opportunities..."
                  value={formData.preferences}
                  onChange={(e) => setFormData({ ...formData, preferences: e.target.value })}
                  className="filter-input"
                />
              </div>

              {/* Search Button */}
              <div className="filter-section">
                <Button onClick={handleSearch} className="search-button" size="lg">
                  <Search className="w-4 h-4 mr-2" />
                  Find Colleges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-2">
          {!showResults ? (
            <div className="main-content-area">
              <h2 className="main-heading">Find Your Perfect College</h2>
              <p className="main-description">
                Fill in your preferences and academic details to get personalized college recommendations.
              </p>
              
              {/* Feature Cards - Stacked Vertically */}
              <div className="feature-cards-container">
                <Card className="feature-card">
                  <div className="feature-icon academic">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="feature-title">Academic Match</h3>
                  <p className="feature-subtitle">Based on your marks</p>
                </Card>
                
                <Card className="feature-card">
                  <div className="feature-icon location">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="feature-title">Location Filter</h3>
                  <p className="feature-subtitle">Preferred cities</p>
                </Card>
                
                <Card className="feature-card">
                  <div className="feature-icon budget">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="feature-title">Budget Friendly</h3>
                  <p className="feature-subtitle">Within your range</p>
                </Card>
              </div>
            </div>
          ) : (
            <div className="search-results">
              <div className="results-header">
                <h2 className="results-title">
                  Recommended Colleges ({filteredColleges.length})
                </h2>
                <Badge variant="secondary" className="results-badge">
                  {formData.marks[0]}% Marks • {formData.location || "All Locations"}
                </Badge>
              </div>

              {filteredColleges.length === 0 ? (
                <Card className="no-results-card">
                  <div className="no-results-icon">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="no-results-title">No colleges found</h3>
                  <p className="no-results-description">
                    Try adjusting your filters or budget to see more options.
                  </p>
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    Modify Search
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredColleges.map((college) => (
                    <Card key={college.id} className="college-card">
                      <div className="college-content">
                        <img 
                          src={college.image} 
                          alt={college.name}
                          className="college-image"
                        />
                        
                        <div className="college-details">
                          <div className="college-header">
                            <div>
                              <h3 className="college-name">{college.name}</h3>
                              <div className="college-meta">
                                <div className="college-meta-item">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {college.location}
                                </div>
                                <div className="college-meta-item">
                                  <Building className="w-4 h-4 mr-1" />
                                  {college.type}
                                </div>
                                <div className="college-meta-item rating">
                                  <Star className="w-4 h-4 mr-1" />
                                  {college.rating}
                                </div>
                              </div>
                            </div>
                            <Badge variant={college.type === "Government" ? "secondary" : "outline"} className="college-established">
                              Est. {college.established}
                            </Badge>
                          </div>

                          <div className="college-stats">
                            <div className="stat-item">
                              <div className="stat-icon fees">
                                <DollarSign className="w-4 h-4" />
                              </div>
                              <div className="stat-content">
                                <div className="stat-value">{formatCurrency(college.fees.min)} - {formatCurrency(college.fees.max)}</div>
                                <div className="stat-label">Annual Fees</div>
                              </div>
                            </div>
                            
                            <div className="stat-item">
                              <div className="stat-icon placement">
                                <TrendingUp className="w-4 h-4" />
                              </div>
                              <div className="stat-content">
                                <div className="stat-value">{formatCurrency(college.placements.average)}</div>
                                <div className="stat-label">Avg. Package</div>
                              </div>
                            </div>
                            
                            <div className="stat-item">
                              <div className="stat-icon rate">
                                <Users className="w-4 h-4" />
                              </div>
                              <div className="stat-content">
                                <div className="stat-value">{college.placements.percentage}%</div>
                                <div className="stat-label">Placement Rate</div>
                              </div>
                            </div>
                          </div>

                          <div className="college-tags">
                            <div className="course-tags">
                              {college.courses.slice(0, 3).map((course, i) => (
                                <Badge key={i} variant="outline" className="course-tag">
                                  {course}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="specialization-tags">
                                {college.specializations.slice(0, 3).map((spec, i) => (
                                  <Badge key={i} variant="secondary" className="specialization-tag">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                              <Button variant="outline" size="sm" className="view-details-btn">
                                View Details
                                <ChevronRight className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeRecommendation;