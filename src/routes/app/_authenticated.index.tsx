import { createFileRoute } from '@tanstack/react-router'
import Home from 'src/views/Home'

export const Route = createFileRoute('/_authenticated/')({
  component: Home,
})
