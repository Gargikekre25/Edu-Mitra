// src/App.jsx

import { useState } from "react";

import "./App.css";

import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChatInterface from "./pages/ChatInterface";
import CollegeRecommendation from "./pages/CollegeRecommendation";
import AdmissionFees from "./pages/AdmissionFees";
import ScholarshipsPlacement from "./pages/ScholarshipsPlacement";
import QueryHistory from "./pages/QueryHistory";
import NotFound from "./pages/NotFound";
import ProtectedDashboard from "./pages/ProtectedDashboard";



const queryClient = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

  return (
    
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
       
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Index />
                 
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
            <Route path="/chat" element={<ChatInterface />} />
            <Route path="/college-finder" element={<CollegeRecommendation />} />
            <Route path="/admission-fees" element={<AdmissionFees />} />
            <Route path="/scholarships-placement" element={<ScholarshipsPlacement />} />
            <Route path="/query-history" element={<QueryHistory />} />
            <Route path="*" element={<NotFound />} />
            


          </Routes>
           <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

  
}



export default App;
