import { Button, Menu, MenuItem, popoverClasses, styled } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * A dropdown submenu displayed when hovering over a {@link HeaderMenu}
 */
export interface Submenu {
  /**
   * The action type that triggers the rendering of the submenu
   */
  trigger: 'hover' | 'click';

  /**
   * A list of submenu items
   */
  items: Array<{ label: string; to: string }>;
}

/**
 * Props for the {@link HeaderMenu} component
 */
export interface HeaderMenuProps {
  /**
   * A CSS class name
   */
  className?: string;

  /**
   * The top-level label for the menu
   */
  label: string;

  /**
   * A route to navigate to when the label is clicked
   */
  to?: string;

  /**
   * Specifies the items listed in the dropdown submenu
   */
  sub?: Submenu;
}

/**
 * An individual menu item with an optional dropdown submenu
 *
 * @param props {@link HeaderMenuProps}
 * @returns A JSX element
 * @see https://stackoverflow.com/questions/55318477/how-to-make-material-ui-menu-based-on-hover-not-click
 */
function HeaderMenu({ className, label, to, sub }: HeaderMenuProps) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  let hovering = false;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    hovering = true;
    anchorEl !== event.currentTarget && setAnchorEl(event.currentTarget);
  };

  const handleHover = () => {
    hovering = true;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseHover = () => {
    hovering = false;
    setTimeout(() => {
      !hovering && handleClose();
    }, 50);
  };

  return (
    <div className={className}>
      <MenuButton
        onClick={to ? () => navigate(to) : handleClick}
        onMouseOver={handleClick}
        onMouseLeave={handleCloseHover}
      >
        {label}
      </MenuButton>
      {sub?.items && (
        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleClose}
          disableScrollLock
          MenuListProps={{
            onMouseOver: handleHover,
            onMouseLeave: handleCloseHover,
            style: { pointerEvents: 'auto' }
          }}
          sx={{ [`&.${popoverClasses.root}`]: { pointerEvents: 'none' } }}
        >
          {sub.items.map((item) => {
            return (
              <MenuItemLink key={item.label} to={item.to}>
                <StyledMenuItem>{item.label}</StyledMenuItem>
              </MenuItemLink>
            );
          })}
        </Menu>
      )}
    </div>
  );
}

const MenuButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText
  }
}));

const MenuItemLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText
  }
}));

export default HeaderMenu;
