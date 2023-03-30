import styled from '@emotion/styled';
import { useEffect } from 'react';

export interface SubMenuItem {
  label: string;
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
          const { label, subMenu } = item;

          return (
            <Item key={label} id={getSubMenuId(label)} {...subMenuStyle}>
              <ItemContent>
                {label}
                {subMenu && (
                  <SubMenu {...subMenuStyle} {...subMenu} parentName={label} />
                )}
                {subMenu && (
                  <svg
                    width="6"
                    height="12"
                    viewBox="0 0 7 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.5 7.5L0.5 14.4282V0.571797L6.5 7.5Z"
                      fill="black"
                    />
                  </svg>
                )}
              </ItemContent>
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
  padding: 8px 16px;

  :hover {
    background-color: ${(props) => props.hoverBackgroundColor};
    color: ${(props) => props.hoverFontColor};
  }
`;

const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    margin-left: 16px;
  }
`;

export default SubMenu;
