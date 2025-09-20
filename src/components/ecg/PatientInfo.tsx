import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Calendar, Heart, Activity } from 'lucide-react';

interface PatientInfoProps {
  name: string;
  age: number;
  gender: string;
  medicalHistory?: {
    conditions: string[];
    medications: string[];
  };
  lastTest?: Date;
}

export const PatientInfo: React.FC<PatientInfoProps> = ({
  name,
  age,
  gender,
  medicalHistory,
  lastTest
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {age} years old • {gender}
            </p>
          </div>
        </div>

        {lastTest && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Last test: {lastTest.toLocaleDateString()}</span>
          </div>
        )}

        {medicalHistory && (
          <div className="space-y-3">
            {medicalHistory.conditions.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-4 h-4 text-destructive" />
                  <span className="text-sm font-medium text-foreground">
                    Medical Conditions
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {medicalHistory.conditions.map((condition, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {medicalHistory.medications.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    Current Medications
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {medicalHistory.medications.map((medication, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {medication}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};