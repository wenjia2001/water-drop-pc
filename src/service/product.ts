import {
  COMMIT_PRODUCT,
  GET_PRODUCTS,
  GET_PRODUCT,
  DELETE_PRODUCT,
} from '@/graphql/product';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { TBaseProduct, TProductsQuery, TProductQuery } from '@/utils/types';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { message } from 'antd';
import { useMemo } from 'react';

export const useProducts = (pageNum = 1, pageSize = DEFAULT_PAGE_SIZE) => {
  const { loading, data, refetch } = useQuery<TProductsQuery>(GET_PRODUCTS, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });

  const refetchHandler = async (params: {
    pageSize?: number;
    current?: number;
    name?: string;
  }) => {
    const { data: res, error } = await refetch({
      name: params.name,
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });
    if (error) {
      return {
        success: false,
      };
    }
    return {
      total: res?.page?.page.total,
      data: res?.getProducts.data,
      success: true,
    };
  };

  return {
    loading,
    refetch: refetchHandler,
    page: data?.getProducts.page,
    data: data?.getProducts.data,
  };
};

export const useEditProductInfo = (): [
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleEdit: Function,
  loading: boolean,
] => {
  const [edit, { loading }] = useMutation(COMMIT_PRODUCT);
  const handleEdit = async (
    id: number,
    params: TBaseProduct,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    // if (res.data.commitProductInfo.code === 200) {
    message.success(res.data.commitProductInfo.message);
    callback(true);
    // return;
  };
  // message.error(res.data.commitProductInfo.message);
  // };
  return [handleEdit, loading];
};

export const useProduct = () => {
  const [get, { loading }] = useLazyQuery(GET_PRODUCT);
  const getProduct = async (id: string) => {
    const res = await get({
      variables: {
        id,
      },
    });
    return res.data.getProductInfo.data;
  };
  return { getProduct, loading };
};
export const useProductInfo = (id?: string) => {
  const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
    skip: !id,
    variables: {
      id,
    },
  });
  const newData = useMemo(
    () => ({
      ...data?.getProductInfo.data,
      coverUrl: [{ url: data?.getProductInfo.data.coverUrl }],
      bannerUrl: [{ url: data?.getProductInfo.data.bannerUrl }],
    }),
    [data],
  );
  return {
    data: data?.getProductInfo.data ? newData : undefined,
    loading,
    refetch,
  };
};

export const useDeleteProduct = (): [
  // eslint-disable-next-line @typescript-eslint/ban-types
  handleEdit: Function,
  loading: boolean,
] => {
  const [del, { loading }] = useMutation(DELETE_PRODUCT);
  const delHandler = async (id: string, callback: () => void) => {
    const res = await del({
      variables: {
        id,
      },
    });
    // if (res.data.deleteOrganization.code === 200) {
    message.success(res.data.deleteProduct.message);
    callback();
    // return;
    // }
    // message.error(res.data.deleteCard.message);
  };
  return [delHandler, loading];
};
