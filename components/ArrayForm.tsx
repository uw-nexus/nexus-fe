import React, { useState } from 'react';
import { Button, TextField, Chip, InputAdornment } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  addButton: {
    marginRight: '-.2rem',
    boxShadow: 'none',
  },
}));

export const ChipGrid = ({ items, allowEdit, handleItemDelete }): JSX.Element => (
  <Grid
    container
    spacing={1}
    justify={items.length ? 'flex-start' : 'center'}
    alignItems={items.length ? 'flex-start' : 'center'}
  >
    {items.map((s) => (
      <Grid item key={s}>
        <Chip label={s} onDelete={allowEdit ? handleItemDelete(s) : null} color="primary" />
      </Grid>
    ))}
  </Grid>
);

export default ({ label = '', items, setItems, allowEdit = true }): JSX.Element => {
  const classes = useStyles();
  const [itemEntry, setItemEntry] = useState('');
  const [focus, setFocus] = useState(false);

  const handleItemEntry = async (event): Promise<void> => {
    event.preventDefault();
    const add = itemEntry.split(',').map((i) => i.trim());
    setItems([...new Set([...items, ...add])]);
    setItemEntry('');
    setFocus(document.activeElement === document.getElementById(`${label.replace(/ /g, '')}-entry`));
  };

  const handleItemDelete = (itemToDelete) => (): void => {
    setItems(items.filter((s) => s !== itemToDelete));
  };

  return (
    <Box marginY="1rem">
      <form noValidate onSubmit={handleItemEntry}>
        {allowEdit ? (
          <TextField
            variant="outlined"
            id={`${label.replace(/ /g, '')}-entry`}
            fullWidth
            label={focus ? '' : label}
            value={itemEntry}
            onChange={(e): void => setItemEntry(e.target.value)}
            onFocus={(): void => setFocus(true)}
            onBlur={(): void => setFocus(itemEntry.length > 0)}
            InputProps={{
              endAdornment: focus ? (
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    aria-label="Add Item"
                    className={classes.addButton}
                  >
                    Enter
                  </Button>
                </InputAdornment>
              ) : null,
            }}
          />
        ) : null}

        <Box marginTop="1rem">
          <ChipGrid items={items} allowEdit={allowEdit} handleItemDelete={handleItemDelete} />
        </Box>
      </form>
    </Box>
  );
};
