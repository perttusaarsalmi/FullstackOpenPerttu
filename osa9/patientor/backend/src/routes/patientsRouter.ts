import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService';
import newEntrySchema from '../utils/newEntrySchema';
import { Entry, NewEntry, NewPatientEntry, Patient } from '../types';
import { parseNewPatientEntry } from '../utils/newPatientEntrySchema';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient({ id: req.params.id });
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.message });
  } else {
    next(error);
  }
};

router.post(
  '/',
  newPatientParser,
  (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patient>) => {
    const addedEntry = patientService.addPatient(req.body);
    res.json(addedEntry);
  }
);

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    parseNewPatientEntry(req.body); // validates and throws if invalid
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  '/:id/entries',
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | { error: string }>
  ) => {
    const addedEntry = patientService.addEntry(req.params.id, req.body);
    if (!addedEntry) {
      return res.status(404).send({ error: 'Patient not found' });
    }
    return res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
