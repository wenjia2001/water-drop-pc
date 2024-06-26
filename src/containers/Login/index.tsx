import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { Tabs, message } from 'antd';
import { useMutation } from '@apollo/client';
import { LOGIN, SEND_CODE_MSG } from '@/graphql/auth';
import styles from './index.module.less';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/constants';
import { useTitle } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';

// eslint-disable-next-line react-refresh/only-export-components
export default () => {
  interface IValue {
    tel: string;
    code: string;
    autoLogin: boolean;
  }
  const nav = useNavigate();
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const [params] = useSearchParams();
  const { store } = useUserContext();
  useTitle('登录');
  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values,
    });
    if (res.data.login.code === 200) {
      store.refetchHandler?.();
      console.log('store1', store);
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      nav(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data.login.message);
  };

  return (
    <ProConfigProvider hashed={false}>
      <div className={styles.container}>
        <LoginForm
          initialValues={{ tel: '19985444029' }}
          onFinish={loginHandler}
          logo="http://water-drop-wj.oss-cn-hangzhou.aliyuncs.com/images/jay2.jpg"
        >
          <Tabs
            centered
            items={[
              {
                key: 'phoneNumber',
                label: '手机号登录',
              },
            ]}
          />
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="tel"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              phoneName="tel"
              name="code"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async (tel: string) => {
                console.log(tel);
                const res = await run({
                  variables: {
                    tel,
                  },
                });
                if (res.data.sendCodeMsg.code === 200) {
                  message.success(res.data.sendCodeMsg.message);
                } else {
                  message.error(res.data.sendCodeMsg.message);
                }
              }}
            />
          </>
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              忘记密码
            </a>
          </div>
        </LoginForm>
      </div>
    </ProConfigProvider>
  );
};
