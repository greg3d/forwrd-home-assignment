import { ButtonGroup, Grid } from '@mui/material';
import styles from '../users.module.css';
import { useDispatch, useSelector } from 'react-redux';
import TrashIconButton, {
  EditIconButton,
  ReturnIconButton,
  SaveIconButton,
} from '../../../components/TrashIconButton.jsx';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import UserNameField from './UserFields/UserNameField.jsx';
import { deleteUser, setEditable, updateUser } from '../../../stores/users/users.actions.js';
import UserPhoneField from './UserFields/UserPhoneField.jsx';
import UserEmailField from './UserFields/UserEmailField.jsx';
import validator from '../../../tools/Validator.js';
import UserCoutryField from './UserFields/UserCoutryField.jsx';
import { resetValidationErrors, setValidationError } from '../../../stores/validation/validation.actions.js';

const UserRow = memo(({ userId }) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.data.find((u) => u.id === userId));
  const editable = !!user.editable;
  const errors = useSelector((state) => state.validation.errors[userId]);
  const [editableUser, setEditableUser] = useState({ ...user });
  //const [editable, setEditable] = useState(false);

  useEffect(() => {
    setEditableUser({ ...user });
  }, []);

  const saveDisabled = useMemo(() => {
    if (!errors) return false;
    return Object.values(errors).some((error) => error === 'invalid' || error === 'empty');
  }, [errors, editableUser]);

  const setUserField = (name, value) => {
    const error = validator.validate(name, value).type;
    dispatch(setValidationError({ id: userId, name, error }));
    setEditableUser((prev) => ({ ...prev, [name]: value }));
  };

  const setEditableHandler = (value) => {
    dispatch(resetValidationErrors(user.id));
    dispatch(setEditable({ id: userId, value }));
  };

  const renderActionButtons = useCallback(() => {

    const clickEditButtonHandler = () => {
      setEditableUser({ ...user });
      setEditableHandler(true);
    };

    const clickDeleteButtonHandler = () => {
      dispatch(deleteUser(user.id));
    };

    const clickReturnButtonHandler = () => {
      if (editableUser.new) {
        dispatch(deleteUser(user.id));
      } else {
        setEditableUser({ ...user });
        setEditableHandler(false);
      }
    };

    const clickSaveButtonHandler = () => {

      let isValid = true;
      Object.keys(editableUser).forEach((key) => {
        if (key !== 'id' && key !== 'new' && key !== 'editable') {
          const error = validator.validate(key, editableUser[key]).type;
          if (error === 'empty' || error === 'invalid') {
            isValid = false;
          }
        }
      });
      if (!isValid) return;

      if (editableUser.new) {
        const notNew = { ...editableUser };
        delete notNew.new;
        delete notNew.editable;
        console.log(notNew);
        dispatch(updateUser(notNew));
      } else {
        dispatch(updateUser(editableUser));
      }

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
  }, [editable, editableUser, saveDisabled]);

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
