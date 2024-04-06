import { Select, Space } from 'antd';
import { useOrganizations } from '@/service/org';
import _ from 'lodash';
import { useUserContext } from '@/hooks/userHooks';
import { LOCAL_CURRENT_ORG } from '@/utils/constants';
import { useEffect } from 'react';
import { useGoTo } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menus';

const currentOrg = () => {
  try {
    const res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '');
    return res;
  } catch {
    return undefined;
  }
};
/**
 *门店选择器
 */
const OrgSelect = () => {
  const { data, refetch } = useOrganizations(1, 10, true);
  const { setStore } = useUserContext();
  const { go } = useGoTo();
  const onSearchHandler = _.debounce((name: string) => {
    refetch({
      name,
    });
  }, 500);
  useEffect(() => {
    if (currentOrg()?.value) {
      setStore({
        currentOrg: currentOrg().value,
      });
    } else {
      go(ROUTE_KEY.NoOrg);
    }
  }, [go, setStore]);
  const onChangeHandler = (val: { value: string; lable: string }) => {
    setStore({
      currentOrg: val.value,
    });
    localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val));
  };
  return (
    <Space>
      选择门店：
      <Select
        style={{ width: 200 }}
        placeholder="请选择门店"
        showSearch
        onSearch={onSearchHandler}
        filterOption={false}
        defaultValue={currentOrg()}
        onChange={onChangeHandler}
        labelInValue
      >
        {data?.map((item) => (
          <Select.Option key={item.id} value={item.id}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default OrgSelect;
