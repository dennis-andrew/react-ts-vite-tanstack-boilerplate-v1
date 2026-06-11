import React, { CSSProperties, FC, ReactNode } from 'react'
import { Tabs as AntdTabs } from 'antd'
type tabItems = {
  closeIcon?: ReactNode
  disabled?: boolean
  forceRender?: boolean
  key: string
  label: ReactNode
  children: ReactNode
}

interface TabsProps {
  activeKey?: string
  addIcon?: ReactNode
  centered?: boolean
  defaultActiveKey?: string
  hideAdd?: boolean
  items: tabItems[]
  moreIcon?: ReactNode
  tabBarGutter?: number
  tabBarStyle?: CSSProperties
  tabPosition?: 'top' | 'bottom' | 'right' | 'left'
  type?: 'line' | 'card' | 'editable-card'
  onEdit?: () => void
}
const Tabs: FC<TabsProps> = (props) => {
  const {
    items,
    type = 'line',
    tabPosition = 'top',
    activeKey,
    moreIcon,
    defaultActiveKey,
    addIcon,
    hideAdd,
    centered,
    tabBarGutter,
    onEdit,
    tabBarStyle,
  } = props
  return (
    <div className="tabs__component">
      <AntdTabs
        type={type}
        tabPosition={tabPosition}
        moreIcon={moreIcon}
        tabBarGutter={tabBarGutter}
        tabBarStyle={tabBarStyle}
        activeKey={activeKey}
        defaultActiveKey={defaultActiveKey}
        addIcon={addIcon}
        hideAdd={hideAdd}
        centered={centered}
        onEdit={onEdit}
        items={items}
      />
    </div>
  )
}

export default Tabs
