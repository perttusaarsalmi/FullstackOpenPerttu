import { useState, useEffect } from 'react';
import { Diagnosis, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    if (id) {
      patientService.getPatient({ id }).then((patient) => {
        setPatient(patient);
      });
    }
  }, [id]);

  useEffect(() => {
    diagnosisService.getAll().then((diagnoses) => {
      setDiagnoses(diagnoses);
    });
  }, [id]);

  return (
    <div>
      <h2>
        {patient?.name}
        {patient?.gender === 'male' && <MaleIcon />}
        {patient?.gender === 'female' && <FemaleIcon />}
      </h2>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <h3>entries</h3>
      {patient?.entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '1em' }}>
          {'sickLeave' in entry && entry.sickLeave?.startDate && (
            <div style={{ fontStyle: 'italic' }}>
              {entry.sickLeave.startDate} {entry.description}
            </div>
          )}
          {/* Diagnosis codes */}
          {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code}{' '}
                  {diagnoses?.find((diagnosis) => diagnosis.code === code)?.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
