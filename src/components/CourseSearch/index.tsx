import style from './index.module.less';
import { Select } from 'antd';
import { useCoursesForSample } from '@/service/course';
import _ from 'lodash';

interface IProps {
  onSelected: (val: string) => void;
}
/**
 *课程选择搜索器
 */
const CourseSearch = ({ onSelected }: IProps) => {
  const { search, data, loading } = useCoursesForSample();

  const onSearchHandler = _.debounce((name: string) => {
    search(name);
  }, 500);
  const onChangeHandler = (val: string) => {
    onSelected(val);
  };
  return (
    <Select
      className={style.select}
      showSearch
      loading={loading}
      placeholder="请搜索课程"
      onSearch={onSearchHandler}
      onChange={onChangeHandler}
      filterOption={false}
    >
      {data?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CourseSearch;
