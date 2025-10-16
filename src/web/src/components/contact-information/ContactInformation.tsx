import { useForm } from "react-hook-form"
import { Form } from "../ui/form/form"
import { FormTextInput } from "../ui/form/FormTextInput"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { ContactInformationForm } from "@/types"
import { useCornOrderContext } from "@/context/CornOrderContext"

const contactInformationFormSchema = z.object({
  taxId: z.string("Tax ID is required").min(1).max(10).regex(/^[0-9]+$/, { message: "Tax ID must be a number" }),
  firstName: z.string("First name is required").min(1, "First name is required").max(100),
  lastName: z.string("Last name is required").min(1, "Last name is required").max(100),
  email: z.email("Invalid email address").min(1, "Email is required").max(100),
  phone: z.string("Phone number is required").min(1, "Phone number is required").max(100),
})

type Props = {
  onSubmit: (values: ContactInformationForm) => void
}

export const ContactInformation = ({ onSubmit }: Props) => {
  const { contactInformation } = useCornOrderContext()

  const form = useForm<ContactInformationForm>({
    resolver: zodResolver(contactInformationFormSchema),
    defaultValues: contactInformation || {}
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-4">
            <FormTextInput name="taxId" label="Tax ID" placeholder="Enter your tax ID" />
            <FormTextInput name="firstName" label="First Name" placeholder="Enter your first name" />
            <FormTextInput name="lastName" label="Last Name" placeholder="Enter your last name" />
            <FormTextInput name="email" label="Email" placeholder="Enter your email" />
            <FormTextInput name="phone" label="Phone" placeholder="Enter your phone" />
          </CardContent>
          <CardFooter>
            <Button type="submit">Next</Button>
          </CardFooter>
        </Card>
      </form>

    </Form>

  )
}