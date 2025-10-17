import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { useCornOrderContext } from '@/context/CornOrderContext'
import { DetailsItem } from '../details-item/DetailsItem'

type Props = {
  onBack: () => void
  onSubmit: () => void
}

export const OrderDetails = ({ onBack, onSubmit }: Props) => {
  const { contactInformation, orderedCorns } = useCornOrderContext()

  if (!contactInformation) {
    return null
  }

  return (
    <Card data-testid="order-details-card">
      <CardHeader>
        <CardTitle>Order Confirmation</CardTitle>
        <CardDescription>Please confirm your order details.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <DetailsItem
            label="Contact Information"
            value={`${contactInformation.firstName} ${contactInformation.lastName}`}
          />
          <DetailsItem label="Email" value={contactInformation.email} />
          <DetailsItem label="Phone" value={contactInformation.phone} />
          <DetailsItem
            className="pt-2"
            label="Total Corns Ordered"
            value={`${orderedCorns} 🌽`}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onSubmit}>Confirm Order</Button>
      </CardFooter>
    </Card>
  );
}
