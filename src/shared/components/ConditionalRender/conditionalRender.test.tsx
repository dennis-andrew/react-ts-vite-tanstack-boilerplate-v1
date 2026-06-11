import { render } from 'src/shared/utils/tests.utils'
import ConditionalRender from '.'
import { screen } from '@testing-library/react'

describe('<ConditionalRender />', () => {
  const welcomeMessage = 'Hello World'

  it.each(['sam', true, {}, [], 1])(
    'should render the children if truthy value (%s) is passed',
    (visible) => {
      const children = <h1>{welcomeMessage}</h1>

      render(
        <ConditionalRender visible={visible}>{children}</ConditionalRender>,
      )

      const message = screen.getByText(welcomeMessage)

      expect(message).toBeVisible()
    },
  )

  it.each(['', false, null, 0])(
    'should not render the children if falsy value (%s) is passed',
    (visible) => {
      const children = <h1>{welcomeMessage}</h1>

      render(
        <ConditionalRender visible={visible}>{children}</ConditionalRender>,
      )

      const message = screen.queryByText(welcomeMessage)

      expect(message).toBeNull()
    },
  )

  it.each(['', false, null, 0])(
    'should render the fallback component if falsy value (%s) is passed',
    (visible) => {
      const fallbackText = 'Fallback Message'

      const children = <h1>{welcomeMessage}</h1>
      const fallback = <h1>{fallbackText}</h1>

      render(
        <ConditionalRender visible={visible} fallback={fallback}>
          {children}
        </ConditionalRender>,
      )

      const fallbackElement = screen.getByText(fallbackText)

      expect(fallbackElement).toBeVisible()
    },
  )
})
