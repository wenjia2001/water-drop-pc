import { ICourse, IOrderTime } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

interface IProps {
  onEditHandler: (id: string) => void;
  onOrderTimeHandler: (id: string) => void;
}
export const getColumns: ({
  onEditHandler,
  onOrderTimeHandler,
}: IProps) => ProColumns<ICourse, 'text'>[] = ({
  onEditHandler,
  onOrderTimeHandler,
}) => [
  {
    title: '课程标题',
    dataIndex: 'name',
    ellipsis: true,
    copyable: true,
  },
  {
    title: '限制人数',
    dataIndex: 'limitNumber',
    width: 75,
    align: 'center',
    search: false,
  },
  {
    title: '持续时长',
    dataIndex: 'duration',
    width: 75,
    align: 'center',
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (_text, entity) => [
      <>
        <Space>
          <Button
            key="edit"
            type="link"
            onClick={() => onEditHandler(entity.id)}
          >
            编辑
          </Button>
        </Space>
        <Space>
          <Button
            key="order"
            type="link"
            onClick={() => onOrderTimeHandler(entity.id)}
          >
            可约时间
          </Button>
        </Space>
      </>,
    ],
  },
];

export const isWorkDay = (day: string) =>
  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

export const getMaxKey = (orderTime: IOrderTime[]): number => {
  const keys = orderTime?.map((item) => item.key) || [];
  if (keys.length === 0) {
    return 1;
  }
  return Math.max(...keys);
};
