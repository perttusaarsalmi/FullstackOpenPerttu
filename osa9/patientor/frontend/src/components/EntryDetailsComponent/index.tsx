import { Diagnosis, Entry } from '../../types';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthCareEntry';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const entryBoxStyle = {
  border: '1px solid black',
  borderRadius: '8px',
  padding: '1em',
  marginBottom: '1em',
};

const EntryDetails: React.FC<{
  entry: Entry;
  diagnoses: Diagnosis[] | undefined;
}> = ({ entry, diagnoses }) => {
  switch (entry.type) {
    case 'Hospital':
      return <div style={entryBoxStyle}><HospitalEntry entry={entry} diagnoses={diagnoses}></HospitalEntry></div>;
    case 'OccupationalHealthcare':
      return (
        <div style={entryBoxStyle}>
          <OccupationalHealthcareEntry
            entry={entry} diagnoses={diagnoses}
          />
        </div>
      );
    case 'HealthCheck':
      return <div style={entryBoxStyle}><HealthCheckEntry entry={entry} diagnoses={diagnoses}></HealthCheckEntry></div>;
    default:
      return assertNever(entry);
  }
};
export default EntryDetails;
