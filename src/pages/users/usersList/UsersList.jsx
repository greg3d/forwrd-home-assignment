import { CircularProgress, LinearProgress, Typography } from '@mui/material';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { useSelector } from 'react-redux';
import UserRow from '../userRow/UserRow.jsx';

function UsersList() {

  const { users: usersData, totalItems, isLoading } = useSelector((state) => state.users);

  const renderUsersList = () => {
    if (isLoading) return null;
    if (!usersData || usersData.length === 0) return <div>User data not available</div>;
    return usersData.map(item => (
      <UserRow userId={item.id} key={item.id} />
    ));
  };

  const renderLoader = () => {
    if (!isLoading) return null;
    return <div className={styles.loader}><CircularProgress /></div>;
  };

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h5">Users List | total: {isLoading ?
          <CircularProgress color={'secondary'} size={'20px'} /> : totalItems}</Typography>
        <AddButton />
      </div>
      <div className={styles.usersListContent}>
        {renderUsersList()}
        {renderLoader()}
      </div>
    </div>
  );
}

export default UsersList;
