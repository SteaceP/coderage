import { gql } from "@apollo/client";

export type QueryIsFeaturedTypes = {
  attributes?: {
    title?: string;
    description?: string;
    synopsis?: string;
    slug?: string;
    isFeatured: boolean;
    publishedAt: string;
    category: {
      data: {
        attributes?: {
          Name: string;
        };
      };
    };
    image: {
      data: {
        attributes?: {
          formats: any;
          url: string;
        };
      };
    };
  };
};

export const FEATURED_ARTICLES_QUERY = gql`
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
