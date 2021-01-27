import * as functions from "firebase-functions"

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const helloWorld = functions
  .region("asia-northeast1")
  .https.onCall((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true })
    functions.logger.info(
      process.env.AMAZON_PAAPI_KEY,
      process.env.AMAZON_PAAPI_SECRET
    )
    return "Hello from Firebase!"
  })
