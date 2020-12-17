import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { FooterComponentQuery } from "../../types/graphql-types"
import { AppBar, Typography } from "@material-ui/core"
import Bio from "./bio"

const Footer: React.FunctionComponent = () => {
  const data: FooterComponentQuery = useStaticQuery(graphql`
    query FooterComponent {
      blogmura: file(absolutePath: { regex: "/blogmura.gif/" }) {
        childImageSharp {
          fluid(maxWidth: 160) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  
  return (
  <AppBar position="static" component="footer">
    <Bio />
    <Typography align="center" variant="caption">
      © {new Date().getFullYear()}, Built with{` `}
      <a href="https://www.gatsbyjs.org">Gatsby</a>
      <p>
        This website uses Cookie to ensure you get the best experience on this
        website.
      </p>
      <a href="https://blogmura.com/profiles/11085449?p_cid=11085449">
        <Image
          fluid={data.blogmura.childImageSharp.fluid}
          alt="PVアクセスランキング にほんブログ村"
        />
      </a>
    </Typography>
  </AppBar>
)}

export default Footer
