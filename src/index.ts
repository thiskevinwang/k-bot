import Twit from "twit"
import { config } from "dotenv"
import { Autohook } from "twitter-autohook"
import fs from "fs"

// import { createMessage } from "./createMessage"

config()
// sanity check
// console.log(process.env.ACCESS_TOKEN)

// const T = new Twit({
//   consumer_key: process.env.API_KEY!,
//   consumer_secret: process.env.API_SECRET_KEY!,
//   access_token: process.env.ACCESS_TOKEN,
//   access_token_secret: process.env.ACCESS_TOKEN_SECRET,
//   timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
//   strictSSL: true, // optional - requires SSL certificates to be valid.
// })
// trump user_id: `25073877`
// screen_name: 'realDonaldTrump'
// var stream = T.stream("statuses/filter", {
//   follow: ["25073877"],
// })

// stream.on("tweet", function (tweet) {
//   console.log(tweet)
//   // createMessage?.({ tweet })
// })

/**
 * Permissions need to be
 * Read, write, and Direct Messages
 * @see https://developer.twitter.com/en/apps/16078846
 * @see https://twittercommunity.com/t/getting-error-code-348-while-trying-to-add-subscription/101796/6
 */
;(async start => {
  try {
    const webhook = new Autohook({
      token: process.env.APP_ACCESS_TOKEN,
      token_secret: process.env.APP_ACCESS_TOKEN_SECRET,
      consumer_key: process.env.API_KEY,
      consumer_secret: process.env.API_SECRET_KEY,
      env: "sandbox",
    })

    // Removes existing webhooks
    await webhook.removeWebhooks()

    // Starts a server and adds a new webhook
    await webhook.start()

    // Subscribes to your own user's activity
    await webhook.subscribe({
      oauth_token: process.env.APP_ACCESS_TOKEN,
      oauth_token_secret: process.env.APP_ACCESS_TOKEN_SECRET,
    })

    /**
     * https://developer.twitter.com/en/docs/accounts-and-users/subscribe-account-activity/guides/account-activity-data-objects
     */
    webhook.on("event", async event => {
      console.log("You received an event!", event)
      console.log(event)
      let data = JSON.stringify(event)
      // fs.writeFileSync(`${new Date().getTime()}.json`, data)
    })
  } catch (e) {
    // Display the error and quit
    console.error(e)
    process.exit(1)
  }
})()

interface Evvent {
  for_user_id: string
  tweet_create_events?: {}[]
  tweet_delete_events?: { status: {}; timestamp_ms: string }[]
}
