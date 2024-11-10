import { styled } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveIcon from '@mui/icons-material/Save';

const StyledIconButton = styled(IconButton)({
  color: '#8f3e3e',
  '&:hover': {
    color: '#d38d8d',
  },
});

const TrashIconButton = ({ handleClick }) => {
  return (
    <StyledIconButton aria-label="delete" size="medium">
      <DeleteIcon fontSize="inherit" />
    </StyledIconButton>
  );
};

export const EditIconButton = ({ handleClick }) => {
  return (
    <IconButton aria-label="edit" size="medium" onClick={handleClick}>
      <EditIcon fontSize="inherit" color={"warning"} />
    </IconButton>
  );
};

export const ReturnIconButton = ({ handleClick }) => {
  return (
    <IconButton aria-label="delete" size="medium" onClick={handleClick}>
      <ReturnIcon fontSize="inherit" color={"error"} />
    </IconButton>
  );
};

export const SaveIconButton = ({ handleClick }) => {
  return (
    <IconButton aria-label="delete" size="medium" onClick={handleClick}>
      <SaveIcon fontSize="inherit" color={"error"} />
    </IconButton>
  );
};


export default TrashIconButton;
