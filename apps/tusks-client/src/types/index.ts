export interface RootObject {
  lists: List[];
  categories: any[];
  prefs: Prefs;
  visibility: Visibility;
  archived: boolean;
  workspaces: string[];
  members: Member[];
  cards: Card[];
  activeBg: string;
  title: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  lastViewed: string;
  id: string;
}

export interface Card {
  attachments: any[];
  archived: boolean;
  colorCover: string;
  listId: string;
  dueComplete: boolean;
  dueReminder: number;
  comments: any[];
  labels: any[];
  checklists: any[];
  shortDesc: string;
  description: string;
  assignees: any[];
  title: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  coverUrl?: CoverUrl;
  due?: string;
  start?: string;
}

export interface CoverUrl {
  edgeColor: string;
  image: string;
  active: boolean;
}

export interface Member {
  id: string;
  permissionFlag: number;
}

export interface Visibility {
  private: boolean;
  public: boolean;
  team: boolean;
  workspace: boolean;
}

export interface Prefs {
  image: string;
  color: string;
}

export interface List {
  archived: boolean;
  cards: string[];
  title: string;
  boardId: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface IUnsplashImage {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at?: any;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description?: any;
  alt_description?: any;
  urls: Urls;
  links: Links;
  categories: any[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[];
  sponsorship: Sponsorship;
  topic_submissions: Topicsubmissions;
  user: Sponsor;
  tags: any[];
}

interface Topicsubmissions {}

interface Sponsorship {
  impression_urls: any[];
  tagline: string;
  tagline_url: string;
  sponsor: Sponsor;
}

interface Sponsor {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username?: any;
  portfolio_url: string;
  bio: string;
  location?: any;
  links: Links2;
  profile_image: Profileimage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}

interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username?: any;
  paypal_email?: any;
}

interface Profileimage {
  small: string;
  medium: string;
  large: string;
}

interface Links2 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
