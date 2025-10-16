import { TimerButton } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../ui/card"

type Props = {
  onBack: () => void
}

export const OrderConfirmation = ({ onBack }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-green-500">Thank you for your order!</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Your order has been placed successfully. We will contact you soon.</CardDescription>
        <CardDescription>You will be able to buy more corn after a minute.</CardDescription>
      </CardContent>
      <CardFooter>
        <TimerButton initialTime={60} onClick={onBack}>Buy more corn</TimerButton>
      </CardFooter>
    </Card>
  )
}