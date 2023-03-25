import Navbar, { type NavbarStyle } from '../header/Navbar';
import { type SubMenuStyle } from '../header/SubMenu';

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

const about = {
  label: 'About',
  subMenu: {
    ...subMenuStyle,
    name: 'about',
    items: [{ label: 'My Story' }, { label: 'Resume' }]
  }
};

const projects = {
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

const contact = {
  label: 'Contact'
};

function AppHeader() {
  return <Navbar {...navbarStyle} menus={[about, projects, contact]} />;
}

export default AppHeader;
