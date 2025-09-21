import { ArrowLeft, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/";
  
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'short',
    month: 'short', 
    day: 'numeric' 
  });

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again.",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarFallback className="gradient-primary text-white font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="font-semibold text-foreground">{userName}</h2>
              <p className="text-xs text-muted-foreground">
                {currentDate} • {currentTime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/profile")}
            className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs"
          >
            <Settings className="h-4 w-4 mr-1" />
            Settings
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSignOut}
            className="rounded-full bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm text-xs text-red-600"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;