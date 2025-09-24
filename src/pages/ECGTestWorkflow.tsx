import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  Clock, 
  Activity,
  ArrowLeft,
  ArrowRight,
  Heart,
  Timer
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/layout/BottomNavigation";

interface PatientData {
  name: string;
  age: string;
  gender: string;
  dob: string;
  medicalHistory: {
    bloodPressure: boolean;
    diabetes: boolean;
    heartDisease: boolean;
    notes: string;
  };
}

const ECGTestWorkflow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [patientData, setPatientData] = useState<PatientData>({
    name: "Reyji Rizki",
    age: "28",
    gender: "Male",
    dob: "1995-06-15",
    medicalHistory: {
      bloodPressure: false,
      diabetes: false,
      heartDisease: false,
      notes: ""
    }
  });
  const [selectedTestType, setSelectedTestType] = useState<string>("");

  const testTypes = [
    {
      id: "quick",
      name: "Quick ECG",
      duration: "30 seconds",
      description: "Basic heart rhythm check",
      icon: Timer,
    },
    {
      id: "detailed",
      name: "Detailed ECG", 
      duration: "5 minutes",
      description: "Comprehensive analysis",
      icon: Activity,
    },
    {
      id: "continuous",
      name: "Continuous Monitor",
      duration: "Custom",
      description: "Extended monitoring session",
      icon: Heart,
    }
  ];

  const handleMedicalHistoryChange = (field: keyof PatientData['medicalHistory'], value: boolean | string) => {
    setPatientData(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        [field]: value
      }
    }));
  };

  const renderPatientForm = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-card border-white/20 hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={patientData.name}
                onChange={(e) => setPatientData(prev => ({ ...prev, name: e.target.value }))}
                className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={patientData.age}
                onChange={(e) => setPatientData(prev => ({ ...prev, age: e.target.value }))}
                className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gender">Gender</Label>
              <select 
                id="gender"
                value={patientData.gender}
                onChange={(e) => setPatientData(prev => ({ ...prev, gender: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={patientData.dob}
                onChange={(e) => setPatientData(prev => ({ ...prev, dob: e.target.value }))}
                className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-white/20 hover-lift">
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bp"
                checked={patientData.medicalHistory.bloodPressure}
                onCheckedChange={(checked) => handleMedicalHistoryChange('bloodPressure', !!checked)}
              />
              <Label htmlFor="bp">High Blood Pressure</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="diabetes"
                checked={patientData.medicalHistory.diabetes}
                onCheckedChange={(checked) => handleMedicalHistoryChange('diabetes', !!checked)}
              />
              <Label htmlFor="diabetes">Diabetes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="heart"
                checked={patientData.medicalHistory.heartDisease}
                onCheckedChange={(checked) => handleMedicalHistoryChange('heartDisease', !!checked)}
              />
              <Label htmlFor="heart">Heart Disease</Label>
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any other medical conditions or medications..."
              value={patientData.medicalHistory.notes}
              onChange={(e) => handleMedicalHistoryChange('notes', e.target.value)}
              className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTestSelection = () => (
    <div className="space-y-6 animate-fade-in">
      <Card className="glass-card border-white/20 hover-lift">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Select Test Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {testTypes.map((test) => {
            const Icon = test.icon;
            const isSelected = selectedTestType === test.id;
            
            return (
              <div
                key={test.id}
                onClick={() => setSelectedTestType(test.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
                  isSelected 
                    ? "glass-cyber border-primary neon-glow" 
                    : "glass-card border-white/20 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isSelected ? "bg-primary/20 neon-glow" : "bg-muted"}`}>
                    <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{test.name}</h3>
                      <Badge variant="outline">{test.duration}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{test.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {selectedTestType && (
        <Card className="glass-cyber border-primary/30 neon-glow">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-primary">
              <Activity className="h-4 w-4" />
              <span className="font-medium">
                Ready to start {testTypes.find(t => t.id === selectedTestType)?.name}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-main relative overflow-hidden pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-accent/20 blur-xl animate-pulse delay-2000" />
        
        {/* Floating ECG Lines */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <path 
              d="M0,500 Q250,400 500,500 T1000,500" 
              stroke="currentColor" 
              strokeWidth="2" 
              fill="none"
              className="text-primary ecg-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center gap-4 px-6 pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => step > 1 ? setStep(step - 1) : navigate("/")} className="hover-lift">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold cyber-text">ECG Test Setup</h1>
          <p className="text-muted-foreground text-sm">
            Step {step} of 2 - {step === 1 ? "Patient Information" : "Test Selection"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10 px-6 mb-6">
        <div className="glass-card rounded-full h-3 overflow-hidden">
          <div 
            className="h-full gradient-primary rounded-full transition-all duration-500 neon-glow"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="relative z-10 px-6">
        {step === 1 ? renderPatientForm() : renderTestSelection()}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-20 left-0 right-0 p-6 glass-cyber border-t z-20">
        <div className="flex gap-3 max-w-md mx-auto">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1 hover-lift glass-card">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          
          <Button 
            onClick={() => {
              if (step === 1) {
                setStep(2);
              } else {
                navigate("/ecg");
              }
            }}
            className="flex-1 gradient-primary hover:opacity-90 text-white border-0 hover-lift"
            disabled={step === 2 && !selectedTestType}
          >
            {step === 2 ? "Start Test" : "Next"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ECGTestWorkflow;