import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Stethoscope, FileText, Mic, Send, Clock, AlertCircle, CheckCircle, Search, Shield } from "lucide-react";
import PatientHealthAccess from "./PatientHealthAccess";
import HealthLocker from "./HealthLocker";

interface DoctorDashboardProps {
  onBack: () => void;
}

const DoctorDashboard = ({ onBack }: DoctorDashboardProps) => {
  const [consultNotes, setConsultNotes] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [showPatientAccess, setShowPatientAccess] = useState(false);
  const [showPatientLocker, setShowPatientLocker] = useState(false);
  const [accessedHealthId, setAccessedHealthId] = useState("");

  const patients = [
    {
      id: "1",
      name: "Priya Sharma",
      age: 34,
      abhaId: "1234-5678-9012",
      lastVisit: "2024-06-25",
      condition: "Hypertension",
      status: "follow-up",
      urgency: "medium"
    },
    {
      id: "2", 
      name: "Rajesh Kumar",
      age: 45,
      abhaId: "2345-6789-0123",
      lastVisit: "2024-06-20",
      condition: "Diabetes Type 2",
      status: "new",
      urgency: "high"
    },
    {
      id: "3",
      name: "Anita Patel",
      age: 28,
      abhaId: "3456-7890-1234",
      lastVisit: "2024-06-28",
      condition: "Pregnancy Care",
      status: "routine",
      urgency: "low"
    }
  ];

  const aiSummary = `AI Pre-Consult Summary for Priya Sharma:

Patient Profile:
• 34-year-old female with controlled hypertension
• Last BP reading: 135/85 mmHg (slightly elevated)
• Medication adherence: 85% compliance with Amlodipine 5mg

Recent Symptoms (AI Analysis):
• Patient reported mild headaches (frequency: 3x/week)
• Stress levels elevated due to work pressure
• Sleep quality: 6/10 (disrupted sleep pattern)

Risk Factors:
• Family history of cardiovascular disease
• Sedentary lifestyle (minimal physical activity)
• High sodium intake based on dietary logs

Recommendations for Discussion:
1. Medication adjustment consideration
2. Lifestyle modification counseling
3. Stress management techniques
4. Follow-up in 2 weeks`;

  if (showPatientAccess) {
    return (
      <PatientHealthAccess 
        onBack={() => setShowPatientAccess(false)} 
        onAccessLocker={(healthId) => {
          setAccessedHealthId(healthId);
          setShowPatientAccess(false);
          setShowPatientLocker(true);
        }}
      />
    );
  }

  if (showPatientLocker) {
    return (
      <HealthLocker 
        onBack={() => {
          setShowPatientLocker(false);
          setAccessedHealthId("");
        }} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setShowPatientAccess(true)}
              className="gradient-medical text-white flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Enter Health ID
            </Button>
            <Badge variant="outline" className="text-blue-700 border-blue-200">
              Dr. Amit Verma • License: MH-12345
            </Badge>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Patient Queue */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Today's Patients</CardTitle>
                <Badge variant="outline" className="w-fit">
                  3 appointments
                </Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedPatient === patient.id
                        ? "bg-blue-50 border-blue-300"
                        : "bg-gray-50 border-gray-200 hover:bg-blue-25"
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-600">Age: {patient.age}</div>
                        <div className="text-xs text-gray-500">ABHA: {patient.abhaId}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge 
                          variant={patient.urgency === "high" ? "destructive" : 
                                   patient.urgency === "medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {patient.urgency}
                        </Badge>
                        {patient.status === "new" && (
                          <Badge variant="outline" className="text-xs">New</Badge>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-blue-600">{patient.condition}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Patient Health Access Card */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  Patient Access
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Access patient health records using their Health ID
                  </p>
                  <Button 
                    onClick={() => setShowPatientAccess(true)}
                    className="w-full gradient-medical text-white"
                    size="sm"
                  >
                    Enter Health ID
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            {selectedPatient ? (
              <>
                {/* AI Pre-Consult Summary */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                      AI Pre-Consult Summary
                      <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                        Generated
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                        {aiSummary}
                      </pre>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button size="sm" variant="outline">
                        View Full History
                      </Button>
                      <Button size="sm" variant="outline">
                        Lab Reports
                      </Button>
                      <Button size="sm" variant="outline">
                        Previous Prescriptions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Consultation Notes */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Mic className={`w-6 h-6 ${isRecording ? "text-red-500" : "text-gray-600"}`} />
                        Consultation Notes
                        {isRecording && (
                          <Badge variant="destructive" className="animate-pulse">
                            Recording
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <Button
                          variant={isRecording ? "destructive" : "outline"}
                          size="sm"
                          onClick={() => setIsRecording(!isRecording)}
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          {isRecording ? "Stop Recording" : "Voice Notes"}
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Templates
                        </Button>
                      </div>
                      
                      <Textarea
                        placeholder="Enter consultation notes... (Supports voice-to-text in Hindi/English)"
                        value={consultNotes}
                        onChange={(e) => setConsultNotes(e.target.value)}
                        className="min-h-[200px]"
                      />
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">
                          Save Draft
                        </Button>
                        <Button className="gradient-medical text-white">
                          <Send className="w-4 h-4 mr-2" />
                          Generate Prescription
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Auto-Generated Prescription Preview */}
                  <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-green-600" />
                        Smart Prescription
                        <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                          AI-Generated
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-800 mb-2">Recommended Medications:</h4>
                          <div className="space-y-2 text-sm">
                            <div>• Amlodipine 5mg - Once daily (morning)</div>
                            <div>• Lifestyle modifications - Reduce sodium intake</div>
                            <div>• Follow-up in 2 weeks</div>
                          </div>
                        </div>
                        
                        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h4 className="font-semibold text-yellow-800 mb-2">Drug Interaction Alerts:</h4>
                          <div className="text-sm text-yellow-700">
                            ✓ No interactions detected with current medications
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button size="sm" variant="outline">
                            Edit Prescription
                          </Button>
                          <Button size="sm" className="bg-green-600 text-white hover:bg-green-700">
                            Send to Patient
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Schedule Follow-up
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Order Tests
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Refer Specialist
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Set Alert
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="py-20 text-center">
                  <Stethoscope className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Patient</h3>
                  <p className="text-gray-500 mb-6">Choose a patient from the queue to begin consultation</p>
                  <Button 
                    onClick={() => setShowPatientAccess(true)}
                    className="gradient-medical text-white"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Or Enter Patient Health ID
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
