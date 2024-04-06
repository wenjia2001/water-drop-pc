import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { Result, Button } from 'antd';
import { useEffect } from 'react';

/**
 *
 */
const NoOrg = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();
  useEffect(() => {
    if (store.currentOrg) {
      go();
    }
  }, [go, store.currentOrg]);

  return (
    <Result
      status="404"
      title="404"
      subTitle="所有的管理行为都是基于门店进行的，请选择门店"
      extra={
        <Button type="primary" href="/">
          返回首页
        </Button>
      }
    />
  );
};

export default NoOrg;
