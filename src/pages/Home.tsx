import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Activity, 
  Bluetooth, 
  BluetoothConnected, 
  Heart, 
  Info, 
  Play,
  Battery,
  Wifi,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/layout/BottomNavigation";

const Home = () => {
  const navigate = useNavigate();
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [deviceBattery, setDeviceBattery] = useState(85);

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-foreground">Reyji Rizki</h1>
          </div>
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              RR
            </AvatarFallback>
          </Avatar>
        </div>

        {/* How do you feel? */}
        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-border/50">
          <p className="text-muted-foreground mb-3">How do you feel?</p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex-1 h-auto py-3">
              <div className="text-center">
                <Heart className="h-5 w-5 mx-auto mb-1 text-primary" />
                <span className="text-xs">Great</span>
              </div>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 h-auto py-3">
              <div className="text-center">
                <Activity className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                <span className="text-xs">Normal</span>
              </div>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 h-auto py-3">
              <div className="text-center">
                <AlertTriangle className="h-5 w-5 mx-auto mb-1 text-red-500" />
                <span className="text-xs">Unwell</span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Device Status Card */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <span className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                Device Status
              </span>
              <Badge 
                variant={isDeviceConnected ? "default" : "secondary"}
                className={isDeviceConnected ? "bg-green-500" : ""}
              >
                {isDeviceConnected ? (
                  <BluetoothConnected className="h-3 w-3 mr-1" />
                ) : (
                  <Bluetooth className="h-3 w-3 mr-1" />
                )}
                {isDeviceConnected ? "Connected" : "Not Connected"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isDeviceConnected ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">XIAO ESP32-C6</span>
                  <div className="flex items-center gap-2">
                    <Battery className="h-4 w-4" />
                    <span className="text-sm font-medium">{deviceBattery}%</span>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Heart BioAmp Candy device ready for ECG monitoring
                  </p>
                </div>
              </>
            ) : (
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <p className="text-sm text-orange-700 dark:text-orange-300 mb-2">
                  Please connect your ECG device to start monitoring
                </p>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/device-connection")}
                  className="w-full"
                >
                  <Bluetooth className="h-4 w-4 mr-2" />
                  Connect Device
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-border/50 bg-gradient-primary/10 hover:bg-gradient-primary/20 transition-colors cursor-pointer"
                onClick={() => navigate("/ecg-test")}>
            <CardContent className="p-6 text-center">
              <div className="bg-primary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Play className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Start ECG Test</h3>
              <p className="text-xs text-muted-foreground">Quick 30s test</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/80 hover:bg-card transition-colors cursor-pointer"
                onClick={() => navigate("/reports")}>
            <CardContent className="p-6 text-center">
              <div className="bg-secondary/20 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <Activity className="h-6 w-6 text-secondary-foreground" />
              </div>
              <h3 className="font-semibold mb-1">View Reports</h3>
              <p className="text-xs text-muted-foreground">Past results</p>
            </CardContent>
          </Card>
        </div>

        {/* How to Use Device */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5" />
              How to Use Device
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <p className="text-sm">Place electrodes on clean, dry skin</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <p className="text-sm">Sit still and breathe normally</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/20 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <p className="text-sm">Press start when ready</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card className="border-border/50 bg-gradient-secondary/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">💡 Health Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-card/60 rounded-lg p-3">
              <p className="text-sm font-medium mb-1">Stay Hydrated</p>
              <p className="text-xs text-muted-foreground">
                Drink 8-10 glasses of water daily for optimal heart health
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;