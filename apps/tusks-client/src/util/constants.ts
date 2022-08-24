interface IWorkspaceLink {
  key: string
  title: string
  link: string
}

export const ROUTES = {
  billing: 'billing',
  board: 'board',
  home: '/',
  login: 'auth/login',
  mfa: 'auth/mfa',
  settings: 'settings',
  signup: 'auth/signup',
  verify: 'auth/verify',
  workspace: 'workspace',
  templates: 'templates',
  notification: 'notification',
  forgotPassword: 'auth/forgot-password',
}

export const APP_NAME = 'Tusks'

export const HOME_SIDEBAR_PRIMARY = [
  { key: 'boards', title: 'Home', link: '/' },
  { key: 'templates', title: 'Templates', link: '/templates' },
]

export const NEW_BOARD_BG_OPTIONS = [
  {
    key: 0,
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    key: 1,
    image:
      'https://images.unsplash.com/photo-1593642532871-8b12e02d091c?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
  },
  {
    key: 2,
    image:
      'https://images.unsplash.com/photo-1627598359861-f83052a1248f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
  },
  {
    key: 3,
    image:
      'https://images.unsplash.com/photo-1627635174707-a629d585e1e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
  },
  { key: 4, color: 'rgb(0, 121, 191)' },
  { key: 5, color: 'rgb(210, 144, 52)' },
  { key: 6, color: 'rgb(81, 152, 57)' },
  { key: 7, color: 'rgb(176, 70, 50)' },
]

export const PROFILE_TAB_OPTIONS = [
  { key: 'profile', title: 'Profile and visibility', id: 0 },
  { key: 'activity', title: 'Activity', id: 1 },
  { key: 'cards', title: 'Cards', id: 2 },
  { key: 'settings', title: 'Settings', id: 3 },
  { key: 'billing', title: 'Upgrade Plans', id: 4 },
]

export const WORKSPACE_TAB_OPTIONS = [
  { key: 'boards', title: 'Boards', id: 0 },
  { key: 'members', title: 'Members', id: 1 },
  { key: 'settings', title: 'Settings', id: 2 },
  { key: 'edit', title: 'Edit Workspace details', id: 3, disableButton: true },
]

export const WORKSPACE_VISIBILITY_OPTIONS = [
  {
    key: 'private',
    title: 'Private',
    description:
      "This Workspace is public. It's visible to anyone with the link and will show up in search engines like Google. Only those invited to the Workspace can add and edit Workspace boards.",
  },
  {
    key: 'public',
    title: 'Public',
    description:
      "This Workspace is private. It's not indexed or visible to those outside the Workspace.",
  },
]

export const PROFILE_SETTINGS_OPTIONS = [
  { key: 'two-step-auth', title: 'Two-step verification' },
  { key: 'power-up', title: 'Power ups' },
  { key: 'delete-account', title: 'Delete account' },
]

export const MFA_TAB_OPTIONS = [
  { key: 'verify', title: 'Verify Password', id: 0 },
  { key: 'install', title: 'Install', id: 1 },
  { key: 'connect', title: 'Connect phone', id: 2 },
  { key: 'setup', title: 'Setup recovery', id: 3 },
]

export const AUTHENTICATOR_OPTIONS = [
  { key: 'google', title: 'Google Authenticator' },
  { key: 'authy', title: 'Authy' },
  { key: 'duo', title: 'Duo Mobile' },
]

export enum DRAG_TYPES {
  CARD = 'CARD',
  LIST = 'LIST',
  FOREIGN_CARD = 'FOREIGN_CARD',
}

export const LABEL_DEFAULT_OPTIONS = [
  { color: '#61bd4f', name: '' },
  { color: '#f2d600', name: '' },
  { color: '#ff9f1a', name: '' },
  { color: '#eb5a46', name: '' },
  { color: '#c377e0', name: '' },

  { color: '#0079bf', name: '' },
  { color: '#00c2e0', name: '' },
  { color: '#51e898', name: '' },
  { color: '#ff78cb', name: '' },
  { color: '#344563', name: '' },

  { color: '#838c91', name: '' },
]

export const COLORS_IMAGE =
  'https://res.cloudinary.com/drxavrtbi/image/upload/c_fit,w_1000/v1630793219/trello-clone/robert-katzki-jbtfM0XBeRc-unsplash_cfgosx.jpg'

export const PHOTOS_IMAGE =
  'https://res.cloudinary.com/drxavrtbi/image/upload/c_scale,w_1000/v1630793751/trello-clone/pexels-pineapple-supply-co-191429_xvc8hc.jpg'

export const SPOTIFY_SCOPES =
  'user-read-email playlist-modify-private playlist-read-private user-read-playback-state'

export const SPOTIFY_LOGO =
  'https://res.cloudinary.com/drxavrtbi/image/upload/c_scale,w_40/v1631265632/trello-clone/assets/Spotify_Icon_CMYK_Green_gwzjmc.png'

export const SPOTIFY_REVOKE_ACCESS_ENDPOINT =
  'https://www.spotify.com/ie/account/apps/'

export const SPOTIFY_ACCESS_SCOPES = [
  'user-read-playback-state, user-read-currently-playing, user-modify-playback-state',
]

export const LIST_ACTIONS = {
  menu: {
    key: 'menu',
    title: 'List actions',
    main: true,
  },
  move: {
    key: 'move',
    title: 'Move list',
  },

  archive: {
    key: 'archive',
    title: 'Archive',
  },
}

export const ALLOWED_IMAGE_OPTIONS = ['png', 'jpeg', 'jpg', 'gif']

export const DUE_DATE_REMINDERS = [
  { key: 0, label: 'At time of due date' },
  { key: 5, label: '5 minute before' },
  { key: 10, label: '10 minute before' },
  { key: 15, label: '15 minute before' },
  { key: 60, label: '1 Hour before' },
  { key: 120, label: '2 Hours before' },
  { key: 1440, label: '1 Day before' },
  { key: 2880, label: '2 Days before' },
]

export const WORKSPACE_TYPES = [
  { key: 'engineering', name: 'Engineering-IT' },
  { key: 'sales', name: 'Sales CRM' },
  { key: 'marketing', name: 'Marketing' },
  { key: 'education', name: 'Education' },
  { key: 'operations', name: 'Operations' },
  { key: 'business', name: 'Small Business' },
  { key: 'hr', name: 'Human Resources' },
  { key: 'default', name: 'Other' },
]

export const TEMPLATE_CATEGORIES = [
  { key: 'business', description: 'Business' },
  { key: 'design', description: 'Design' },
  { key: 'education', description: 'Education' },
  { key: 'engineering', description: 'Engineering' },
  { key: 'marketing', description: 'Marketing' },
  { key: 'operations-hr', description: 'HR & Operations' },
  { key: 'personal', description: 'Personal' },
  { key: 'productivity', description: 'Productivity' },
  { key: 'product-management', description: 'Product Management' },
  { key: 'project-management', description: 'Project Management' },
  { key: 'remote-work', description: 'Remote Work' },
  { key: 'sales', description: 'Sales' },
  { key: 'support', description: 'Support' },
  { key: 'team-management', description: 'Team Management' },
]

export const CATEGORY_OPTIONS = [
  'business',
  'design',
  'education',
  'engineering',
  'marketing',
]

export const TOP_TEMPLATE_OPTIONS = [
  'Business Plan',
  'Design Project Template',
  'Lesson Planning',
  'Agile Sprint Board',
  'Kanban Template',
  'Agile Marketing',
  'Job Hunt',
  'Find Your Passion in Life',
  'Daily Task Management',
]

export enum ACTION_KEYS {
  CREATE_BOARD = 'created:board',
  DELETED_BOARD = 'deleted:board',
  ARCHIVED_BOARD = 'archived:board',

  CREATE_CARD = 'created:card',
  TRANSFER_CARD = 'transferred:card',
  COMMENT_ON_CARD = 'commented:on:card',
  ADD_CHECKLIST = 'added:checklist:to:card',
  MOVE_CARD_TO_LIST = 'moved:card:from:list:to:list',
  MOVE_CARD_UP = 'moved:card:up',
  MOVE_CARD_DOWN = 'moved:card:down',
  DELETED_CARD = 'deleted:card',
  ARCHIVED_CARD = 'archived:card',
  CONVERT_TASK_TO_CARD = 'converted:task:to:card',
  CHANGED_CARD_COVER = 'added:card:cover',
  REMOVED_CARD_COVER = 'removed:card:cover',
  ADD_CARD_ATTACHMENT = 'added:card:attachment',
  REMOVE_CARD_ATTACHMENT = 'removed:card:attachment',

  CREATE_LIST = 'add:list:to:board',
  TRANSFER_LIST = 'transferred:list',
  DELETED_LIST = 'deleted:list',
  ARCHIVED_LIST = 'archived:list',
  MOVE_LIST_LEFT = 'move:list:left',
  MOVE_LIST_RIGHT = 'move:list:right',
}
