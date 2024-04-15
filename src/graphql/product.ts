import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query getProducts($page: PageInput!, $name: String) {
    getProducts(page: $page, name: $name) {
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        name
        desc
        stock
        limitBuyNumber
        coverUrl
        bannerUrl
        originalPrice
        preferentialPrice
      }
    }
  }
`;

export const COMMIT_PRODUCT = gql`
  mutation commitProductInfo($params: PartialProductInput!, $id: String) {
    commitProductInfo(params: $params, id: $id) {
      code
      message
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProductInfo($id: String!) {
    getProductInfo(id: $id) {
      code
      message
      data {
        id
        name
        desc
        stock
        limitBuyNumber
        coverUrl
        bannerUrl
        originalPrice
        preferentialPrice
        cards {
          id
          name
          type
          time
          validityDay
          course {
            id
            name
          }
        }
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      code
      message
    }
  }
`;
