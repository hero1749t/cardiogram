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
    <header className="sticky top-0 z-50 w-full glass-cyber border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full glass-card hover:bg-white/20 backdrop-blur-sm hover-lift h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4 text-primary" />
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 ring-1 ring-primary/30">
              <AvatarFallback className="gradient-primary text-white font-semibold text-sm">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            
            <div className="hidden sm:block">
              <h2 className="font-medium text-foreground text-sm">{getUserName()}</h2>
              <p className="text-xs text-muted-foreground">
                {currentDate} • {currentTime}
              </p>
            </div>
            
            {/* Mobile: Show only date/time */}
            <div className="block sm:hidden">
              <p className="text-xs text-muted-foreground">
                {currentTime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {/* Desktop buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/profile")}
              className="rounded-full glass-card hover:bg-white/20 backdrop-blur-sm text-xs hover-lift h-8"
            >
              <Settings className="h-3 w-3 mr-1 text-secondary" />
              Settings
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSignOut}
              className="rounded-full bg-destructive/20 hover:bg-destructive/30 backdrop-blur-sm text-xs text-destructive hover-lift h-8"
            >
              <LogOut className="h-3 w-3 mr-1" />
              Sign Out
            </Button>
          </div>
          
          {/* Mobile: Icon-only buttons */}
          <div className="flex sm:hidden items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate("/profile")}
              className="rounded-full glass-card hover:bg-white/20 backdrop-blur-sm hover-lift h-8 w-8"
            >
              <Settings className="h-4 w-4 text-secondary" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleSignOut}
              className="rounded-full bg-destructive/20 hover:bg-destructive/30 backdrop-blur-sm text-destructive hover-lift h-8 w-8"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;