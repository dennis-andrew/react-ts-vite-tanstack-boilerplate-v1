import React, { PropsWithChildren } from 'react'

interface ConditionalRenderProps {
  hideFallback?: boolean
  visible?: unknown
  fallback?: React.ReactNode
}

const ConditionalRender: React.FC<
  PropsWithChildren<ConditionalRenderProps>
> = ({ visible, children, hideFallback = false, fallback = <></> }) => (
  <>{visible ? children : hideFallback ? null : fallback}</>
)

export default ConditionalRender
