export const AppComponentsConstants = {
  OPTIONS: [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ],
  BREADCRUMB_PARAMS: [
    {
      path: '',
      breadcrumbName: 'Home',
    },
    {
      path: '',
      breadcrumbName: 'Components',
    },
    {
      path: '',
      breadcrumbName: 'Breadcrumb',
    },
  ],

  LIST: [
    {
      id: '1',
      title: 'Panel 1',
      description: 'This is the first accordion panel',
      showArrow: true,
    },
    {
      id: '2',
      title: 'Panel 2',
      description: 'This is the second accordion panel (without arrow)',
      showArrow: false,
    },
    {
      id: '3',
      title: 'Panel 3',
      description: 'This is the third accordion panel',
      showArrow: true,
    },
  ],
  TABS: [
    {
      key: 'tab_1',
      label: 'Tab 1',
      children: 'This is Tab 1',
    },
    {
      key: 'tab_2',
      label: 'Tab 2',
      children: 'This is Tab 2',
    },
    {
      key: 'tab_3',
      label: 'Tab 3',
      children: 'This is Tab 3',
    },
  ],
  TIMELINE_ITEMS: [
    {
      label: 'Step 3',
      children: 'Demonstrating components',
    },
    {
      label: 'Step 2',
      children: 'Approving components',
    },
    {
      label: 'Step 1',
      children: 'Creating components',
    },
  ],
  STEPPER_ITEMS: [
    {
      title: 'Waiting',
      component: <>Waiting Step Component</>,
    },
    {
      title: 'In Progress',
      component: <>In Progress Step Component</>,
    },
    {
      title: 'Finished',
      component: <>Finished Step Component</>,
    },
  ],
  TABLE: {
    COLUMS: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
    ],
    DATA: [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '1 Up Town',
      },
    ],
  },
}
