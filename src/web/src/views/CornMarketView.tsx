import { useState } from 'react'
import { ContactInformation } from '@/components'
import { OrderDetails } from '@/components/order-details/OrderDetails'
import { OrderConfirmation } from '@/components/order-confirmation/OrderConfirmation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useCornOrderContext } from '@/context/CornOrderContext'
import { CreateUserFields } from '@/types'
import { userService, cornService } from '@/services'

export type BookingStep = 'contact' | 'order' | 'confirmation'

const CornMarket = () => {
  const [step, setCurrentStep] = useState<BookingStep>('contact')
  const { dispatch } = useCornOrderContext()

  const handleContactInformationSubmit = async (values: CreateUserFields) => {
    await userService.createUser(values)

    dispatch({ type: 'SET_CONTACT_INFORMATION', payload: values })
    setCurrentStep('order')
  }

  const handleOrderSubmit = async () => {
    await cornService.orderCorn()
    dispatch({ type: 'INCREMENT_ORDERED_CORNS', payload: 1 })

    setCurrentStep('confirmation')
  }

  const renderCurrentStep = () => {
    switch (step) {
      case 'contact':
        return <ContactInformation onSubmit={handleContactInformationSubmit} />
      case 'order':
        return (
          <OrderDetails onBack={() => setCurrentStep('contact')} onSubmit={handleOrderSubmit} />
        )
      case 'confirmation':
        return <OrderConfirmation onBack={() => setCurrentStep('order')} />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-center">Bobs Farm 🌽</CardTitle>
        <CardDescription className="text-center">
          Welcome to Bobs Farm, the best farm in the world!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">{renderCurrentStep()}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CornMarket
