import { v1 as uuid } from 'uuid';
import { NewPatientEntry, NonSensitivePatientEntry, Patient } from '../types';
import patientsData from './../data/patients';

const patients = patientsData as Patient[];

const getEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry: Patient = { id, ...entry };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getEntries,
  addPatient,
};
