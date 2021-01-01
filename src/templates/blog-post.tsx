import React from "react"
import { PageProps,graphql } from "gatsby"
import { Box, Text, Divider, Heading, HStack } from "@chakra-ui/react"
import { CalendarIcon } from "@chakra-ui/icons"
import { BlogPostBySlugQuery,SitePageContext } from "../../types/graphql-types"

import Layout from "../components/layout"
import SEO from "../components/utils/seo"
import Share from "../components/molecules/share"
import PostTag from "../components/molecules/postTag"
import PrevAndNextPost from "../components/molecules/prevAndNextpost"
import TagList from "../components/molecules/tagList"
import RelatedPosts from "../components/organisms/relatedPosts"
import BlogPostStyle from "../styles/blog-post.style"



const BlogPostTemplate: React.FunctionComponent<PageProps<BlogPostBySlugQuery, SitePageContext>> = (props) => {
  const { pageContext, data, location } = props
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title
  const { previous, next } = pageContext
  const seoImage =
    post.frontmatter.cover != null
      ? post.frontmatter.cover.childImageSharp.fluid.src
      : "/image/dummy.jpg"
  const relatedPostsComponent = post.frontmatter.tags != null
      ? <RelatedPosts tag={post.frontmatter.tags[0]} />
      : null
  

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
        image={seoImage}
        location={location}
      />
      <Box outline="none">
        <article>
            <header>
              <time dateTime={post.frontmatter.date}>
                <HStack pt="0.25rem">
                  <CalendarIcon />
                  <Text color="GrayText" fontSize="sm">
                    {post.frontmatter.date}
                  </Text>
                </HStack>
              </time>
              <Heading as="h1" fontSize={{ base: "2xl", md: "4xl"}}>
                {post.frontmatter.title}
              </Heading>
              <PostTag tags={post.frontmatter.tags} />
            </header>
            <Divider />
            <Text
              as="div"
              dangerouslySetInnerHTML={{ __html: post.html }}
              className="post-body"
              css={BlogPostStyle}
            />
        </article>
        <Divider />
        <Share title={post.frontmatter.title} location={location} />
      </Box>
      <PrevAndNextPost previous={previous} next={next} />
      {/* <Text as="h2">最近の似た記事</Text>
      {relatedPostsComponent} */}
      <TagList />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(truncate: true)
      html
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
`
