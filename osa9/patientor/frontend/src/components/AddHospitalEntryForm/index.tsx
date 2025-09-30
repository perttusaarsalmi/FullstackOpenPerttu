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
import { diagnosisCodes } from '../../utils';
import { Alert } from '@mui/material';

type Props = {
  onCancel: () => void;
  onSubmitHospitalEntry: (entry: NewEntry) => Promise<void>;
  notification: string;
};

const addEntryBoxStyle = {
  border: '1px dotted black',
  padding: '1em',
  marginBottom: '1em',
  marginTop: '1em',
};

const diagnosisCodeOptions: string[] = diagnosisCodes();

const AddHospitalEntryForm = ({
  onCancel,
  onSubmitHospitalEntry,
  notification,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('dd-mm-yyyy');
  const [specialist, setSpecialist] = useState('');
  const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
    string[]
  >([]);
  const [discharge, setDischarge] = useState<{
    date: string;
    criteria: string;
  }>({
    date: '',
    criteria: '',
  });
  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    if (!description) {
      alert('Descriptionis required.');
      return;
    }

    if (!specialist) {
      alert('Specialist is required.');
      return;
    }

    if (!discharge.date || !discharge.criteria) {
      alert('Discharge date and criteria are required.');
      return;
    }

    onSubmitHospitalEntry({
      type: 'Hospital',
      description,
      date,
      specialist,
      diagnosisCodes: selectedDiagnosisCodes,
      discharge: discharge.date && discharge.criteria ? discharge : undefined,
    } as NewEntry);
  };

  return (
    <div>
      {notification && (
        <Alert style={{ marginTop: '1em' }} severity="error">
          {notification}
        </Alert>
      )}
      <div style={addEntryBoxStyle}>
        <h3>New occupational health care entry</h3>
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
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              value={discharge?.date}
              onChange={(e) =>
                setDischarge({ ...discharge, date: e.target.value })
              }
              InputLabelProps={{ shrink: true }}
              style={{ marginTop: '1em' }}
            />
            <TextField
              style={{ marginTop: '1em' }}
              label="Discharge criteria"
              fullWidth
              value={discharge?.criteria}
              onChange={(e) =>
                setDischarge({ ...discharge, criteria: e.target.value })
              }
            />
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

export default AddHospitalEntryForm;
