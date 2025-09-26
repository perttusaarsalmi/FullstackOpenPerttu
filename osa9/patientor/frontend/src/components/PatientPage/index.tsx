import { useState, useEffect } from 'react';
import { Patient } from '../../types';
import patientService from '../../services/patients';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();

  useEffect(() => {
    if (id) {
      patientService.getPatient({ id }).then((patient) => {
        setPatient(patient);
      });
    }
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
    </div>
  );
};

export default PatientPage;
