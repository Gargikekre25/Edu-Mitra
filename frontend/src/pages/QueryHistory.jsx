import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  History,
  Search,
  MessageSquare,
  Clock,
  Filter,
  Download,
  ExternalLink,
  Calendar,
  Tag,
  MoreVertical,
  Star,
  Trash2
} from "lucide-react";

const QueryHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const queries = [
    {
      id: "1",
      query: "What are the admission requirements for Computer Engineering at COEP?",
      category: "admission",
      timestamp: new Date("2024-01-15T10:30:00"),
      status: "resolved",
      response: "For Computer Engineering admission at COEP, you need: 1) 12th with PCM, 2) Valid JEE Main/MHT-CET score, 3) Minimum 50% in 12th, 4) Maharashtra domicile (for state quota)...",
      helpful: true,
      tags: ["COEP", "Computer Engineering", "Admission", "Requirements"]
    },
    {
      id: "2",
      query: "Tell me about scholarships available for EBC category students",
      category: "scholarships",
      timestamp: new Date("2024-01-14T15:45:00"),
      status: "resolved",
      response: "EBC (Economically Backward Class) students can apply for: 1) EBC Scholarship - ₹50,000 to ₹2,00,000, 2) Post-matric scholarship, 3) Fee concession in government colleges...",
      helpful: true,
      tags: ["EBC", "Scholarship", "Financial Aid"]
    },
    {
      id: "3",
      query: "What is the fee structure for polytechnic courses in government colleges?",
      category: "fees",
      timestamp: new Date("2024-01-13T09:20:00"),
      status: "resolved",
      response: "Government polytechnic fee structure: 1) Tuition fees: ₹25,000-₹40,000 per year, 2) Development fees: ₹5,000-₹8,000, 3) Library and lab fees: ₹3,000-₹5,000...",
      helpful: false,
      tags: ["Polytechnic", "Government", "Fees", "Diploma"]
    },
    {
      id: "4",
      query: "Which colleges have the best placement records for Mechanical Engineering?",
      category: "placement",
      timestamp: new Date("2024-01-12T14:15:00"),
      status: "resolved",
      response: "Top colleges for Mechanical Engineering placements: 1) COEP Pune - 92% placement, avg ₹8.5 LPA, 2) VJTI Mumbai - 88% placement, avg ₹7.8 LPA...",
      helpful: true,
      tags: ["Mechanical Engineering", "Placement", "COEP", "VJTI"]
    },
    {
      id: "5",
      query: "How to apply for hostel accommodation in engineering colleges?",
      category: "general",
      timestamp: new Date("2024-01-11T11:00:00"),
      status: "pending",
      response: "Hostel application process varies by college. Generally: 1) Submit application along with admission form, 2) Pay hostel fees advance, 3) Provide required documents...",
      helpful: false,
      tags: ["Hostel", "Accommodation", "Application"]
    },
    {
      id: "6",
      query: "What documents are required for admission in engineering colleges?",
      category: "documents",
      timestamp: new Date("2024-01-10T16:30:00"),
      status: "resolved",
      response: "Required documents for engineering admission: 1) 10th and 12th mark sheets, 2) Entrance exam scorecard, 3) Caste certificate (if applicable), 4) Income certificate...",
      helpful: true,
      tags: ["Documents", "Admission", "Requirements", "Engineering"]
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "admission", label: "Admission" },
    { value: "fees", label: "Fees" },
    { value: "scholarships", label: "Scholarships" },
    { value: "placement", label: "Placement" },
    { value: "documents", label: "Documents" },
    { value: "general", label: "General" }
  ];

  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.query.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || query.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || query.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved": return "bg-success/10 text-success border-success/20";
      case "pending": return "bg-warning/10 text-warning border-warning/20";
      case "ongoing": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "admission": return "🎓";
      case "fees": return "💰";
      case "scholarships": return "🏆";
      case "placement": return "💼";
      case "documents": return "📄";
      default: return "❓";
    }
  };

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
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <History className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">Query History</h1>
                <p className="text-xs text-muted-foreground">View and manage your past conversations</p>
              </div>
            </div>
            <Badge variant="secondary">
              {filteredQueries.length} queries
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <Card className="shadow-elevated border-0 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search your queries, tags, or responses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Query List */}
        {filteredQueries.length === 0 ? (
          <Card className="p-8 text-center shadow-card border-0">
            <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No queries found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || categoryFilter !== "all" || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "You haven't asked any questions yet. Start a conversation with our AI assistant!"}
            </p>
            <Link to="/chat">
              <Button variant="gradient">
                <MessageSquare className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredQueries.map((query) => (
              <Card key={query.id} className="shadow-elevated border-0 hover:shadow-primary/10 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="text-2xl">{getCategoryIcon(query.category)}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                          {query.query}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {query.timestamp.toLocaleDateString()} at {query.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div className="flex items-center">
                            <Tag className="w-3 h-3 mr-1" />
                            {query.category}
                          </div>
                        </div>
                        
                        {/* Response Preview */}
                        <div className="bg-muted/30 rounded-lg p-3 mb-3">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {query.response}
                          </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {query.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2 ml-4">
                      <Badge variant="outline" className={getStatusColor(query.status)}>
                        {query.status}
                      </Badge>
                      
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Star className={`w-3 h-3 mr-1 ${query.helpful ? "text-warning fill-warning" : ""}`} />
                        {query.helpful ? "Helpful" : "Mark Helpful"}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs text-destructive">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Reopen Chat
                      </Button>
                      <Button size="sm" variant="gradient">
                        <MessageSquare className="w-3 h-3 mr-1" />
                        Ask Follow-up
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {filteredQueries.length > 0 && (
          <Card className="shadow-elevated border-0 mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Query Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {queries.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Queries</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {queries.filter(q => q.status === "resolved").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Resolved</div>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">
                    {queries.filter(q => q.helpful).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Helpful Responses</div>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">
                    {Math.round((queries.filter(q => q.helpful).length / queries.length) * 100)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QueryHistory;