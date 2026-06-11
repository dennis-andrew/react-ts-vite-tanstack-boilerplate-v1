import { FC, useState } from 'react'
import { InboxOutlined } from '@ant-design/icons'
import { Col, Row, Space, type CheckboxChangeEvent } from 'antd'
import { AppComponentsConstants } from 'src/constants/appComponents'
import { Gender } from 'src/enums/genders.enum'
import { INPUT_TYPE } from 'src/enums/inputType'
import { tooltipPosition } from 'src/enums/tooltipPosition'
import Accordion from 'src/shared/components/Accordion'
import BreadCrumb from 'src/shared/components/BreadCrumb'
import Button from 'src/shared/components/Button'
import Checkbox from 'src/shared/components/Checkbox'
import CustomAvatar from 'src/shared/components/CustomAvatar'
import DatePicker from 'src/shared/components/DatePickerField'
import DeleteModal from 'src/shared/components/DeleteModal'
import Drawer from 'src/shared/components/Drawer'
import Dropdown from 'src/shared/components/DropdownField'
import FileUpload from 'src/shared/components/FileUpload'
import Form from 'src/shared/components/Form'
import InputField from 'src/shared/components/InputField'
import Loader from 'src/shared/components/Loader'
import Modal from 'src/shared/components/Modal'
import OTPField from 'src/shared/components/OTPField'
import Radio from 'src/shared/components/Radio'
import SearchField from 'src/shared/components/SearchField'
import Skeleton from 'src/shared/components/Skeleton'
import Stepper from 'src/shared/components/Stepper'
import Switch from 'src/shared/components/Switch'
import Table from 'src/shared/components/Table'
import Tabs from 'src/shared/components/Tabs'
import Timeline from 'src/shared/components/Timeline'
import Tooltip from 'src/shared/components/Tooltip'
import './appComponents.scss'
const AppComponents: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [checked, setChecked] = useState(true)
  const [radio, setRadio] = useState<string | number>()
  const [searchValue, setSearchValue] = useState('')

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const handleCheckboxGroup = (_e: (string | number)[]) => {
    // Handle checkbox group change
  }

  const handleCheckbox = (_e: CheckboxChangeEvent) => {
    setChecked((prevState) => !prevState)
  }

  const modalFooter = [
    <Button key="back" clickHandler={handleCloseModal}>
      Cancel
    </Button>,
    <Button key="submit" type="primary" clickHandler={handleCloseModal}>
      Submit
    </Button>,
  ]
  const OpenCloseDrawer = () => setIsDrawerOpen(!isDrawerOpen)

  const activeKeyChanged = (_key: string | string[]) => {
    // Handle active key change
  }

  return (
    <div className="app-components">
      <h1 className="text-center text-decoration">App Components</h1>
      <Form
        defaultValues={{ startDate: '', gender: '', otp: '', framework: '' }}
        onSubmit={() => {}}
      >
        {() => (
          <Space direction="vertical">
            <Row className="app-components" align="top" gutter={[24, 24]}>
              <Col span={8}>
                <p className="app-components__title">Drawer: </p>
                <Drawer
                  closable={true}
                  onClose={OpenCloseDrawer}
                  open={isDrawerOpen}
                  placement="left"
                  title="Menu"
                >
                  <p>This is the drawer</p>
                </Drawer>
                <Button clickHandler={OpenCloseDrawer}>Open</Button>
              </Col>
              <Col span={8}>
                <p className="app-components__title">Tooltip: </p>
                <Space>
                  <Tooltip
                    title="This is a tooltip"
                    placement={tooltipPosition.BOTTOM}
                  >
                    <Button>Hover</Button>
                  </Tooltip>
                </Space>
              </Col>

              <Col span={8}>
                <p className="app-components__title">Switch: </p>
                <Switch />
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Button: </p>
                <Row>
                  <Col span={8}>
                    <Button type="primary">Primary Button</Button>
                  </Col>
                  <Col span={8}>
                    <Button type="default">Default Button</Button>
                  </Col>
                  <Col span={8}>
                    <Button loading type="primary">
                      Loading Button
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Search: </p>
                <SearchField
                  setSearchValue={setSearchValue}
                  searchValue={searchValue}
                  onSearch={() => {}}
                />
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Input: </p>

                <InputField
                  type={INPUT_TYPE.TEXT}
                  name="input"
                  placeholder="Enter some text"
                />
                <DatePicker.Formik name="startDate" />
                <Dropdown.Formik
                  name="gender"
                  placeholder="Choose Gender"
                  options={[
                    { label: 'Male', value: Gender.MALE },
                    { label: 'Female', value: Gender.FEMALE },
                  ]}
                />
                <OTPField.Formik name="otp" />
                <Radio.Formik
                  name="framework"
                  options={[
                    { label: 'React', value: 'react' },
                    { label: 'Angular', value: 'angular' },
                  ]}
                  label="Category"
                />
                <div className="mt-5">
                  <Button type="primary" className="mr-4">
                    Primary Button
                  </Button>
                  <Button>Default Button</Button>
                </div>
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">Select: </p>

                <Dropdown
                  name="select"
                  options={AppComponentsConstants.OPTIONS}
                  onChange={() => {}}
                  placeholder={'Select'}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Select (Multiple):</p>

                <Dropdown
                  name="select"
                  options={AppComponentsConstants.OPTIONS}
                  mode={'multiple'}
                  onChange={() => {}}
                  placeholder={'Select'}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Avatar: </p>

                <Row>
                  <Col span={8}>
                    <p>Small</p>

                    <CustomAvatar name="Joe Pelz" size="small" />
                  </Col>
                  <Col span={8}>
                    <p>Large</p>
                    <CustomAvatar name="Tanya Cruz" size="large" />
                  </Col>
                  <Col span={8}>
                    <p>Unnamed</p>
                    <CustomAvatar name="" size="large" />
                  </Col>
                </Row>
              </Col>
              <Col span={8}>
                <p className="mt-5 app-components__title">File upload:</p>
                <FileUpload handleChange={() => {}}>
                  <Button>Upload File</Button>
                </FileUpload>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Drag and Drop:</p>
                <FileUpload
                  dragdrop
                  handleChange={() => {}}
                  uploadIcon={<InboxOutlined />}
                  uploadText={
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  }
                ></FileUpload>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Modal:</p>
                <Modal
                  closeModal={handleCloseModal}
                  visible={isModalOpen}
                  title="Modal"
                  handleOk={handleCloseModal}
                  footer={modalFooter}
                >
                  This is the Modal body
                </Modal>
                <Button clickHandler={handleOpenModal}>Open</Button>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Delete Modal:</p>
                <DeleteModal
                  resource="component"
                  description="I recommend not to delete it though :("
                >
                  <Button>Delete</Button>
                </DeleteModal>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Loader:</p>
                <Loader tip="Loading.." />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Checkbox:</p>
                <Checkbox
                  checked={checked}
                  onChange={(event) => {
                    if (!Array.isArray(event)) {
                      handleCheckbox(event)
                    }
                  }}
                >
                  Checkbox
                </Checkbox>
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Checkbox Group:</p>
                <Checkbox
                  group
                  options={AppComponentsConstants.OPTIONS}
                  onChange={(event) => {
                    if (Array.isArray(event)) {
                      handleCheckboxGroup(event)
                    }
                  }}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Radio:</p>

                <Radio
                  options={AppComponentsConstants.OPTIONS}
                  value={radio}
                  name="radio"
                  onChange={(event) => {
                    setRadio(event.target.value)
                  }}
                />
              </Col>

              <Col span={8}>
                <p className="mt-5 app-components__title">Skeleton:</p>
                <Skeleton />
              </Col>

              <Col span={11}>
                <p className="mt-5 app-components__title">Tabs: </p>
                <Tabs items={AppComponentsConstants.TABS} />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <p className="mt-5 app-components__title">Breadcrumb: </p>
                <BreadCrumb params={AppComponentsConstants.BREADCRUMB_PARAMS} />
              </Col>
              <Col span={11}>
                <p className="mt-5 app-components__title">Accordion: </p>
                <Accordion
                  defaultActiveKey="2"
                  accordionList={AppComponentsConstants.LIST}
                  onChange={activeKeyChanged}
                />
              </Col>
              <Col span={2} />

              <Col span={11}>
                <p className="mt-5 app-components__title">Timeline: </p>
                <Timeline items={AppComponentsConstants.TIMELINE_ITEMS} />
              </Col>

              <Col span={24}>
                <p className="mt-5 app-components__title">Steps:</p>
                <Stepper items={AppComponentsConstants.STEPPER_ITEMS} />
              </Col>
              <Col span={24}>
                <p className="mt-5 app-components__title">Table:</p>
                <Table
                  columns={AppComponentsConstants.TABLE.COLUMS}
                  dataSource={AppComponentsConstants.TABLE.DATA}
                />
              </Col>
            </Row>
          </Space>
        )}
      </Form>
    </div>
  )
}

export default AppComponents
