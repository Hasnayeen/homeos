import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { type VariantProps } from "class-variance-authority"
import { Link } from "@inertiajs/react"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
  href?: string
} & Pick<VariantProps<typeof buttonVariants>, "size"> &
  React.ComponentProps<"div">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  href,
  children,
  ...props
}: PaginationLinkProps) => {
  const baseClasses = cn(
    buttonVariants({
      variant: isActive ? "outline" : "ghost",
      size,
    }),
    className
  )

  if (!href) {
    return (
      <span
        aria-current={isActive ? "page" : undefined}
        className={cn(baseClasses, "pointer-events-none opacity-50")}
        {...props}
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={baseClasses}
    >
      {children}
    </Link>
  )
}
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  href,
  ...props
}: {
  href?: string
  className?: string
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    href={href}
    className={cn("gap-1 pl-2.5", !href && "pointer-events-none opacity-50", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  href,
  ...props
}: {
  href?: string
  className?: string
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    href={href}
    className={cn("gap-1 pr-2.5", !href && "pointer-events-none opacity-50", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}