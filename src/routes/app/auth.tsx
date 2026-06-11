import { createFileRoute } from '@tanstack/react-router'
import AuthWrapper from 'src/views/Auth/AuthWrapper'

export const Route = createFileRoute('/auth')({
  component: AuthWrapper,
})
