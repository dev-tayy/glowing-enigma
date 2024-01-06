export enum DiscountMode {
  ONLINE = 'online',
  IN_STORE = 'in_store',
}

export enum GenericErrorMessages {
  MUTATE = 'Failed to update data. Please check the provided information and try again. If the issue persists, contact support.',
  FETCH = 'Error fetching data. Please ensure a stable internet connection and try again. If the issue persists, contact support.',
  BAD_AUTH = 'Authentication failed. Please check your credentials and try again.',
  SERVER = 'Internal server error. Please try again later or contact support.',
  UNAUTHORIZED = 'Unauthorized access. Please log in to continue.',
}
