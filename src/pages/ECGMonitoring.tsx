import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ECGWaveform } from '@/components/ecg/ECGWaveform';
import { PatientInfo } from '@/components/ecg/PatientInfo';
import { MetricsPanel } from '@/components/ecg/MetricsPanel';
import { Play, Square, Download, Share, Bluetooth, Battery } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ECGMonitoring = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [testType, setTestType] = useState('quick');
  const [bpm, setBPM] = useState(72);
  const [hrv, setHRV] = useState(42);
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [alerts, setAlerts] = useState<string[]>([]);
  const { toast } = useToast();

  // Mock patient data
  const patientData = {
    name: "Sarah Johnson",
    age: 45,
    gender: "Female",
    medicalHistory: {
      conditions: ["Hypertension", "Type 2 Diabetes"],
      medications: ["Lisinopril", "Metformin"]
    },
    lastTest: new Date(2024, 0, 15)
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => {
          const newDuration = prev + 1;
          // Auto-stop based on test type
          const maxDuration = testType === 'quick' ? 30 : testType === 'detailed' ? 300 : 0;
          if (maxDuration && newDuration >= maxDuration) {
            handleStopRecording();
            return prev;
          }
          return newDuration;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, testType]);

  useEffect(() => {
    // Check for alerts based on BPM
    const newAlerts: string[] = [];
    if (bpm < 50) {
      newAlerts.push("Bradycardia detected - Heart rate below 50 BPM");
    } else if (bpm > 120) {
      newAlerts.push("Tachycardia detected - Heart rate above 120 BPM");
    }
    
    if (hrv < 25) {
      newAlerts.push("Low HRV detected - May indicate stress or fatigue");
    }
    
    setAlerts(newAlerts);
    
    if (newAlerts.length > 0 && isRecording) {
      toast({
        title: "ECG Alert",
        description: newAlerts[0],
        variant: "destructive",
      });
    }
  }, [bpm, hrv, isRecording, toast]);

  const handleStartRecording = () => {
    if (!deviceConnected) {
      toast({
        title: "Device Error",
        description: "Please connect ECG device before starting recording",
        variant: "destructive",
      });
      return;
    }
    
    setIsRecording(true);
    setRecordingDuration(0);
    setAlerts([]);
    toast({
      title: "Recording Started",
      description: `Starting ${testType} ECG test`,
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Complete",
      description: `ECG test completed. Duration: ${Math.floor(recordingDuration / 60)}:${(recordingDuration % 60).toString().padStart(2, '0')}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Generating PDF report and preparing data export...",
    });
  };

  const handleShareResults = () => {
    toast({
      title: "Share Options",
      description: "Report shared with healthcare provider",
    });
  };

  const getTestDuration = (type: string) => {
    switch (type) {
      case 'quick': return '30 seconds';
      case 'detailed': return '5 minutes';
      case 'continuous': return 'Custom duration';
      default: return '30 seconds';
    }
  };

  const getRhythmStatus = () => {
    if (alerts.length > 0) return 'Alert';
    if (bpm < 60 || bpm > 100) return 'Irregular';
    return 'Normal';
  };

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ECG Monitoring</h1>
          <p className="text-muted-foreground">Real-time electrocardiogram analysis</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Device Status */}
          <Card className="px-4 py-2">
            <div className="flex items-center gap-2">
              <Bluetooth className={`w-4 h-4 ${deviceConnected ? 'text-accent' : 'text-muted-foreground'}`} />
              <span className="text-sm font-medium">
                {deviceConnected ? 'Connected' : 'Disconnected'}
              </span>
              {deviceConnected && (
                <div className="flex items-center gap-1">
                  <Battery className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">{batteryLevel}%</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Patient Info */}
      <PatientInfo {...patientData} />

      {/* Control Panel */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Test Configuration</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground">Test Type:</label>
              <Select value={testType} onValueChange={setTestType} disabled={isRecording}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quick">Quick Test</SelectItem>
                  <SelectItem value="detailed">Detailed Test</SelectItem>
                  <SelectItem value="continuous">Continuous</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-muted-foreground">
              Duration: {getTestDuration(testType)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isRecording ? (
            <Button onClick={handleStartRecording} className="bg-accent hover:bg-accent/90">
              <Play className="w-4 h-4 mr-2" />
              Start Recording
            </Button>
          ) : (
            <Button onClick={handleStopRecording} variant="destructive">
              <Square className="w-4 h-4 mr-2" />
              Stop Recording
            </Button>
          )}
          
          <Button onClick={handleExportData} variant="outline" disabled={isRecording}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          
          <Button onClick={handleShareResults} variant="outline" disabled={isRecording}>
            <Share className="w-4 h-4 mr-2" />
            Share Results
          </Button>
        </div>
      </Card>

      {/* Metrics Panel */}
      <MetricsPanel
        bpm={bpm}
        hrv={hrv}
        duration={recordingDuration}
        rhythm={getRhythmStatus()}
        alerts={alerts}
      />

      {/* ECG Waveform */}
      <ECGWaveform
        isRecording={isRecording}
        duration={recordingDuration}
        onBPMChange={setBPM}
        onHRVChange={setHRV}
      />
    </div>
  );
};

export default ECGMonitoring;