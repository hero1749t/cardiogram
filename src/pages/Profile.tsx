import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  User, 
  Heart, 
  Settings, 
  Bluetooth,
  Globe,
  Moon,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Save,
  X
} from "lucide-react";
import BottomNavigation from "@/components/layout/BottomNavigation";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  
  const [profile, setProfile] = useState({
    name: "Reyji Rizki",
    email: "reyji.rizki@email.com",
    phone: "+1 234 567 8900",
    age: "28",
    gender: "Male",
    emergencyContact: "+1 234 567 8901"
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const medicalHistory = [
    { condition: "Blood Pressure", status: "Normal", lastCheck: "2024-01-15" },
    { condition: "Diabetes", status: "None", lastCheck: "2024-01-10" },
    { condition: "Heart Disease", status: "None", lastCheck: "2024-01-20" }
  ];

  const connectedDevices = [
    { name: "XIAO ESP32-C6", status: "Connected", battery: "85%" },
    { name: "Heart BioAmp Candy", status: "Paired", battery: "92%" }
  ];

  return (
    <div className="min-h-screen bg-main relative overflow-hidden pb-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-secondary/20 blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-accent/20 blur-xl animate-pulse delay-2000" />
        
        {/* Floating profile elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-primary float-animation" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full border border-secondary float-animation" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 pt-8 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold cyber-text">Profile</h1>
            <p className="text-muted-foreground text-sm">Manage your account and preferences</p>
          </div>
          <Button
            variant={isEditing ? "destructive" : "outline"}
            size="icon"
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
            className="hover-lift"
          >
            {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="relative z-10 px-6 space-y-6 animate-fade-in">
        {/* Profile Card */}
        <Card className="glass-card border-white/20 hover-lift">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 neon-glow">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editedProfile.name}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                  className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedProfile.email}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                  disabled={!isEditing}
                  className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, age: e.target.value }))}
                    disabled={!isEditing}
                    className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <select
                    id="gender"
                    value={editedProfile.gender}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, gender: e.target.value }))}
                    disabled={!isEditing}
                    className="flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input
                  id="emergency"
                  value={editedProfile.emergencyContact}
                  onChange={(e) => setEditedProfile(prev => ({ ...prev, emergencyContact: e.target.value }))}
                  disabled={!isEditing}
                  className="glass-card border-white/20 focus:border-primary/50 bg-white/5"
                />
              </div>
            </div>
            
            {isEditing && (
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="flex-1 gradient-primary hover:opacity-90 text-white border-0 hover-lift">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel} className="flex-1 glass-card hover-lift">
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical History */}
        <Card className="glass-card border-white/20 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Medical History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {medicalHistory.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-card hover-lift">
                <div>
                  <h4 className="font-medium">{item.condition}</h4>
                  <p className="text-sm text-muted-foreground">Last check: {item.lastCheck}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  item.status === "Normal" ? "bg-green-100 text-green-800" :
                  item.status === "None" ? "bg-gray-100 text-gray-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {item.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Connected Devices */}
        <Card className="glass-card border-white/20 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bluetooth className="h-5 w-5" />
              Connected Devices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {connectedDevices.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg glass-card hover-lift">
                <div>
                  <h4 className="font-medium">{device.name}</h4>
                  <p className="text-sm text-muted-foreground">Battery: {device.battery}</p>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  device.status === "Connected" ? "bg-green-100 text-green-800" :
                  "bg-blue-100 text-blue-800"
                }`}>
                  {device.status}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="glass-card border-white/20 hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="h-4 w-4" />
                <span>Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-4 w-4" />
                <span>Language</span>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-white/20 rounded px-2 py-1 bg-white/5"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start glass-card hover-lift">
            <Shield className="h-4 w-4 mr-3" />
            Privacy & Security
          </Button>
          <Button variant="outline" className="w-full justify-start glass-card hover-lift">
            <HelpCircle className="h-4 w-4 mr-3" />
            Help & Support
          </Button>
          <Button variant="destructive" className="w-full justify-start hover-lift">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;