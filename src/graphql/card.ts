import { gql } from '@apollo/client';

export const GET_CARDS = gql`
  query getCards($courseId: String!) {
    getCards(courseId: $courseId) {
      code
      message
      data {
        id
        name
        type
        time
        validityDay
      }
    }
  }
`;

export const COMMIT_CARD = gql`
  mutation commitCardInfo(
    $params: CardInput!
    $courseId: String!
    $id: String
  ) {
    commitCardInfo(params: $params, id: $id, courseId: $courseId) {
      code
      message
    }
  }
`;

export const GET_CARD_INFO = gql`
  query getCardInfo($id: String!) {
    getCardInfo(id: $id) {
      code
      message
      data {
        id
        name
        type
        time
        validityDay
        course {
          name
        }
      }
    }
  }
`;

export const DELETE_CARDS = gql`
  mutation deleteCard($id: String!) {
    deleteCard(id: $id) {
      code
      message
    }
  }
`;
