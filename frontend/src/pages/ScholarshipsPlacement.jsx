import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  Award,
  TrendingUp,
  Building,
  Users,
  DollarSign,
  Search,
  Filter,
  Calendar,
  ExternalLink,
  MapPin,
  Star,
  ChevronRight,
  Briefcase
} from "lucide-react";

const ScholarshipsPlacement = () => {
  const [scholarshipSearch, setScholarshipSearch] = useState("");
  const [scholarshipFilter, setScholarshipFilter] = useState("all");
  const [placementFilter, setPlacementFilter] = useState("all");

  const scholarships = [
    {
      id: "1",
      name: "EBC Scholarship",
      provider: "Government of Maharashtra",
      amount: "₹50,000 - ₹2,00,000",
      category: "government",
      eligibility: "Family income < ₹8,00,000",
      deadline: "2024-08-31",
      renewable: true,
      description: "Financial assistance for Economically Backward Class students pursuing technical education.",
      applicationLink: "#"
    },
    {
      id: "2",
      name: "Minority Scholarship",
      provider: "Ministry of Minority Affairs",
      amount: "₹20,000 - ₹1,00,000",
      category: "government",
      eligibility: "Minority community students",
      deadline: "2024-09-15",
      renewable: true,
      description: "Support for students belonging to minority communities in technical education.",
      applicationLink: "#"
    },
    {
      id: "3",
      name: "PICT Merit Scholarship",
      provider: "PICT College",
      amount: "25% - 100% fee waiver",
      category: "merit",
      eligibility: "Top 10% in entrance exam",
      deadline: "2024-07-30",
      renewable: true,
      description: "Merit-based scholarship for exceptional students in engineering programs.",
      applicationLink: "#"
    },
    {
      id: "4",
      name: "Tata Scholarship",
      provider: "Tata Trust",
      amount: "₹2,00,000",
      category: "private",
      eligibility: "Family income < ₹4,00,000",
      deadline: "2024-08-15",
      renewable: true,
      description: "Financial support for deserving students from underprivileged backgrounds.",
      applicationLink: "#"
    },
    {
      id: "5",
      name: "Women in Tech Scholarship",
      provider: "Tech Mahindra Foundation",
      amount: "₹1,50,000",
      category: "private",
      eligibility: "Female students in CSE/IT",
      deadline: "2024-09-01",
      renewable: false,
      description: "Encouraging women participation in technology and engineering fields.",
      applicationLink: "#"
    }
  ];

  const placements = [
    {
      college: "College of Engineering Pune (COEP)",
      year: "2023-24",
      totalStudents: 850,
      placed: 782,
      placementRate: 92,
      averagePackage: 8.5,
      highestPackage: 25,
      medianPackage: 7.2,
      topRecruiters: ["TCS", "Infosys", "L&T", "Bajaj", "Persistent"],
      sectors: ["IT Services", "Core Engineering", "Product Development", "Consulting"]
    },
    {
      college: "Pune Institute of Computer Technology (PICT)",
      year: "2023-24",
      totalStudents: 720,
      placed: 684,
      placementRate: 95,
      averagePackage: 9.5,
      highestPackage: 30,
      medianPackage: 8.0,
      topRecruiters: ["Microsoft", "Amazon", "Google", "Cognizant", "Accenture"],
      sectors: ["Software Development", "Data Science", "Cloud Computing", "AI/ML"]
    },
    {
      college: "Veermata Jijabai Technological Institute (VJTI)",
      year: "2023-24",
      totalStudents: 900,
      placed: 792,
      placementRate: 88,
      averagePackage: 7.8,
      highestPackage: 20,
      medianPackage: 6.5,
      topRecruiters: ["Wipro", "Tech Mahindra", "Siemens", "Godrej", "Mahindra"],
      sectors: ["Engineering Services", "Manufacturing", "IT Consulting", "Research"]
    }
  ];

  const topRecruiters = [
    { name: "Tata Consultancy Services", logo: "🏢", packages: "₹4-12 LPA", positions: 150 },
    { name: "Infosys", logo: "💼", packages: "₹5-15 LPA", positions: 120 },
    { name: "Microsoft", logo: "🔷", packages: "₹15-30 LPA", positions: 25 },
    { name: "Amazon", logo: "📦", packages: "₹12-25 LPA", positions: 35 },
    { name: "Google", logo: "🌐", packages: "₹20-50 LPA", positions: 10 },
    { name: "L&T", logo: "🏗️", packages: "₹6-18 LPA", positions: 80 },
    { name: "Bajaj Auto", logo: "🏍️", packages: "₹7-20 LPA", positions: 60 },
    { name: "Persistent Systems", logo: "💻", packages: "₹8-22 LPA", positions: 45 }
  ];

  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = scholarship.name.toLowerCase().includes(scholarshipSearch.toLowerCase()) ||
                         scholarship.provider.toLowerCase().includes(scholarshipSearch.toLowerCase());
    const matchesFilter = scholarshipFilter === "all" || scholarship.category === scholarshipFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredPlacements = placements.filter(placement => {
    if (placementFilter === "all") return true;
    if (placementFilter === "high") return placement.placementRate >= 90;
    if (placementFilter === "package") return placement.averagePackage >= 9;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/dashboard" className="text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-r from-warning to-accent rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Scholarships & Placement</h1>
                <p className="text-xs text-muted-foreground">Financial aid and career opportunities</p>
              </div>
            </div>
            <Badge variant="secondary">
              <TrendingUp className="w-3 h-3 mr-1" />
              Updated Daily
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="scholarships" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
            <TabsTrigger value="placements">Placement Records</TabsTrigger>
            <TabsTrigger value="recruiters">Top Recruiters</TabsTrigger>
          </TabsList>

          {/* Scholarships */}
          <TabsContent value="scholarships" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search scholarships..."
                  value={scholarshipSearch}
                  onChange={(e) => setScholarshipSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={scholarshipFilter} onValueChange={setScholarshipFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="merit">Merit Based</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Scholarship Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="shadow-elevated border-0 hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{scholarship.provider}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant={
                          scholarship.category === "government" ? "default" :
                          scholarship.category === "merit" ? "secondary" : "outline"
                        }>
                          {scholarship.category}
                        </Badge>
                        {scholarship.renewable && (
                          <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                            Renewable
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Amount</h4>
                        <div className="text-lg font-bold text-success">{scholarship.amount}</div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-1">Deadline</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(scholarship.deadline).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Eligibility</h4>
                      <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                    </div>

                    <Button className="w-full" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredScholarships.length === 0 && (
              <Card className="p-8 text-center shadow-card border-0">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No scholarships found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </Card>
            )}
          </TabsContent>

          {/* Placements */}
          <TabsContent value="placements" className="space-y-6">
            {/* Filter */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">College Placement Records</h2>
              <Select value={placementFilter} onValueChange={setPlacementFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by performance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  <SelectItem value="high">High Placement Rate (&gt;90%)</SelectItem>
                  <SelectItem value="package">High Packages (&gt;9 LPA)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Placement Cards */}
            <div className="space-y-6">
              {filteredPlacements.map((placement, index) => (
                <Card key={index} className="shadow-elevated border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{placement.college}</CardTitle>
                      <Badge variant="secondary">{placement.year}</Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="p-4 bg-primary/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{placement.placementRate}%</div>
                        <div className="text-sm text-muted-foreground">Placement Rate</div>
                      </div>
                      <div className="p-4 bg-success/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-success">₹{placement.averagePackage}L</div>
                        <div className="text-sm text-muted-foreground">Average Package</div>
                      </div>
                      <div className="p-4 bg-warning/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-warning">₹{placement.highestPackage}L</div>
                        <div className="text-sm text-muted-foreground">Highest Package</div>
                      </div>
                      <div className="p-4 bg-accent/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-accent">₹{placement.medianPackage}L</div>
                        <div className="text-sm text-muted-foreground">Median Package</div>
                      </div>
                      <div className="p-4 bg-secondary/10 rounded-lg text-center">
                        <div className="text-2xl font-bold text-secondary">{placement.placed}</div>
                        <div className="text-sm text-muted-foreground">Students Placed</div>
                      </div>
                    </div>

                    {/* Top Recruiters */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <Building className="w-4 h-4 mr-2" />
                        Top Recruiters
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {placement.topRecruiters.map((recruiter, i) => (
                          <Badge key={i} variant="outline" className="bg-white">
                            {recruiter}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sectors */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Major Sectors
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {placement.sectors.map((sector, i) => (
                          <Badge key={i} variant="secondary">
                            {sector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Top Recruiters */}
          <TabsContent value="recruiters" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Top Recruiting Companies</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Leading companies that regularly recruit from DTE colleges, offering excellent career opportunities 
                and competitive packages to engineering graduates.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topRecruiters.map((recruiter, index) => (
                <Card key={index} className="shadow-elevated border-0 hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{recruiter.logo}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {recruiter.name}
                        </h3>
                        <div className="space-y-2 mt-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Package Range</span>
                            <span className="font-medium text-success">{recruiter.packages}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Positions Available</span>
                            <span className="font-medium text-primary">{recruiter.positions}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-colors">
                          View Details
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ScholarshipsPlacement;