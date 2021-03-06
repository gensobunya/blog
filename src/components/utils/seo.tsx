import React from "react"
import { WindowLocation } from "@reach/router"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

interface LocationState {
  title: string
  image?: string
  location: WindowLocation
}

interface MetaObject {
  name: string
  content: any
  property?: undefined
}

interface SeoDefaultProps {
  lang?: string
  meta?: MetaObject[]
  description?: string
}

interface Props extends LocationState, SeoDefaultProps {}

const SEO: React.FunctionComponent<Props> = (props) => {
  const { description, lang, meta, title, image, location } = props
  const { site } = useStaticQuery<GatsbyTypes.SeoComponentQuery>(
    graphql`
      query SeoComponent {
        site {
          siteMetadata {
            title
            description
            author
            social {
              twitter
            }
            image
            siteUrl
          }
        }
      }
    `
  )

  const siteUrl = site.siteMetadata.siteUrl
  const currentHost =
    process.env.NODE_ENV === "production" ? siteUrl : location.origin
  const metaDescription = description ?? site.siteMetadata.description
  const metaImage = currentHost + (image ?? site.siteMetadata.image)

  const canonicalUrl = currentHost + location.pathname

  const metaRobotsContent =
    process.env.NODE_ENV === "production" ? "all" : "none"

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={
        location.pathname === "/"
          ? site.siteMetadata.title
          : `%s | ${site.siteMetadata.title}`
      }
      link={[{ rel: "canonical", href: canonicalUrl }]}
      meta={[
        {
          name: `robots`,
          content: `max-image-preview:large`
        },
        {
          name: "robots",
          content: metaRobotsContent
        },
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title
        },
        {
          property: `og:url`,
          content: location.href
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:image`,
          content: metaImage
        },
        {
          property: `og:type`,
          content: `blog`
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          property: `twitter:image`,
          content: metaImage
        },
        {
          name: `twitter:site`,
          content: `@${site.siteMetadata.social.twitter}`
        }
      ].concat(meta)}
    ></Helmet>
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``
}

export default SEO
