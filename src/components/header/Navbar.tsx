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
  backgroundColor = 'white',
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

  const getMenuItems = (sub: boolean) =>
    menus?.map((menu) => {
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
          {sub && subMenu && <SubMenu {...subMenu} offset={height} />}
        </MenuWrapper>
      );
    });

  return (
    <Container className={className} id={navbarId}>
      <MenuContainer>{getMenuItems(true)}</MenuContainer>
      <Spacer>{getMenuItems(false)}</Spacer>
    </Container>
  );
}

const Container = styled.div`
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const MenuContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  gap: 8px;
`;

const Spacer = styled.div`
  visibility: hidden;
  display: flex;
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
