import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Brain, Shield, Users, Heart, Activity, FileText, Smartphone, Watch, Bell, Globe, TrendingUp } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PatientDashboard from "@/components/PatientDashboard";
import DoctorDashboard from "@/components/DoctorDashboard";
import HealthLocker from "@/components/HealthLocker";
import WearableHealthData from "@/components/WearableHealthData";
import NotificationCenter from "@/components/NotificationCenter";
import LanguageSelector from "@/components/LanguageSelector";
import FamilyHealthManager from "@/components/FamilyHealthManager";
import HealthAnalytics from "@/components/HealthAnalytics";
import Reveal from "@/components/site/Reveal";
import { SiteFooter, SiteHeader } from "@/components/site/SiteChrome";

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'patient' | 'doctor' | 'locker' | 'wearable' | 'notifications' | 'language' | 'family' | 'analytics'>('home');
  const redirectToPatientApp = () => {
    window.location.assign("https://care.zivikalabs.com/");
  };

  if (activeView === 'patient') {
    return <PatientDashboard onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'doctor') {
    return <DoctorDashboard onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'locker') {
    return <HealthLocker onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'wearable') {
    return <WearableHealthData onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'notifications') {
    return <NotificationCenter onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'language') {
    return <LanguageSelector onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'family') {
    return <FamilyHealthManager onBack={() => setActiveView('home')} />;
  }

  if (activeView === 'analytics') {
    return <HealthAnalytics onBack={() => setActiveView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <SiteHeader />
      <HeroSection onViewDemo={(view) => view === 'patient' ? redirectToPatientApp() : setActiveView(view)} />
      
      {/* Enhanced Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20">
            🚀 Transforming Healthcare in India
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            AI-Powered Healthcare for Everyone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combining artificial intelligence, digital health records, IoT wearables, and real-time monitoring 
            to make quality healthcare accessible across India's diverse landscape.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">AI Symptom Checker</h3>
              <p className="text-gray-600">Multilingual AI assistant for accurate symptom analysis and health guidance</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Digital Health Records</h3>
              <p className="text-gray-600">ABDM-compatible secure health locker for all your medical records</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Real-time Vitals</h3>
              <p className="text-gray-600">Continuous monitoring through wearable integration and smart alerts</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Watch className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">IoT Wearables</h3>
              <p className="text-gray-600">Advanced health monitoring devices with AI-powered insights</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* New Enhanced Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Advanced Healthcare Features</h2>
            <p className="text-xl text-gray-600">Comprehensive tools for modern healthcare management</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm cursor-pointer" 
                  onClick={() => setActiveView('notifications')}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Smart Notifications</h3>
                <p className="text-gray-600">AI-powered health alerts and medication reminders</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm cursor-pointer"
                  onClick={() => setActiveView('language')}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-400 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Multi-language Support</h3>
                <p className="text-gray-600">Healthcare in your preferred Indian language with voice commands</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm cursor-pointer"
                  onClick={() => setActiveView('family')}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Family Health</h3>
                <p className="text-gray-600">Manage and monitor your entire family's health in one place</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm cursor-pointer"
                  onClick={() => setActiveView('analytics')}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Health Analytics</h3>
                <p className="text-gray-600">AI-powered predictions and population health insights</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Built for India's Healthcare Needs</h2>
            <p className="text-xl text-gray-600">Serving patients, doctors, and caregivers across urban, semi-urban, and rural India</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Patients</h3>
              <p className="text-gray-600 text-lg">Empowering individuals in Tier 2/3 cities with AI-driven health insights and digital records</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                <Stethoscope className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Doctors</h3>
              <p className="text-gray-600 text-lg">Supporting healthcare providers with AI-powered consult summaries and smart prescriptions</p>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">Caregivers</h3>
              <p className="text-gray-600 text-lg">Helping families manage chronic conditions and elderly care with continuous monitoring</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Experience the Future of Healthcare</h2>
          <p className="text-xl text-gray-600 mb-12">See how Zivika Labs transforms the healthcare experience for patients, doctors, and wearable technology</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Button 
              size="lg" 
              className="h-20 text-lg gradient-medical text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              onClick={redirectToPatientApp}
            >
              <Smartphone className="w-6 h-6 mr-3" />
              Patient Experience
            </Button>
            
            <Button 
              size="lg" 
              className="h-20 text-lg gradient-medical text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              onClick={() => setActiveView('doctor')}
            >
              <Stethoscope className="w-6 h-6 mr-3" />
              Doctor Dashboard
            </Button>
            
            <Button 
              size="lg" 
              className="h-20 text-lg gradient-medical text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              onClick={() => setActiveView('locker')}
            >
              <FileText className="w-6 h-6 mr-3" />
              Health Locker
            </Button>

            <Button 
              size="lg" 
              className="h-20 text-lg bg-gradient-to-br from-purple-600 to-blue-600 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
              onClick={() => setActiveView('wearable')}
            >
              <Watch className="w-6 h-6 mr-3" />
              Wearable Data
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/20">
              New Website Pages
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Explore the full Zivika story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn who we are building for, how the product ecosystem works, and how to get in touch with the team.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            <Reveal delayMs={60}>
              <Card className="h-full border-slate-200 bg-slate-50/80 rounded-3xl shadow-none">
                <CardContent className="p-8">
                  <div className="text-sm uppercase tracking-[0.18em] text-teal-700 font-semibold">About</div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">Why Zivika exists</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Read the founder story, market context, and the clinical infrastructure vision shaping the company.
                  </p>
                  <Button asChild variant="outline" className="mt-8 rounded-full border-slate-300">
                    <Link to="/about">Open About</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={120}>
              <Card className="h-full border-slate-200 bg-slate-50/80 rounded-3xl shadow-none">
                <CardContent className="p-8">
                  <div className="text-sm uppercase tracking-[0.18em] text-teal-700 font-semibold">Product</div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">Three products, one system</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    See how the AI Clinical Scribe, Health Locker, and AI Health Copilot fit together as one ecosystem.
                  </p>
                  <Button asChild variant="outline" className="mt-8 rounded-full border-slate-300">
                    <Link to="/product">Open Product</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delayMs={180}>
              <Card className="h-full border-slate-200 bg-slate-50/80 rounded-3xl shadow-none">
                <CardContent className="p-8">
                  <div className="text-sm uppercase tracking-[0.18em] text-teal-700 font-semibold">Contact</div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-950">Start a conversation</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    Reach out if you are a doctor, investor, researcher, or institution interested in collaborating.
                  </p>
                  <Button asChild className="mt-8 rounded-full bg-teal-600 text-white hover:bg-teal-700">
                    <Link to="/contact">Open Contact</Link>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
