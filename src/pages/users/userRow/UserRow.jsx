import { ButtonGroup, Grid } from '@mui/material';
import styles from '../users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import TrashIconButton, {
  EditIconButton,
  ReturnIconButton,
  SaveIconButton,
} from '../../../components/TrashIconButton.jsx';
import { useCallback, useMemo, useState } from 'react';
import UserNameField from './UserFields/UserNameField.jsx';
import { deleteUser, setEditable, updateUser } from '../../../stores/users/users.actions.js';
import UserPhoneField from './UserFields/UserPhoneField.jsx';
import UserEmailField from './UserFields/UserEmailField.jsx';
import validator from '../../../tools/Validator.js';
import UserCountryField from './UserFields/UserCoutryField.jsx';
import { resetValidationErrors, setValidationError } from '../../../stores/validation/validation.actions.js';

const UserRow = ({ userId }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.data.find((u) => u.id === userId));
  const editable = !!user.editable;
  const errors = useSelector((state) => state.validation.errors[userId]);
  const [editableUser, setEditableUser] = useState({ ...user });

  const saveDisabled = useMemo(() => {
    if (!errors) return false;
    return Object.values(errors).some((error) => error === 'invalid' || error === 'empty');
  }, [errors]);

  const setUserField = (name, value) => {
    const error = validator.validate(name, value).type;
    dispatch(setValidationError({ id: userId, name, error }));
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const renderActionButtons = useCallback(() => {
    const setEditableHandler = (value) => {
      dispatch(setEditable({ id: userId, value }));
      dispatch(resetValidationErrors(user.id));
    };

    const clickEditButtonHandler = () => {
      setEditableUser({ ...user });
      setEditableHandler(true);
    };

    const clickDeleteButtonHandler = () => {
      dispatch(deleteUser(user.id));
    };

    const clickReturnButtonHandler = () => {
      if (editableUser.new) {
        dispatch(deleteUser(userId));
      } else {
        setEditableUser({ ...user });
        setEditableHandler(false);
      }
    };

    const clickSaveButtonHandler = () => {
      if (!validator.validateAllBoolean(editableUser)) return;
      dispatch(updateUser(editableUser));
      setEditableHandler(false);
    };

    if (editable) {
      return (
        <ButtonGroup variant={'contained'} aria-label="save-buttons-group">
          <ReturnIconButton handleClick={clickReturnButtonHandler} />
          <SaveIconButton disabled={saveDisabled} handleClick={clickSaveButtonHandler} />
        </ButtonGroup>
      );
    } else {
      return (
        <ButtonGroup variant={'contained'} aria-label="save-buttons-group">
          <EditIconButton handleClick={clickEditButtonHandler} />
          <TrashIconButton handleClick={clickDeleteButtonHandler} />
        </ButtonGroup>
      );
    }
  }, [editable, editableUser, saveDisabled, user, userId]);

  return (
    <Grid container className={styles.userRow}>

      <UserNameField id={userId} editable={editable} value={editableUser.name} onChangeHandler={setUserField}>
        {user.name}
      </UserNameField>

      <UserCountryField id={userId} editable={editable} value={editableUser.country} onChangeHandler={setUserField}>
        {user.country}
      </UserCountryField>

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
};

export default UserRow;
