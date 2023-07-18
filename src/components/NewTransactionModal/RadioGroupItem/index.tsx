import * as RadioGroup from '@radix-ui/react-radio-group'
import { ReactNode, RefAttributes } from 'react'
import styles from './styles.module.css'

type RadioGroupItemProps = RadioGroup.RadioGroupItemProps &
  RefAttributes<HTMLButtonElement> & { children: ReactNode }

export function RadioGroupItem({ children, ...props }: RadioGroupItemProps) {
  return (
    <RadioGroup.Item className={styles['transaction-button']} {...props}>
      {children}
    </RadioGroup.Item>
  )
}
