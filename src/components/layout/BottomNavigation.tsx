import { Home, Activity, FileText, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Activity, label: "ECG Test", path: "/ecg-test" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-cyber border-t border-white/30 z-50">
      <div className="flex items-center justify-around px-6 py-4 max-w-lg mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path || (path === "/" && location.pathname === "/dashboard");
          
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-4 rounded-3xl transition-all duration-500 hover-lift ${
                isActive 
                  ? "gradient-primary text-white neon-glow scale-110" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10 hover:scale-105"
              }`}
            >
              <Icon size={24} className={isActive ? "drop-shadow-lg animate-pulse" : ""} />
              <span className={`text-xs mt-2 font-semibold ${isActive ? "text-white" : ""}`}>
                {label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-white rounded-full mt-1 animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;