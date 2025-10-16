import { Button } from "../ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"


type Props = {
  onBack: () => void
  onSubmit: () => void
}

export const OrderDetails = ({ onBack, onSubmit }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Order Details</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onBack}>Back</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  )
}
