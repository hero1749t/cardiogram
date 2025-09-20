import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Activity, Clock, TrendingUp, AlertTriangle } from 'lucide-react';

interface MetricsPanelProps {
  bpm: number;
  hrv: number;
  duration: number;
  rhythm: 'Normal' | 'Irregular' | 'Alert';
  alerts?: string[];
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  bpm,
  hrv,
  duration,
  rhythm,
  alerts = []
}) => {
  const getBPMStatus = (bpm: number) => {
    if (bpm < 50) return { status: 'Low', color: 'destructive' };
    if (bpm > 120) return { status: 'High', color: 'warning' };
    return { status: 'Normal', color: 'default' };
  };

  const getHRVStatus = (hrv: number) => {
    if (hrv < 30) return { status: 'Low', color: 'warning' };
    if (hrv > 60) return { status: 'Excellent', color: 'default' };
    return { status: 'Good', color: 'default' };
  };

  const getRhythmColor = (rhythm: string) => {
    switch (rhythm) {
      case 'Normal': return 'default';
      case 'Irregular': return 'secondary';
      case 'Alert': return 'destructive';
      default: return 'default';
    }
  };

  const bpmStatus = getBPMStatus(bpm);
  const hrvStatus = getHRVStatus(hrv);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-destructive" />
            <span className="text-sm font-medium text-foreground">BPM</span>
          </div>
          <Badge variant={bpmStatus.color as any} className="text-xs">
            {bpmStatus.status}
          </Badge>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-foreground">{bpm}</div>
          <div className="text-xs text-muted-foreground">beats per minute</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-foreground">HRV</span>
          </div>
          <Badge variant={hrvStatus.color as any} className="text-xs">
            {hrvStatus.status}
          </Badge>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-foreground">{hrv}</div>
          <div className="text-xs text-muted-foreground">milliseconds</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Duration</span>
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-foreground">
            {Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}
          </div>
          <div className="text-xs text-muted-foreground">minutes:seconds</div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">Rhythm</span>
          </div>
          <Badge variant={getRhythmColor(rhythm) as any} className="text-xs">
            {rhythm}
          </Badge>
        </div>
        <div className="mt-2">
          <div className="text-sm text-foreground font-medium">
            {rhythm === 'Normal' ? 'Sinus Rhythm' : 
             rhythm === 'Irregular' ? 'Irregular Pattern' : 
             'Abnormal Detected'}
          </div>
          <div className="text-xs text-muted-foreground">rhythm analysis</div>
        </div>
      </Card>

      {alerts.length > 0 && (
        <Card className="p-4 md:col-span-2 lg:col-span-4 border-destructive/20 bg-destructive/5">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
            <div className="space-y-2">
              <span className="text-sm font-medium text-destructive">Active Alerts</span>
              <div className="space-y-1">
                {alerts.map((alert, index) => (
                  <div key={index} className="text-sm text-foreground">
                    • {alert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};