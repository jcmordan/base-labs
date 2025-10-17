import { useForm } from 'react-hook-form'
import { Form } from '../ui/form/form'
import { FormTextInput } from '../ui/form/FormTextInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { CreateUserFields } from '@/types'
import { useCornOrderContext } from '@/context/CornOrderContext'
import { userSchema } from '@bobs-corn/validations'

const contactInformationFormSchema = userSchema.omit({ id: true })

type Props = {
  onSubmit: (values: CreateUserFields) => void
}

export const ContactInformation = ({ onSubmit }: Props) => {
  const { contactInformation } = useCornOrderContext()

  const form = useForm<CreateUserFields>({
    resolver: zodResolver(contactInformationFormSchema),
    defaultValues: contactInformation || {},
  })

  return (
    <Form {...form}>
      <form data-testid="contact-information-form" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4">
            <FormTextInput name="taxId" label="Tax ID" placeholder="Enter your tax ID" />
            <FormTextInput
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            <FormTextInput name="lastName" label="Last Name" placeholder="Enter your last name" />
            <FormTextInput name="email" label="Email" placeholder="Enter your email" />
            <FormTextInput name="ph@dione" label="Phone" placeholder="Enter your phone" />
          </CardContent>
          <CardFooter>
            <Button type="submit">Next</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
