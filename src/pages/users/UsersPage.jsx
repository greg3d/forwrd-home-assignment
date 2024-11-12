import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, saveAll, setPage } from '../../stores/users/users.actions.js';
import { useEffect, useMemo } from 'react';
import { ButtonGroup, Pagination } from '@mui/material';
import SecondaryButton from '../../components/SecondaryButton.jsx';

function UsersPage() {

  const { pageNumber } = useParams();
  const currentPage = parseInt(pageNumber) || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalPages, usersToSave, usersToDelete, usersToCreate } = useSelector((state) => state.users);
  const { emptyFields, invalidFields } = useSelector((state) => state.validation);

  useEffect(() => {
    dispatch(loadUsers(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPage(currentPage));
  }, [currentPage, dispatch]);

  const handlePageChange = (event, value) => {
    navigate(`/users/${value}`);
  };

  const disableSave = useMemo(() => {
    return emptyFields > 0 || invalidFields > 0 || (usersToDelete.length === 0 && usersToSave.length === 0 && usersToCreate.length === 0);
  }, [emptyFields, invalidFields, usersToCreate.length, usersToDelete.length, usersToSave.length]);

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <Pagination count={totalPages} color="secondary" onChange={handlePageChange} />

        <div className={styles.smallTip}>
          total empty fields: {emptyFields} | total invalid fields: {invalidFields}
          <div>
            Saves: {usersToSave.length > 0 ? usersToSave.map(user => user.id).join(', ') : 'no changes'}
          </div>
          <div>
            Creates: {usersToCreate.length > 0 ? usersToCreate.map(user => user.id).join(', ') : 'no changes'}
          </div>
          <div>
            Deletes: {usersToDelete.length > 0 ? usersToDelete.map(user => user.id).join(', ') : 'no changes'}
          </div>
        </div>

        <div className={styles.rightButtonContainer}>
          <ButtonGroup>
            <SecondaryButton disabled={false} handleClick={() => dispatch(loadUsers(true))}>
              Refresh (reset)
            </SecondaryButton>
            <PrimaryButton disabled={disableSave} handleClick={() => dispatch(saveAll())}>
              Save
            </PrimaryButton>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
