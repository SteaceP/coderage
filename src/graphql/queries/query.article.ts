import { gql } from "@apollo/client";

const ARTICLE_QUERY = gql`
  query Post($slug: String!) {
    posts(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          slug
          title
          content
          rating
          publishedAt
          updatedAt
          category {
            data {
              attributes {
                slug
                Name
              }
            }
          }
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export default ARTICLE_QUERY;
