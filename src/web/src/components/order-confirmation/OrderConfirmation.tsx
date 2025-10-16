import { useCornOrderContext } from "@/context/CornOrderContext"
import { DetailsItem } from "../details-item/DetailsItem"
import { TimerButton } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card"

type Props = {
  onBack: () => void
}

export const OrderConfirmation = ({ onBack }: Props) => {
  const { orderedCorns } = useCornOrderContext()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-green-500">Thank you for your order!</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Your order has been placed successfully. We will contact you soon.</CardDescription>
        <CardDescription>You will be able to buy more corn after a minute.</CardDescription>

        <DetailsItem className="pt-2" label="Total Corns Ordered" value={`${orderedCorns} 🌽`} />
      </CardContent>
      <CardFooter>
        <TimerButton initialTime={60} onClick={onBack}>Buy more corn</TimerButton>
      </CardFooter>
    </Card>
  )
}