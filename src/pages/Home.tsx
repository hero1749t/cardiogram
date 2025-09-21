import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  Heart, 
  Info, 
  Play,
  FileText,
  Share,
  Zap,
  TrendingUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import HealthIndicators from "@/components/health/HealthIndicators";
import AdvancedDeviceStatus from "@/components/device/AdvancedDeviceStatus";

const Home = () => {
  const navigate = useNavigate();
  const [lastEcgSummary] = useState({
    bpm: 72,
    duration: "30s",
    status: "Normal",
    timestamp: "2 hours ago"
  });

  return (
    <div className="min-h-screen gradient-subtle pb-20">
      <Header />
      
      <div className="px-4 space-y-6 pt-4">
        {/* Welcome Section with Last ECG Summary */}
        <div className="glass-card rounded-2xl p-6 border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">Welcome back</p>
              <h1 className="text-2xl font-bold text-foreground">Reyji Rizki</h1>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Last ECG</p>
              <p className="text-sm font-semibold text-primary">{lastEcgSummary.bpm} BPM</p>
              <p className="text-xs text-muted-foreground">{lastEcgSummary.timestamp}</p>
            </div>
          </div>
          
          <Badge variant="outline" className="border-emerald-500/50 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
            {lastEcgSummary.status} • {lastEcgSummary.duration}
          </Badge>
        </div>

        {/* Health Indicators */}
        <div>
          <p className="text-muted-foreground mb-3 text-sm font-medium">Health Indicators</p>
          <HealthIndicators />
        </div>

        {/* Advanced Device Status */}
        <AdvancedDeviceStatus />

        {/* Large Start ECG Test Button */}
        <Button 
          onClick={() => navigate("/ecg-test")}
          className="w-full h-16 gradient-primary hover:opacity-90 text-white border-0 rounded-2xl text-lg font-semibold shadow-glow"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Play className="h-6 w-6" />
            </div>
            <div className="text-left">
              <div>Start ECG Test</div>
              <div className="text-xs opacity-80">Quick 30 second scan</div>
            </div>
          </div>
        </Button>

        {/* Quick Shortcuts */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            onClick={() => navigate("/reports")}
            className="h-20 flex-col gap-2 glass-card border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10"
          >
            <div className="bg-blue-500/20 rounded-full p-2">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
            <span className="text-sm font-medium">View Reports</span>
          </Button>
          
          <Button 
            variant="outline"
            className="h-20 flex-col gap-2 glass-card border-white/20 hover:border-white/30 bg-white/5 hover:bg-white/10"
          >
            <div className="bg-purple-500/20 rounded-full p-2">
              <Share className="h-5 w-5 text-purple-500" />
            </div>
            <span className="text-sm font-medium">Share with Doctor</span>
          </Button>
        </div>

        {/* Health Tips */}
        <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-yellow-500" />
              Today's Health Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-subtle rounded-lg p-4 border border-white/10">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-500/20 rounded-full p-2 flex-shrink-0">
                  <TrendingUp className="h-4 w-4 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Stay Hydrated for Heart Health</p>
                  <p className="text-xs text-muted-foreground">
                    Drinking 8-10 glasses of water daily helps maintain optimal blood pressure and heart function
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How to Use Device - Compact Version */}
        <Card className="glass-card border-white/20">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Info className="h-5 w-5 text-primary" />
              Quick Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <p>Place electrodes on clean skin</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <p>Sit still and breathe normally</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="bg-primary/20 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <p>Press start when ready</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;