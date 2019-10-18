import React from "react"
import { Link } from "gatsby"
// import Img from "gatsby-image"
import { Typography, Container, Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea, Button, Chip } from '@material-ui/core'
import { LocalOffer } from '@material-ui/icons';
import styled from "@emotion/styled";
import PostTag from "./postTag"

const PostContainer = styled(Container)`
`
const Postcard = styled(Card)`
  margin:20px;
`
const PostExcerpt = styled(Typography)`
`
const ReadmoreButton = styled(Button)`
`

const postList = ({ props }) => {
  const postCards = (
    props.map(({ node }) => (
      <Postcard key={node.id}>
        <CardActionArea>
          <Link to={node.fields.slug}>
            <CardHeader title={node.frontmatter.title} subheader={node.frontmatter.date} />
          </Link>
        </CardActionArea>
        {node.frontmatter.tags != null ? (
          <PostTag tags={node.frontmatter.tags} />
        ) : (
            <Chip label="No tags" size="small" icon={<LocalOffer />} />
          )}
        {node.frontmatter.cover != null ? (
          <CardMedia image={node.frontmatter.cover.childImageSharp.fluid.src} title={`${node.frontmatter.title} cover image`} style={{ paddingTop: '56.25%' }} />
        ) : (
            <img src="/image/dummy.jpg" alt="no cover" />
          )}
        <CardContent>
          <PostExcerpt component="p">{node.excerpt}</PostExcerpt>
        </CardContent>

        <CardActions>
          <ReadmoreButton color="secondary" href={node.fields.slug}>続きを読む</ReadmoreButton>
        </CardActions>
      </Postcard>
    ))
  )
  return (
    <PostContainer maxWidth="sm">
      {postCards}
    </PostContainer>
  )
}

export default postList