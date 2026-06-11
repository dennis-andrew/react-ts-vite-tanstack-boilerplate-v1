import Axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { deserialize, serialize } from 'serializr'
import { Attachment, AttachmentPresignedUrl } from 'src/models/attachment.model'
import { ApiRoutes } from 'src/routes/routeConstants/apiRoutes'
import axiosInstance from 'src/interceptor/axiosInstance'
// Service function declarations
const generatePresignedUrl = async (file: File) => {
  const payload = {
    attachment: serialize(Attachment, {
      format: file.type,
      name: file.name,
    }),
  }

  const { data } = await axiosInstance.post(
    ApiRoutes.ATTACHMENT_PRESIGNED_URL,
    payload,
  )

  const attachmentPreSignedUrl = deserialize(
    AttachmentPresignedUrl,
    data.attachment,
  )

  return attachmentPreSignedUrl
}

const uploadToS3 = async ({
  attachment,
  file,
}: {
  attachment: Attachment
  file: File
}) => {
  if (!attachment.url) throw new Error('Attachment URL is required')

  const { data } = await Axios.put(attachment.url, file)
  return data
}

const addAttachment = async (attachment: Attachment) => {
  const response = await axiosInstance.post(ApiRoutes.ATTACHMENTS, {
    attachment: serialize(Attachment, attachment),
  })

  const data = deserialize(Attachment, response.data.attachment)
  return data
}

const uploadAttachment = async (file: File) => {
  const attachment = await generatePresignedUrl(file)
  await uploadToS3({ attachment, file })

  const newAttachment = await addAttachment({
    s3Key: attachment?.key,
    size: file.size,
    name: file.name,
    format: attachment.format,
  })

  return newAttachment
}

// Custom hooks
const useGeneratePresignedUrlMutation = () => {
  return useMutation({
    mutationFn: generatePresignedUrl,
  })
}

const useUploadToS3Mutation = () => {
  return useMutation({
    mutationFn: uploadToS3,
  })
}

const useAddAttachmentMutation = () => {
  return useMutation({
    mutationFn: addAttachment,
  })
}

const useUploadAttachmentMutation = () => {
  return useMutation({
    mutationFn: uploadAttachment,
  })
}

export {
  useGeneratePresignedUrlMutation,
  useUploadToS3Mutation,
  useAddAttachmentMutation,
  useUploadAttachmentMutation,
}
