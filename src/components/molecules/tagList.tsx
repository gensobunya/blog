import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { TagListQuery } from '../../../types/graphql-types'
import { Button, HStack, Tag } from "@chakra-ui/react"

interface Props {
  targetTag?:string
}

const TagList : React.FunctionComponent<Props> = ({ targetTag }) => {
  const data:TagListQuery = useStaticQuery(graphql`
    query TagList {
      allMarkdownRemark(filter: { frontmatter: { draft: { eq: false } } }) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  const allTagAndCount = data.allMarkdownRemark
  const tagArray = allTagAndCount.group.map((tagdata) => {
    const tag = tagdata.fieldValue
    const count = tagdata.totalCount
    const buttonColor = tag === targetTag ? "blue" : "gray"

    return (
      <Link
        to={`/tags/${tag.toLowerCase()}`}
        style={{ textDecoration: "none" }}
        key={tag}
      >
        <Button 
          key={tag}
          icon={<Tag />}
          label={`${tag}:${count}`}
          size="sm"
          variant="solid"
          colorScheme={buttonColor}
        >
          {`${tag}:${count}`}
        </Button>
      </Link>
    )
  })

  return <HStack>{tagArray}</HStack>
}

export default TagList
