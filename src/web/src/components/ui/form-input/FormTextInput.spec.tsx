import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FormTextInput } from './FormTextInput'
import { Form } from '../shadcn/form'
import { useForm } from 'react-hook-form'

const FormTextInputWrapper = ({
  name,
  label,
  placeholder,
  error,
}: {
  name: string
  label: string
  placeholder: string
  error?: string
}) => {
  const form = useForm({})

  if (error) {
    form.setError(name, { message: error })
  }

  return (
    <Form {...form}>
      <FormTextInput name={name} label={label} placeholder={placeholder} />
    </Form>
  )
}

describe('FormTextInput', () => {
  it('should render the form input with the correct label', () => {
    render(<FormTextInputWrapper name="test" label="Test" placeholder="Test" />)

    expect(screen.getByLabelText('Test')).toBeInTheDocument()
  })

  it('should render the form input', () => {
    render(<FormTextInputWrapper name="test" label="Test" placeholder="Test" />)

    expect(screen.getByRole('textbox', { name: 'Test' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Test')).toBeInTheDocument()
  })

  it('should render the error message when the input is invalid', () => {
    render(
      <FormTextInputWrapper name="test" label="Test" placeholder="Test" error="Test is required" />,
    )

    expect(screen.getByText('Test is required')).toBeInTheDocument()
  })
})
