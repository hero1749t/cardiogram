import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bluetooth, 
  BluetoothConnected, 
  Search, 
  Loader2, 
  Battery,
  Signal,
  CheckCircle,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/layout/BottomNavigation";

interface BluetoothDevice {
  id: string;
  name: string;
  rssi: number;
  battery?: number;
  isConnected: boolean;
}

const DeviceConnection = () => {
  const navigate = useNavigate();
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);

  const mockDevices: BluetoothDevice[] = [
    { id: "1", name: "XIAO ESP32-C6 (Heart)", rssi: -45, battery: 85, isConnected: false },
    { id: "2", name: "BioAmp Candy", rssi: -67, battery: 92, isConnected: false },
    { id: "3", name: "ECG Monitor Pro", rssi: -78, battery: 73, isConnected: false },
  ];

  const startScanning = () => {
    if (!isBluetoothEnabled) {
      setIsBluetoothEnabled(true);
    }
    
    setIsScanning(true);
    setDevices([]);
    
    // Simulate device discovery
    setTimeout(() => {
      setDevices([mockDevices[0]]);
    }, 1000);
    
    setTimeout(() => {
      setDevices([mockDevices[0], mockDevices[1]]);
    }, 2000);
    
    setTimeout(() => {
      setDevices(mockDevices);
      setIsScanning(false);
    }, 3000);
  };

  const connectToDevice = (device: BluetoothDevice) => {
    setDevices(prev => prev.map(d => ({ ...d, isConnected: false })));
    
    setTimeout(() => {
      const connectedDev = { ...device, isConnected: true };
      setConnectedDevice(connectedDev);
      setDevices(prev => prev.map(d => 
        d.id === device.id ? connectedDev : d
      ));
    }, 1500);
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      setDevices(prev => prev.map(d => 
        d.id === connectedDevice.id ? { ...d, isConnected: false } : d
      ));
      setConnectedDevice(null);
    }
  };

  const getSignalStrength = (rssi: number) => {
    if (rssi > -50) return { level: "Excellent", color: "text-green-500" };
    if (rssi > -70) return { level: "Good", color: "text-yellow-500" };
    return { level: "Weak", color: "text-red-500" };
  };

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 px-6 pt-8 pb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Device Connection</h1>
          <p className="text-muted-foreground text-sm">Connect your ECG device</p>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Bluetooth Status */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Bluetooth className="h-5 w-5" />
                Bluetooth Status
              </span>
              <Badge variant={isBluetoothEnabled ? "default" : "destructive"}>
                {isBluetoothEnabled ? "Enabled" : "Disabled"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isBluetoothEnabled ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Bluetooth is required to connect to your ECG device
                </p>
                <Button onClick={() => setIsBluetoothEnabled(true)} className="w-full">
                  Enable Bluetooth
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Ready to scan for devices</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Connected Device */}
        {connectedDevice && (
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <BluetoothConnected className="h-5 w-5" />
                Connected Device
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{connectedDevice.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Signal: {getSignalStrength(connectedDevice.rssi).level}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Battery className="h-4 w-4" />
                    {connectedDevice.battery}%
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={disconnectDevice}
                  className="flex-1"
                >
                  Disconnect
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/ecg-test")}
                  className="flex-1"
                >
                  Start ECG Test
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Scan Controls */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Scan for Devices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={startScanning} 
              disabled={!isBluetoothEnabled || isScanning}
              className="w-full"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Scan for ECG Devices
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Available Devices */}
        {devices.length > 0 && (
          <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle>Available Devices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {devices.map((device) => {
                const signal = getSignalStrength(device.rssi);
                
                return (
                  <div 
                    key={device.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{device.name}</h3>
                        {device.isConnected && (
                          <Badge variant="default" className="bg-green-500">
                            <BluetoothConnected className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Signal className={`h-3 w-3 ${signal.color}`} />
                          {signal.level}
                        </div>
                        {device.battery && (
                          <div className="flex items-center gap-1">
                            <Battery className="h-3 w-3" />
                            {device.battery}%
                          </div>
                        )}
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      disabled={device.isConnected || connectedDevice !== null}
                      onClick={() => connectToDevice(device)}
                    >
                      {device.isConnected ? "Connected" : "Connect"}
                    </Button>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Connection Tips */}
        <Card className="border-border/50 bg-gradient-secondary/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Connection Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm">• Keep device within 3 feet for best connection</p>
            <p className="text-sm">• Ensure device is powered on and in pairing mode</p>
            <p className="text-sm">• Try resetting device if not found</p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default DeviceConnection;