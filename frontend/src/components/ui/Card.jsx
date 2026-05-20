import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { cardStyles } from '../../styles/theme'

export default function Card({ header, footer, children, className, ...props }) {
  return (
    <motion.section
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
      className={twMerge(`${cardStyles} overflow-hidden`, className)}
      {...props}
    >
      {header && <div className="border-b border-white/[0.08] px-6 py-5">{header}</div>}
      <div className="px-6 py-5">{children}</div>
      {footer && <div className="border-t border-white/[0.08] px-6 py-5">{footer}</div>}
    </motion.section>
  )
}
