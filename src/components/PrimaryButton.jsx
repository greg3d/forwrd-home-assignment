import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black',
  },
});

const PrimaryButton = ({ children, disabled, handleClick }) => {
  return (
    <StyledButton color={"secondary"} variant="contained" disabled={disabled} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default PrimaryButton;
