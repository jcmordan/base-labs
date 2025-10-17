import { render } from "@testing-library/react"
import { OrderConfirmation } from "./OrderConfirmation"
import { vi } from "vitest"

describe('OrderConfirmation', () => {
  it('should render the order confirmation form', () => {
    render(<OrderConfirmation onBack={vi.fn()} />)
  })
})  