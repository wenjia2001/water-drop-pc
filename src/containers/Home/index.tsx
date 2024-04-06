import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';
import { Button } from 'antd';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';

/**
 *
 */
const Home = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  return (
    <div className={style.container}>
      <Button onClick={() => go(ROUTE_KEY.MY)}>个人中心</Button>
      {store.currentOrg}
    </div>
  );
};

export default Home;
