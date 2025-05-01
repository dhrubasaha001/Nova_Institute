"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("relative", className)} ref={ref} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

export const ChartHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("flex items-center justify-between pb-4", className)} ref={ref} {...props} />
  },
)
ChartHeader.displayName = "ChartHeader"

export const ChartTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p className={cn("text-sm font-medium leading-none", className)} ref={ref} {...props} />
  },
)
ChartTitle.displayName = "ChartTitle"

export const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div className={cn("space-x-2", className)} ref={ref} {...props} />
  },
)
ChartLegend.displayName = "ChartLegend"

export const ChartBars = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const [tooltip, setTooltip] = React.useState<{
    x: number
    y: number
    content: string
  } | null>(null)

  return (
    <div className="h-full w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === ChartBar) {
            return React.cloneElement(child, {
              setTooltip,
            })
          }
          return child
        })}
      </svg>
      {tooltip && (
        <div
          className="absolute z-10 rounded-md border bg-popover px-2 py-1 text-sm font-medium text-popover-foreground shadow-md"
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  )
})
ChartBars.displayName = "ChartBars"

export const ChartBar = React.forwardRef<
  SVGRectElement,
  React.HTMLAttributes<SVGRectElement> & {
    value: number
    name: string
    color?: string
    setTooltip: React.Dispatch<
      React.SetStateAction<{
        x: number
        y: number
        content: string
      } | null>
    >
  }
>(({ className, value, name, color = "currentColor", setTooltip, ...props }, ref) => {
  const y = 100 - value
  return (
    <rect
      ref={ref}
      x="0"
      y={y.toString()}
      width="10"
      height={value.toString()}
      fill={color}
      className={cn(className)}
      {...props}
      onMouseMove={(event) => {
        setTooltip({
          x: event.clientX,
          y: event.clientY - 50,
          content: `${name}: ${value}%`,
        })
      }}
      onMouseLeave={() => {
        setTooltip(null)
      }}
    />
  )
})
ChartBar.displayName = "ChartBar"

export const ChartTooltip = () => null
