import { styled } from '@mui/material';

/**
 * Props for the {@link Footer} component
 */
export interface FooterProps {
  /**
   * A CSS class name
   */
  className?: string;
}

/**
 * A page footer
 *
 * @param props {@link FooterProps}
 * @returns A JSX element
 */
function Footer({ className }: FooterProps) {
  return (
    <StyledFooter className={className}>
      <Version>
        <div>VERSION {process.env.REACT_APP_VERSION}</div>
        <div>{process.env.REACT_APP_BUILD_DATE}</div>
      </Version>
    </StyledFooter>
  );
}

const StyledFooter = styled('footer')(({ theme }) => ({
  padding: '16px',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText
}));

const Version = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'right',
  fontSize: '10px',
  color: theme.palette.primary.light
}));
export default Footer;
