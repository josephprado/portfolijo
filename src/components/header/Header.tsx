import styled from '@emotion/styled';
import Navbar, { type Menu, type NavbarStyle } from './Navbar';
import { type SubMenuStyle } from './SubMenu';

const navbarStyle: NavbarStyle = {
  backgroundColor: 'inherit',
  hoverBackgroundColor: 'inherit',
  fontColor: 'black',
  hoverFontColor: 'rgba(0, 120, 215, 1)'
};

const subMenuStyle: SubMenuStyle = {
  backgroundColor: 'white',
  hoverBackgroundColor: 'rgba(0, 120, 215, 0.2)',
  fontColor: 'black',
  hoverFontColor: 'black',
  borderColor: 'lightgray'
};

const about: Menu = {
  label: 'About',
  subMenu: {
    ...subMenuStyle,
    name: 'about',
    items: [{ label: 'My Story' }, { label: 'Resume' }]
  }
};

const projects: Menu = {
  label: 'Projects',
  subMenu: {
    ...subMenuStyle,
    name: 'projects',
    items: [
      {
        label: 'Project One',
        subMenu: {
          name: 'project1',
          items: [{ label: 'Live Project One' }, { label: 'Repository One' }]
        }
      },
      {
        label: 'Project Two',
        subMenu: {
          name: 'project2',
          items: [{ label: 'Live Project Two' }, { label: 'Repository Two' }]
        }
      },
      {
        label: 'Project Three',
        subMenu: {
          name: 'project3',
          items: [
            { label: 'Live Project Three' },
            {
              label: 'Repository Three',
              subMenu: {
                name: 'repository',
                items: [{ label: 'github' }, { label: 'devops' }]
              }
            }
          ]
        }
      }
    ]
  }
};

const contact: Menu = {
  label: 'Contact'
};

function Header() {
  return (
    <Container>
      <Navbar {...navbarStyle} menus={[about, projects, contact]} />
      <Version>
        <div>{`VERSION ${process.env.REACT_APP_VERSION ?? ''}`}</div>
        <div>{`${process.env.REACT_APP_BUILD_DATE ?? ''}`}</div>
      </Version>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const Version = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  font-size: 10px;
  color: gray;
`;

export default Header;
