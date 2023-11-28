import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'dashboard',
  //       title: 'Dashboard',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/dashboard',
  //       icon: 'ti ti-dashboard',
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  // {
  //   id: 'page',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'Authentication',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'ti ti-key',
  //       children: [
  //         {
  //           id: 'login',
  //           title: 'Login',
  //           type: 'item',
  //           url: '/guest/login',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'register',
  //           title: 'Register',
  //           type: 'item',
  //           url: '/guest/register',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    id: 'elements',
    title: 'Elements',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'employee',
        title: 'Nhân Viên',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'Danh sách nhân viên',
            title: 'List Employee',
            type: 'item',
            url: '/app/employee/list-employee',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'createEmployee',
            title: 'Create Employee',
            type: 'item',
            url: '/app/employee/create-employee',
            target: false,
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'news',
        title: 'Danh sách bài viết',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'listNews',
            title: 'Bài viết',
            type: 'item',
            url: '/app/news/list-news',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'createNews',
            title: 'Create News',
            type: 'item',
            url: '/app/news/create-news',
            target: false,
            breadcrumbs: false
          },
        ]
      },
      {
        id: 'labService',
        title: 'Dịch vụ',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'labService',
            title: 'Danh sách dịch vụ',
            type: 'item',
            url: '/app/lab-service/list',
            target: false,
            breadcrumbs: false
          },
          {
            id: 'createLabService',
            title: 'Tạo chỉ mục chính',
            type: 'item',
            url: '/app/lab-service/create-service',
            target: false,
            breadcrumbs: false
          },
        ]
      },
      // {
      //   id: 'color',
      //   title: 'Colors',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/color',
      //   icon: 'ti ti-brush'
      // },
    ]
  },
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
