import { Drawer } from 'antd';
import { ICard } from '@/utils/types';
import { EditableProTable } from '@ant-design/pro-components';
import { getColumns } from './constants';
import { useCards, useDeleteCard, useEditCardInfo } from '@/service/card';
import { useState } from 'react';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}
/**
 *消费卡
 */
const ConsumeCard = ({ onClose, id }: IProps) => {
  const { data, loading, refetch } = useCards(id);
  const [edit, editLoading] = useEditCardInfo();
  const [del, delLoading] = useDeleteCard();
  const [open, setOpen] = useState(true);
  const onDeleteHandler = (id: string) => {
    del(id, refetch);
  };
  const onSaveHandler = (d: ICard) => {
    edit(
      d.id,
      id,
      {
        name: d.name,
        type: d.type,
        time: d.time,
        validityDay: d.validityDay,
      },
      refetch,
    );
    console.log('d', d);
  };
  console.log('id', id);
  return (
    <Drawer
      title="关联消费卡"
      width="70vw"
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
    >
      <EditableProTable<ICard>
        headerTitle="请管理该课程的消费卡"
        rowKey="id"
        loading={loading || editLoading || delLoading}
        recordCreatorProps={{
          record: () => ({
            id: 'new',
            name: '',
            type: 'time',
            time: 0,
            validityDay: 0,
          }),
        }}
        value={data}
        columns={getColumns(onDeleteHandler)}
        editable={{
          onSave: async (rowKey, d) => {
            onSaveHandler(d);
          },
          onDelete: async (id) => {
            onDeleteHandler(id as string);
          },
        }}
      />
    </Drawer>
  );
};

export default ConsumeCard;
