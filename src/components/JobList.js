import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
} from '@mui/material';
import { Work, ArrowForward } from '@mui/icons-material';
import './JobList.css';

function JobList({ jobs }) {
  return (
    <Card className="job-list-card">
      <CardContent>
        <Typography variant="h5">Job Listings</Typography>
        <List>
          {jobs.map((job) => (
            <ListItem key={job.id} className="job-list-item">
              <Avatar>
                <Work />
              </Avatar>
              <ListItemText
                primary={job.title}
                secondary={`${job.company} - ${job.location}`}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="apply">
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default JobList;
