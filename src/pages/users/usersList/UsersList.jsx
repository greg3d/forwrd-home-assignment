import { CircularProgress, Typography } from '@mui/material';
import AddButton from '../../../components/AddButton';
import styles from '../users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import UserRow from '../userRow/UserRow.jsx';
import { createUser } from '../../../stores/users/users.actions.js';
import { useNavigate } from 'react-router-dom';

function UsersList() {

  const navigate = useNavigate();
  const { visible: usersData, data, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const renderUsersList = () => {
    if (isLoading) return null;
    if (!usersData || usersData.length === 0) return <div>User data not available</div>;
    return usersData.map((item, index) => (
      <UserRow userId={item.id} key={item.id} />
    ));
  };

  const renderLoader = () => {
    if (!isLoading) return null;
    return <div className={styles.loader}><CircularProgress /></div>;
  };

  const addButtonClickHandler = () => {
    navigate('/users/1');
    dispatch(createUser());
  };

  return (
    <div className={styles.usersList}>
      <div className={styles.usersListHeader}>
        <Typography variant="h5">Users List | total: {isLoading ?
          <CircularProgress color={'secondary'} size={'20px'} /> : data.length}</Typography>
        <AddButton handleClick={() => dispatch(createUser())} />
      </div>
      <div className={styles.usersListContent}>
        {renderUsersList()}
        {renderLoader()}
      </div>
    </div>
  );
}

export default UsersList;
