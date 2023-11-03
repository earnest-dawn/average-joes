import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox() {
    const names = [
        { label: 'The Shawshank Redemption', price: 1994, ingredients: '' },
        { label: 'The Godfather', price: 1972, ingredients: '' },
        { label: 'The Godfather: Part II', price: 1974, ingredients: '' },
        { label: 'The Dark Knight', price: 2008, ingredients: '' },
        { label: '12 Angry Men', price: 1957, ingredients: '' },
        { label: "Schindler's List", price: 1993, ingredients: '' },
        { label: 'Pulp Fiction', price: 1994, ingredients: '' },
    ];
    return (
        <Autocomplete
            multiple
            disablePortal
            id="combo-box-demo"
            options={names}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Burgers"
                />
            )}
        />
    );
}
