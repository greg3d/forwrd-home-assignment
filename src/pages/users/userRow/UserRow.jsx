import { Grid } from '@mui/material';
import styles from '../users.module.css';

// TODO: user country must be one of those - for select/autocomplete implementation
import { useSelector } from 'react-redux';

const UserRow = ({ userId }) => {

  const user = useSelector((state) => state.users.users.find((u) => u.id === userId));



  return (
    <Grid container className={styles.userRow}>
      <Grid item xs={12} md={3}>
        {user.name}
      </Grid>
      <Grid item xs={12} md={2}>
        {user.country}
      </Grid>
      <Grid item xs={12} md={5}>
        {user.email}
      </Grid>
      <Grid item xs={12} md={2}>
        {user.phone}
      </Grid>
      {/* Render each user row inputs and trash icon at the end of each row */}
      {/* <TrashIconButton /> */}
    </Grid>
  );
};

export default UserRow;
