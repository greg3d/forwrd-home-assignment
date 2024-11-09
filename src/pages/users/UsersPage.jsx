import UsersList from './usersList/UsersList';
import PrimaryButton from '../../components/PrimaryButton';
import styles from './users.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers } from '../../stores/users/users.actions.js';
import { useEffect } from 'react';

function UsersPage() {

  const {pageNumber} = useParams();
  const currentPage = parseInt(pageNumber) || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {totalPages} = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(loadUsers(currentPage));
  }, [currentPage]);

  const handlePageChange = (page) => {
    navigate(`/users/${page}`);
  }

  return (
    <div className={styles.pageRoot}>
      <div className={styles.pageContentContainer}>
        <UsersList />
        <div>
          page: {currentPage} out of {totalPages}
        </div>

        <div className={styles.rightButtonContainer}>
          <PrimaryButton
            disabled={false}
            // TODO: Implement onClick handler
          >
            Save
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default UsersPage;
