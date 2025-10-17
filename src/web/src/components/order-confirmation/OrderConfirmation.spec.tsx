import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrderConfirmation } from "./OrderConfirmation";
import { vi } from "vitest";
import { CornOrderProvider } from "../../context/CornOrderContext";
import userEvent from "@testing-library/user-event";

const OrderConfirmationWrapper = ({
  onBack,
  orderedCorns,
}: {
  onBack: () => void;
  orderedCorns: number;
}) => {
  return (
    <CornOrderProvider value={{ orderedCorns }}>
      <OrderConfirmation onBack={onBack} />
    </CornOrderProvider>
  );
};

describe("OrderConfirmation", () => {
  const user = userEvent.setup();

  vi.mock("@/components/ui/button", () => ({
    TimerButton: ({ children, onClick, ...props }: any) => (
      <button {...props} onClick={onClick} data-testid="mock-timer-button">
        {children}
      </button>
    ),
  }));

  it("should render the order confirmation form", () => {
    render(<OrderConfirmationWrapper onBack={vi.fn()} orderedCorns={1} />);

    expect(screen.getByTestId("order-confirmation-card")).toBeInTheDocument();

    expect(screen.getByText("Thank you for your order!")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your order has been placed successfully. We will contact you soon.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("You will be able to buy more corn after a minute."),
    ).toBeInTheDocument();
    expect(screen.getByText("1 🌽")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Buy more corn/i }),
    ).toBeInTheDocument();
  });

  it("should call onBack when the button is clicked", async () => {
    const onBack = vi.fn();

    render(<OrderConfirmationWrapper onBack={onBack} orderedCorns={1} />);

    const button = screen.getByRole("button", { name: /Buy more corn/i });

    await user.click(button);

    expect(onBack).toHaveBeenCalled();
  });
});
