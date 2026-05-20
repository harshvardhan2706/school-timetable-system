import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import { buttonBase, buttonVariants } from '../../styles/theme'

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-base',
}

const Button = forwardRef(
  ({ children, variant = 'primary', size = 'md', className, as = 'button', href, ...props }, ref) => {
    const classes = twMerge(buttonBase, buttonVariants[variant] ?? buttonVariants.primary, sizeStyles[size] ?? sizeStyles.md, className)
    const Component = as === 'a' ? motion.a : motion.button

    return (
      <Component
        ref={ref}
        href={href}
        type={as === 'button' ? 'button' : undefined}
        className={clsx(classes)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </Component>
    )
  },
)

Button.displayName = 'Button'
export default Button
