import type { Diagnosis, OccupationalHealthcareEntry } from '../../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry = (props: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  const { entry, diagnoses } = props;
  return (
    <div>
      <div>
        {entry.date} <WorkIcon></WorkIcon>{' '}
        <span style={{ fontStyle: 'italic' }}>{entry.employerName}</span>
      </div>
      <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
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
  );
};

export default OccupationalHealthcareEntry;
