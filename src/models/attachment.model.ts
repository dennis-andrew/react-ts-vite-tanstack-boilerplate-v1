import { alias, primitive, serializable } from 'serializr'
import { AttachmentFormat } from 'src/enums/attachmentFormat'
export class AttachmentPresignedUrl {
  @serializable
  url?: string

  @serializable
  format?: AttachmentFormat

  @serializable
  key?: string
}

export class Attachment {
  @serializable
  id?: string

  @serializable
  name?: string

  @serializable
  format?: string

  @serializable(alias('s3_key', primitive()))
  s3Key?: string

  @serializable
  size?: number

  @serializable
  url?: string

  @serializable(alias('thumbnail_s3_key', primitive()))
  thumbnailS3Key?: string

  @serializable(alias('thumbnail_url', primitive()))
  thumbnailUrl?: string
}
