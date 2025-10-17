import * as React from 'react'

import { useState, useEffect } from 'react'
import { TimerIcon } from 'lucide-react'
import { Button } from '../shadcn/button'

type Props = React.ComponentProps<'button'> & {
  initialTime: number
}

export const TimerButton = ({ initialTime, children, onClick, ...props }: Props) => {
  const [timeLeft, setTimeLeft] = useState(initialTime)

  useEffect(() => {
    let timer: any
    if (timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }

    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (timeLeft > 0) {
      return
    }
    onClick?.(e)
  }

  return (
    <Button data-testid="timer-button" {...props} onClick={handleClick} disabled={timeLeft > 0}>
      {timeLeft > 0 && (
        <span className="text-red-500 flex items-center gap-1">
          <TimerIcon className="size-4" />
          {timeLeft}s
        </span>
      )}
      {children}
    </Button>
  )
}
