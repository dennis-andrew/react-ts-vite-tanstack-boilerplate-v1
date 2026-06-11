import { createFileRoute, notFound } from '@tanstack/react-router'
import AppComponents from 'src/views/AppComponents'

export const Route = createFileRoute('/app-components')({
  beforeLoad: () => {
    if (!import.meta.env.VITE_UNDER_DEVELOPMENT) {
      throw notFound()
    }
  },
  component: AppComponents,
})
