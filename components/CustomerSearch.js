import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function CustomerSearch() {
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      align = "center"
      spacing = {1}
    >
      <TextField id="standard-basic" variant="outlined" margin="normal" fullWidth />
    </Box>
  );
}