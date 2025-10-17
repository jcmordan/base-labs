import { cn } from '@/lib/utils'

type Props = {
  label: string
  value: string
  className?: string
}

export const DetailsItem = ({ label, value, className }: Props) => {
  return (
    <div data-testid="details-item" className={cn('flex flex-row gap-2', className)}>
      <span data-testid="details-item-label" className="font-medium">
        {label}:
      </span>
      <span data-testid="details-item-value" className="text-muted-foreground">
        {value}
      </span>
    </div>
  )
}
