import Home from '@/containers/Home';
import { ROUTE_KEY } from './menus';
import My from '@/containers/My';
import Page404 from '@/containers/Page404';
import Org from '@/containers/Org';
import NoOrg from '@/containers/NoOrg';
import Course from '@/containers/Course';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.PAGE_404]: Page404,
  [ROUTE_KEY.NoOrg]: NoOrg,
  [ROUTE_KEY.COURSE]: Course,
};
