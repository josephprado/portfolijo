import { AppBar, Box, Toolbar, styled } from '@mui/material';
import HeaderMenu, { type HeaderMenuProps } from './HeaderMenu';
import HamburgerMenu from './HamburgerMenu';

/**
 * Props for the {@link Header} component
 */
export interface HeaderProps {
  /**
   * A CSS class name
   */
  className?: string;

  /**
   * A CSS id name
   *
   * @default app-header
   */
  id?: string;

  /**
   * Alignment of the navigation menu items
   *
   * @default left
   */
  alignment?: 'left' | 'right' | 'center';

  /**
   * Navigation menu items
   */
  menus?: HeaderMenuProps[];
}

/**
 * A fixed position header
 *
 * @param props {@link HeaderProps}
 * @returns A JSX element
 */
function Header({
  className,
  id = 'app-header',
  alignment = 'left',
  menus
}: HeaderProps) {
  return (
    <AppBar className={className} id={id} position="fixed">
      <StyledToolbar variant="dense">
        <Box sx={{ display: { sm: 'none' } }}>
          <HamburgerMenu menus={menus} />
        </Box>
        <Navbar
          component="nav"
          alignment={alignment}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          {menus?.map(({ label, to, sub }) => (
            <HeaderMenu key={label} label={label} to={to} sub={sub} />
          ))}
        </Navbar>
      </StyledToolbar>
    </AppBar>
  );
}

const StyledToolbar = styled(Toolbar)`
  background-color: white;
  justify-content: space-between;
`;

const Navbar = styled(Box)<{ alignment: HeaderProps['alignment'] }>`
  flex-grow: 1;
  justify-content: ${(props) => props.alignment};
`;

export default Header;
