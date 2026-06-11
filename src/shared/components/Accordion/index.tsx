import React, { ReactNode } from 'react'
import { Collapse, type CollapseProps } from 'antd'
type AccordionType = {
  id: string
  title: ReactNode
  description: ReactNode
  showArrow: boolean
}

type AccordionProps = {
  accordionList: AccordionType[]
  defaultActiveKey: string
  onChange?: (key: string | string[]) => void
}

const Accordion = ({
  accordionList,
  defaultActiveKey = '1',
  onChange,
}: AccordionProps) => {
  const items: CollapseProps['items'] = accordionList.map((item) => ({
    key: item.id,
    label: item.title,
    children: item.description,
    showArrow: item.showArrow,
  }))

  return (
    <Collapse
      accordion
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      items={items}
    />
  )
}

export default Accordion
