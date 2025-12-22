
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Activity, Heart, TrendingUp, Zap, Shield, Target, Sparkles } from "lucide-react";

interface DigitalTwinProps {
  onClose?: () => void;
}

const DigitalTwin = ({ onClose }: DigitalTwinProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'predictions' | 'insights'>('overview');
  const [healthScore, setHealthScore] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Simulate real-time health score updates
    const interval = setInterval(() => {
      setHealthScore(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(70, Math.min(100, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const healthMetrics = [
    { label: "Cardiovascular", value: 92, color: "text-red-500", trend: "+2%" },
    { label: "Metabolic", value: 78, color: "text-blue-500", trend: "-1%" },
    { label: "Mental Health", value: 85, color: "text-purple-500", trend: "+5%" },
    { label: "Sleep Quality", value: 73, color: "text-indigo-500", trend: "+3%" },
  ];

  const predictions = [
    {
      title: "Vitamin D Deficiency Risk",
      probability: "68%",
      timeframe: "Next 3 months",
      severity: "Medium",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200"
    },
    {
      title: "Optimal Exercise Window",
      probability: "95%",
      timeframe: "Tomorrow 6-8 PM",
      severity: "Opportunity",
      color: "bg-green-100 text-green-800 border-green-200"
    },
    {
      title: "Stress Level Alert",
      probability: "45%",
      timeframe: "This week",
      severity: "Low",
      color: "bg-blue-100 text-blue-800 border-blue-200"
    }
  ];

  const insights = [
    "Your heart rate variability has improved by 12% this month",
    "Sleep pattern analysis suggests adjusting bedtime by 30 minutes",
    "Stress levels correlate with work schedule - consider mindfulness breaks",
    "Nutrition data indicates increased protein intake is beneficial"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 fade-in-up">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center digital-pulse">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Digital Twin</h1>
              <p className="text-gray-600">AI-Powered Health Intelligence</p>
            </div>
          </div>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Back to Dashboard
            </Button>
          )}
        </div>

        {/* Health Score Card */}
        <Card className="mb-8 glass-card hover-lift slide-in-left border-0 shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center twin-glow">
                    <div className="text-4xl font-bold text-white">{Math.round(healthScore)}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Overall Health Score</h2>
                  <p className="text-gray-600 mb-4">Based on 247 data points from the last 30 days</p>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    Excellent Health Status
                  </Badge>
                </div>
              </div>
              <Button 
                onClick={startAnalysis}
                disabled={isAnalyzing}
                className="gradient-medical text-white hover:opacity-90 transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Run Analysis
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 slide-in-right">
          {([
            { id: 'overview', label: 'Health Metrics', icon: Activity },
            { id: 'predictions', label: 'AI Predictions', icon: Target },
            { id: 'insights', label: 'Insights', icon: TrendingUp }
          ] as const).map(({ id, label, icon: Icon }, index) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "outline"}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 transition-all duration-300 stagger-${index + 1} scale-in ${
                activeTab === id ? 'gradient-medical text-white' : 'hover-glow'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 fade-in-up">
            {healthMetrics.map((metric, index) => (
              <Card key={metric.label} className={`glass-card hover-lift border-0 shadow-lg stagger-${index + 1} scale-in`}>
                <CardContent className="p-6 text-center">
                  <div className={`text-3xl font-bold ${metric.color} mb-2`}>
                    {metric.value}%
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {metric.label}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 text-sm font-medium">{metric.trend}</span>
                  </div>
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-green-500 rounded-full transition-all duration-1000 data-stream"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6 fade-in-up">
            {predictions.map((prediction, index) => (
              <Card key={prediction.title} className={`glass-card hover-lift border-0 shadow-lg stagger-${index + 1} slide-in-left`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {prediction.title}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className={prediction.color}>
                          {prediction.probability} probability
                        </Badge>
                        <span className="text-gray-600">{prediction.timeframe}</span>
                      </div>
                      <p className="text-gray-600">
                        AI prediction based on historical patterns and current health metrics
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-500" />
                      <Heart className="w-5 h-5 text-red-500 heartbeat" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-4 fade-in-up">
            {insights.map((insight, index) => (
              <Card key={index} className={`glass-card hover-lift border-0 shadow-lg stagger-${index + 1} slide-in-right`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 float">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{insight}</p>
                      <p className="text-gray-600 text-sm mt-2">
                        Generated by AI • Confidence: {85 + Math.floor(Math.random() * 15)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Real-time Data Stream Indicator */}
        <Card className="mt-8 glass border-0 shadow-lg fade-in-up">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full pulse-glow"></div>
              <span className="text-gray-700 font-medium">Live data streaming from 12 connected devices</span>
              <Badge variant="outline" className="text-green-700 border-green-200">
                Real-time Analytics Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DigitalTwin;
