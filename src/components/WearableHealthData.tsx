
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Watch, Heart, Activity, Thermometer, Droplets, Zap, Brain, Shield, Smartphone, Wifi, Battery } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface WearableHealthDataProps {
  onBack: () => void;
}

const WearableHealthData = ({ onBack }: WearableHealthDataProps) => {
  const [isConnected, setIsConnected] = useState(true);
  const [heartRate, setHeartRate] = useState(72);
  const [steps, setSteps] = useState(8547);
  const [temperature, setTemperature] = useState(98.6);
  const [oxygenLevel, setOxygenLevel] = useState(98);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartRate(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      setSteps(prev => prev + Math.floor(Math.random() * 3));
      setTemperature(prev => Math.max(97, Math.min(100, prev + (Math.random() - 0.5) * 0.2)));
      setOxygenLevel(prev => Math.max(95, Math.min(100, prev + (Math.random() - 0.5) * 1)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const heartRateData = [
    { time: '00:00', value: 68 },
    { time: '04:00', value: 65 },
    { time: '08:00', value: 75 },
    { time: '12:00', value: 82 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 72 },
    { time: '24:00', value: 70 }
  ];

  const activityData = [
    { time: '6AM', steps: 0, calories: 0 },
    { time: '9AM', steps: 2500, calories: 120 },
    { time: '12PM', steps: 4800, calories: 230 },
    { time: '3PM', steps: 6200, calories: 290 },
    { time: '6PM', steps: 7800, calories: 350 },
    { time: '9PM', steps: 8547, calories: 385 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant={isConnected ? "default" : "destructive"} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
              {isConnected ? 'Connected' : 'Disconnected'}
            </Badge>
            <Badge variant="outline" className="text-blue-700 border-blue-200">
              Zivika Labs Wearable v2.1
            </Badge>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-600 to-purple-700 text-white mb-8">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Watch className="w-8 h-8" />
                  <h1 className="text-3xl font-bold">Zivika Labs Wearable</h1>
                </div>
                <p className="text-xl text-blue-100 mb-6">
                  Advanced health monitoring with AI-powered insights for comprehensive wellness tracking
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Battery className="w-4 h-4 text-green-300" />
                    <span>85% Battery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-blue-300" />
                    <span>5G Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-300" />
                    <span>HIPAA Compliant</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-white/20 to-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <Watch className="w-24 h-24 text-white" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Real-time Vitals */}
          <div className="lg:col-span-2 space-y-6">
            {/* Vital Signs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-3 animate-pulse" />
                  <div className="text-3xl font-bold text-red-600">{Math.round(heartRate)}</div>
                  <div className="text-sm text-red-700">BPM</div>
                  <div className="text-xs text-red-600 mt-1">Normal Range</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600">{oxygenLevel}%</div>
                  <div className="text-sm text-blue-700">SpO2</div>
                  <div className="text-xs text-blue-600 mt-1">Excellent</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-6 text-center">
                  <Thermometer className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-orange-600">{temperature.toFixed(1)}°</div>
                  <div className="text-sm text-orange-700">Temp</div>
                  <div className="text-xs text-orange-600 mt-1">Normal</div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <Activity className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600">{steps.toLocaleString()}</div>
                  <div className="text-sm text-green-700">Steps</div>
                  <div className="text-xs text-green-600 mt-1">Goal: 10,000</div>
                </CardContent>
              </Card>
            </div>

            {/* Heart Rate Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  24-Hour Heart Rate Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={heartRateData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[60, 90]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#ef4444" 
                      strokeWidth={3}
                      dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Activity Chart */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Activity className="w-6 h-6 text-green-500" />
                  Daily Activity Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="steps" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Device Info & AI Insights */}
          <div className="space-y-6">
            {/* Device Status */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Smartphone className="w-6 h-6 text-blue-500" />
                  Device Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Battery Level</span>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-20" />
                    <span className="text-sm font-medium">85%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Storage Used</span>
                  <div className="flex items-center gap-2">
                    <Progress value={32} className="w-20" />
                    <span className="text-sm font-medium">32%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Sync Status</span>
                  <Badge variant="outline" className="text-green-700 border-green-200">
                    Synced 2 min ago
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* AI Health Insights */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Brain className="w-6 h-6 text-purple-500" />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">Excellent Progress</div>
                      <div className="text-sm text-green-700">
                        Your heart rate variability shows improved cardiovascular fitness. Keep up the great work!
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">Activity Reminder</div>
                      <div className="text-sm text-blue-700">
                        You're 1,453 steps away from your daily goal. Take a 15-minute walk!
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-purple-800">Sleep Quality</div>
                      <div className="text-sm text-purple-700">
                        Your sleep pattern indicates 7.5 hours of quality rest. REM sleep was optimal.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gradient-medical text-white">
                  <Heart className="w-4 h-4 mr-2" />
                  Start Workout
                </Button>
                <Button variant="outline" className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Meditation Mode
                </Button>
                <Button variant="outline" className="w-full">
                  <Shield className="w-4 h-4 mr-2" />
                  Share with Doctor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WearableHealthData;
