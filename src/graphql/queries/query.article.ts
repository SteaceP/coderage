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
          writer {
            data {
              attributes {
                Name
                posts {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
              }
            }
          }
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
                formats
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
