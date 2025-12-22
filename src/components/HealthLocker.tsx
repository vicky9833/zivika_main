
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, FileText, Download, Eye, Shield, Calendar, Activity, Pill, TestTube, User, Heart } from "lucide-react";

interface HealthLockerProps {
  onBack: () => void;
}

const HealthLocker = ({ onBack }: HealthLockerProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", name: "All Records", icon: FileText, count: 24 },
    { id: "prescriptions", name: "Prescriptions", icon: Pill, count: 8 },
    { id: "lab-reports", name: "Lab Reports", icon: TestTube, count: 6 },
    { id: "consultations", name: "Consultations", icon: User, count: 12 },
    { id: "vitals", name: "Vitals", icon: Activity, count: 45 },
    { id: "imaging", name: "Imaging", icon: Heart, count: 3 }
  ];

  const healthRecords = [
    {
      id: "1",
      type: "prescription",
      title: "Blood Pressure Medication",
      doctor: "Dr. Amit Verma",
      date: "2024-06-28",
      category: "prescriptions",
      fileSize: "245 KB",
      urgent: false
    },
    {
      id: "2", 
      type: "lab-report",
      title: "Complete Blood Count",
      doctor: "PathLab Centre",
      date: "2024-06-25",
      category: "lab-reports",
      fileSize: "1.2 MB",
      urgent: true
    },
    {
      id: "3",
      type: "consultation",
      title: "Routine Health Checkup",
      doctor: "Dr. Priya Sharma",
      date: "2024-06-20",
      category: "consultations", 
      fileSize: "180 KB",
      urgent: false
    },
    {
      id: "4",
      type: "vitals",
      title: "Weekly Vitals Summary",
      doctor: "Zivika Labs",
      date: "2024-06-30",
      category: "vitals",
      fileSize: "95 KB", 
      urgent: false
    },
    {
      id: "5",
      type: "imaging",
      title: "Chest X-Ray",
      doctor: "City Diagnostic Center",
      date: "2024-06-15",
      category: "imaging",
      fileSize: "3.5 MB",
      urgent: false
    }
  ];

  const filteredRecords = healthRecords.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || record.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prescription": return <Pill className="w-5 h-5 text-green-600" />;
      case "lab-report": return <TestTube className="w-5 h-5 text-blue-600" />;
      case "consultation": return <User className="w-5 h-5 text-purple-600" />;
      case "vitals": return <Activity className="w-5 h-5 text-red-600" />;
      case "imaging": return <Heart className="w-5 h-5 text-orange-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-purple-700 border-purple-200 bg-purple-50">
              <Shield className="w-4 h-4 mr-2" />
              ABDM Compliant • Encrypted
            </Badge>
            <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
              ABHA ID: 1234-5678-9012
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Health Records
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        selectedCategory === category.id 
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" 
                          : "hover:bg-purple-50"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="flex-1 text-left">{category.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Health Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Records Complete</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Active Providers</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">24/7</div>
                  <div className="text-sm text-gray-600">Secure Access</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Actions */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    placeholder="Search records, doctors, or dates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Filter by Date
                    </Button>
                    <Button className="gradient-medical text-white flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export All
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Records List */}
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <Card key={record.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          {getTypeIcon(record.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                            {record.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>By: {record.doctor}</div>
                            <div className="flex items-center gap-4">
                              <span>Date: {record.date}</span>
                              <span>Size: {record.fileSize}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredRecords.length === 0 && (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="py-20 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Records Found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </CardContent>
              </Card>
            )}

            {/* Privacy Notice */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Privacy & Security</h4>
                </div>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>✓ All records are encrypted end-to-end and ABDM compliant</p>
                  <p>✓ You control who can access your health data with consent management</p>
                  <p>✓ Complete audit trail of all data access available in your consent logs</p>
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  View Consent Logs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthLocker;
