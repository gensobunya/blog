import * as functions from "firebase-functions"
import fetch from "node-fetch"
const jsdom = require("jsdom")
const { JSDOM } = jsdom
const ProductAdvertisingAPIv1 = require("paapi5-nodejs-sdk")

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

interface Props {
  url: string
  isAmazonLink?: boolean
}

export const getOgpLinkData = functions
  .region("asia-northeast1")
  .https.onCall(async (data: Props, context) => {
    functions.logger.info("Url:", data.url, "isAmazon", data.isAmazonLink)

    const result = {
      title: "",
      imageUrl: "",
      description: "",
      siteName: "",
      ogpIcon: "",
      error: "",
    }
    const urlConstructor = new URL(data.url)
    const urlDomain = urlConstructor.hostname

    if (data.isAmazonLink) {
      try {
        if (
          process.env.AMAZON_PAAPI_KEY ||
          process.env.AMAZON_PAAPI_SECRET ||
          process.env.PARTNER_TAG
        ) {
          result.error = "Didn't set PAAPIv5 parameters"
          return result
        }
        const httpResponse = await fetch(data.url)
        const html = await httpResponse.text()
        const document = new JSDOM(html)
        const asin = document.querySelector("#ASIN")?.getAttribute("value")

        const defaultClient = ProductAdvertisingAPIv1.ApiClient.instance
        defaultClient.accessKey = process.env.AMAZON_PAAPI_KEY
        defaultClient.secretKey = process.env.AMAZON_PAAPI_SECRET
        defaultClient.host = "webservices.amazon.co.jp"
        defaultClient.region = "us-west-2"

        // const api = new ProductAdvertisingAPIv1.DefaultApi()
        var getItemsRequest = new ProductAdvertisingAPIv1.GetItemsRequest()

        /** Enter your partner tag (store/tracking id) and partner type */
        getItemsRequest["PartnerTag"] = process.env.PARTNER_TAG
        getItemsRequest["PartnerType"] = "Associates"

        /** Enter the Item IDs for which item information is desired */
        getItemsRequest["ItemIds"] = [asin]

        getItemsRequest["Condition"] = "New"

        /**
         * Choose resources you want from GetItemsResource enum
         * For more details, refer: https://webservices.amazon.com/paapi5/documentation/get-items.html#resources-parameter
         */
        getItemsRequest["Resources"] = [
          "Images.Primary.Medium",
          "ItemInfo.Title",
          "Offers.Listings.Price", //必要な項目だけ取る
        ]

        //この辺にリターン処理

        return null
      } catch (error) {
        console.error(error)
        result.error = error
        return result
      }
    } else {
      try {
        const httpResponse = await fetch(data.url)
        const html = await httpResponse.text()
        const document = new JSDOM(html)
        result.title =
          document
            .querySelector("meta[property='og:title']")
            ?.getAttribute("content") ||
          document
            .querySelector("meta[name='title']")
            ?.getAttribute("content") ||
          document.querySelector("title")?.innerText ||
          ""
        result.imageUrl =
          document
            .querySelector("meta[property='og:image']")
            ?.getAttribute("content") || ""
        result.description =
          document
            .querySelector("meta[property='og:description']")
            ?.getAttribute("content") ||
          document
            .querySelector("meta[name='description']")
            ?.getAttribute("content") ||
          ""
        result.siteName =
          document
            .querySelector("meta[property='og:site_name']")
            ?.getAttribute("content") || urlDomain

        const siteIconPath =
          document
            .querySelector("[type='image/x-icon']")
            ?.getAttribute("href") || "/favicon.ico"
        result.ogpIcon = siteIconPath.includes("//")
          ? siteIconPath
          : `https://${urlDomain}${siteIconPath}` //絶対パスに変換

        return result
      } catch (error) {
        console.error(error)
        result.error = error
        return result
      }
    }
  })
