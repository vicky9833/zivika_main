
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, FileText, User, Shield, AlertCircle, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PatientHealthAccessProps {
  onBack: () => void;
  onAccessLocker: (healthId: string) => void;
}

type SearchResult = {
  healthId: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  consentStatus: "pending" | "approved";
  recordsCount: number;
} | null;

const PatientHealthAccess = ({ onBack, onAccessLocker }: PatientHealthAccessProps) => {
  const [healthId, setHealthId] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!healthId.trim()) {
      toast({
        title: "Health ID Required",
        description: "Please enter a valid Health ID",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock patient data
      const mockPatient = {
        healthId: healthId,
        name: "Priya Sharma",
        age: 34,
        gender: "Female",
        lastVisit: "2024-06-25",
        consentStatus: "pending",
        recordsCount: 24
      };
      
      setSearchResult(mockPatient);
      setIsSearching(false);
      
      toast({
        title: "Patient Found",
        description: "Consent request sent to patient"
      });
    }, 1500);
  };

  const requestAccess = () => {
    toast({
      title: "Access Request Sent",
      description: "Patient will receive a consent notification",
    });
  };

  const viewLocker = () => {
    onAccessLocker(healthId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Button>
          <Badge variant="outline" className="text-blue-700 border-blue-200">
            Dr. Amit Verma • License: MH-12345
          </Badge>
        </div>

        <div className="space-y-6">
          {/* Search Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Search className="w-6 h-6 text-blue-600" />
                Access Patient Health Locker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Patient Health ID</label>
                <div className="flex gap-3">
                  <Input
                    placeholder="Enter patient's Health ID (e.g., priya.sharma123@arogya)"
                    value={healthId}
                    onChange={(e) => setHealthId(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSearch} 
                    disabled={isSearching}
                    className="gradient-medical text-white"
                  >
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <div className="font-medium text-yellow-800">ABDM Consent Required</div>
                    <div className="text-yellow-700">
                      Patient consent is mandatory to access health records. The patient will receive a notification to approve your access request.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResult && (
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <User className="w-6 h-6 text-green-600" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Patient Name</div>
                      <div className="text-lg font-semibold">{searchResult.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Health ID</div>
                      <div className="text-sm text-gray-700">{searchResult.healthId}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Age</div>
                        <div className="text-lg font-semibold">{searchResult.age}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Gender</div>
                        <div className="text-lg font-semibold">{searchResult.gender}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-gray-500">Last Visit</div>
                      <div className="text-lg font-semibold">{searchResult.lastVisit}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Health Records</div>
                      <div className="text-lg font-semibold">{searchResult.recordsCount} documents</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-500">Consent Status</div>
                      <Badge 
                        variant={searchResult.consentStatus === 'approved' ? 'default' : 'secondary'}
                        className={searchResult.consentStatus === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {searchResult.consentStatus === 'approved' ? 'Approved' : 'Pending Approval'}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {searchResult.consentStatus === 'pending' ? (
                    <Button onClick={requestAccess} className="gradient-medical text-white">
                      <Shield className="w-4 h-4 mr-2" />
                      Request Access
                    </Button>
                  ) : (
                    <Button onClick={viewLocker} className="gradient-medical text-white">
                      <Eye className="w-4 h-4 mr-2" />
                      View Health Locker
                    </Button>
                  )}
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    View Summary
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Access History */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Recent Patient Access</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Rajesh Kumar", healthId: "rajesh.kumar456@arogya", lastAccess: "Today, 2:30 PM", status: "approved" },
                  { name: "Anita Patel", healthId: "anita.patel789@arogya", lastAccess: "Yesterday, 4:15 PM", status: "approved" }
                ].map((patient, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-gray-600">{patient.healthId}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">{patient.lastAccess}</div>
                      <Badge variant="outline" className="text-green-700 border-green-200">
                        Access Granted
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientHealthAccess;
