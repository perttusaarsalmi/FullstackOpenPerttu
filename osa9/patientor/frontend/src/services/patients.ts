import axios from 'axios';
import { Entry, NewEntry, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getPatient = async (props: { id: string }): Promise<Patient> => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${props.id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createPatientEntry = async (props: { id: string; object: NewEntry }): Promise<Entry> => {
  const { id, object } = props;
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, object);
  return data;
};

export default {
  getAll,
  getPatient,
  create,
  createPatientEntry
};
