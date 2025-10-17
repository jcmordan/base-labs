import '@testing-library/jest-dom'
import { ContactInformation } from './ContactInformation'
import { render, screen } from '@testing-library/react'
import { CreateUserFields } from '@/types'
import userEvent from '@testing-library/user-event'

import { vi } from 'vitest'
import { CornOrderProvider } from '@/context/CornOrderContext'

const ContactInformationForm = ({
  onSubmit,
  defaultValues,
}: {
  onSubmit: (values: CreateUserFields) => void
  defaultValues?: CreateUserFields
}) => {
  return (
    <CornOrderProvider value={{ contactInformation: defaultValues }}>
      <ContactInformation onSubmit={onSubmit} />
    </CornOrderProvider>
  )
}

describe('ContactInformation', () => {
  const user = userEvent.setup()
  const defaultValues = {
    taxId: '1234567890',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
  }

  it('should render the contact information form', () => {
    const handleSubmit = vi.fn()
    render(<ContactInformationForm onSubmit={handleSubmit} />)

    expect(screen.getByTestId('contact-information-form')).toBeInTheDocument()
    expect(screen.getByLabelText('Tax ID')).toBeInTheDocument()
    expect(screen.getByLabelText('First Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Last Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Phone')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('validates the form', async () => {
    const handleSubmit = vi.fn()
    render(<ContactInformationForm onSubmit={handleSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(handleSubmit).not.toHaveBeenCalled()

    expect(screen.getByText('Tax ID is required')).toBeInTheDocument()
    expect(screen.getByText('First name is required')).toBeInTheDocument()
    expect(screen.getByText('Last name is required')).toBeInTheDocument()
    expect(screen.getByText('Invalid email address')).toBeInTheDocument()
    expect(screen.getByText('Phone number is required')).toBeInTheDocument()
  })

  it('renders the form with default values', () => {
    const handleSubmit = vi.fn()
    render(<ContactInformationForm onSubmit={handleSubmit} defaultValues={defaultValues} />)

    expect(screen.getByLabelText('Tax ID')).toHaveValue(defaultValues.taxId)
    expect(screen.getByLabelText('First Name')).toHaveValue(defaultValues.firstName)
    expect(screen.getByLabelText('Last Name')).toHaveValue(defaultValues.lastName)
    expect(screen.getByLabelText('Email')).toHaveValue(defaultValues.email)
    expect(screen.getByLabelText('Phone')).toHaveValue(defaultValues.phone)
  })

  it('submits the form', async () => {
    const handleSubmit = vi.fn()

    render(<ContactInformationForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText('Tax ID'), defaultValues.taxId)
    await user.type(screen.getByLabelText('First Name'), defaultValues.firstName)
    await user.type(screen.getByLabelText('Last Name'), defaultValues.lastName)
    await user.type(screen.getByLabelText('Email'), defaultValues.email)
    await user.type(screen.getByLabelText('Phone'), defaultValues.phone)

    await user.click(screen.getByRole('button', { name: 'Next' }))

    expect(handleSubmit).toHaveBeenCalled()
  })
})
