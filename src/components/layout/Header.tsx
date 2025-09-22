import { ArrowLeft, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const showBackButton = location.pathname !== "/" && location.pathname !== "/dashboard";
  
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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  const getUserName = () => {
    return user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-cyber border-b border-white/10 hover-lift">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full glass-card hover:bg-white/20 backdrop-blur-sm hover-lift"
            >
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-primary/30 hover-lift">
              <AvatarFallback className="gradient-primary text-white font-semibold text-lg">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="font-semibold text-foreground text-lg">{getUserName()}</h2>
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
            className="rounded-full glass-card hover:bg-white/20 backdrop-blur-sm text-xs hover-lift"
          >
            <Settings className="h-4 w-4 mr-1 text-secondary" />
            Settings
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSignOut}
            className="rounded-full bg-destructive/20 hover:bg-destructive/30 backdrop-blur-sm text-xs text-destructive hover-lift"
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