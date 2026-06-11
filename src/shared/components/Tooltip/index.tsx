import React, { FC } from 'react'
import { Tooltip as AntdTooltip } from 'antd'
import { tooltipPosition } from 'src/enums/tooltipPosition'
type TooltipProps = {
  title: string
  arrowPointAtCenter?: boolean
  autoAdjustOverflow?: boolean
  color?: string
  placement?: tooltipPosition
  trigger?: 'hover' | 'focus' | 'click'
  zIndex?: number
  children: React.ReactNode
}
const Tooltip: FC<TooltipProps> = (props) => {
  const {
    children,
    title,
    autoAdjustOverflow = true,
    color = 'blue',
    arrowPointAtCenter = true,
    placement = 'top',
    trigger = 'hover',
    zIndex,
  } = props
  return (
    <div className="tooltip-component">
      <AntdTooltip
        title={title}
        arrow={{ pointAtCenter: arrowPointAtCenter }}
        color={color}
        autoAdjustOverflow={autoAdjustOverflow}
        placement={placement}
        trigger={trigger}
        zIndex={zIndex}
      >
        {children}
      </AntdTooltip>
    </div>
  )
}

export default Tooltip
