const END_POINTS = {
  accounts: '/accounts',
  board: '/board',
  boards: '/boards',
  createBoard: '/boards/create',

  lists: '/lists',

  cards: '/cards',

  inviteToBoard: '/auth/invite-to-board',
  acceptBoardInvite: '/auth/accept-board-invite',
  boardMembers: '/auth/board-members',
  connectMfa: '/auth/mfa/connect',
  currentUser: '/auth/me',
  deleteUser: '/auth/delete',
  enableMfa: '/auth/mfa/enable',
  getQrCodeImage: '/auth/mfa/qr-code',
  login: '/auth/login',
  logout: '/auth/logout',
  logoutAll: '/auth/logout-all',
  refreshToken: '/auth/refresh-token',
  requestLink: '/auth/verification-email',
  resendOtp: '/auth/resend-otp',
  signup: '/auth/register',
  updateUser: '/auth/update',
  verify: '/accounts/verify',
  confirmAction: '/auth/confirm-action',
  verifyOtp: '/auth/verify-otp',
  forgotPassword: '/auth/forgot-password',
  updatePassword: '/auth/update-password',
  restoreAccount: '/auth/restore-account',
  restoreAccountVerifyEmail: '/auth/restore-account/verify-email',

  spotify: '/accounts/powerups/spotify',

  payments: '/payments/subscription',
  getBillingOptions: '/payments/products',
  getBillingHistory: '/payments',
};

export default END_POINTS;
