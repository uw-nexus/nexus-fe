/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import Router from 'next/router';
import { Container, Box, Grid, Typography, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import ProjectContent from 'components/project/ProjectContent';
import MainButton from 'components/MainButton';
import { FONT } from 'public/static/styles/constants';
import { BE_ADDR, vh } from 'utils';
import { Project } from 'types';

class ReviewProjectPage extends React.Component<{ project: Project }, { project: Project; fail: boolean }> {
  static async getInitialProps() {
    const project: Project = {
      details: {
        title: '',
        description: '',
        status: '',
        duration: '',
        size: '',
        postal: '',
      },
      skills: [],
      roles: [],
      interests: [],
    };

    return { project };
  }

  constructor(props) {
    super(props);
    this.state = {
      project: this.props.project,
      fail: false,
    };
  }

  componentDidMount() {
    const project = (JSON.parse(sessionStorage.getItem('project')) as Project) || this.props.project;
    this.setState({ project });
  }

  render() {
    const createProject = async (event): Promise<void> => {
      event.preventDefault();
      try {
        const res = await fetch(`${BE_ADDR}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(this.state.project),
        });
        const { projectId } = await res.json();

        sessionStorage.removeItem('project');
        Router.push(`/project/${projectId}`);
      } catch (error) {
        this.setState({ fail: true });
      }
    };

    return (
      <Box display="flex" flexDirection="column" alignItems="center" height="100%">
        <Container maxWidth="md" disableGutters>
          <Grid container style={{ padding: '1rem', paddingTop: '.5rem' }}>
            <Grid item xs={2}>
              <IconButton
                style={{ padding: 0, marginLeft: '-10px' }}
                onClick={(): void => {
                  Router.push('/my-projects/new');
                }}
              >
                <img src="/static/assets/back.svg" alt="back" />
              </IconButton>
            </Grid>
            <Grid item xs={8}>
              <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
                <Typography align="center" style={{ fontSize: FONT.HEADING }}>
                  {`Review`}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container maxWidth="md" disableGutters style={{ flex: 1 }}>
          <Box height="100%" display="flex" flexDirection="column" justifyContent="space-between">
            <ProjectContent project={this.state.project} />
            <Box width="100%" height={vh(15)} paddingX="20%" display="flex" alignItems="center">
              <form onSubmit={createProject} style={{ width: '100%' }}>
                <MainButton type="submit" label="Publish" />
                {this.state.fail ? (
                  <Box marginTop="1rem">
                    <Alert severity="error">{`Failed to create project.`}</Alert>
                  </Box>
                ) : null}
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  }
}

export default ReviewProjectPage;
