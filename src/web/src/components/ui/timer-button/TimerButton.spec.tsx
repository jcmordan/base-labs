import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { TimerButton } from './TimerButton'
import { render, screen, act } from '@testing-library/react'

describe('TimerButton', () => {
  const user = userEvent.setup()

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render the timer button', () => {
    render(<TimerButton initialTime={60} onClick={vi.fn()} />)

    expect(screen.getByTestId('timer-button')).toBeInTheDocument()
  })

  it('should be disabled when the initial time is greater than 0', () => {
    render(<TimerButton initialTime={60} onClick={vi.fn()} />)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should be enabled when the initial time is 0', () => {
    render(<TimerButton initialTime={0} onClick={vi.fn()} />)

    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should show the time left when the initial time is greater than 0', () => {
    render(<TimerButton initialTime={60} onClick={vi.fn()} />)

    expect(screen.getByText('60s')).toBeInTheDocument()
  })

  it('should be enabled when the initial time is 0', () => {
    render(<TimerButton initialTime={0} onClick={vi.fn()} />)

    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should be enabled when the timer reaches 0', async () => {
    render(<TimerButton initialTime={1} onClick={vi.fn()} />)

    await act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('should call the onClick when the button is clicked', async () => {
    vi.useRealTimers()

    const onClick = vi.fn()
    render(<TimerButton initialTime={0} onClick={onClick} />)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalled()
  })
})
