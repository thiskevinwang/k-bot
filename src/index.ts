import Twit from "twit"
import { config } from "dotenv"
import { Autohook } from "twitter-autohook"

config()
// sanity check
// console.log(process.env.ACCESS_TOKEN)

const T = new Twit({
  consumer_key: process.env.API_KEY!,
  consumer_secret: process.env.API_SECRET_KEY!,
  access_token: process.env.APP_ACCESS_TOKEN,
  access_token_secret: process.env.APP_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
})

const main = async () => {
  try {
    const webhook = new Autohook({
      token: process.env.APP_ACCESS_TOKEN,
      token_secret: process.env.APP_ACCESS_TOKEN_SECRET,
      consumer_key: process.env.API_KEY,
      consumer_secret: process.env.API_SECRET_KEY,
      env: "sandbox",
      port: 80,
    })

    // Removes existing webhooks
    await webhook.removeWebhooks()
    console.log("__removed")

    // Starts a server and adds a new webhook
    await webhook.start()
    console.log("__started")

    // Subscribes to your own user's activity
    await webhook.subscribe({
      oauth_token: process.env.APP_ACCESS_TOKEN,
      oauth_token_secret: process.env.APP_ACCESS_TOKEN_SECRET,
    })
    console.log("__subscribed")

    webhook.on("event", async event => {
      const screenName = event?.follow_events?.[0]?.source?.screen_name

      if (screenName && screenName !== "thekevinwang") {
        T.post("statuses/update", {
          status: `🤖 Meep. Thanks for following me, @${screenName}! 🎈🎉`,
        })
      }
    })
  } catch (e) {
    // Display the error and quit
    console.error("$$$", e)
    console.log({ ...e })
    process.exit(1)
  }
}

main()
