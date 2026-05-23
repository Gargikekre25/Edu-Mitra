                                                                                      import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

import { 
  Send, 
  Paperclip, 
  GraduationCap, 
  ArrowLeft,
  Bot,
  User,
  Clock,
  DollarSign,
  Award,
  BookOpen,
  Building,
  FileText,
  Users,
  MessageSquare,
  Lightbulb
} from "lucide-react";


const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your DTE AI Assistant. I'm here to help you with information about engineering and polytechnic colleges, admissions, fees, scholarships, and placements. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const isLoggedIn = !!localStorage.getItem("token"); // true if user logged in

  const navigate = useNavigate();
const token = localStorage.getItem("token"); // check if user is logged in


  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");

  setMessages([
    {
      id: "1",
      type: "bot",
      content: "Hello! I'm your DTE AI Assistant. You can chat as guest or log in.",
      timestamp: new Date()
    }
  ]);

  navigate("/login"); // Make sure `useNavigate` is imported from react-router-dom
};


  const categories = [
    { id: "admission", label: "Admission Process", icon: GraduationCap, color: "bg-primary" },
    { id: "fees", label: "Fee Structure", icon: DollarSign, color: "bg-success" },
    { id: "scholarships", label: "Scholarships", icon: Award, color: "bg-warning" },
    { id: "colleges", label: "College Information", icon: Building, color: "bg-secondary" },
    { id: "courses", label: "Course Details", icon: BookOpen, color: "bg-accent" },
    { id: "placement", label: "Placement Records", icon: Users, color: "bg-muted" },
    { id: "documents", label: "Required Documents", icon: FileText, color: "bg-destructive" },
  ];

  const quickQuestions = [
    "What are the admission requirements for engineering?",
    "Tell me about scholarship opportunities",
    "What is the fee structure for polytechnic courses?",
    "Which colleges have the best placement records?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

 const handleSendMessage = async () => {
  if (!inputMessage.trim()) return;

  const userMessage = {
    id: Date.now().toString(),
    type: "user",
    content: inputMessage,
    timestamp: new Date()
  };

  setMessages(prev => [...prev, userMessage]);
  setInputMessage("");

  // Typing indicator
  const typingMessage = {
    id: "typing",
    type: "bot",
    content: "Typing...",
    timestamp: new Date()
  };
  setMessages(prev => [...prev, typingMessage]);

  try {
    const token = localStorage.getItem("token") || undefined;

    const response = await fetch("http://localhost:8080/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ message: userMessage.content })
    });

    // Remove typing
    setMessages(prev => prev.filter(msg => msg.id !== "typing"));

    if (!response.ok) {
      throw new Error("Network response not ok");
    }

    const data = await response.json();

    const botMessage = {
      id: Date.now().toString() + "_bot",
      type: "bot",
      content: data.reply || "I couldn't understand that.",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);

  } catch (err) {
    console.error(err);

    setMessages(prev => prev.filter(msg => msg.id !== "typing"));

    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString() + "_error",
        type: "bot",
        content: "Sorry, something went wrong. Please try again.",
        timestamp: new Date()
      }
    ]);
  }
};



  

    

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes("admission") || input.includes("eligibility")) {
      return "For engineering admissions, you typically need to:\n\n1. Complete 12th grade with Physics, Chemistry, and Mathematics\n2. Appear for entrance exams like JEE Main, MHT-CET\n3. Meet the minimum percentage criteria (usually 50% for general category)\n4. Complete the counseling process\n\nWould you like specific information about any particular college or course?";
    }
    
    if (input.includes("scholarship") || input.includes("financial aid")) {
      return "There are several scholarship opportunities available:\n\n1. **Government Scholarships:**\n   - EBC Scholarship\n   - Minority Scholarship\n   - SC/ST/OBC Scholarships\n\n2. **Merit-based Scholarships:**\n   - Top rankers in entrance exams\n   - Academic excellence awards\n\n3. **Institution-specific Scholarships:**\n   - College-specific merit scholarships\n   - Need-based assistance\n\nWould you like detailed information about eligibility criteria for any specific scholarship?";
    }
    
    if (input.includes("fee") || input.includes("cost")) {
      return "Fee structure varies by institution and course type:\n\n**Government Colleges:**\n- Engineering: ₹50,000 - ₹1,50,000 per year\n- Polytechnic: ₹25,000 - ₹75,000 per year\n\n**Private Colleges:**\n- Engineering: ₹2,00,000 - ₹8,00,000 per year\n- Polytechnic: ₹1,00,000 - ₹3,00,000 per year\n\n*Additional costs include hostel, books, and other expenses.*\n\nWould you like detailed fee information for specific colleges?";
    }
    
    if (input.includes("placement") || input.includes("job")) {
      return "Placement records vary across institutions:\n\n**Top Engineering Colleges:**\n- Average package: ₹6-12 LPA\n- Highest package: ₹25-50 LPA\n- Placement rate: 80-95%\n\n**Major Recruiters:**\n- TCS, Infosys, Wipro, Cognizant\n- L&T, Mahindra, Bajaj\n- Amazon, Microsoft, Google\n\n**Polytechnic Placements:**\n- Average package: ₹2-4 LPA\n- Placement rate: 60-80%\n\nWould you like placement details for specific colleges or branches?";
    }
    
    return "I understand you're looking for information about technical education. I can help you with:\n\n• Admission processes and eligibility\n• College recommendations\n• Fee structures and financial aid\n• Scholarship opportunities\n• Course details and specializations\n• Placement records and career prospects\n• Required documents and deadlines\n\nPlease ask me something specific, or choose from the quick questions above!";
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  
return (
  <div className="h-screen w-screen flex bg-background overflow-hidden">

    {/* SIDEBAR */}
    <div className="w-[260px] border-r bg-white flex flex-col flex-shrink-0">

      {/* Top */}
      <div className="p-4 border-b">
        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        )}

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>

          <div>
            <h2 className="font-semibold text-lg">AI Assistant</h2>
            <p className="text-xs text-muted-foreground">
              Online and ready to help
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-semibold mb-4">
          Query Categories
        </h3>

        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() =>
                handleQuickQuestion(
                  `Tell me about ${category.label.toLowerCase()}`
                )
              }
              className="w-full flex items-center gap-3 p-3 rounded-xl border hover:bg-muted transition"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${category.color}`}
              >
                <category.icon className="w-4 h-4 text-white" />
              </div>

              <span className="text-sm font-medium">
                {category.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t">
        {localStorage.getItem("token") ? (
          <Button
            onClick={handleLogout}
            className="w-full"
          >
            Log Out
          </Button>
        ) : (
          <Button
            variant="outline"
            className="w-full"
          >
            Reset Guest
          </Button>
        )}
      </div>
    </div>

    {/* MAIN CHAT AREA */}
    <div className="flex-1 flex flex-col bg-[#f9f9fb]">

      {token ? (
        <>
          {/* CHAT HEADER */}
          <div className="h-[70px] border-b bg-white flex items-center justify-between px-8 flex-shrink-0">
            <div>
              <h2 className="font-semibold text-lg">
                DTE AI Assistant
              </h2>

              <p className="text-sm text-muted-foreground">
                Ask me anything about technical education
              </p>
            </div>

            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700"
            >
              Online
            </Badge>
          </div>

          {/* CHAT MESSAGES */}
          <div className="flex-1 overflow-y-auto">

            <div className="max-w-4xl mx-auto w-full px-6 py-10 space-y-8">

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-4 ${
                    message.type === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {/* BOT MESSAGE */}
                  {message.type === "bot" && (
                    <>
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>

                      <div className="max-w-3xl bg-white border rounded-2xl px-6 py-5 shadow-sm">
                        <p className="whitespace-pre-wrap text-[15px] leading-7">
                          {message.content}
                        </p>

                        <div className="mt-3 text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </>
                  )}

                  {/* USER MESSAGE */}
                  {message.type === "user" && (
                    <>
                      <div className="max-w-3xl bg-primary text-white rounded-2xl px-6 py-5">
                        <p className="whitespace-pre-wrap text-[15px] leading-7">
                          {message.content}
                        </p>

                        <div className="mt-3 text-xs text-white/70 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    </>
                  )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* INPUT */}
          <div className="border-t bg-white p-5 flex-shrink-0">

            <div className="max-w-4xl mx-auto w-full flex items-center gap-4">

              <div className="flex-1">
                <Input
                  value={inputMessage}
                  onChange={(e) =>
                    setInputMessage(e.target.value)
                  }
                  onKeyPress={handleKeyPress}
                  placeholder="Message DTE AI Assistant..."
                  className="h-14 rounded-2xl px-6 text-base"
                />
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="h-14 w-14 rounded-2xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-3">
              Please log in
            </h2>

            <p className="text-muted-foreground mb-6">
              You need an account to access the AI Assistant.
            </p>

            <Button onClick={() => navigate("/login")}>
              Go to Login
            </Button>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default ChatInterface;