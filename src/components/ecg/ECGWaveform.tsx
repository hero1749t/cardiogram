import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';

interface ECGWaveformProps {
  isRecording: boolean;
  duration?: number;
  onBPMChange?: (bpm: number) => void;
  onHRVChange?: (hrv: number) => void;
}

export const ECGWaveform: React.FC<ECGWaveformProps> = ({
  isRecording,
  duration = 30,
  onBPMChange,
  onHRVChange
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dataRef = useRef<number[]>([]);
  const timeRef = useRef(0);
  const [currentBPM, setCurrentBPM] = useState(72);
  const [currentHRV, setCurrentHRV] = useState(42);

  // Generate realistic ECG data
  const generateECGSample = (time: number): number => {
    const heartRate = 70 + Math.sin(time * 0.01) * 10; // Variable heart rate
    const beatInterval = 60 / heartRate;
    const beatPhase = (time % beatInterval) / beatInterval;
    
    let amplitude = 0;
    
    // P wave (0.1-0.2)
    if (beatPhase >= 0.1 && beatPhase <= 0.2) {
      amplitude = 0.15 * Math.sin((beatPhase - 0.1) * Math.PI * 10);
    }
    // QRS complex (0.35-0.45)
    else if (beatPhase >= 0.35 && beatPhase <= 0.45) {
      const qrsPhase = (beatPhase - 0.35) * 10;
      if (qrsPhase < 0.3) {
        amplitude = -0.2 * Math.sin(qrsPhase * Math.PI * 3.33);
      } else if (qrsPhase < 0.7) {
        amplitude = 1.0 * Math.sin((qrsPhase - 0.3) * Math.PI * 2.5);
      } else {
        amplitude = -0.3 * Math.sin((qrsPhase - 0.7) * Math.PI * 3.33);
      }
    }
    // T wave (0.6-0.8)
    else if (beatPhase >= 0.6 && beatPhase <= 0.8) {
      amplitude = 0.3 * Math.sin((beatPhase - 0.6) * Math.PI * 5);
    }
    
    // Add some noise
    amplitude += (Math.random() - 0.5) * 0.02;
    
    return amplitude;
  };

  const drawECG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = 'hsl(218, 20%, 97%)';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = 'hsl(210, 15%, 85%)';
    ctx.lineWidth = 0.5;
    
    // Vertical lines
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw ECG waveform
    if (dataRef.current.length > 0) {
      ctx.strokeStyle = 'hsl(195, 84%, 45%)';
      ctx.lineWidth = 2;
      ctx.beginPath();

      const dataLength = dataRef.current.length;
      const startIndex = Math.max(0, dataLength - width);

      for (let i = 0; i < Math.min(dataLength, width); i++) {
        const dataIndex = startIndex + i;
        const y = centerY - (dataRef.current[dataIndex] * centerY * 0.8);
        
        if (i === 0) {
          ctx.moveTo(i, y);
        } else {
          ctx.lineTo(i, y);
        }
      }
      
      ctx.stroke();
    }

    // Draw center line
    ctx.strokeStyle = 'hsl(210, 15%, 75%)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
  };

  const animate = () => {
    if (!isRecording) return;

    timeRef.current += 0.016; // ~60fps
    const sample = generateECGSample(timeRef.current * 100);
    dataRef.current.push(sample);

    // Keep only last 1000 samples
    if (dataRef.current.length > 1000) {
      dataRef.current = dataRef.current.slice(-1000);
    }

    // Update BPM and HRV periodically
    if (Math.floor(timeRef.current * 60) % 60 === 0) {
      const newBPM = 65 + Math.floor(Math.random() * 20);
      const newHRV = 35 + Math.floor(Math.random() * 20);
      setCurrentBPM(newBPM);
      setCurrentHRV(newHRV);
      onBPMChange?.(newBPM);
      onHRVChange?.(newHRV);
    }

    drawECG();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRecording) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRecording]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    // Initial draw
    drawECG();
  }, []);

  return (
    <Card className="p-6 bg-ecg-background">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Live ECG Monitoring
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              BPM: <span className="text-lg font-bold text-primary">{currentBPM}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              HRV: <span className="text-lg font-bold text-accent">{currentHRV}</span>
            </div>
            {isRecording && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                <span className="text-sm text-destructive font-medium">Recording</span>
              </div>
            )}
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          className="w-full h-64 border border-border rounded-md"
          style={{ imageRendering: 'pixelated' }}
        />
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>25mm/s, 10mm/mV</span>
          <span>Lead II</span>
        </div>
      </div>
    </Card>
  );
};
