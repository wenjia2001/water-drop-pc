import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';

// 卡类型
const CARD_TYPE = {
  TIME: 'time', //次卡
  DURATION: 'duration', //时长卡
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: '序号',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
    render: (d, r, index) => index + 1,
  },
  {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '有效期（天）',
    dataIndex: 'validityDay',
    width: 110,
    valueType: 'digit',
    align: 'center',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 120,
    valueType: 'select',
    align: 'center',
    request: async () => [
      {
        value: CARD_TYPE.TIME,
        label: '次卡',
      },
      {
        value: CARD_TYPE.DURATION,
        label: '时长卡',
      },
    ],
  },
  {
    title: '次数',
    dataIndex: 'time',
    width: 100,
    valueType: 'digit',
    align: 'center',
  },
  {
    title: '操作',
    valueType: 'option',
    width: 150,
    align: 'center',
    render: (_text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.id || '');
          }}
        >
          编辑
        </a>
        <Popconfirm
          title="提醒"
          description="确认要删除吗？"
          onConfirm={() => onDeleteHandler(record.id)}
        >
          <a key="delete">删除</a>
        </Popconfirm>
      </Space>
    ),
  },
];
