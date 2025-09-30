import { useState, useEffect } from 'react';
import { Diagnosis, NewEntry, Patient } from '../../types';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnoses';
import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryDetails from '../EntryDetailsComponent';
import AddHealthCheckEntryForm from '../AddHealthCheckEntryForm';
import { Button } from '@mui/material';
import { AxiosError } from 'axios';
import OccupationalHealthcareEntry from '../EntryDetailsComponent/OccupationalHealthCareEntry';
import AddOcupationalHealthCareEntryForm from '../AddOccupationalHealthCareEntryForm';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [showHealthCheckEntryForm, setShowHealthCheckEntryForm] =
    useState(false);
  const [
    showOccupationalHealthCareEntryForm,
    setShowOccupationalHealthCareEntryForm,
  ] = useState(false);

  const [notification, setNotification] = useState('');

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

  const handleAddEntry = async (newEntry: NewEntry) => {
    if (!id) return;
    try {
      const addedEntry = await patientService.createPatientEntry({
        id,
        object: newEntry,
      });
      if (patient) {
        setPatient({
          ...patient,
          entries: [...patient.entries, addedEntry],
        });
      }
      setShowHealthCheckEntryForm(false);
      setShowOccupationalHealthCareEntryForm(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const data = error.response?.data;
        if (
          typeof data === 'object' &&
          data !== null &&
          'error' in data &&
          typeof data.error === 'string'
        ) {
          if (data.error.includes('Description is required')) {
            showNotification('Description is required');
          } else if (data.error.includes('Specialist is required')) {
            showNotification('Specialist is required');
          } else if (data.error.includes('Invalid date')) {
            showNotification('Invalid date');
          } else {
            showNotification(data.error);
          }
        } else {
          showNotification(error.message);
        }
      } else {
        showNotification(
          'Unknown error happened when creating a new patient entry'
        );
      }
    }
  };

  const showNotification = (notificationText: string) => {
    setNotification(notificationText);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  return (
    <div>
      <h2>
        {patient?.name}
        {patient?.gender === 'male' && <MaleIcon />}
        {patient?.gender === 'female' && <FemaleIcon />}
      </h2>
      <div>ssh: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      {showHealthCheckEntryForm && (
        <AddHealthCheckEntryForm
          onCancel={() => setShowHealthCheckEntryForm(false)}
          onSubmitHealthCheckEntry={handleAddEntry}
          notification={notification}
        />
      )}
      {showOccupationalHealthCareEntryForm && (
        <AddOcupationalHealthCareEntryForm
          onCancel={() => setShowOccupationalHealthCareEntryForm(false)}
          onSubmitOccupationalHealthCareEntry={
            handleAddEntry
          }
          notification={notification}
        />
      )}
      <h3>entries</h3>
      {patient?.entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '1em' }}>
          <EntryDetails entry={entry} diagnoses={diagnoses}></EntryDetails>
        </div>
      ))}
      {!showHealthCheckEntryForm && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowHealthCheckEntryForm(true)}
          style={{ marginTop: '1em' }}
        >
          Add Health Check Entry
        </Button>
      )}
      {!showOccupationalHealthCareEntryForm && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowOccupationalHealthCareEntryForm(true)}
          style={{ marginTop: '1em', marginLeft: '1em' }}
        >
          Add Occupational Health Care Entry
        </Button>
      )}
    </div>
  );
};

export default PatientPage;
