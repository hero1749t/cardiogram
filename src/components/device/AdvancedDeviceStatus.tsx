import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bluetooth, 
  BluetoothConnected, 
  Battery,
  Activity,
  Wifi,
  AlertCircle 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdvancedDeviceStatus = () => {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [ecgSignal, setEcgSignal] = useState(Array(20).fill(0));

  // Simulate ECG waveform animation when connected
  useEffect(() => {
    if (!isConnected) return;
    
    const interval = setInterval(() => {
      setEcgSignal(prev => {
        const newSignal = [...prev.slice(1)];
        // Simple heartbeat pattern
        const heartbeat = Math.sin(Date.now() / 200) * Math.sin(Date.now() / 100) * 0.8;
        newSignal.push(heartbeat);
        return newSignal;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isConnected]);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const getConnectionStatus = () => {
    if (isConnecting) return { text: "Connecting...", color: "bg-yellow-500", icon: Bluetooth };
    if (isConnected) return { text: "Connected", color: "bg-emerald-500", icon: BluetoothConnected };
    return { text: "Not Connected", color: "bg-gray-500", icon: Bluetooth };
  };

  const status = getConnectionStatus();

  return (
    <Card className="glass-card border-white/20 hover:border-white/30 transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-primary" />
            Device Status
          </span>
          <Badge 
            className={`${status.color} text-white border-0 ${isConnecting ? 'pulse-bluetooth' : ''}`}
          >
            <status.icon className="h-3 w-3 mr-1" />
            {status.text}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isConnected ? (
          <>
            {/* Device Info */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">XIAO ESP32-C6</p>
                <p className="text-xs text-muted-foreground">Heart BioAmp Candy</p>
              </div>
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium text-foreground">{batteryLevel}%</span>
              </div>
            </div>

            {/* Mini ECG Waveform */}
            <div className="bg-black/20 rounded-lg p-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-emerald-500 ecg-pulse" />
                <span className="text-xs text-emerald-500 font-medium">Live ECG Signal</span>
              </div>
              
              <div className="h-8 flex items-center gap-1">
                {ecgSignal.map((value, index) => (
                  <div 
                    key={index}
                    className="w-1 bg-emerald-500 rounded-full ecg-pulse"
                    style={{ 
                      height: `${Math.max(2, Math.abs(value) * 20 + 10)}px`,
                      opacity: 0.8 - (index * 0.03)
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-lg border border-emerald-200/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                  Device ready for ECG monitoring
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200/50">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                <div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 font-medium mb-1">
                    Device Not Connected
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    Connect your ECG device to start monitoring
                  </p>
                </div>
              </div>
            </div>
            
            <Button 
              size="sm" 
              onClick={isConnecting ? undefined : handleConnect}
              disabled={isConnecting}
              className="w-full gradient-primary hover:opacity-90 text-white border-0"
            >
              <Bluetooth className={`h-4 w-4 mr-2 ${isConnecting ? 'pulse-bluetooth' : ''}`} />
              {isConnecting ? 'Connecting...' : 'Connect Device'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedDeviceStatus;