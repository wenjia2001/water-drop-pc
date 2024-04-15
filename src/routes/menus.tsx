import {
  GiftOutlined,
  HomeOutlined,
  PicRightOutlined,
  ShopOutlined,
} from '@ant-design/icons';

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  PAGE_404: 'p404',
  NoOrg: 'onOrg',
  COURSE: 'course',
  PRODUCT: 'product',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: 'home',
    name: '首页',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '个人中心',
    icon: <HomeOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: '门店管理',
    icon: <ShopOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEY.PAGE_404]: {
    path: '*',
    name: 'p404',
    hideInMenu: true,
  },
  [ROUTE_KEY.NoOrg]: {
    path: 'onOrg',
    name: '选择门店',
    hideInMenu: true,
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: '课程管理',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.PRODUCT]: {
    path: 'product',
    name: '商品管理',
    icon: <GiftOutlined />,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({
  ...ROUTE_CONFIG[key],
  key,
}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
