
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Shield, Check, Copy, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HealthIdCreationProps {
  onBack: () => void;
  onHealthIdCreated: (healthId: string) => void;
}

const HealthIdCreation = ({ onBack, onHealthIdCreated }: HealthIdCreationProps) => {
  const [step, setStep] = useState<'create' | 'verify' | 'complete'>('create');
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    mobileNumber: '',
    otp: ''
  });
  const [generatedHealthId, setGeneratedHealthId] = useState('');
  const { toast } = useToast();

  const handleCreateHealthId = () => {
    if (!formData.fullName || !formData.dateOfBirth || !formData.mobileNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate OTP sending
    setStep('verify');
    toast({
      title: "OTP Sent",
      description: "Please check your mobile for verification code"
    });
  };

  const handleVerifyOtp = () => {
    if (formData.otp !== '1234') {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive"
      });
      return;
    }

    // Generate health ID (ABHA format simulation)
    const healthId = `${formData.fullName.toLowerCase().replace(/\s+/g, '')}.${Date.now().toString().slice(-6)}@arogya`;
    setGeneratedHealthId(healthId);
    setStep('complete');
  };

  const copyHealthId = () => {
    navigator.clipboard.writeText(generatedHealthId);
    toast({
      title: "Copied!",
      description: "Health ID copied to clipboard"
    });
  };

  const completeSetup = () => {
    onHealthIdCreated(generatedHealthId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <Badge variant="outline" className="text-green-700 border-green-200">
            ABDM Compliant • Secure
          </Badge>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'create' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
            }`}>
              {step === 'create' ? '1' : <Check className="w-4 h-4" />}
            </div>
            <div className={`w-16 h-1 ${step !== 'create' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'verify' ? 'bg-blue-600 text-white' : 
              step === 'complete' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step === 'complete' ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <div className={`w-16 h-1 ${step === 'complete' ? 'bg-green-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'complete' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step === 'complete' ? <Check className="w-4 h-4" /> : '3'}
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === 'create' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" />
                Create Your Health ID
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name *</label>
                <Input
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                <Input
                  placeholder="Enter 10-digit mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                />
              </div>
              <Button onClick={handleCreateHealthId} className="w-full gradient-medical text-white">
                Send OTP for Verification
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'verify' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                Verify Mobile Number
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                We've sent a 4-digit OTP to {formData.mobileNumber}
              </p>
              <div>
                <label className="block text-sm font-medium mb-2">Enter OTP</label>
                <Input
                  placeholder="Enter 4-digit OTP"
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value})}
                  maxLength={4}
                />
                <p className="text-xs text-gray-500 mt-1">Demo OTP: 1234</p>
              </div>
              <Button onClick={handleVerifyOtp} className="w-full gradient-medical text-white">
                Verify & Create Health ID
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 'complete' && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Check className="w-6 h-6 text-green-600" />
                Health ID Created Successfully!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Welcome to Zivika Labs Health Network</h3>
                <p className="text-gray-600">Your digital health identity is now active</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Your Health ID</div>
                    <div className="text-lg font-bold text-green-800">{generatedHealthId}</div>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyHealthId}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  ABDM compliant digital health record
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  Secure access to health locker
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-600" />
                  Seamless doctor consultations
                </div>
              </div>

              <Button onClick={completeSetup} className="w-full gradient-medical text-white">
                <FileText className="w-4 h-4 mr-2" />
                Access My Health Locker
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HealthIdCreation;
