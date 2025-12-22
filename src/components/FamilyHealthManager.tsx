
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Plus, Activity, Calendar, Shield, Phone } from "lucide-react";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  healthStatus: 'good' | 'monitoring' | 'attention';
  lastCheckup: string;
  conditions: string[];
  emergencyContact: boolean;
}

interface FamilyHealthManagerProps {
  onBack: () => void;
}

const FamilyHealthManager = ({ onBack }: FamilyHealthManagerProps) => {
  const [familyMembers] = useState<FamilyMember[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      relationship: 'Self',
      age: 45,
      healthStatus: 'monitoring',
      lastCheckup: '2 weeks ago',
      conditions: ['Hypertension', 'Diabetes Type 2'],
      emergencyContact: true
    },
    {
      id: '2',
      name: 'Priya Kumar',
      relationship: 'Spouse',
      age: 42,
      healthStatus: 'good',
      lastCheckup: '1 month ago',
      conditions: [],
      emergencyContact: true
    },
    {
      id: '3',
      name: 'Anita Kumar',
      relationship: 'Mother',
      age: 68,
      healthStatus: 'attention',
      lastCheckup: '1 week ago',
      conditions: ['Arthritis', 'High Cholesterol', 'Osteoporosis'],
      emergencyContact: false
    },
    {
      id: '4',
      name: 'Arjun Kumar',
      relationship: 'Son',
      age: 16,
      healthStatus: 'good',
      lastCheckup: '3 months ago',
      conditions: ['Asthma (mild)'],
      emergencyContact: false
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800 border-green-300';
      case 'monitoring': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'attention': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return '✅';
      case 'monitoring': return '⚠️';
      case 'attention': return '🚨';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              ← Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-600" />
                Family Health Manager
              </h1>
              <p className="text-gray-600">Monitor and manage your family's health together</p>
            </div>
          </div>
          <Button className="gradient-medical text-white">
            <Plus className="w-5 h-5 mr-2" />
            Add Family Member
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-100 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Family Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-gray-600">Healthy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                  <div className="text-sm text-gray-600">Monitoring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-gray-600">Needs Attention</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-6 h-6 text-purple-600" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {familyMembers.filter(member => member.emergencyContact).map(member => (
                  <div key={member.id} className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span className="font-medium">{member.name}</span>
                    <Badge variant="outline" className="text-xs">{member.relationship}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {familyMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {member.name}
                      {member.emergencyContact && <Shield className="w-4 h-4 text-purple-600" />}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{member.relationship}</Badge>
                      <span className="text-sm text-gray-600">{member.age} years old</span>
                    </div>
                  </div>
                  <div className="text-2xl">{getStatusIcon(member.healthStatus)}</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Health Status:</span>
                    <Badge className={getStatusColor(member.healthStatus)}>
                      {member.healthStatus.charAt(0).toUpperCase() + member.healthStatus.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Checkup:</span>
                    <span className="text-sm text-gray-600">{member.lastCheckup}</span>
                  </div>

                  {member.conditions.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Conditions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {member.conditions.map((condition, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Activity className="w-4 h-4 mr-1" />
                      View Health
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-blue-100 to-green-100">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Family Health Insights</h3>
              <p className="text-gray-600 mb-4">
                AI-powered recommendations to keep your family healthy based on collective health patterns and seasonal trends.
              </p>
              <Button variant="outline">
                View Family Health Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FamilyHealthManager;
