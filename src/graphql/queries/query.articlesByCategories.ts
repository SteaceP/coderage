import { gql } from "@apollo/client"

const CATEGORY_ARTICLES_QUERY = gql`
  query ArticlesByCategory($slug: String!) {
    categories(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          Name
          posts {
            data {
              attributes {
                title
                synopsis
                slug
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
      }
    }
  }
`

export default CATEGORY_ARTICLES_QUERY
