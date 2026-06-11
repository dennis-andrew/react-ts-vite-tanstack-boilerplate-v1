import { serializable } from 'serializr'
export class User {
  @serializable
  email?: string

  @serializable
  password?: string

  @serializable
  refreshToken?: string

  @serializable
  accessToken?: string
}
