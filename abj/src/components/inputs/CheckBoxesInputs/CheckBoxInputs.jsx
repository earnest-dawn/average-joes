import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { red, teal } from '@mui/material/colors';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CheckboxLabels() {
    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        defaultChecked
                        sx={{
                            color: teal[800],
                            '&.Mui-checked': {
                                color: teal[600],
                            },
                        }}
                    />
                }
                label="Label"
            />
            <FormControlLabel
                required
                control={
                    <Checkbox
                        required
                        sx={{
                            color: teal[800],
                            '&.Mui-checked': {
                                color: teal[600],
                            },
                        }}
                    />
                }
                label="Required"
            />
            <FormControlLabel
                disabled
                control={
                    <Checkbox
                        sx={{
                            color: red[800],
                            '&.Mui-checked': {
                                color: red[600],
                            },
                        }}
                    />
                }
                label="Disabled"
            />
        </FormGroup>
    );
}
