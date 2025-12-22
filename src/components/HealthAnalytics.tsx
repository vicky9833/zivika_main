
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Brain, AlertTriangle, Heart, Activity, Users } from "lucide-react";

interface HealthAnalyticsProps {
  onBack: () => void;
}

const HealthAnalytics = ({ onBack }: HealthAnalyticsProps) => {
  const healthTrends = [
    { month: 'Jan', heartRate: 72, bloodPressure: 120, steps: 8500 },
    { month: 'Feb', heartRate: 74, bloodPressure: 118, steps: 9200 },
    { month: 'Mar', heartRate: 71, bloodPressure: 122, steps: 9800 },
    { month: 'Apr', heartRate: 73, bloodPressure: 119, steps: 10200 },
    { month: 'May', heartRate: 70, bloodPressure: 117, steps: 11000 },
    { month: 'Jun', heartRate: 72, bloodPressure: 116, steps: 10800 }
  ];

  const riskFactors = [
    { name: 'Low Risk', value: 65, color: '#22c55e' },
    { name: 'Medium Risk', value: 25, color: '#f59e0b' },
    { name: 'High Risk', value: 10, color: '#ef4444' }
  ];

  const populationData = [
    { condition: 'Diabetes', patients: 2340, trend: '+5.2%' },
    { condition: 'Hypertension', patients: 3120, trend: '+3.1%' },
    { condition: 'Obesity', patients: 1890, trend: '+7.8%' },
    { condition: 'Heart Disease', patients: 1250, trend: '-2.1%' }
  ];

  const predictions = [
    {
      title: 'Diabetes Risk',
      risk: 'Low',
      probability: '15%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      factors: ['Regular exercise', 'Balanced diet', 'Normal BMI']
    },
    {
      title: 'Cardiovascular Risk',
      risk: 'Medium',
      probability: '35%',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      factors: ['Family history', 'Moderate stress', 'Occasional smoking']
    },
    {
      title: 'Hypertension Risk',
      risk: 'Low',
      probability: '22%',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      factors: ['Active lifestyle', 'Low sodium diet', 'Stress management']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              Health Analytics & Insights
            </h1>
            <p className="text-gray-600">AI-powered health predictions and population insights</p>
          </div>
        </div>

        {/* Health Trends */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                Personal Health Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={2} name="Heart Rate" />
                  <Line type="monotone" dataKey="bloodPressure" stroke="#ef4444" strokeWidth={2} name="Blood Pressure" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskFactors}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {riskFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* AI Predictions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              AI Health Predictions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {predictions.map((prediction, index) => (
                <div key={index} className={`p-4 rounded-lg ${prediction.bgColor}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{prediction.title}</h3>
                    <Badge className={`${prediction.color} bg-transparent border-current`}>
                      {prediction.probability}
                    </Badge>
                  </div>
                  <div className={`text-lg font-bold mb-3 ${prediction.color}`}>
                    {prediction.risk} Risk
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Key Factors:</p>
                    {prediction.factors.map((factor, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        {factor}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Population Health Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Population Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={populationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="condition" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="patients" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Trending Health Conditions</h3>
                {populationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{item.condition}</div>
                      <div className="text-sm text-gray-600">{item.patients.toLocaleString()} patients</div>
                    </div>
                    <Badge 
                      variant={item.trend.startsWith('+') ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {item.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="bg-gradient-to-r from-purple-100 to-blue-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              AI Health Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Personal Recommendations</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Increase daily water intake to 8-10 glasses
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Add 20 minutes of cardio to your weekly routine
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    Schedule annual eye examination
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">!</span>
                    Monitor blood pressure more frequently
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Community Health Alerts</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">⚠</span>
                    Flu season approaching - get vaccinated
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">ℹ</span>
                    Air quality moderate - limit outdoor activities
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    Mental health awareness week - free consultations available
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthAnalytics;
