import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import SubMenu, { type SubMenuProps } from './SubMenu';

export interface Menu {
  label: string;
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
        const { label, subMenu } = menu;

        return (
          <MenuWrapper
            key={label}
            backgroundColor={backgroundColor}
            hoverBackgroundColor={hoverBackgroundColor}
            fontColor={fontColor}
            hoverFontColor={hoverFontColor}
          >
            {label}
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
  padding: 8px 16px;
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

export default Navbar;
