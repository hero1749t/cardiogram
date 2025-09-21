import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
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
                RR
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h2 className="font-semibold text-foreground">Reyji Rizki</h2>
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
            className="rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-xs"
          >
            <LogIn className="h-4 w-4 mr-1" />
            Sign In
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full bg-primary/20 hover:bg-primary/30 backdrop-blur-sm text-xs text-primary"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;