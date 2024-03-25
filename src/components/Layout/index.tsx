import { Link, useNavigate, useOutlet } from 'react-router-dom';
import style from './index.module.less';
import { ProLayout,PageContainer, MenuDataItem } from '@ant-design/pro-components';
import { useUserContext } from '@/hooks/userHooks';
import { AUTH_TOKEN } from '@/utils/constants';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { useGoTo } from '@/hooks';
import { Space } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

const menuItemRender=(
  item:MenuDataItem,
  dom: React.ReactNode
) =><Link to={item.path || '/'}>{dom}</Link>
/**
*外层框架
*/
const Layout = () => {
    const outlet=useOutlet()
    const {store}=useUserContext()
    const nav=useNavigate()
    const {go} = useGoTo()
    const logoutHandler=()=>{
      sessionStorage.setItem(AUTH_TOKEN,'')
      localStorage.setItem(AUTH_TOKEN,'')
      nav('/login')
    }
    return (
    <ProLayout
        siderWidth={130}
        layout='mix'
        avatarProps={{
          src:store.avatar||null,
          title:store.name,
          size:'small',
          onClick:()=>go(ROUTE_KEY.MY)
        }}
        links={[
          <Space onClick={logoutHandler}>
            <LogoutOutlined />退出
          </Space>,
        ]}
        title={false}
        logo={<img src='https://water-drop-wj.oss-cn-hangzhou.aliyuncs.com/images/wvs1.jpg'/>}
        route={{
          path:'/',
          routes:routes
        }}
        menuItemRender={menuItemRender}
        onMenuHeaderClick={()=>nav('/')}
        className={style.container}>
        <PageContainer>
            {outlet}
        </PageContainer>
    </ProLayout>);
};

export default Layout;
