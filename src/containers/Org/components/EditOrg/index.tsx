import UploadImage from '@/components/OSSImageUpload';
import style from './index.module.less';
import {
  Col,
  Drawer,
  Form,
  Row,
  Spin,
  Input,
  Select,
  Divider,
  Button,
} from 'antd';
import { useEditInfo, useOrganization } from '@/service/org';
import { useMemo, useState } from 'react';
import { UploadFile } from 'antd/lib';
import { IOrganization } from '@/utils/types';

interface IPop {
  id: string;
  onClose: () => void;
}
/**
 *
 */
const EditOrg = ({ id, onClose }: IPop) => {
  const [form] = Form.useForm();
  const { data, loading: queryLoading } = useOrganization(id);
  const [edit, editLoading] = useEditInfo();
  const [open, setOpen] = useState(true);
  const onFinishHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const formData = {
        ...values,
        logo: values.logo[0].url,
        tags: values.tags.join(','),
        identityCardBackImg: values.identityCardBackImg[0].url,
        identityCardFrontImg: values.identityCardFrontImg[0].url,
        businessLicense: values.businessLicense[0].url,
        orgFrontImg: values?.orgFrontImg.map((item: UploadFile) => ({
          url: item.url,
        })),
        orgRoomImg: values?.orgRoomImg.map((item: UploadFile) => ({
          url: item.url,
        })),
        orgOtherImg: values?.orgOtherImg.map((item: UploadFile) => ({
          url: item.url,
        })),
      } as IOrganization;
      edit(id, formData);
      () => onClose();
    }
  };
  const initValue = useMemo(
    () =>
      data
        ? {
            // ...data,
            tags: data.tags.split(','),
            logo: [{ url: data.logo }],
            identityCardBackImg: [{ url: data.identityCardBackImg }],
            identityCardFronImg: [{ url: data.identityCardFrontImg }],
            businessLicense: [{ url: data.businessLicense }],
          }
        : {},
    [data],
  );
  if (queryLoading) {
    return <Spin />;
  }
  return (
    <Drawer
      title="编辑门店信息"
      width="70vw"
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      footer={
        <Button loading={editLoading} type="primary" onClick={onFinishHandler}>
          保存
        </Button>
      }
    >
      <Form form={form} initialValues={initValue} layout="vertical">
        <Row className={style.row} gutter={20}>
          <Col span={10}>
            <Form.Item
              style={{ width: '100%' }}
              label="Logo"
              name="logo"
              rules={[{ required: true }]}
            >
              <UploadImage maxCount={1} label="替换logo" />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              style={{ width: '100%' }}
              label="名称"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入店铺名称" />
            </Form.Item>
          </Col>
        </Row>
        <Row className={style.row} gutter={20}>
          <Col span={11}>
            <Form.Item label="标签" name="tags" rules={[{ required: true }]}>
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="请输入标签"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item label="手机号" name="tel" rules={[{ required: true }]}>
              <Input placeholder="请输入手机号" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="经度"
              name="longitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入经度" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="纬度"
              name="latitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="请输入纬度" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="地址" name="address" rules={[{ required: true }]}>
          <Input placeholder="地址" />
        </Form.Item>
        <Form.Item
          label="门店简介"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            maxLength={500}
            rows={5}
            className={style.textArea}
            allowClear
            showCount
          />
        </Form.Item>
        <Row className={style.row} gutter={20}>
          <Col span={8}>
            <Form.Item
              label="营业执照"
              name="businessLicense"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="替换营业执照"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="身份证正面"
              name="identityCardFrontImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="替换身份证"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="身份证反面"
              name="identityCardBackImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="替换身份证"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>门店顶部图：图片要求长宽比例为 2:1 ，最多上传 5 张</Divider>
        <Form.Item name="orgFrontImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>门店室内图：图片要求长宽比例为 2:1 ，最多上传 5 张</Divider>
        <Form.Item name="orgRoomImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>门店其他图：图片要求长宽比例为 2:1 ，最多上传 5 张</Divider>
        <Form.Item name="orgOtherImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditOrg;
