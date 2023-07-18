import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

interface Transactions {
  id: string
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInputs {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transactions[]
  createTransaction: (data: CreateTransactionInputs) => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])

  useEffect(() => {
    const unparsedTransactions = localStorage.getItem('@transactions')

    if (unparsedTransactions) {
      const parsedTransactions = JSON.parse(
        unparsedTransactions,
      ) as Transactions[]

      setTransactions(parsedTransactions)
    }
  }, [])

  useEffect(() => {
    if (transactions) {
      localStorage.setItem('@transactions', JSON.stringify(transactions))
    }
  }, [transactions])

  const createTransaction = useCallback((data: CreateTransactionInputs) => {
    const { description, price, category, type } = data

    const transaction = {
      id: uuidv4(),
      description,
      price,
      category,
      type,
      createdAt: new Date().toString(),
    }

    setTransactions((state) => [transaction, ...state])
  }, [])

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
