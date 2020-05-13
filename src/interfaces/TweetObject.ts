export interface TweetObject {
  created_at: string
  id: number
  id_str: string
  text: string
  source: string
  truncated: boolean
  in_reply_to_status_id?: any
  in_reply_to_status_id_str?: any
  in_reply_to_user_id?: any
  in_reply_to_user_id_str?: any
  in_reply_to_screen_name?: any
  user: User
  geo?: any
  coordinates?: any
  place?: any
  contributors?: any
  is_quote_status: boolean
  quote_count: number
  reply_count: number
  retweet_count: number
  favorite_count: number
  entities: Entities
  favorited: boolean
  retweeted: boolean
  filter_level: string
  lang: string
  timestamp_ms: string
}

interface Entities {
  hashtags: any[]
  urls: any[]
  user_mentions: any[]
  symbols: any[]
}

interface User {
  id: number
  id_str: string
  name: string
  screen_name: string
  location: string
  url: string
  description: string
  translator_type: string
  protected: boolean
  verified: boolean
  followers_count: number
  friends_count: number
  listed_count: number
  favourites_count: number
  statuses_count: number
  created_at: string
  utc_offset?: any
  time_zone?: any
  geo_enabled: boolean
  lang?: any
  contributors_enabled: boolean
  is_translator: boolean
  profile_background_color: string
  profile_background_image_url: string
  profile_background_image_url_https: string
  profile_background_tile: boolean
  profile_link_color: string
  profile_sidebar_border_color: string
  profile_sidebar_fill_color: string
  profile_text_color: string
  profile_use_background_image: boolean
  profile_image_url: string
  profile_image_url_https: string
  profile_banner_url: string
  default_profile: boolean
  default_profile_image: boolean
  following?: any
  follow_request_sent?: any
  notifications?: any
}
