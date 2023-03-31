import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RightArrow from './RightArrow';

export interface SubMenuItem {
  label: string;
  link?: string;
  subMenu?: SubMenuProps;
}

export interface SubMenuStyle {
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  fontColor?: string;
  hoverFontColor?: string;
  borderColor?: string;
}

export interface SubMenuProps extends SubMenuStyle {
  className?: string;
  name: string;
  parentName?: string;
  items: SubMenuItem[];
  offset?: number;
}

function SubMenu({
  className,
  name,
  parentName = '',
  items,
  offset = 0,
  backgroundColor = 'white',
  hoverBackgroundColor = 'lightgreen',
  fontColor = 'black',
  hoverFontColor = 'black',
  borderColor = 'lightgray'
}: SubMenuProps) {
  const getSubMenuId = (subMenuName: string) => `subMenu-${subMenuName}`;

  // position and reveal the sub menu when parent is hovered
  useEffect(() => {
    const parent = document.getElementById(getSubMenuId(parentName));
    const child = document.getElementById(getSubMenuId(name));
    const delay = 600;
    let timeout: NodeJS.Timeout;

    // display child to the left of the parent
    const handleEnter = () => {
      clearTimeout(timeout);

      if (child) {
        child.style.left = `${parent?.getBoundingClientRect().width ?? 0}px`;

        timeout = setTimeout(() => {
          child.style.display = 'flex';
        }, delay);
      }
    };

    // hide child
    const handleLeave = () => {
      clearTimeout(timeout);

      if (child) {
        timeout = setTimeout(() => {
          child.style.display = 'none';
        }, delay);
      }
    };

    parent?.addEventListener('mouseenter', handleEnter);
    parent?.addEventListener('mouseleave', handleLeave);

    return () => {
      parent?.removeEventListener('mouseenter', handleEnter);
      parent?.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const subMenuStyle = {
    backgroundColor,
    hoverBackgroundColor,
    fontColor,
    hoverFontColor,
    borderColor
  };

  return (
    <Container
      id={getSubMenuId(name)}
      className={className}
      offset={offset}
      {...subMenuStyle}
    >
      <>
        {items?.map((item) => {
          const { label, link, subMenu } = item;
          const labelAndArrow = (
            <>
              {label}
              {subMenu && <RightArrow />}
            </>
          );

          return (
            <Item key={label} id={getSubMenuId(label)} {...subMenuStyle}>
              {link ? (
                <StyledLink to={link}>{labelAndArrow}</StyledLink>
              ) : (
                <NonLink>{labelAndArrow}</NonLink>
              )}
              {subMenu && (
                <SubMenu {...subMenuStyle} {...subMenu} parentName={label} />
              )}
            </Item>
          );
        })}
      </>
    </Container>
  );
}

const Container = styled.div<SubMenuStyle & { offset: number }>`
  position: absolute;
  top: ${(props) => `${props.offset}px`};
  left: 0;
  display: none;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  border: ${(props) => props.borderColor && `1px solid ${props.borderColor}`};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;

  :hover {
    display: flex;
  }
`;

const Item = styled.div<SubMenuStyle>`
  position: relative;
  min-width: max-content;
  flex-grow: 1;

  :hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverFontColor};
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  color: inherit;
  text-decoration: none;

  svg {
    margin-left: 16px;
  }
`;

const NonLink = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  color: inherit;

  svg {
    margin-left: 16px;
  }
`;

export default SubMenu;
