import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, MessageCircle, Heart, Activity, Calendar, Bell, Pill, FileText, User, Brain, Sparkles, Zap, Shield } from "lucide-react";
import DigitalTwin from "./DigitalTwin";
import HealthIdCreation from "./HealthIdCreation";
import { aiSymptomCheck } from "@/lib/api";

interface PatientDashboardProps {
  onBack: () => void;
}

const PatientDashboard = ({ onBack }: PatientDashboardProps) => {
  const [symptomInput, setSymptomInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [showDigitalTwin, setShowDigitalTwin] = useState(false);
  const [showHealthIdCreation, setShowHealthIdCreation] = useState(false);
  const [hasHealthId, setHasHealthId] = useState(false);
  const [userHealthId, setUserHealthId] = useState("");

  const handleSymptomSubmit = async () => {
    if (!symptomInput.trim()) return;
    setAiResponse("Analyzing...");
    try {
      const r = await aiSymptomCheck(symptomInput);
      setAiResponse(r);
    } catch (e: unknown) {
      setAiResponse("Unable to analyze at the moment.");
    }
  };

  const handleHealthIdCreated = (healthId: string) => {
    setUserHealthId(healthId);
    setHasHealthId(true);
    setShowHealthIdCreation(false);
  };

  if (showDigitalTwin) {
    return <DigitalTwin onClose={() => setShowDigitalTwin(false)} />;
  }

  if (showHealthIdCreation) {
    return <HealthIdCreation onBack={() => setShowHealthIdCreation(false)} onHealthIdCreated={handleHealthIdCreated} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 fade-in-up">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 hover-lift">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4">
            {hasHealthId ? (
              <Badge variant="outline" className="text-green-700 border-green-200 scale-in">
                Health ID: {userHealthId}
              </Badge>
            ) : (
              <Button 
                onClick={() => setShowHealthIdCreation(true)}
                className="gradient-medical text-white"
                size="sm"
              >
                Create Health ID
              </Button>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center float">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {!hasHealthId && (
          <Card className="border-0 shadow-lg glass-card hover-lift mb-8">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Create Your Digital Health Identity</h3>
                <p className="text-gray-600 mb-4">
                  Get your unique Health ID to access your digital health locker and connect with healthcare providers across India.
                </p>
                <Button 
                  onClick={() => setShowHealthIdCreation(true)}
                  className="gradient-medical text-white"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Create Health ID Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - AI Symptom Checker */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg glass-card hover-lift slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MessageCircle className="w-8 h-8 text-green-600 heartbeat" />
                  AI Health Assistant
                  <Badge className="gradient-medical text-white shimmer">
                    Multilingual
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Describe your symptoms in Hindi, English, or regional language..."
                    value={symptomInput}
                    onChange={(e) => setSymptomInput(e.target.value)}
                    className="flex-1 glass transition-all duration-300 focus:ring-2 focus:ring-green-500"
                  />
                  <Button 
                    onClick={handleSymptomSubmit}
                    className="gradient-medical text-white hover-glow transition-all duration-300 transform hover:scale-105"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Analyze
                  </Button>
                </div>
                
                {aiResponse && (
                  <div className="mt-6 p-4 glass-card rounded-lg border border-green-200 fade-in-up">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      AI Health Guidance
                    </h4>
                    <div className="text-gray-700 whitespace-pre-line">{aiResponse}</div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {["Fever & Headache", "Cough & Cold", "Stomach Pain", "Back Pain"].map((symptom, index) => (
                    <Badge 
                      key={symptom}
                      variant="outline" 
                      className={`cursor-pointer hover:bg-green-50 transition-all duration-300 hover-lift stagger-${index + 1} scale-in`}
                      onClick={() => setSymptomInput(symptom.toLowerCase())}
                    >
                      {symptom}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Digital Twin Card */}
            <Card className="border-0 shadow-lg glass-card hover-lift slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-600 digital-pulse" />
                  Your Digital Twin
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    <Sparkles className="w-3 h-3 mr-1" />
                    AI Powered
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center twin-glow float">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">AI Health Intelligence</h3>
                  <p className="text-gray-600 mb-4">
                    Explore your personalized health insights and predictions powered by advanced AI
                  </p>
                  <Button 
                    onClick={() => setShowDigitalTwin(true)}
                    className="gradient-digital-twin text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Open Digital Twin
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Vitals Dashboard */}
            <Card className="border-0 shadow-lg glass-card hover-lift slide-in-right">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-blue-600 pulse-glow" />
                  Real-time Vitals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: "BPM", value: "72", color: "red", icon: Heart },
                    { label: "SpO2", value: "98%", color: "blue", icon: Activity },
                    { label: "BP", value: "120/80", color: "green", icon: null },
                    { label: "Temp", value: "98.6°", color: "purple", icon: null }
                  ].map((vital, index) => (
                    <div key={vital.label} className={`text-center p-4 glass rounded-lg hover-lift stagger-${index + 1} scale-in`}>
                      {vital.icon ? (
                        <vital.icon className={`w-8 h-8 text-${vital.color}-500 mx-auto mb-2 ${vital.color === 'red' ? 'heartbeat' : ''}`} />
                      ) : (
                        <div className={`w-8 h-8 text-${vital.color}-500 mx-auto mb-2 text-xl font-bold`}>
                          {vital.label === "BP" ? "BP" : "T"}
                        </div>
                      )}
                      <div className={`text-2xl font-bold text-${vital.color}-600`}>{vital.value}</div>
                      <div className="text-sm text-gray-600">{vital.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 glass rounded-lg border border-green-200 data-stream">
                  <div className="text-sm text-green-800">All vitals are within normal range. Last updated: 2 minutes ago</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg glass-card hover-lift slide-in-right">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Calendar, label: "Book Appointment", color: "blue" },
                  { icon: FileText, label: "View Health Records", color: "green" },
                  { icon: Pill, label: "Medication Reminders", color: "purple" }
                ].map((action, index) => (
                  <Button 
                    key={action.label}
                    className={`w-full justify-start gap-3 bg-${action.color}-50 text-${action.color}-700 hover:bg-${action.color}-100 transition-all duration-300 hover-lift stagger-${index + 1} scale-in`}
                  >
                    <action.icon className="w-5 h-5" />
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Reminders */}
            <Card className="border-0 shadow-lg glass-card hover-lift slide-in-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Bell className="w-5 h-5 text-orange-500 pulse-glow" />
                  Reminders
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { type: "Medication", message: "Take Vitamin D - in 2 hours", color: "orange" },
                  { type: "Appointment", message: "Dr. Sharma - Tomorrow 10:00 AM", color: "blue" },
                  { type: "Health Check", message: "Weekly weight check - Friday", color: "green" }
                ].map((reminder, index) => (
                  <div key={reminder.type} className={`p-3 glass rounded-lg border border-${reminder.color}-200 hover-lift stagger-${index + 1} fade-in-up`}>
                    <div className={`font-medium text-${reminder.color}-800`}>{reminder.type}</div>
                    <div className={`text-sm text-${reminder.color}-600`}>{reminder.message}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* ABDM Integration */}
            <Card className="border-0 shadow-lg glass-card hover-lift slide-in-right">
              <CardHeader>
                <CardTitle className="text-lg">ABDM Health Locker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center float">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {hasHealthId 
                      ? "Your health records are securely stored and ABDM compliant"
                      : "Create your Health ID to access secure health records"
                    }
                  </p>
                  <Button 
                    size="sm" 
                    className="gradient-medical text-white hover-glow transition-all duration-300 transform hover:scale-105"
                    onClick={hasHealthId ? undefined : () => setShowHealthIdCreation(true)}
                    disabled={!hasHealthId}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    {hasHealthId ? "Access Health Locker" : "Create Health ID First"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
