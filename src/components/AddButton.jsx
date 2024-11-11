import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

const StyledAddButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  color: '#FFF',
  backgroundColor: '#3270ae',
  '&:hover': {
    backgroundColor: '#2989e8',
  },
});

const AddButton = ({ disabled, handleClick }) => {
  return (
    <StyledAddButton size={"large"} variant="contained" disabled={disabled} onClick={handleClick}>
      <AddIcon fontSize="inherit" />
      Add new user
    </StyledAddButton>
  );
};

// TODO: Implement passed props
AddButton.defaultProps = {
  disabled: false,
  handleClick: () => {},
};

export default AddButton;
