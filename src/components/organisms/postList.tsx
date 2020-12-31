import React from "react"
import { Link } from "gatsby"
import { Box, Grid, GridItem, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons"

import PostTag from "../molecules/postTag"
import PostCoverImage from "../atoms/postCoverImage"
import { IndexPageQuery } from '../../../types/graphql-types'

interface Props {
  props : IndexPageQuery['allMarkdownRemark']['edges']
}

const postList: React.FunctionComponent<Props> = ({ props }) => {

  const postCards = (
    props.map(({ node }, index) => {

      const coverTitleText = `${node.frontmatter.title} cover image`
      const columnSpan = index === 0 ? 2 : 1

      return (
        <GridItem colSpan={columnSpan} key={node.id} >
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Link to={node.fields.slug} style={{ textDecoration: 'none' }}>
              <PostCoverImage cover={node.frontmatter.cover} fluid={{ ...node.frontmatter.cover?.childImageSharp.fluid, aspectRatio: 16 / 9 }} alt={coverTitleText} />
            </Link> 
              <VStack spacing={1} padding={1} alignItems="left">
                <Link to={node.fields.slug} style={{ textDecoration: 'none' }}>
                <Heading as="h2" fontSize="xl">{node.frontmatter.title}</Heading>
                <HStack>
                  <CalendarIcon /><Text color="gray.500">{node.frontmatter.date}</Text>
                </HStack>
              </Link>
              <PostTag tags={node.frontmatter.tags} />
            </VStack>
          </Box>
        </GridItem>
      )
    })
  )
  return (
    <Grid templateColumns="repeat(2,1fr)" gap={2}>
      {postCards}
    </Grid>
  )
}

export default postList
