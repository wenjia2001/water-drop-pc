import { useCourse, useEditCourseInfo } from '@/service/course';
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
} from 'antd';
import { useEffect, useState } from 'react';

const { TextArea } = Input;
interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

const EditCourse = ({ onClose, id }: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditCourseInfo();
  const [open, setOpen] = useState(true);
  const { getCourse, loading } = useCourse();

  useEffect(() => {
    const init = async () => {
      if (id) {
        const res = await getCourse(id);
        form.setFieldsValue(res);
      } else {
        form.resetFields();
      }
    };
    init();
  }, [id]);
  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      edit(id, values, onClose);
    }
  };

  return (
    <Drawer
      title={id ? '编辑课程' : '新建课程'}
      width={720}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      extra={
        <Space>
          <Button onClick={() => onClose()}>取消</Button>
          <Button
            loading={editLoading}
            onClick={onSubmitHandler}
            type="primary"
          >
            提交
          </Button>
        </Space>
      }
    >
      <Spin spinning={loading}>
        <Form form={form}>
          <Form.Item
            label="课程名称"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="课程描述"
            name="desc"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Row gutter={50}>
            <Col>
              <Form.Item
                label="限制人数"
                name="limitNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={0} addonAfter="人" />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="持续时长"
                name="duration"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber min={0} addonAfter="分钟" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="适龄人群"
            name="group"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="基础能力"
            name="baseAbility"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="预约信息" name="reserveInfo">
            <TextArea rows={5} showCount maxLength={200} />
          </Form.Item>
          <Form.Item
            label="退款信息"
            name="refundInfo"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="其他信息" name="otherInfo">
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

EditCourse.defaultProps = {
  id: '',
};

export default EditCourse;
