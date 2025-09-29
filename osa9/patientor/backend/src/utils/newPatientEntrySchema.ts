import { z } from 'zod';
import { HealthCheckRating, Diagnose } from '../types';

const baseEntrySchema = z.object({
  description: z.string().min(1, 'Description is required'),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: 'Invalid date',
  }),
  specialist: z.string().min(1, 'Specialist is required'),
  diagnosisCodes: z.array(z.string()).optional(),
});

const hospitalEntrySchema = baseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: z.object({
    date: z.string().refine((d) => !isNaN(Date.parse(d)), {
      message: 'Invalid discharge date',
    }),
    criteria: z.string().min(1, 'Discharge criteria required'),
  }),
});

const occupationalHealthcareEntrySchema = baseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string().min(1, 'Employer name is required'),
  sickLeave: z
    .object({
      startDate: z.string(),
      endDate: z.string(),
    })
    .optional(),
});

const healthCheckEntrySchema = baseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: z.nativeEnum(HealthCheckRating),
});

export const newPatientEntrySchema = z.union([
  hospitalEntrySchema,
  occupationalHealthcareEntrySchema,
  healthCheckEntrySchema,
]);

export const parseDiagnosisCodes = (
  object: unknown
): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnose['code']>;
  }

  return object.diagnosisCodes as Array<Diagnose['code']>;
};

export const parseNewPatientEntry = (object: unknown): NewEntry => {
  return newPatientEntrySchema.parse(object);
};

export type NewEntry = z.infer<typeof newPatientEntrySchema>;
