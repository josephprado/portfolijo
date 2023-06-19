import { Box, Divider, Drawer, IconButton, List } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { Fragment, useContext, useState } from 'react';
import { type HeaderMenuProps } from './HeaderMenu';
import HeaderContext from './HeaderContext';
import HamburgerMenuItem from './HamburgerMenuItem';

/**
 * Props for the {@link HamburgerMenu} component
 */
export interface HamburgerMenuProps {
  /**
   * A CSS class name
   */
  className?: string;

  /**
   * Navigation menu items
   */
  menus?: HeaderMenuProps[];
}

/**
 * A slide out hamburger menu
 *
 * @param props {@link HamburgerMenuProps}
 * @returns A JSX element
 */
function HamburgerMenu({ className, menus }: HamburgerMenuProps) {
  const { headerHeight } = useContext(HeaderContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openDrawer = (event: React.MouseEvent<HTMLButtonElement>) => {
    anchorEl !== event.currentTarget && setAnchorEl(event.currentTarget);
  };

  const closeDrawer = () => {
    setAnchorEl(null);
  };

  return (
    <div className={className}>
      <IconButton onClick={anchorEl ? closeDrawer : openDrawer}>
        {anchorEl ? <Close /> : <Menu />}
      </IconButton>
      <Drawer
        anchor="top"
        open={!!anchorEl}
        onClose={closeDrawer}
        disableScrollLock
        sx={{ zIndex: (theme) => theme.zIndex.appBar - 1 }}
      >
        <Box>
          <List sx={{ marginTop: `${headerHeight}px` }}>
            {menus?.map((menu, i) => (
              <Fragment key={menu.label}>
                <HamburgerMenuItem menu={menu} closeParent={closeDrawer} />
                {i < menus.length - 1 && <Divider />}
              </Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}

export default HamburgerMenu;
