import { AspectRatio, Image } from "@chakra-ui/react"
import { GatsbyImage } from "gatsby-plugin-image"

interface Props {
  alt: string
  image: any
}

const postCoverImage: React.FunctionComponent<Props> = ({ image, alt }) =>
  image != null ? (
    <GatsbyImage image={image} alt={alt} />
  ) : (
    <AspectRatio ratio={16 / 9}>
      <Image src="/image/dummy.jpg" alt="cover image" objectFit="cover" />
    </AspectRatio>
  )

export default postCoverImage
