import { gql } from "@apollo/client"

const FEATURED_ARTICLES_QUERY = gql`
  query isFeatured {
    posts(filters: { isFeatured: { eq: true } }) {
      data {
        attributes {
          slug
          title
          synopsis
          isFeatured
          publishedAt
          category {
            data {
              attributes {
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
`

export default FEATURED_ARTICLES_QUERY
