import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { OrderDetails } from "./OrderDetails";
import { vi } from "vitest";
import { CornOrderProvider } from "../../context/CornOrderContext";
import { CreateUserFields } from "../../types";
import userEvent from "@testing-library/user-event";

const OrderDetailsWrapper = ({
  onBack,
  onSubmit,
  orderedCorns,
  contactInformation,
}: {
  onBack: () => void;
  onSubmit: () => void;
  orderedCorns: number;
  contactInformation: CreateUserFields;
}) => {
  return (
    <CornOrderProvider value={{ orderedCorns, contactInformation }}>
      <OrderDetails onBack={onBack} onSubmit={onSubmit} />
    </CornOrderProvider>
  );
};

describe("OrderDetails", () => {
  const user = userEvent.setup();

  const contactInformation = {
    taxId: "1234567890",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
  };

  it("should render", () => {
    const orderedCorns = 1;

    render(
      <OrderDetailsWrapper
        onBack={vi.fn()}
        onSubmit={vi.fn()}
        orderedCorns={orderedCorns}
        contactInformation={contactInformation}
      />,
    );

    expect(screen.getByTestId("order-details-card")).toBeInTheDocument();
    expect(screen.getByText("Order Confirmation")).toBeInTheDocument();

    expect(
      screen.getByText("Please confirm your order details."),
    ).toBeInTheDocument();

    expect(screen.getByText("Contact Information:")).toBeInTheDocument();
    expect(
      screen.getByText(
        `${contactInformation.firstName} ${contactInformation.lastName}`,
      ),
    ).toBeInTheDocument();

    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText(contactInformation.email)).toBeInTheDocument();

    expect(screen.getByText("Phone:")).toBeInTheDocument();
    expect(screen.getByText(contactInformation.phone)).toBeInTheDocument();

    expect(screen.getByText("Phone:")).toBeInTheDocument();
    expect(screen.getByText(contactInformation.taxId)).toBeInTheDocument();

    expect(screen.getByText("Total Corns Ordered:")).toBeInTheDocument();
    expect(screen.getByText(`${orderedCorns} 🌽`)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Confirm Order/i }),
    ).toBeInTheDocument();
  });

  it("should call onBack when the back button is clicked", async () => {
    const onBack = vi.fn();

    render(
      <OrderDetailsWrapper
        onBack={onBack}
        onSubmit={vi.fn()}
        orderedCorns={1}
        contactInformation={contactInformation}
      />,
    );

    const backButton = screen.getByRole("button", { name: /Back/i });
    await user.click(backButton);

    expect(onBack).toHaveBeenCalled();
  });

  it("should call onSubmit when the confirm order button is clicked", async () => {
    const onSubmit = vi.fn();
    render(
      <OrderDetailsWrapper
        onBack={vi.fn()}
        onSubmit={onSubmit}
        orderedCorns={1}
        contactInformation={contactInformation}
      />,
    );

    const confirmOrderButton = screen.getByRole("button", {
      name: /Confirm Order/i,
    });
    await user.click(confirmOrderButton);

    expect(onSubmit).toHaveBeenCalled();
  });
});