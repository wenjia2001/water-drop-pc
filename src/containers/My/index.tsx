import { useEffect, useRef } from 'react';
import {
  PageContainer,
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Row, Col, message, Form } from 'antd';
import OSSImageUpload from '@/components/OSSImageUpload';
import { useUserContext } from '@/hooks/userHooks';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '@/graphql/user';

/**
 *个人信息
 */
const My = () => {
  const formRef = useRef<ProFormInstance>();
  const { store } = useUserContext();
  const [updateUserInfo] = useMutation(UPDATE_USER);
  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      avatar: [
        {
          url: store.avatar,
        },
      ],
    });
  }, [store]);
  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar[0]?.url || '',
              },
            },
          });
          if (res.data.updateUserInfo.code === 200) {
            store.refetchHandler?.();
            console.log('store2', store);
            message.success(res.data.updateUserInfo.message);
            // window.location.reload(); // 刷新页面
            return;
          }
          message.success('更新成功');
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              name="tel"
              label="手机号"
              tooltip="不能修改"
              disabled
            />
            <ProFormText name="name" label="昵称" placeholder="请输入昵称" />
            <ProFormTextArea
              name="desc"
              label="简介"
              placeholder="请输入简介信息"
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OSSImageUpload label="更换头像" />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
