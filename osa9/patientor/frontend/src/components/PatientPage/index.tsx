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

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [showForm, setShowForm] = useState(false);

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

  const handleAddHealthCheckEntry = async (newEntry: NewEntry) => {
    if (!id) return;
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
    setShowForm(false);
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
      {showForm && (
        <AddHealthCheckEntryForm
          onCancel={() => setShowForm(false)}
          onSubmitHealthCheckEntry={handleAddHealthCheckEntry}
        />
      )}
      <h3>entries</h3>
      {patient?.entries.map((entry) => (
        <div key={entry.id} style={{ marginBottom: '1em' }}>
          <EntryDetails entry={entry} diagnoses={diagnoses}></EntryDetails>
        </div>
      ))}
      {!showForm && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
          style={{ marginTop: '1em' }}
        >
          Add Health Check Entry
        </Button>
      )}
    </div>
  );
};

export default PatientPage;
