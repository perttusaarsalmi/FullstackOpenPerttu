import type { Diagnosis, HospitalEntry } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const HospitalEntry = (props: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  const { entry, diagnoses } = props;
  return (
    <div>
      <div>
        {entry.date} <LocalHospitalIcon></LocalHospitalIcon>
      </div>
      <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
      <div>diagnose by {entry.specialist}</div>
      <div>
        {entry.discharge.date} {entry.discharge.criteria}
      </div>
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

export default HospitalEntry;
