import React, { useState } from 'react';
import { TextField, Chip } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

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
  const [itemEntry, setItemEntry] = useState('');
  const [focus, setFocus] = useState(false);

  const handleItemEntry = async (event): Promise<void> => {
    event.preventDefault();
    const add = itemEntry
      .split(',')
      .slice(0, limit - items.length)
      .map((i) => i.trim());

    items = [...items, ...add];
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
            id="skills-autosuggest"
            options={options}
            onChange={(_, value): void => setItemEntry(value)}
            value={itemEntry}
            renderInput={(params): JSX.Element => (
              <TextField
                {...params}
                label={focus ? '' : label}
                variant="outlined"
                onFocus={(): void => setFocus(true)}
                onBlur={(): void => setFocus(itemEntry !== null && itemEntry.length > 0)}
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
