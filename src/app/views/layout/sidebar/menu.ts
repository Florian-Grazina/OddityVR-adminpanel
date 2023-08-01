import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'OddityVR',
    isTitle: true
  },
  {
    label: 'Clients',
    icon: 'users',
    link: "/clients/company"
  },
  {
    label: 'Tests',
    icon: 'bar-chart-2',
    link: "/tests/list-test"
  }
];
