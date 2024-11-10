import { Grid } from '@mui/material';
import styles from '../users.module.css';

// TODO: user country must be one of those - for select/autocomplete implementation
import { useDispatch, useSelector } from 'react-redux';
import TrashIconButton, {
  EditIconButton,
  ReturnIconButton,
  SaveIconButton,
} from '../../../components/TrashIconButton.jsx';
import { memo, useCallback, useState } from 'react';
import UserNameField from './UserFields/UserNameField.jsx';
import {
  deleteUser,
  updateUser,
} from '../../../stores/users/users.actions.js';
import UserPhoneField from './UserFields/UserPhoneField.jsx';
import UserEmailField from './UserFields/UserEmailField.jsx';
import validator from '../../../tools/Validator.js';
import UserCoutryField from './UserFields/UserCoutryField.jsx';
import { resetValidationErrors, setValidationError } from '../../../stores/validation/validation.actions.js';

const UserRow = memo(({ userId }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.users.find((u) => u.id === userId));
  const [editableUser, setEditableUser] = useState({ ...user });
  const [editable, setEditable] = useState(false);

  const setUserField = (name, value) => {
    console.log(value, name)
    const error = validator.validate(name, value).type;
    dispatch(setValidationError({ id: userId, name, error }));
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const renderActionButtons = useCallback(() => {

    const clickEditButtonHandler = () => {
      setEditableUser({ ...user });
      setEditable(true);
    };

    const clickDeleteButtonHandler = () => {
      dispatch(deleteUser(user.id));
    };

    const clickReturnButtonHandler = () => {
      dispatch(resetValidationErrors(user.id));
      setEditableUser({ ...user });
      setEditable(false);
    };

    const clickSaveButtonHandler = () => {
      dispatch(updateUser(editableUser));
      setEditable(false);
    };

    if (editable) {
      return (
        <>
          <ReturnIconButton handleClick={clickReturnButtonHandler} />
          <SaveIconButton handleClick={clickSaveButtonHandler} />
        </>
      );
    } else {
      return (
        <>
          <EditIconButton handleClick={clickEditButtonHandler} />
          <TrashIconButton handleClick={clickDeleteButtonHandler} />
        </>
      );
    }
  }, [editable, editableUser]);

  return (
    <Grid container className={styles.userRow}>

      <UserNameField id={userId} editable={editable} value={editableUser.name} onChangeHandler={setUserField}>
        {user.name}
      </UserNameField>

      <UserCoutryField id={userId} editable={editable} value={editableUser.country} onChangeHandler={setUserField}>
        {user.country}
      </UserCoutryField>

      <UserEmailField id={userId} editable={editable} value={editableUser.email} onChangeHandler={setUserField}>
        {user.email}
      </UserEmailField>

      <UserPhoneField id={userId} editable={editable} value={editableUser.phone} onChangeHandler={setUserField}>
        {user.phone}
      </UserPhoneField>

      <Grid item>
        <div className={styles.buttons}>
          {renderActionButtons()}
        </div>
      </Grid>
    </Grid>
  );
});

export default UserRow;
