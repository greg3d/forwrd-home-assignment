import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';

const TrashIconButton = ({ handleClick }) => {
  return (
    <IconButton aria-label="delete" color={'error'} size="medium" onClick={handleClick}>
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  );
};

export const EditIconButton = ({ handleClick }) => {
  return (
    <IconButton aria-label="edit" size="medium" color={'primary'}  onClick={handleClick}>
      <EditIcon fontSize="inherit" />
    </IconButton>
  );
};

export const ReturnIconButton = ({ handleClick }) => {
  return (
    <IconButton aria-label="return" color={'primary'} size="medium" onClick={handleClick}>
      <ReturnIcon fontSize="inherit" />
    </IconButton>
  );
};

export const SaveIconButton = ({ handleClick, disabled }) => {
  return (
    <IconButton disabled={disabled} color={'warning'} aria-label="save" size="medium" onClick={handleClick}>
      <SaveIcon fontSize="inherit" />
    </IconButton>
  );
};


export default TrashIconButton;
