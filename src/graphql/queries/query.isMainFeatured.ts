import { gql } from "@apollo/client"

const MAIN_FEATURED_ARTICLES_QUERY = gql`
  query isMainFeatured {
    posts(filters: { isMainFeatured: { eq: true } }) {
      data {
        attributes {
          slug
          title
          synopsis
          isMainFeatured
          publishedAt
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

export default MAIN_FEATURED_ARTICLES_QUERY