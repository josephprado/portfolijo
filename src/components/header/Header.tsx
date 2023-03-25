import Navbar, { type Menu, type NavbarStyle } from './Navbar';
import { type SubMenuStyle } from './SubMenu';

const navbarStyle: NavbarStyle = {
  backgroundColor: 'white',
  hoverBackgroundColor: 'lightgreen',
  fontColor: 'black',
  hoverFontColor: 'black'
};

const subMenuStyle: SubMenuStyle = {
  ...navbarStyle,
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
  return <Navbar {...navbarStyle} menus={[about, projects, contact]} />;
}

export default Header;
