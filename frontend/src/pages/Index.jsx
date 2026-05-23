import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import "@/styles/custom.css";
import "@/styles/features.css";

import { 
  GraduationCap, 
  Search, 
  DollarSign, 
  Award, 
  TrendingUp, 
  MessageSquare,
  Users,
  BookOpen,
  Target,
  ArrowRight,
  Star,
  CheckCircle,
  Zap
} from "lucide-react";
import heroImage from "@/assets/hero-banner.png";


const Index = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "AI-Powered Guidance",
      description: "Get instant answers to your college and admission queries with our advanced AI assistant",
      color: "bg-primary"
    },
    {
      icon: Search,
      title: "College Finder",
      description: "Discover the perfect engineering college based on your preferences and academic profile",
      color: "bg-secondary"
    },
    {
      icon: Award,
      title: "Scholarship Opportunities",
      description: "Explore various scholarships and financial aid options available for technical education",
      color: "bg-secondary"
    },
    {
      icon: TrendingUp,
      title: "Placement Insights",
      description: "Access detailed placement records and career guidance from top engineering colleges",
      color: "bg-success"
    },
    {
      icon: DollarSign,
      title: "Fee Calculator",
      description: "Compare fee structures across different colleges and plan your education budget",
      color: "bg-accent"
    },
    {
      icon: BookOpen,
      title: "Course Information",
      description: "Get comprehensive details about engineering courses, specializations, and curriculum",
      color: "bg-primary"
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background w-full px-2 sm:px-4 md:px-8">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 w-full">
          <div className="max-w-screen-xl mx-auto py-4 px-2 sm:px-4 md:px-8">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                {/* Header logo */}
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-cyan-400 rounded-xl flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap w-5 h-5 text-white"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-foreground">DTE AI Assistant</h1>
                  <p className="text-xs text-muted-foreground">Your Educational Journey Companion</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <Link to="/college-finder" className="text-foreground hover:text-primary transition-colors">
                  College Finder
                </Link>
                <Link to="/admission-fees" className="text-foreground hover:text-primary transition-colors">
                  Admission Info
                </Link>
                <Link to="/scholarships-placement" className="text-foreground hover:text-primary transition-colors">
                  Scholarships
                </Link>
                <Link to="/login">
                  <Button variant="gradient" size="sm">
                    Get Started
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        

{/* Hero Section */}
<section className="hero-section">
  <div className="hero-container">

    {/* Left Side */}
    <div className="hero-left">
      <Badge variant="secondary" className="w-fit">
        <Zap className="w-3 h-3 mr-1" />
        AI-Powered Education Assistant
      </Badge>

      <h1>
        Your Gateway to
        <span>Technical Education</span>
      </h1>

      <p>
        Navigate your engineering journey with confidence. Get personalized 
        guidance on college selection, admissions, scholarships, and career 
        planning with our AI-powered assistant.
      </p>

      <div className="hero-buttons">
        <Link to="/login">
          <Button size="lg" variant="gradient">
            <GraduationCap className="w-5 h-5 mr-2" />
            Login to Continue
          </Button>
        </Link>
        <Link to="/chat">
          <Button size="lg" variant="outline">
            <MessageSquare className="w-5 h-5 mr-2" />
            Chat as Guest
          </Button>
        </Link>
      </div>

      <div className="hero-stats">
        <div>
          <div className="number text-primary">500+</div>
          <div>Engineering Colleges</div>
        </div>
        <div>
          <div className="number text-secondary">50K+</div>
          <div>Students Helped</div>
        </div>
        <div>
          <div className="number text-accent">24/7</div>
          <div>AI Support</div>
        </div>
      </div>
    </div>

    {/* Right Side */}
    <div className="hero-right">
      <div className="hero-image">
        <img src={heroImage} alt="Students in engineering college" />
      </div>

      {/* Floating Card */}
      {/* <div className="hero-floating">
        <div className="hero-floating-icon">
          <Star className="w-5 h-5" />
        </div>
        <div>
          <div className="font-semibold text-sm">4.9/5 Rating</div>
          <div className="text-xs text-muted-foreground">Student Satisfaction</div>
        </div>
      </div> */}
    </div>

  </div>
</section>

      {/* Features Section */}
<section className="features-section">
  <div className="features-container">
    <div className="features-header">
      <span className="features-badge">
        <Target className="icon-small" />
        Comprehensive Features
      </span>
      <h2 className="features-title">
        Everything You Need for Your Engineering Journey
      </h2>
      <p className="features-subtitle">
        From college selection to career guidance, our AI-powered platform provides 
        comprehensive support for every step of your technical education journey.
      </p>
    </div>

    <div className="features-grid">
      {features.map((feature, index) => (
        <Card 
          key={index} 
          className="feature-card"
        >
          <CardContent className="feature-card-content">
            <div className={`feature-icon ${feature.color}`}>
              <feature.icon className="icon-medium" />
            </div>
            <div>
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p className="feature-desc">
                {feature.description}
              </p>
            </div>
            <div className="feature-link">
              Learn More <ArrowRight className="icon-small ml-1" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
</section>



        {/* Footer */}
        <footer className="border-t bg-white/80 backdrop-blur-sm py-8 w-full">
          <div className="max-w-screen-xl mx-auto text-center px-2 sm:px-4 md:px-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              {/* Footer logo */}
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-cyan-400 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap w-4 h-4 text-white"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path><path d="M22 10v6"></path><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg>
              </div>
              <span className="font-semibold text-foreground">DTE AI Assistant</span>
            </div>
            <p className="text-muted-foreground">
              © 2024 DTE AI Assistant. Empowering the next generation of engineers.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
