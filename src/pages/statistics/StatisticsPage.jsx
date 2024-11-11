import styles from './statistics.module.css';
import { Box, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUsers } from '../../stores/users/users.actions.js';

function StatisticsPage() {

  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  const stats = users.reduce((acc, user) => {
    if (!acc[user.country]) {
      acc[user.country] = 0;
    }
    acc[user.country]++;
    return acc;
  }, {});

  console.log(stats);

  useEffect(() => {

    dispatch(loadUsers(true));

  }, []);

  return <div className={styles.pageRoot}>
    <Box>
      <h2>Statistics by Countries</h2>
    </Box>

    <Grid container>
    {Object.entries(stats).map(([country, count]) => {
        return <Grid item xs={12} key={country}>
          {country}: {count}
        </Grid>;
      })}
    </Grid>

  </div>;
}

export default StatisticsPage;
