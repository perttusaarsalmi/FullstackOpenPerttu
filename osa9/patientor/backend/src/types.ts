import { z } from 'zod';
import newEntrySchema from './utils/newEntrySchema';
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}


export type NewPatientEntry = z.infer<typeof newEntrySchema>; 
export interface Patient extends NewPatientEntry {
  id: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;