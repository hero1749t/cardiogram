import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Calendar, 
  Download, 
  Share, 
  Search,
  Filter,
  Activity,
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@/components/layout/BottomNavigation";

interface ECGReport {
  id: string;
  date: string;
  time: string;
  type: "Quick ECG" | "Detailed ECG" | "Continuous Monitor";
  duration: string;
  avgBpm: number;
  status: "Normal" | "Abnormal" | "Review";
  flags: string[];
}

const Reports = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");

  const mockReports: ECGReport[] = [
    {
      id: "1",
      date: "2024-01-20",
      time: "14:30",
      type: "Quick ECG",
      duration: "30s",
      avgBpm: 72,
      status: "Normal",
      flags: []
    },
    {
      id: "2", 
      date: "2024-01-19",
      time: "09:15",
      type: "Detailed ECG",
      duration: "5m",
      avgBpm: 88,
      status: "Review",
      flags: ["Irregular rhythm"]
    },
    {
      id: "3",
      date: "2024-01-18",
      time: "16:45",
      type: "Quick ECG", 
      duration: "30s",
      avgBpm: 68,
      status: "Normal",
      flags: []
    },
    {
      id: "4",
      date: "2024-01-17",
      time: "11:20",
      type: "Continuous Monitor",
      duration: "15m",
      avgBpm: 95,
      status: "Abnormal",
      flags: ["High BPM", "Arrhythmia"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Normal": return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      case "Review": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "Abnormal": return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Normal": return <Activity className="h-3 w-3" />;
      case "Review": return <TrendingUp className="h-3 w-3" />;
      case "Abnormal": return <AlertTriangle className="h-3 w-3" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const filteredReports = mockReports.filter(report => {
    const matchesSearch = report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.date.includes(searchTerm) ||
                         report.status.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || report.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle pb-20">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold mb-2">ECG Reports</h1>
        <p className="text-muted-foreground text-sm">View and manage your test results</p>
      </div>

      <div className="px-6 space-y-6">
        {/* Search and Filter */}
        <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "Quick ECG" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("Quick ECG")}
              >
                Quick
              </Button>
              <Button
                variant={filterType === "Detailed ECG" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("Detailed ECG")}
              >
                Detailed
              </Button>
              <Button
                variant={filterType === "Continuous Monitor" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("Continuous Monitor")}
              >
                Continuous
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-border/50 bg-card/80 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{mockReports.length}</div>
              <div className="text-xs text-muted-foreground">Total Tests</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                {mockReports.filter(r => r.status === "Normal").length}
              </div>
              <div className="text-xs text-muted-foreground">Normal</div>
            </CardContent>
          </Card>
          <Card className="border-border/50 bg-card/80 text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-orange-600">
                {mockReports.filter(r => r.status !== "Normal").length}
              </div>
              <div className="text-xs text-muted-foreground">Flagged</div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <Card 
              key={report.id} 
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => navigate(`/report/${report.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{report.type}</h3>
                      <Badge className={getStatusColor(report.status)}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1">{report.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {report.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {report.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{report.avgBpm}</div>
                    <div className="text-xs text-muted-foreground">BPM</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <span>Duration: {report.duration}</span>
                    {report.flags.length > 0 && (
                      <div className="flex gap-1">
                        {report.flags.map((flag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {flag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle download
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle share
                      }}
                    >
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card className="border-border/50 bg-card/80">
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">No reports found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter"
                  : "Start an ECG test to see your results here"
                }
              </p>
              {!searchTerm && filterType === "all" && (
                <Button onClick={() => navigate("/ecg-test")}>
                  Start First Test
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Reports;