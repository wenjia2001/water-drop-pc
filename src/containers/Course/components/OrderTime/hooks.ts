import { useEditCourseInfo, useCourseInfo } from '@/service/course';
import { IOrderTime, IWeekCourse, TWeek } from '@/utils/types';
import { useMemo } from 'react';
import { isWorkDay } from '../../constants';
import { DAYS } from './constants';

export const useOrderTime = (id: string, curDayKey: TWeek) => {
  const [edit, editLoading] = useEditCourseInfo();

  const { data, loading, refetch } = useCourseInfo(id);

  const orderTime = useMemo(
    () =>
      (data?.reducibleTime || []).find((item) => item.week === curDayKey)
        ?.orderTime || [],
    [data, curDayKey],
  );

  const onSaveHandler = (ot: IOrderTime[]) => {
    const rt = [...(data?.reducibleTime || [])];
    const index = rt.findIndex((item) => item.week === curDayKey);
    if (index > -1) {
      rt[index] = {
        week: curDayKey,
        orderTime: ot,
      };
    } else {
      rt.push({
        week: curDayKey,
        orderTime: ot,
      });
    }
    edit(
      id,
      {
        reducibleTime: rt,
      },
      () => refetch(),
    );
  };

  const onDeleteHandler = (key: number) => {
    const newData = orderTime.filter((item) => item.key !== key);
    onSaveHandler(newData);
  };

  const allWorkDaySyncHandler = () => {
    const rt: IWeekCourse[] = [];
    DAYS.forEach((item) => {
      if (isWorkDay(item.key)) {
        rt.push({
          week: item.key,
          orderTime,
        });
      }
    });
    edit(
      id,
      {
        reducibleTime: rt,
      },
      () => refetch(),
    );
  };

  const allWeekSyncHandler = () => {
    const rt: IWeekCourse[] = [];
    DAYS.forEach((item) => {
      rt.push({
        week: item.key,
        orderTime,
      });
    });
    edit(
      id,
      {
        reducibleTime: rt,
      },
      () => refetch(),
    );
  };

  return {
    orderTime,
    loading: loading || editLoading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  };
};
