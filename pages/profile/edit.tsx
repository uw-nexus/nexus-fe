import React, { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box, Grid, Typography, IconButton, Button } from '@material-ui/core';
import { TextField, FormControl, InputLabel, Select } from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from 'components/ArrayForm';
import { FE_ADDR, BE_ADDR, vh, redirectPage, callApi } from 'utils';
import { FONT, COLORS } from 'public/static/styles/constants';
import { Student } from 'types';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    overflow: 'scroll',
  },
  heading: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  sections: {
    '& > *': {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
      marginBottom: theme.spacing(10),
    },
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  actionContainer: {
    height: vh(15),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTop: `1px solid ${COLORS.GRAY_DA}`,
  },
  btnText: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontSize: FONT.ACTION_BTN,
  },
}));

type PageProps = {
  initialProfile: Student;
  options: {
    degrees: string[];
    schools: string[];
    majors: string[];
    skills: string[];
    roles: string[];
    interests: string[];
  };
};

const EditProfilePage: NextPage<PageProps> = ({ initialProfile, options }) => {
  const classes = useStyles();

  const [student, setStudent] = useState(initialProfile);
  const [fail, setFail] = useState(false);

  const [skills, setSkills] = useState(student.skills);
  const [roles, setRoles] = useState(student.roles);
  const [interests, setInterests] = useState(student.interests);

  const handleStringData = (field, val): void => {
    setStudent({
      ...student,
      profile: {
        ...student.profile,
        [field]: val,
      },
    });
  };

  const handleArrayData = (field, items): void => {
    setStudent({
      ...student,
      [field]: items,
    });
  };

  const saveProfile = async (event): Promise<void> => {
    event.preventDefault();
    try {
      await fetch(`${BE_ADDR}/students`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(student),
      });

      sessionStorage.removeItem('profile');
      Router.push(`/profile`);
    } catch (error) {
      setFail(true);
      setTimeout((): void => setFail(false), 5000);
    }
  };

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%">
      <Container maxWidth="md" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <IconButton
              style={{ padding: 0, marginLeft: '-10px' }}
              onClick={(): void => {
                sessionStorage.removeItem('profile');
                Router.back();
              }}
            >
              <img src="/static/assets/back.svg" alt="back" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.container} maxWidth="md" disableGutters>
        <Box className={classes.sections}>
          <Box>
            <Typography className={classes.label}>{`About`}</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              id="bio"
              name="bio"
              fullWidth
              required
              multiline
              rows={10}
              inputProps={{
                maxLength: 5000,
              }}
              value={student.profile.bio}
              onChange={(e): void => handleStringData('bio', e.target.value)}
            />
          </Box>

          <Box>
            <Typography className={classes.label}>{`Education`}</Typography>
            <form>
              <Autocomplete
                freeSolo={true}
                value={student.profile.school}
                options={options.schools}
                onChange={(_, value): void => handleStringData('school', value)}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="normal"
                    label="School"
                    id="school"
                    fullWidth
                    onChange={(e): void => handleStringData('school', e.target.value)}
                  />
                )}
              />
              <FormControl variant="outlined" margin="normal" fullWidth>
                <InputLabel ref={inputLabel} htmlFor="degree">
                  Degree
                </InputLabel>
                <Select
                  native
                  value={student.profile.degree}
                  labelWidth={labelWidth}
                  inputProps={{ name: 'degree', id: 'degree' }}
                  onChange={(e): void => handleStringData('degree', e.target.value)}
                >
                  <option value="" />
                  {options.degrees.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Autocomplete
                freeSolo={true}
                value={student.profile.major1}
                options={options.majors}
                onChange={(_, value): void => handleStringData('major1', value)}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="normal"
                    label="Major 1"
                    id="major1"
                    fullWidth
                    onChange={(e): void => handleStringData('major1', e.target.value)}
                  />
                )}
              />
              <Autocomplete
                freeSolo={true}
                value={student.profile.major2}
                options={options.majors}
                onChange={(_, value): void => handleStringData('major2', value)}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    margin="normal"
                    label="Major 2"
                    id="major2"
                    fullWidth
                    onChange={(e): void => handleStringData('major2', e.target.value)}
                  />
                )}
              />
            </form>
          </Box>

          <Box>
            <Typography className={classes.label}>{`Skills`}</Typography>
            <ArrayForm
              label="Skills and Tools"
              items={skills}
              setItems={(items): void => {
                setSkills(items);
                handleArrayData('skills', items);
              }}
              options={options.skills}
            />
          </Box>

          <Box>
            <Typography className={classes.label}>{`Roles`}</Typography>
            <ArrayForm
              label="Roles"
              items={roles}
              setItems={(items): void => {
                setRoles(items);
                handleArrayData('roles', items);
              }}
              options={options.roles}
            />
          </Box>

          <Box>
            <Typography className={classes.label}>{`Interests`}</Typography>
            <ArrayForm
              label="Areas of Interests"
              items={interests}
              setItems={(items): void => {
                setInterests(items);
                handleArrayData('interests', items);
              }}
              options={options.interests}
            />
          </Box>

          <Box>
            <Typography className={classes.label}>{`Location`}</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              label="Postal"
              id="postal"
              name="postal"
              fullWidth
              value={student.profile.postal}
              onChange={(e): void => handleStringData('postal', e.target.value)}
            />
          </Box>

          <Box>
            <Typography className={classes.label}>{`Personal Links`}</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              label="Resume URL"
              id="resume"
              name="resume"
              fullWidth
              onChange={(e): void => handleStringData('resume', e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="LinkedIn URL"
              id="linkedin"
              name="linkedin"
              fullWidth
              onChange={(e): void => handleStringData('linkedin', e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Personal Website"
              id="website"
              name="website"
              fullWidth
              onChange={(e): void => handleStringData('website', e.target.value)}
            />
          </Box>
        </Box>
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="md" disableGutters>
          <Box paddingX="20%">
            {fail ? <Alert severity="error">{`Failed to update profile.`}</Alert> : null}
            <Button disableRipple onClick={saveProfile} fullWidth>
              <Typography className={classes.btnText}>{`Save and Exit`}</Typography>
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

EditProfilePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    let student: Student;

    if (typeof window !== 'undefined') {
      student = JSON.parse(sessionStorage.getItem('profile')) || student;
      sessionStorage.removeItem('profile');
    } else {
      student = await callApi(ctx, `${FE_ADDR}/api/profile`);
    }

    const options = await callApi(ctx, `${BE_ADDR}/options/students`);

    return {
      initialProfile: student,
      options,
    };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default EditProfilePage;
