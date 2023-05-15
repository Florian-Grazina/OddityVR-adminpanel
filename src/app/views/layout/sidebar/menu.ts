import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Clients',
    isTitle: true
  },
  {
    label: 'Blog',
    icon: 'message-square',
    subItems: [
      {
        label: 'New Author creation',
        link: '/Blog/create-user-blog',
      }
      ,
      {
        label: 'CRUD Blog',
        link: '/Blog/crud-blog',
      }
      ,
      {
        label: 'CRUD User',
        link: '/Blog/crud-user',
      }
    ]
  },
  {
    label: 'Company',
    icon: 'message-square',
    link: "/clients/company"
  }
];
