import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Activity, Heart, Info, Play, FileText, Share, Zap, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import HealthIndicators from "@/components/health/HealthIndicators";
import AdvancedDeviceStatus from "@/components/device/AdvancedDeviceStatus";
const Home = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [lastEcgSummary] = useState({
    bpm: 72,
    duration: "30s",
    status: "Normal",
    timestamp: "2 hours ago"
  });
  const getUserName = () => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };
  return <div className="min-h-screen bg-main pb-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/30 blur-3xl animate-pulse" />
        <div className="absolute top-60 right-20 w-40 h-40 rounded-full bg-secondary/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-20 w-28 h-28 rounded-full bg-accent/25 blur-2xl animate-pulse delay-2000" />
        
        {/* Floating ECG Grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-primary" />
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <div className="px-4 space-y-6 pt-4 py-px">
          {/* Welcome Section with Last ECG Summary */}
          <div className="glass-cyber rounded-3xl p-6 border-white/20 hover-lift">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                  <p className="text-muted-foreground text-sm">Welcome back</p>
                </div>
                <h1 className="text-3xl font-bold cyber-text">{getUserName()}</h1>
              </div>
              <div className="text-right glass-card p-4 rounded-2xl bg-black">
                <p className="text-xs text-muted-foreground">Last ECG Reading</p>
                <p className="text-2xl font-bold neon-glow text-red-600">{lastEcgSummary.bpm}</p>
                <p className="text-xs text-accent">BPM</p>
                <p className="text-xs text-slate-50">{lastEcgSummary.timestamp}</p>
              </div>
            </div>
            
            <Badge className="bg-accent/20 text-accent border-accent/30 px-4 py-2 rounded-full">
              <div className="w-3 h-3 bg-accent rounded-full mr-3 animate-pulse" />
              <span className="font-semibold">{lastEcgSummary.status}</span>
              <span className="mx-2">•</span>
              <span>{lastEcgSummary.duration} scan</span>
            </Badge>
          </div>

          {/* Health Indicators */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary animate-pulse" />
              <p className="text-foreground font-semibold text-lg">Health Indicators</p>
            </div>
            <HealthIndicators />
          </div>

          {/* Advanced Device Status */}
          <AdvancedDeviceStatus />

          {/* Large Start ECG Test Button */}
          <Button onClick={() => navigate("/ecg-test")} className="w-full h-20 gradient-primary hover:opacity-90 text-white border-0 rounded-3xl text-xl font-bold hover-lift relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] animate-pulse" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-white/30 rounded-full p-3 neon-glow">
                <Play className="h-8 w-8" />
              </div>
              <div className="text-left">
                <div className="text-xl">Start ECG Test</div>
                <div className="text-sm opacity-90">Quick 30 second heart scan</div>
              </div>
            </div>
          </Button>

          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" onClick={() => navigate("/reports")} className="h-24 flex-col gap-3 glass-cyber border-primary/30 hover:border-primary/50 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-primary/5 blur-xl" />
              <div className="bg-primary/30 rounded-full p-3 neon-glow relative z-10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground relative z-10">View Reports</span>
            </Button>
            
            <Button variant="outline" className="h-24 flex-col gap-3 glass-cyber border-secondary/30 hover:border-secondary/50 hover-lift relative overflow-hidden">
              <div className="absolute inset-0 bg-secondary/5 blur-xl" />
              <div className="bg-secondary/30 rounded-full p-3 neon-glow relative z-10">
                <Share className="h-6 w-6 text-secondary" />
              </div>
              <span className="text-sm font-semibold text-foreground relative z-10">Share with Doctor</span>
            </Button>
          </div>

          {/* Health Tips */}
          <Card className="glass-cyber border-warning/20 hover-lift">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-warning/30 rounded-full p-2 neon-glow">
                  <Zap className="h-6 w-6 text-warning" />
                </div>
                <span className="cyber-text">Today's Health Tip</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="glass-card rounded-2xl p-6 border border-warning/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-warning/10 rounded-full blur-2xl" />
                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-warning/30 rounded-full p-3 flex-shrink-0 neon-glow">
                    <TrendingUp className="h-5 w-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold mb-2 text-foreground">Stay Hydrated for Heart Health</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Drinking 8-10 glasses of water daily helps maintain optimal blood pressure and supports healthy heart function
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* How to Use Device - Compact Version */}
          <Card className="glass-cyber border-accent/20 hover-lift">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="bg-accent/30 rounded-full p-2 neon-glow">
                  <Info className="h-6 w-6 text-accent" />
                </div>
                <span className="cyber-text">Quick Setup Guide</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-base group hover:translate-x-2 transition-transform">
                <div className="bg-primary/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 neon-glow">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <p className="text-foreground font-medium">Place electrodes on clean skin</p>
              </div>
              <div className="flex items-center gap-4 text-base group hover:translate-x-2 transition-transform">
                <div className="bg-secondary/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 neon-glow">
                  <span className="text-sm font-bold text-secondary">2</span>
                </div>
                <p className="text-foreground font-medium">Sit still and breathe normally</p>
              </div>
              <div className="flex items-center gap-4 text-base group hover:translate-x-2 transition-transform">
                <div className="bg-accent/30 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 neon-glow">
                  <span className="text-sm font-bold text-accent">3</span>
                </div>
                <p className="text-foreground font-medium">Press start when ready</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>;
};
export default Home;