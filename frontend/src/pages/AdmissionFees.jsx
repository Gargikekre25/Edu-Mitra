import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft,
  GraduationCap,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Download,
  ExternalLink,
  AlertCircle,
  TrendingUp,
  Award
} from "lucide-react";

const AdmissionFees = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const admissionSteps = [
    {
      step: 1,
      title: "Check Eligibility",
      description: "Verify academic requirements and entrance exam scores",
      timeline: "Before Application",
      status: "completed"
    },
    {
      step: 2,
      title: "Online Registration",
      description: "Fill application form on official website",
      timeline: "Application Period",
      status: "completed"
    },
    {
      step: 3,
      title: "Document Upload",
      description: "Upload required certificates and documents",
      timeline: "Within 7 days",
      status: "current"
    },
    {
      step: 4,
      title: "Fee Payment",
      description: "Pay application fee online",
      timeline: "Before deadline",
      status: "pending"
    },
    {
      step: 5,
      title: "Merit List",
      description: "Wait for merit list publication",
      timeline: "After deadline",
      status: "pending"
    },
    {
      step: 6,
      title: "Counseling",
      description: "Attend counseling session",
      timeline: "As per schedule",
      status: "pending"
    },
    {
      step: 7,
      title: "Seat Allotment",
      description: "Get seat allotment result",
      timeline: "Post counseling",
      status: "pending"
    },
    {
      step: 8,
      title: "Document Verification",
      description: "Physical verification at college",
      timeline: "Within 3 days",
      status: "pending"
    },
    {
      step: 9,
      title: "Fee Payment",
      description: "Pay admission fees",
      timeline: "Within 5 days",
      status: "pending"
    }
  ];

  const colleges = [
    {
      name: "College of Engineering Pune (COEP)",
      type: "Government",
      courses: {
        "Computer Engineering": { fees: "₹1,20,000", duration: "4 years" },
        "Mechanical Engineering": { fees: "₹1,10,000", duration: "4 years" },
        "Electrical Engineering": { fees: "₹1,15,000", duration: "4 years" }
      },
      additionalFees: {
        hostel: "₹45,000",
        mess: "₹35,000",
        library: "₹5,000",
        sports: "₹3,000"
      },
      scholarships: ["EBC Scholarship", "Merit Scholarship"]
    },
    {
      name: "Pune Institute of Computer Technology (PICT)",
      type: "Private",
      courses: {
        "Computer Engineering": { fees: "₹2,20,000", duration: "4 years" },
        "Information Technology": { fees: "₹2,15,000", duration: "4 years" },
        "Electronics Engineering": { fees: "₹2,10,000", duration: "4 years" }
      },
      additionalFees: {
        hostel: "₹80,000",
        mess: "₹50,000",
        library: "₹8,000",
        sports: "₹5,000"
      },
      scholarships: ["Merit Scholarship", "Need-based Aid"]
    }
  ];

  const documents = [
    { name: "10th Standard Mark Sheet", required: true, format: "Original + 2 copies" },
    { name: "12th Standard Mark Sheet", required: true, format: "Original + 2 copies" },
    { name: "Entrance Exam Scorecard", required: true, format: "Original + 1 copy" },
    { name: "Caste Certificate", required: false, format: "Original + 1 copy" },
    { name: "Income Certificate", required: false, format: "Original + 1 copy" },
    { name: "Domicile Certificate", required: false, format: "Original + 1 copy" },
    { name: "Passport Size Photos", required: true, format: "6 recent photos" },
    { name: "Aadhar Card", required: true, format: "Copy" },
    { name: "Migration Certificate", required: false, format: "Original" },
    { name: "Character Certificate", required: true, format: "Original" }
  ];

  const scholarships = [
    {
      name: "EBC Scholarship",
      eligibility: "Family income < ₹8,00,000",
      amount: "₹50,000 - ₹2,00,000",
      renewable: true
    },
    {
      name: "Minority Scholarship",
      eligibility: "Minority community students",
      amount: "₹20,000 - ₹1,00,000",
      renewable: true
    },
    {
      name: "SC/ST Scholarship",
      eligibility: "SC/ST category students",
      amount: "Full fee waiver",
      renewable: true
    },
    {
      name: "Merit Scholarship",
      eligibility: "Top 10% students in entrance exam",
      amount: "25% - 100% fee waiver",
      renewable: true
    }
  ];

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    Object.keys(college.courses).some(course => 
      course.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
              <div className="w-10 h-10 bg-gradient-to-r from-accent to-warning rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Admission & Fees</h1>
                <p className="text-xs text-muted-foreground">Complete admission guidance</p>
              </div>
            </div>
            <Badge variant="secondary">
              <Calendar className="w-3 h-3 mr-1" />
              2024-25 Session
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="admission" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="admission">Admission Process</TabsTrigger>
            <TabsTrigger value="fees">Fee Structure</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
          </TabsList>

          {/* Admission Process */}
          <TabsContent value="admission" className="space-y-6">
            <Card className="shadow-elevated border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-success" />
                  Step-by-Step Admission Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {admissionSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.status === "completed" ? "bg-success text-white" :
                        step.status === "current" ? "bg-primary text-white" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {step.step}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{step.title}</h3>
                          <Badge variant={
                            step.status === "completed" ? "default" :
                            step.status === "current" ? "secondary" : "outline"
                          }>
                            {step.status === "completed" ? "Completed" :
                             step.status === "current" ? "In Progress" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {step.timeline}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Important Deadlines</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Application Last Date: <strong>July 31, 2024</strong></li>
                        <li>• Document Upload Deadline: <strong>August 7, 2024</strong></li>
                        <li>• Merit List Publication: <strong>August 15, 2024</strong></li>
                        <li>• Counseling Dates: <strong>August 20-30, 2024</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fee Structure */}
          <TabsContent value="fees" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">College-wise Fee Structure</h2>
              <div className="relative w-72">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search colleges or courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-6">
              {filteredColleges.map((college, index) => (
                <Card key={index} className="shadow-elevated border-0">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{college.name}</CardTitle>
                      <Badge variant={college.type === "Government" ? "secondary" : "outline"}>
                        {college.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Course Fees */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Course Fees (Per Year)
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4">
                        {Object.entries(college.courses).map(([course, details]) => (
                          <Card key={course} className="p-4 border-l-4 border-l-primary">
                            <h5 className="font-medium text-foreground">{course}</h5>
                            <div className="text-2xl font-bold text-primary mt-2">{details.fees}</div>
                            <div className="text-sm text-muted-foreground">{details.duration}</div>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Additional Fees */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-4 flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Additional Fees (Annual)
                      </h4>
                      <div className="grid md:grid-cols-4 gap-4">
                        {Object.entries(college.additionalFees).map(([type, amount]) => (
                          <div key={type} className="p-3 bg-muted/30 rounded-lg">
                            <div className="text-sm text-muted-foreground capitalize">{type}</div>
                            <div className="text-lg font-semibold text-foreground">{amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Available Scholarships */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Available Scholarships</h4>
                      <div className="flex flex-wrap gap-2">
                        {college.scholarships.map((scholarship, i) => (
                          <Badge key={i} variant="outline" className="bg-success/10 text-success border-success/20">
                            {scholarship}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-6">
            <Card className="shadow-elevated border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Required Documents Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          doc.required ? "border-primary bg-primary" : "border-muted-foreground"
                        }`}>
                          {doc.required && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">{doc.name}</h4>
                          <p className="text-sm text-muted-foreground">{doc.format}</p>
                        </div>
                      </div>
                      <Badge variant={doc.required ? "default" : "outline"}>
                        {doc.required ? "Required" : "Optional"}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <h4 className="font-semibold text-foreground mb-2">Document Submission Guidelines</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• All documents must be attested by a Gazetted Officer</li>
                    <li>• Photocopies should be clear and readable</li>
                    <li>• Original documents required for verification</li>
                    <li>• Submit documents in the specified order</li>
                  </ul>
                </div>

                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Document Checklist PDF
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Sample Documents
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scholarships */}
          <TabsContent value="scholarships" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {scholarships.map((scholarship, index) => (
                <Card key={index} className="shadow-elevated border-0 hover:shadow-primary/10 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Award className="w-5 h-5 mr-2 text-warning" />
                        {scholarship.name}
                      </span>
                      {scholarship.renewable && (
                        <Badge variant="secondary">Renewable</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Eligibility</h4>
                      <p className="text-sm text-muted-foreground">{scholarship.eligibility}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Amount</h4>
                      <div className="text-xl font-bold text-success">{scholarship.amount}</div>
                    </div>

                    <Button className="w-full" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Apply Now
                    </Button>
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

export default AdmissionFees;