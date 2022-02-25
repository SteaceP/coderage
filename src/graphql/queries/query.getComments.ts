import { gql } from "@apollo/client";

const COMMENTS_FLAT_QUERY = gql`
  query getComments($postID: String!) {
    findAllFlat(relation: $postID) {
      data {
        id
        blocked
        approvalStatus
        blockedThread
        createdAt
        updatedAt
        content
        removed
        threadOf {
          id
        }
        author {
          id
          name
          email
          avatar
        }
      }
    }
  }
`;

export default COMMENTS_FLAT_QUERY;