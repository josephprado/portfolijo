import isPropValid from '@emotion/is-prop-valid';
import { ListItemButton, ListItemText, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { type HeaderMenuProps } from './HeaderMenu';

/**
 * Props for the {@link HamburgerMenuItem} component
 */
export interface HamburgerMenuItemProps {
  /**
   * A CSS class name
   */
  className?: string;

  /**
   * A menu item
   */
  menu: HeaderMenuProps;

  /**
   * A function to close the parent menu
   */
  closeParent?: React.SetStateAction<any>;
}

/**
 * Returns a top level hamburger menu item
 *
 * @param label The label for the item
 * @param clickable True if the item is clickable
 * @returns A JSX element
 */
const getTopLevelItem = (label: string, clickable: boolean) => {
  return (
    <TopLevelListItemButton clickable={clickable}>
      <StyledListItemText primary={label} />
    </TopLevelListItemButton>
  );
};

/**
 * A menu item in the {@link HamburgerMenu} component
 *
 * @param props {@link HamburgerMenuItemProps}
 * @returns A JSX element
 */
function HamburgerMenuItem({
  className,
  menu,
  closeParent
}: HamburgerMenuItemProps) {
  const { label, to, sub } = menu;

  return (
    <div className={className}>
      {to ? (
        <StyledLink to={to} onClick={closeParent}>
          {getTopLevelItem(label, true)}
        </StyledLink>
      ) : (
        getTopLevelItem(label, false)
      )}
      {sub?.items.map((subItem) => {
        const { label: subLabel, to: subTo } = subItem;

        return (
          <StyledLink
            key={subLabel}
            to={subTo}
            onClick={subTo ? closeParent : undefined}
          >
            <StyledListItemButton clickable={!!subTo}>
              <StyledListItemText primary={subLabel} />
            </StyledListItemButton>
          </StyledLink>
        );
      })}
    </div>
  );
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== 'clickable'
})<{ clickable: boolean }>(({ theme, clickable }) => ({
  color: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: clickable ? theme.palette.secondary.light : 'transparent',
    color: clickable ? theme.palette.secondary.contrastText : undefined,
    cursor: clickable ? 'pointer' : 'default'
  }
}));

const TopLevelListItemButton = styled(StyledListItemButton, {
  shouldForwardProp: (prop: string) => isPropValid(prop) && prop !== 'clickable'
})<{ clickable: boolean }>(({ theme }) => ({
  color: theme.palette.secondary.main,
  textTransform: 'uppercase'
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center'
}));

export default HamburgerMenuItem;
