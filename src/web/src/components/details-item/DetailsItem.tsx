import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  className?: string;
}

export const DetailsItem = ({ label, value, className }: Props) => {
  return (
    <div className={cn("flex flex-row gap-2", className)}>
      <span className="font-medium">{label}:</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );
};
