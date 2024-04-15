import { Modal, Result, Row, Space, Typography } from 'antd';
import { CheckCard } from '@ant-design/pro-components';
import {
  // useCards,
  // useDeleteCard,
  useLazyCards,
} from '@/service/card';
import { useEffect, useMemo, useState } from 'react';
import { useEditProductInfo, useProductInfo } from '@/service/product';
import CourseSearch from '@/components/CourseSearch';
import style from './index.module.less';
import _ from 'lodash';
import { CreditCardOutlined } from '@ant-design/icons';
import { getCardName } from '@/utils/constants';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}
/**
 *消费卡
 */
const ConsumeCard = ({ onClose, id }: IProps) => {
  const [edit, editLoading] = useEditProductInfo();
  // const [del, delLoading] = useDeleteCard();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const { getCards, data: cards, loading: getCardsLoading } = useLazyCards();
  const { data: product, loading: getProductLoading } = useProductInfo(id);
  const newCards = useMemo(
    () => _.unionBy(product?.cards || [], cards, 'id'),
    [product?.cards, cards],
  );

  useEffect(() => {
    setSelectedCards(product?.cards?.map((item) => item.id) || []);
  }, [product?.cards]);
  console.log('selectedCards', selectedCards);
  // const onDeleteHandler = (id: string) => {
  //   del(id, refetch);
  // };
  const onOkHandler = () => {
    edit(
      id,
      {
        cards: selectedCards,
      },
      () => onClose(),
      window.location.reload(),
    );
  };
  const onCloseHandler = () => {
    onClose();
  };
  const onSelectedHandler = (courseId: string) => {
    getCards(courseId);
  };
  return (
    <Modal
      title="绑定消费卡"
      width="900"
      open
      onOk={onOkHandler}
      onCancel={onCloseHandler}
    >
      <Row justify="end">
        {newCards.length === 0 && (
          <Result status="warning" title="请搜索课程并选择对应的消费卡" />
        )}
        <CourseSearch onSelected={onSelectedHandler} />
      </Row>
      <Row justify="center" className={style.content}>
        <CheckCard.Group
          multiple
          loading={getProductLoading || getCardsLoading || editLoading}
          onChange={(value) => {
            setSelectedCards(value as string[]);
          }}
          value={selectedCards}
        >
          {newCards.map((item) => (
            <CheckCard
              key={item.id}
              value={item.id}
              size="default"
              avatar={<CreditCardOutlined />}
              title={
                <>
                  <Space>
                    <Typography.Text ellipsis className={style.name}>
                      {item.course?.name}
                    </Typography.Text>
                    <div>{item.name}</div>
                    {getCardName(item.type)}
                  </Space>
                </>
              }
              description={
                <Space>
                  <span>
                    次数：
                    {item.time}
                  </span>
                  <span>
                    有效期：
                    {item.validityDay}
                  </span>
                </Space>
              }
            />
          ))}
        </CheckCard.Group>
      </Row>
    </Modal>
  );
};

export default ConsumeCard;
