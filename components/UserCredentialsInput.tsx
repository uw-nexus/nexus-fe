import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

export default ({ setUsername, setPassword }): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        id="email"
        name="email"
        label="Email Address"
        autoComplete="email"
        required
        fullWidth
        autoFocus
        onChange={(e): void => setUsername(e.target.value)}
      />

      <TextField
        variant="outlined"
        margin="normal"
        name="password"
        id="password"
        label="Password"
        autoComplete="curent-password"
        required
        fullWidth
        type={showPassword ? 'text' : 'password'}
        onChange={(e): void => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={(): void => setShowPassword(!showPassword)}
                onMouseDown={(e): void => e.preventDefault()}
                style={{ padding: '.25rem' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};
