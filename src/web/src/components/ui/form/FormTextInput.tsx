import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from '../input'
import { useFormContext } from 'react-hook-form'

type Props = {
  name: string
  label: string
  placeholder?: string
}

export const FormTextInput = ({ name, label, placeholder }: Props) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
