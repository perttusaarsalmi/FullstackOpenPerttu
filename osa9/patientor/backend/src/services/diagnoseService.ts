import { Diagnose } from '../types';
import diagnosesData from './../data/diagnoses';

const diagnoses: Diagnose[] = diagnosesData;


const getEntries = (): Diagnose[] => {
    return diagnoses;

};

const addDiagnose = () => {
  return null;
};

export default {
  getEntries,
  addDiagnose
};