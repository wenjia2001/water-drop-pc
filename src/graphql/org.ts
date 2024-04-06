import { gql } from '@apollo/client';

export const GET_ORGS = gql`
  query getOrganizations($page: PageInput!) {
    getOrganizations(page: $page) {
      code
      message
      page {
        total
        pageNum
        pageSize
      }
      data {
        id
        logo
        name
        address
        tags
      }
    }
  }
`;

export const GET_SAMPLE_ORGS = gql`
  query getOrganizations($page: PageInput!, $name: String) {
    getOrganizations(page: $page, name: $name) {
      code
      message
      data {
        id
        name
      }
    }
  }
`;
export const GET_ORG = gql`
  query getOrganizationInfo($id: String!) {
    getOrganizationInfo(id: $id) {
      code
      message
      data {
        logo
        address
        tel
        longitude
        latitude
        identityCardBackImg
        identityCardFrontImg
        businessLicense
        description
        tags
        id
        name
        orgRoomImg {
          url
        }
        orgFrontImg {
          url
        }
        orgOtherImg {
          url
        }
      }
    }
  }
`;

export const COMMIT_ORG = gql`
  mutation commitOrganization($params: OrganizationInput!, $id: String) {
    commitOrganization(params: $params, id: $id) {
      code
      message
    }
  }
`;
