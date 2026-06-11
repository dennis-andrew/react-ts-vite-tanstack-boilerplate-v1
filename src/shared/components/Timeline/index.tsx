import React, { FC, ReactNode } from 'react'
import {
  Timeline as AntdTimeline,
  type TimelineProps as AntdTimelineProps,
} from 'antd'
type itemsType = {
  label: ReactNode
  children: ReactNode
  dot?: ReactNode
  position?: 'left' | 'right'
  color?: string
}

interface TimelineProps {
  mode?: 'left' | 'right' | 'alternate'
  items: itemsType[]
  pending?: boolean | ReactNode
  reverse?: boolean
  pendingDot?: ReactNode
}

const Timeline: FC<TimelineProps> = (props) => {
  const { mode = 'left', items, pending, reverse, pendingDot } = props

  const timelineItems: AntdTimelineProps['items'] = items.map(
    (item, index) => ({
      key: index,
      label: item.label,
      children: item.children,
      dot: item.dot,
      color: item.color,
      position: item.position,
    }),
  )

  return (
    <AntdTimeline
      mode={mode}
      pending={pending}
      reverse={reverse}
      pendingDot={pendingDot}
      items={timelineItems}
    />
  )
}

export default Timeline
