import { Typography } from '@mui/material';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUsers } from '../../../stores/users/users.actions.js';
import UserRow from '../userRow/UserRow.jsx';

function UsersList() {

  const { users: usersData, isLoading } = useSelector((state) => state.users);

  const renderUsersList = () => {
    if (!usersData || usersData.length === 0) return <div>User data not available</div>;
    return usersData.map(item => (
      <UserRow userId={item.id} key={item.id} />
    ));
  };

  const renderLoader = () => {
    if (!isLoading) return null;
    return <div className={styles.loader}>FETCHING DATA</div>;
  };

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h6">Users List</Typography>
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
