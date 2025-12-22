
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Brain, Shield, Stethoscope, Smartphone, FileText, Watch, Activity, Zap } from "lucide-react";

interface HeroSectionProps {
  onViewDemo: (view: 'patient' | 'doctor' | 'locker' | 'wearable') => void;
}

const HeroSection = ({ onViewDemo }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-green-50/50" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full animate-float blur-xl" />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full animate-float-delayed blur-xl" />
      <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-teal-500/20 rounded-full animate-float blur-xl" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* Main Content */}
        <div className="mb-12 animate-fade-in">
          <Badge variant="outline" className="mb-6 text-green-600 border-green-600/20 px-4 py-2 text-sm animate-scale-in">
            🌿 India's first intelligent health OS
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up">
            <span className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Zivika Labs
            </span>
            <br />
            <span className="text-4xl md:text-6xl text-gray-900">
              Healthcare for Everyone
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in-up-delayed">
            Zivika Labs is building India's first intelligent health system where every patient has a 
            lifelong digital twin, and every doctor runs a zero-admin, AI-powered clinic.
          </p>
        </div>

        {/* Demo Buttons */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 animate-scale-in">
          <Button
            size="lg"
            className="h-24 flex flex-col gap-2 gradient-medical text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 interactive-glow"
            onClick={() => onViewDemo('patient')}
          >
            <Smartphone className="w-8 h-8" />
            <div>
              <div className="font-semibold">Patient App</div>
              <div className="text-xs opacity-90">AI Health Assistant</div>
            </div>
          </Button>

          <Button
            size="lg"
            className="h-24 flex flex-col gap-2 gradient-medical text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 interactive-glow"
            onClick={() => onViewDemo('doctor')}
          >
            <Stethoscope className="w-8 h-8" />
            <div>
              <div className="font-semibold">Doctor Portal</div>
              <div className="text-xs opacity-90">Smart Consultations</div>
            </div>
          </Button>

          <Button
            size="lg"
            className="h-24 flex flex-col gap-2 gradient-medical text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 interactive-glow"
            onClick={() => onViewDemo('locker')}
          >
            <FileText className="w-8 h-8" />
            <div>
              <div className="font-semibold">Health Locker</div>
              <div className="text-xs opacity-90">ABDM Compatible</div>
            </div>
          </Button>

          <Button
            size="lg"
            className="h-24 flex flex-col gap-2 bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 interactive-glow"
            onClick={() => onViewDemo('wearable')}
          >
            <Watch className="w-8 h-8" />
            <div>
              <div className="font-semibold">IoT Wearables</div>
              <div className="text-xs opacity-90">Real-time Monitoring</div>
            </div>
          </Button>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center p-6 glass-card rounded-2xl hover-lift card-hover">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center float">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">AI-Powered Diagnosis</h3>
            <p className="text-gray-600 text-center">
              Advanced machine learning algorithms provide accurate symptom analysis in multiple Indian languages
            </p>
          </div>

          <div className="flex flex-col items-center p-6 glass-card rounded-2xl hover-lift card-hover">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center float-delayed">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Continuous Monitoring</h3>
            <p className="text-gray-600 text-center">
              Real-time health tracking through advanced IoT wearables and smart device integration
            </p>
          </div>

          <div className="flex flex-col items-center p-6 glass-card rounded-2xl hover-lift card-hover">
            <div className="w-16 h-16 mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center float">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure & Compliant</h3>
            <p className="text-gray-600 text-center">
              ABDM-compliant digital health records with end-to-end encryption and privacy protection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
