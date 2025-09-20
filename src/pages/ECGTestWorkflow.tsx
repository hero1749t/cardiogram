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
      color: "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
    },
    {
      id: "detailed",
      name: "Detailed ECG", 
      duration: "5 minutes",
      description: "Comprehensive analysis",
      icon: Activity,
      color: "bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
    },
    {
      id: "continuous",
      name: "Continuous Monitor",
      duration: "Custom",
      description: "Extended monitoring session",
      icon: Heart,
      color: "bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800"
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
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
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
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={patientData.age}
                onChange={(e) => setPatientData(prev => ({ ...prev, age: e.target.value }))}
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
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
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
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTestSelection = () => (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
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
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? test.color + " border-current shadow-md" 
                    : "border-border hover:border-primary/50 bg-background/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isSelected ? "bg-current/20" : "bg-muted"}`}>
                    <Icon className={`h-5 w-5 ${isSelected ? "text-current" : "text-muted-foreground"}`} />
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
        <Card className="border-border/50 bg-gradient-primary/10">
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
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">ECG Test Setup</h1>
          <p className="text-muted-foreground text-sm">
            Step {step} of 2 - {step === 1 ? "Patient Information" : "Test Selection"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-6">
        <div className="bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          />
        </div>
      </div>

      <div className="px-6">
        {step === 1 ? renderPatientForm() : renderTestSelection()}
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-20 left-0 right-0 p-6 bg-background/80 backdrop-blur-sm border-t">
        <div className="flex gap-3 max-w-md mx-auto">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
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
            className="flex-1"
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