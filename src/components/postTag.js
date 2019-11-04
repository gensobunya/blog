import React from "react"
import { Link } from "gatsby"
import { Chip, Container } from "@material-ui/core"
import { LocalOffer } from '@material-ui/icons';
import styled from "@emotion/styled"

const TagChip = styled(Chip)`
  margin-left:16px;
  margin-bottom:1em;
`
const TagContainer = styled(Container)`
  padding:0;
`

const PostTag = ({ tags }) => {

  const tagArray = (tags != null) ?
    (
      tags.map((tag) => (
        <Link to={`/tags/${tag.toLowerCase()}`} style={{ textDecoration: 'none' }} key={tag}>
          <TagChip key={tag} label={tag} color="primary" size="small" icon={<LocalOffer />} clickable style={{ textDecoration: `none` }} />
        </Link>
      ))
    ) : (
      <Chip label="No tags" size="small" icon={<LocalOffer />} />
    )

  return (
    <TagContainer>
      {tagArray}
    </TagContainer>
  )
}

export default PostTag