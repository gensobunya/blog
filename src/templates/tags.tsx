import React from "react"
import { PageProps,graphql } from "gatsby"
import { TagPageQuery,SitePageContext } from "../../types/graphql-types"
import { VStack } from "@chakra-ui/react"


import Layout from "../components/layout"
import SEO from "../components/seo"
import PostList from "../components/organisms/postList"
import TagList from "../components/molecules/tagList"

const Tags : React.FunctionComponent<PageProps<TagPageQuery, SitePageContext>> = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark
  const pageTitle = `Tag search : ${tag} | 幻想サイクル`
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={pageTitle} location={location} />
      <VStack>
          <TagList targetTag={tag} />
          <PostList props={edges} />
      </VStack>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(truncate: true)
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            cover {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
            draft
          }
        }
      }
    }
  }
`
