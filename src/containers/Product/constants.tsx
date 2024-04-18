import { IProduct, IOrderTime } from '@/utils/types';
import { ProColumns } from '@ant-design/pro-components';
import { Space, Image, Popconfirm } from 'antd';

interface IProps {
  onEditHandler: (id: string) => void;
  onCardHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
  onStatusHandler: (id: string, status: string) => void;
}
const PRODUCT_STATUS = {
  LIST: 'LIST', //商品上架
  UN_LIST: 'UN_LIST', //商品下架
};
export const getColumns: (props: IProps) => ProColumns<IProduct, 'text'>[] = ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
  onStatusHandler,
}) => [
  {
    dataIndex: 'id',
    title: '#',
    valueType: 'indexBorder',
    search: false,
    align: 'center',
    width: 50,
  },
  {
    dataIndex: 'coverUrl',
    title: '封面',
    search: false,
    align: 'center',
    width: 100,
    render: (_, record: IProduct) => <Image src={record.coverUrl} />,
  },
  {
    title: '商品名',
    dataIndex: 'name',
    ellipsis: true,
    copyable: true,
    align: 'center',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项必填',
        },
      ],
    },
  },
  {
    title: '原价',
    dataIndex: 'originalPrice',
    width: 50,
    align: 'center',
    search: false,
  },
  {
    title: '优惠价',
    dataIndex: 'preferentialPrice',
    width: 80,
    align: 'center',
    search: false,
  },
  {
    title: '库存总数',
    dataIndex: 'stock',
    width: 80,
    align: 'center',
    search: false,
  },
  {
    title: '当前库存',
    dataIndex: 'curstock',
    width: 80,
    align: 'center',
    search: false,
  },
  {
    title: '销量',
    dataIndex: 'buyNumber',
    width: 50,
    align: 'center',
    search: false,
  },
  {
    title: '每人限购',
    dataIndex: 'limitiBuyNumber',
    width: 80,
    align: 'center',
    search: false,
  },
  {
    title: '操作',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (_text, entity) => (
      <Space>
        {entity.status === PRODUCT_STATUS.UN_LIST ? (
          <a
            key="list"
            type="link"
            onClick={() => onStatusHandler(entity.id, PRODUCT_STATUS.LIST)}
          >
            上架
          </a>
        ) : (
          <a
            key="unList"
            style={{ color: 'green' }}
            type="link"
            onClick={() => onStatusHandler(entity.id, PRODUCT_STATUS.UN_LIST)}
          >
            下架
          </a>
        )}
        <a key="edit" type="link" onClick={() => onEditHandler(entity.id)}>
          编辑
        </a>
        <a key="order" type="link" onClick={() => onCardHandler(entity.id)}>
          绑定消费卡
        </a>
        <Popconfirm
          title="提醒"
          description="确认要删除吗？"
          onConfirm={() => onDeleteHandler(entity.id)}
        >
          <a
            key="detele"
            type="link"
            style={{
              color: 'red',
            }}
          >
            删除
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];

export const isWorkDay = (day: string) =>
  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

export const getMaxKey = (orderTime: IOrderTime[]): number => {
  const keys = orderTime?.map((item) => item.key) || [];
  if (keys.length === 0) {
    return 0;
  }
  return Math.max(...keys);
};
