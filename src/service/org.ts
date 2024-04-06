import { COMMIT_ORG, GET_ORG, GET_ORGS, GET_SAMPLE_ORGS } from '@/graphql/org';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { TBasePrganization, TOrgQuery, TOrgsQuery } from '@/utils/types';
import { useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';

export const useOrganizations = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  isSample = false,
) => {
  const { loading, data, refetch } = useQuery<TOrgsQuery>(
    isSample ? GET_SAMPLE_ORGS : GET_ORGS,
    {
      variables: {
        page: {
          pageNum,
          pageSize,
        },
      },
    },
  );

  return {
    loading,
    refetch,
    page: data?.getOrganizations.page,
    data: data?.getOrganizations.data,
  };
};
export const useOrganization = (id: string) => {
  const { loading, data } = useQuery<TOrgQuery>(GET_ORG, {
    variables: {
      id,
    },
  });

  return {
    loading,
    data: data?.getOrganizationInfo.data,
  };
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const useEditInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_ORG);
  const handleEdit = async (id: number, params: TBasePrganization) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    message.info(res.data.commitOrganization.message);
  };
  return [handleEdit, loading];
};
