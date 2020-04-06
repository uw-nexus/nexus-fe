import React, { useState } from 'react';
import { Button, TextField, Chip } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '100%',
    margin: 0
  },
  
  addButton: {
    minWidth: '100%',
    minHeight: '100%'
  }
}));

export default ({ label = null, items, setItems, allowEdit = true }) => {
  const classes = useStyles();
  
  const [itemEntry, setItemEntry] = useState('');

  const handleItemEntry = async (event) => {
    event.preventDefault();
    setItems(!itemEntry.length || items.includes(itemEntry) ? items : [...items, itemEntry]);
    setItemEntry('');
  }

  const handleItemDelete = itemToDelete => () => {
    setItems(items.filter(s => s !== itemToDelete));
  };

  return (
    <Box marginY='.5rem'>
      <form noValidate onSubmit={handleItemEntry}>
        <Grid container spacing={2} className={classes.wrapper}>
          { allowEdit
            ? <>
                <Grid item xs={10}>
                  <TextField
                    variant='outlined'size='small'
                    fullWidth label={label} value={itemEntry}
                    onChange={e => setItemEntry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    type='submit' variant='contained'
                    color='primary' aria-label='Add Item'
                    className={classes.addButton}>+</Button>
                </Grid>
              </>
            : null
          }

          <Grid container item
            xs={12} spacing={1} 
            justify={items.length ? 'flex-start' : 'center'}
            alignItems={items.length ? 'flex-start' : 'center'}
            >
            {items.length ? null : <p style={{ color: 'grey' }}>None</p>}
            {items.map(s => 
              <Grid item key={s}>
                <Chip label={s} onDelete={allowEdit ? handleItemDelete(s) : null} color='primary' />
              </Grid>)}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
