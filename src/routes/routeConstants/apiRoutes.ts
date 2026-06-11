export const ApiRoutes = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  USER_LOGIN: '/login',
  ATTACHMENTS: '/attachments',
  ATTACHMENTS_SPECIFIC: '/attachments/:id',
  ATTACHMENT_PRESIGNED_URL: '/attachments/get-presigned-url',
}
