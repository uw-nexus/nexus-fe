import React, { useState } from 'react';
import { TextField, Chip, InputAdornment, Button } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  addButton: {
    marginRight: '-.2rem',
    boxShadow: 'none',
  },
}));

export const ChipGrid = ({ items, allowEdit = false, handleItemDelete = null }): JSX.Element => (
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

export default ({ label = '', items, setItems, allowEdit = true, options, limit = 80 }): JSX.Element => {
  const classes = useStyles();
  const [itemEntry, setItemEntry] = useState('');
  const [focus, setFocus] = useState(false);

  const handleItemEntry = (event): void => {
    event.preventDefault();
    if (!itemEntry || !itemEntry.length) return;

    const add = itemEntry
      .split(',')
      .slice(0, limit - items.length)
      .map((i) => i.trim());

    items = [...items, ...add].filter(Boolean);
    setItems(items.filter((i, index) => items.indexOf(i) === index));
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
          <Autocomplete
            id={`${label.replace(/ /g, '')}-entry`}
            options={options}
            freeSolo={true}
            value={itemEntry}
            onChange={(_, value): void => setItemEntry(value)}
            renderInput={(params): JSX.Element => (
              <TextField
                {...params}
                label={focus ? '' : label}
                variant="outlined"
                onFocus={(): void => setFocus(true)}
                onBlur={(): void => setFocus(itemEntry !== null && itemEntry.length > 0)}
                onChange={(event): void => setItemEntry(event.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: focus ? (
                    <InputAdornment position="end">
                      <Button
                        style={{ marginRight: '-1.5rem' }}
                        onClick={handleItemEntry}
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
            )}
          />
        ) : null}

        <Box marginTop="1rem">
          <ChipGrid items={items} allowEdit={allowEdit} handleItemDelete={handleItemDelete} />
        </Box>
      </form>
    </Box>
  );
};
