import { z } from 'zod'

export const userSchema = z
  .object({
    id: z.string(),
    taxId: z
      .string('Tax ID is required')
      .min(1)
      .max(10)
      .regex(/^[0-9]+$/, { message: 'Tax ID must be a number' }),
    firstName: z
      .string('First name is required')
      .min(1, 'First name is required')
      .max(100),
    lastName: z
      .string('Last name is required')
      .min(1, 'Last name is required')
      .max(100),
    email: z
      .email('Invalid email address')
      .min(1, 'Email is required')
      .max(100),
    phone: z
      .string('Phone number is required')
      .min(1, 'Phone number is required')
      .max(100),
  })
