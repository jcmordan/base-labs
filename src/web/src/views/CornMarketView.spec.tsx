import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CornMarketView from './CornMarketView'
import { CreateUserFields } from '../types'
import { CornOrderProvider } from '../context/CornOrderContext'
import userEvent from '@testing-library/user-event'

const OrderConfirmationWrapper = ({
  orderedCorns,
  contactInformation,
}: {
  orderedCorns: number
  contactInformation: CreateUserFields
}) => {
  return (
    <CornOrderProvider value={{ orderedCorns, contactInformation }}>
      <CornMarketView />
    </CornOrderProvider>
  )
}

describe('CornMarketView', () => {
  const user = userEvent.setup()
  const contactInformation = {
    taxId: '1234567890',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
  }

  const userServiceMock = vi.hoisted(() => ({
    createUser: vi.fn(),
  }))

  const cornServiceMock = vi.hoisted(() => ({
    orderCorn: vi.fn(),
  }))

  vi.mock('@/services', () => ({
    _esModule: true,
    userService: userServiceMock,
    cornService: cornServiceMock,
  }))

  it('should render the corn market view', () => {
    render(<OrderConfirmationWrapper contactInformation={contactInformation} orderedCorns={1} />)

    expect(screen.getByTestId('corn-market-view')).toBeInTheDocument()
  })

  it('should render the contact information form as initial state', () => {
    render(<OrderConfirmationWrapper contactInformation={contactInformation} orderedCorns={1} />)

    expect(screen.getByTestId('contact-information-form')).toBeInTheDocument()
  })

  it('should render the order confirmation as when next button is clicked', async () => {
    render(<OrderConfirmationWrapper contactInformation={contactInformation} orderedCorns={1} />)

    const nextButton = screen.getByRole('button', { name: 'Next' })
    await user.click(nextButton)

    expect(screen.getByTestId('order-details-card')).toBeInTheDocument()
  })

  it('should call the userService.createUser when the next button is clicked', async () => {
    render(<OrderConfirmationWrapper contactInformation={contactInformation} orderedCorns={1} />)

    const nextButton = screen.getByRole('button', { name: 'Next' })
    await user.click(nextButton)

    expect(userServiceMock.createUser).toHaveBeenCalledWith(contactInformation)
  })

  it('should render the order confirmation as when next button is clicked', async () => {
    render(<OrderConfirmationWrapper contactInformation={contactInformation} orderedCorns={1} />)

    const nextButton = screen.getByRole('button', { name: 'Next' })
    await user.click(nextButton)

    const confirmOrderButton = screen.getByRole('button', { name: 'Confirm Order' })
    await user.click(confirmOrderButton)

    expect(screen.getByTestId('order-confirmation-card')).toBeInTheDocument()
  })

  it('should call the cornService.orderCorn when the confirm order button is clicked', async () => {
    render(<OrderConfirmationWrapper contactInformation={contactInformation} orderedCorns={1} />)

    const nextButton = screen.getByRole('button', { name: 'Next' })
    await user.click(nextButton)

    const confirmOrderButton = screen.getByRole('button', { name: 'Confirm Order' })
    await user.click(confirmOrderButton)

    expect(cornServiceMock.orderCorn).toHaveBeenCalled()
  })
})
