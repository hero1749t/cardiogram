import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Activity, 
  Users, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const recentSessions = [
    {
      id: 1,
      patient: "Sarah Johnson",
      date: new Date(2024, 0, 20),
      duration: "5:23",
      avgBPM: 78,
      status: "Normal"
    },
    {
      id: 2,
      patient: "Michael Chen",
      date: new Date(2024, 0, 19),
      duration: "2:45",
      avgBPM: 142,
      status: "Alert"
    },
    {
      id: 3,
      patient: "Emma Davis",
      date: new Date(2024, 0, 18),
      duration: "3:12",
      avgBPM: 65,
      status: "Normal"
    }
  ];

  const alerts = [
    {
      id: 1,
      message: "High BPM detected in Michael Chen's session",
      time: "2 hours ago",
      priority: "high"
    },
    {
      id: 2,
      message: "Device battery low - Room 204",
      time: "4 hours ago",
      priority: "medium"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">ECG Dashboard</h1>
          <p className="text-muted-foreground">Monitor patient cardiac health in real-time</p>
        </div>
        <Button onClick={() => navigate('/ecg')} className="bg-primary hover:bg-primary-dark">
          <Heart className="w-4 h-4 mr-2" />
          New ECG Test
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Tests</p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <Activity className="w-8 h-8 text-primary" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-accent mr-1" />
            <span className="text-accent">+15%</span>
            <span className="text-muted-foreground ml-1">vs yesterday</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Patients</p>
              <p className="text-2xl font-bold text-foreground">48</p>
            </div>
            <Users className="w-8 h-8 text-accent" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-muted-foreground">3 new this week</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Session Time</p>
              <p className="text-2xl font-bold text-foreground">4:32</p>
            </div>
            <Clock className="w-8 h-8 text-primary" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-muted-foreground">minutes</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Alerts</p>
              <p className="text-2xl font-bold text-destructive">2</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-muted-foreground">Requires attention</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sessions */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent ECG Sessions</h3>
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              View All
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{session.patient}</p>
                    <p className="text-sm text-muted-foreground">
                      {session.date.toLocaleDateString()} • {session.duration}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{session.avgBPM} BPM</p>
                    <p className="text-xs text-muted-foreground">avg heart rate</p>
                  </div>
                  <Badge 
                    variant={session.status === 'Normal' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {session.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts Panel */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Alerts</h3>
          
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4">
            View All Alerts
          </Button>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => navigate('/ecg')}
          >
            <Activity className="w-6 h-6" />
            Start New Test
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => navigate('/patients')}
          >
            <Users className="w-6 h-6" />
            Manage Patients
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex-col gap-2"
            onClick={() => navigate('/reports')}
          >
            <Calendar className="w-6 h-6" />
            View Reports
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;