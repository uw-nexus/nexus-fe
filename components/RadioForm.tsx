import React from 'react';
import { Box, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  label: {
    marginLeft: 0,
    color: COLORS.GRAY_75,
    '& *': {
      fontSize: FONT.MISC,
    },
  },
  radioBtn: {
    paddingLeft: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'transparent !important',
    },
  },
}));

const StyledRadio = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <Radio
      className={classes.radioBtn}
      disableRipple
      color="primary"
      checkedIcon={<img src="/static/assets/radio_checked.svg" alt="checked" />}
      icon={<img src="/static/assets/radio_unchecked.svg" alt="unchecked" />}
      {...props}
    />
  );
};

export default ({ value, setValue, choices }): JSX.Element => {
  const classes = useStyles();
  const radios = choices.map((c) => (
    <FormControlLabel key={c} value={c} control={<StyledRadio />} label={c} className={classes.label} />
  ));

  return (
    <Box marginTop=".25rem" marginBottom="1rem">
      <FormControl component="fieldset">
        <RadioGroup value={value} onChange={(e): void => setValue(e.target.value)}>
          {radios}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
