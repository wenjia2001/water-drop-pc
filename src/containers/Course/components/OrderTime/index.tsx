import { Button, Col, Drawer, Row, Space, Tabs } from 'antd';
import { useState } from 'react';
import { EditableProTable } from '@ant-design/pro-components';
import { DAYS, IDay, getColumns } from './constants';
import style from './index.module.less';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { IOrderTime } from '@/utils/types';
import { getMaxKey, isWorkDay } from '../../constants';
import { useOrderTime } from './hooks';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}
/**
 *
 */
const OrderTime = ({ id, onClose }: IProps) => {
  const [curDay, setCurDay] = useState(DAYS[0]);
  const [open, setOpen] = useState(true);
  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((itme) => itme.key === key) as IDay;
    setCurDay(current);
  };
  const {
    orderTime,
    loading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  } = useOrderTime(id, curDay.key);
  return (
    <Drawer
      title={'编辑可约时间'}
      width={720}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      forceRender
    >
      <Tabs items={DAYS} type="card" onChange={onTabChangeHandler} />
      <EditableProTable<IOrderTime>
        headerTitle={
          <Space>
            选择
            <span className={style.name}>{curDay.label}</span>
            的课开放预约时间
          </Space>
        }
        loading={loading}
        rowKey="key"
        recordCreatorProps={{
          record: () => ({
            key: getMaxKey(orderTime) + 1,
            startTime: '12:00:00',
            endTime: '12:30:00',
          }),
        }}
        value={orderTime}
        columns={getColumns(onDeleteHandler)}
        editable={{
          onSave: async (rowKey, d) => {
            let newData;
            if (
              orderTime &&
              orderTime.findIndex((item) => item.key === rowKey) > -1
            ) {
              newData = orderTime?.map((item) =>
                item.key === rowKey ? _.omit(d, 'index') : { ...item },
              );
              console.log('newData', newData);
              return;
            }
            newData = [...(orderTime || []), _.omit(d, 'index')];
            console.log('newData', newData);
            onSaveHandler(newData);
          },
          onDelete: async (id) => {
            onDeleteHandler(id as number);
          },
        }}
      />
      <Row gutter={20} className={style.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            onClick={allWorkDaySyncHandler}
            disabled={!isWorkDay(curDay.key)}
          >
            全工作日同步
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: '100%' }}
            type="primary"
            danger
            onClick={allWeekSyncHandler}
          >
            全周同步
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default OrderTime;
