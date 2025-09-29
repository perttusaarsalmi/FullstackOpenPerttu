import { v1 as uuid } from 'uuid';
import {
  Entry,
  NewEntry,
  NewPatientEntry,
  NonSensitivePatientEntry,
  Patient,
} from '../types';
import patientsData from './../data/patients';

const patients = patientsData as unknown as Patient[];

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (props: { id: string }): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === props.id);
  if (!patient) return undefined;
  return { ...patient };
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry: Patient = { id, ...entry, entries: [] };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const patient = getPatient({ id });
  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getPatient,
  addPatient,
  addEntry,
};
