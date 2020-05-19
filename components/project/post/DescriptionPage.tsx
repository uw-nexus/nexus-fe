import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
    overflow: 'scroll',
  },
  text: {
    fontSize: FONT.GUIDE,
    color: theme.palette.text.secondary,
  },
  title: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default ({ project, handleChange }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {`I included overall project idea, information of my team, and anything unique about my project.`}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>
          <span style={{ fontWeight: 'bold' }}>{`Project Description`}</span>
          <span style={{ color: COLORS.GRAY_BB }}>{` (max 5000 characters)`}</span>
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          id="description"
          name="description"
          fullWidth
          required
          multiline
          rows={15}
          inputProps={{
            maxLength: 5000,
          }}
          value={project.details.description}
          onChange={handleChange('description')}
        />
      </Box>
    </Box>
  );
};
