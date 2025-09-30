import { SyntheticEvent, useState } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { NewEntry } from '../../types';
import { Alert } from '@mui/material';

type Props = {
  onCancel: () => void;
  onSubmitHealthCheckEntry: (entry: NewEntry) => Promise<void>;
  notification: string;
};

const addEntryBoxStyle = {
  border: '1px dotted black',
  padding: '1em',
  marginBottom: '1em',
  marginTop: '1em',
};

const healthCheckRatingOptions = [
  { value: 0, label: 'Healthy' },
  { value: 1, label: 'Low Risk' },
  { value: 2, label: 'High Risk' },
];

const diagnosisCodeOptions = [
  'M24.2',
  'M51.2',
  'S03.5',
  'J10.1',
  'J06.9',
  'Z57.1',
  'N30.0',
  'H54.7',
  'J03.0',
  'L60.1',
  'Z74.3',
  'L20',
  'F43.2',
  'S62.5',
  'H35.29',
];

const AddHealthCheckEntryForm = ({
  onCancel,
  onSubmitHealthCheckEntry,
  notification,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('dd-mm-yyyy');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    string[]
  >([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    onSubmitHealthCheckEntry({
      type: 'HealthCheck',
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating),
      diagnosisCodes: selectedDiagnosisCodes,
    } as NewEntry);
  };

  return (
    <div>
      {notification && <Alert style={{ marginTop: '1em' }} severity="error">{notification}</Alert>}
      <div style={addEntryBoxStyle}>
        <h4>New health check entry</h4>
        <form onSubmit={addEntry}>
          <div style={{ marginBottom: '1em' }}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <TextField
              style={{ marginTop: '1em' }}
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              style={{ marginTop: '1em' }}
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <InputLabel
              style={{ marginTop: '1em' }}
              id="healthCheckRating-label"
            >
              Health Check Rating
            </InputLabel>
            <Select
              labelId="healthCheckRating-label"
              value={healthCheckRating}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
              fullWidth
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>

            <InputLabel id="diagnosisCodes-label" style={{ marginTop: '1em' }}>
              Diagnosis Codes
            </InputLabel>
            <Select
              labelId="diagnosisCodes-label"
              multiple
              value={selectedDiagnosisCodes}
              onChange={(e) =>
                setSelectedDiagnosisCodes(e.target.value as string[])
              }
              fullWidth
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {diagnosisCodeOptions.map((code) => (
                <MenuItem key={code} value={code}>
                  <Checkbox
                    checked={selectedDiagnosisCodes.indexOf(code) > -1}
                  />
                  <ListItemText primary={code} />
                </MenuItem>
              ))}
            </Select>
          </div>

          <Grid
            container
            spacing={2}
            style={{ marginTop: '1em', justifyContent: 'space-between' }}
          >
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: 'left', marginBottom: '1em' }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: 'right',
                  marginBottom: '1em',
                }}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default AddHealthCheckEntryForm;
