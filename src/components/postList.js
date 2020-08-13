import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { Typography, Grid, Card, CardHeader, CardMedia, CardContent, CardActions, CardActionArea, Button, Divider } from '@material-ui/core'
import styled from "@emotion/styled";
import PostTag from "./postTag"

const Postcard = styled(Card)`
  margin-top: 16px;
`
const ReadmoreButton = styled(CardActions)`
  justify-content:flex-end;
`

const postList = ({ props }) => {

  const postCards = (
    props.map(({ node }) => {

      const coverTitleText = `${node.frontmatter.title} cover image`
      const postCoverBox = node.frontmatter.cover != null ? (<Img fluid={{ ...node.frontmatter.cover.childImageSharp.fluid, aspectRatio: 16 / 9 }} title={coverTitleText} />) : (<CardMedia image="/image/dummy.jpg" title={coverTitleText} style={{ paddingTop: '56.25%' }} />)

      return (
        <Grid item xs={12} md={6} key={node.id}>
          <Postcard>
            <CardActionArea aria-label={node.frontmatter.title}>
              <Link to={node.fields.slug} style={{ textDecoration: 'none' }}>
                <CardHeader title={node.frontmatter.title} subheader={node.frontmatter.date} component="h2" />
              </Link>
            </CardActionArea>
            <Divider variant="middle" />
            <PostTag tags={node.frontmatter.tags} />
            {postCoverBox}
            <CardContent>
              <Typography component="p">{node.excerpt}</Typography>
            </CardContent>
            <ReadmoreButton>
              <Button variant="contained" color="secondary" href={node.fields.slug} disableElevation >この記事を読む</Button>
            </ReadmoreButton>
          </Postcard>
        </Grid>
      )
    })
  )
  return (
    <Grid container spacing={2}>
      {postCards}
    </Grid>
  )
}

export default postList
