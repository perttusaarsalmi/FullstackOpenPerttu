import type { Diagnosis, HealthCheckEntry } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntry = (props: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[] | undefined;
}) => {
  const { entry, diagnoses } = props;
  return (
    <div>
      <div>
        {entry.date} <MedicalServicesIcon></MedicalServicesIcon>
      </div>
      <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
      {typeof entry.healthCheckRating === 'number' && (
        <div>
          <FavoriteIcon
            style={{ color: getIconColor(entry.healthCheckRating) }}
          />
        </div>
      )}{' '}
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

const getIconColor = (rating: number) => {
  switch (rating) {
    case 0:
      return 'green';
    case 1:
      return 'yellow';
    case 2:
      return 'red';
    default:
      return 'grey';
  }
};

export default HealthCheckEntry;
