import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md", className)}
      style={{ backgroundColor: 'rgba(51, 65, 85, 0.5)' }}
      {...props}
    />
  )
}

export { Skeleton }
