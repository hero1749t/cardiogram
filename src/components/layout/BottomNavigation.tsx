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
    <div className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/20 z-50">
      <div className="flex items-center justify-around px-4 py-3 max-w-md mx-auto">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? "gradient-primary text-white shadow-glow scale-105" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/10"
              }`}
            >
              <Icon size={20} className={isActive ? "drop-shadow-sm" : ""} />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;