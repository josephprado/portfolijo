import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubMenu, { type SubMenuProps } from './SubMenu';

export interface Menu {
  label: string;
  link?: string;
  subMenu?: SubMenuProps;
}

export interface NavbarStyle {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  fontColor?: string;
  hoverFontColor?: string;
}

export interface NavbarProps extends NavbarStyle {
  className?: string;
  menus?: Menu[];
}

function Navbar({
  className,
  menus,
  backgroundColor = 'inherit',
  hoverBackgroundColor = 'lightgreen',
  fontColor = 'black',
  hoverFontColor = 'black'
}: NavbarProps) {
  const navbarId = 'navbar';
  const [height, setHeight] = useState(0);

  // get height of navbar
  useEffect(() => {
    let flag = true;

    flag &&
      setHeight(
        document.getElementById(navbarId)?.getBoundingClientRect().height ?? 0
      );

    return () => {
      flag = false;
    };
  }, []);

  return (
    <Container
      className={className}
      id={navbarId}
      backgroundColor={backgroundColor}
    >
      {menus?.map((menu) => {
        const { label, link, subMenu } = menu;

        return (
          <MenuWrapper
            key={label}
            backgroundColor={backgroundColor}
            hoverBackgroundColor={hoverBackgroundColor}
            fontColor={fontColor}
            hoverFontColor={hoverFontColor}
          >
            {link ? (
              <StyledLink to={link}>{label}</StyledLink>
            ) : (
              <NonLink>{label}</NonLink>
            )}
            {subMenu && <SubMenu {...subMenu} offset={height} />}
          </MenuWrapper>
        );
      })}
    </Container>
  );
}

const Container = styled.nav<{ backgroundColor: string }>`
  display: flex;
  gap: 8px;
  background-color: ${(props) => props.backgroundColor};
  z-index: 2;
`;

const MenuWrapper = styled.div<NavbarStyle>`
  position: relative;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};

  :hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverFontColor};

    > div {
      display: flex;
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  padding: 8px 16px;
  color: inherit;
  text-decoration: none;
`;

const NonLink = styled.div`
  display: flex;
  padding: 8px 16px;
  color: inherit;
`;

export default Navbar;
