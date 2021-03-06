import React from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  LineShareButton,
  FacebookIcon,
  TwitterIcon,
  LineIcon,
} from "react-share";
import shareConfig from "../utils/shareConfig"
import styled from "@emotion/styled"
import { IconButton } from "@chakra-ui/react";
import { FaShareAlt } from "@react-icons/all-files/fa/FaShareAlt"
import { WindowLocation } from "@reach/router"


interface Props {
  location? : WindowLocation
  title? : string
}

const sharebox : React.FunctionComponent<Props> = ({ title, location }) => {

  const ShareBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    margin: 8px 0px 8px 0px;
    padding: 16px;

    .sharebutton-box{
      display: flex;
      margin-left: 10px;
    }
  `

  //モバイル端末で標準の共有APIをコールする
  const kickShareApi = async (shareData) => {
    console.dir(shareData)
    try {
      await navigator.share(shareData)
      console.info("Success sharing", shareData)
    } catch (err) {
      console.error('Error: ' + err)
    }
  }

  return (
    <ShareBox className="social-share">
      <IconButton fontSize="24px" variant="none" aria-label="share this page" icon={<FaShareAlt />} onClick={() => {
        kickShareApi({
          title: `${title}| 幻想サイクル`,
          url: location.href,
        })
      }}/>
      <FacebookShareButton url={location.href} className="sharebutton-box">
        <FacebookIcon size={shareConfig.iconSize} round={shareConfig.isRoundIcon} />
      </FacebookShareButton>
      <TwitterShareButton url={location.href} title={`${title}| 幻想サイクル`} className="sharebutton-box">
        <TwitterIcon size={shareConfig.iconSize} round={shareConfig.isRoundIcon} />
      </TwitterShareButton>
      <LineShareButton url={location.href} title={`${title}| 幻想サイクル`} className="sharebutton-box">
        <LineIcon size={shareConfig.iconSize} round={shareConfig.isRoundIcon} />
      </LineShareButton>
    </ShareBox >
  )
}

export default sharebox
