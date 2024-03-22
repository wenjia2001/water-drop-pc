import { Link, useNavigate, useOutlet } from 'react-router-dom';
import style from './index.module.less';
import { ProLayout,PageContainer, MenuDataItem } from '@ant-design/pro-components';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_CONFIG } from '@/routes/index.tsx';
import { AUTH_TOKEN } from '@/utils/constants';

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
    const logout=()=>{
      sessionStorage.setItem(AUTH_TOKEN,'')
      localStorage.setItem(AUTH_TOKEN,'')
      nav('/login')
    }
    return (
    <ProLayout
        siderWidth={130}
        layout='mix'
        avatarProps={{
          src:'https://water-drop-wj.oss-cn-hangzhou.aliyuncs.com/images/mao.jpg',
          title:store.tel,
          size:'small',
          onClick:logout
        }}
        title={false}
        logo={<img src='https://water-drop-wj.oss-cn-hangzhou.aliyuncs.com/images/wvs1.jpg'/>}
        route={{
          path:'/',
          routes:ROUTE_CONFIG
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
