import { IProduct } from '@/utils/types';
import {
  ActionType,
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { getColumns } from './constants';
import { useDeleteProduct, useProducts } from '@/service/product';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import EditProduct from './components/EditProduct';
import { PlusOutlined } from '@ant-design/icons';
import ConsumeCard from './components/ConsumeCard';

/**
 *当前门店下开设的课程
 */
const Product = () => {
  const { refetch, loading } = useProducts();
  const actionRef = useRef<ActionType>();
  const [showInfo, setShowInfo] = useState(false);
  const [curId, setCurId] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [delHandler, delLoading] = useDeleteProduct();
  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };
  const closeAndRefetchHandler = () => {
    setShowInfo(false);
    actionRef.current?.reload();
  };
  const onCardHandler = (id: string) => {
    setCurId(id);
    setShowCard(true);
  };
  const onDeleteHandler = (id: string) => {
    delHandler(id, () => actionRef.current?.reload());
  };
  return (
    <PageContainer header={{ title: '当前门店下开设的课程' }}>
      <ProTable<IProduct>
        rowKey="id"
        loading={delLoading || loading}
        actionRef={actionRef}
        form={{
          ignoreRules: false,
        }}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onCardHandler,
          onDeleteHandler,
        })}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        toolBarRender={() => [
          <Button
            key="add"
            onClick={() => onClickAddHandler()}
            type="primary"
            icon={<PlusOutlined />}
          >
            新建
          </Button>,
        ]}
        request={refetch}
      />
      {showInfo && (
        <EditProduct id={curId} onClose={() => closeAndRefetchHandler()} />
      )}
      {showCard && (
        <ConsumeCard id={curId} onClose={() => setShowCard(false)} />
      )}
    </PageContainer>
  );
};

export default Product;
