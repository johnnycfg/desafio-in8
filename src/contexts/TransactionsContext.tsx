import { ReactNode, createContext, useCallback, useEffect, useState } from 'react'
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
  filteredTransactions: Transactions[] | null
  createTransaction: (data: CreateTransactionInputs) => void
  searchTransactions: (search: string) => void
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transactions[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transactions[] | null>(null)

  console.log('filteredTransactions state: ', filteredTransactions)

  useEffect(() => {
    const unparsedTransactions = localStorage.getItem('@transactions')

    if (unparsedTransactions) {
      const parsedTransactions = JSON.parse(unparsedTransactions) as Transactions[]

      setTransactions(parsedTransactions)
    }
  }, [])

  useEffect(() => {
    if (transactions) {
      localStorage.setItem('@transactions', JSON.stringify(transactions))
    }
  }, [transactions])


  const createTransaction = useCallback(
    (data: CreateTransactionInputs) => {
      const { description, price, category, type } = data

      const transaction = {
        id: uuidv4(),
        description, 
        price, 
        category, 
        type, 
        createdAt: new Date().toString()
      }

      setTransactions((state) => [transaction, ...state])
    },
    [],
  )

  function searchTransactions(search: string) {
    const filtered = transactions.filter((transaction) => {
      if (
        transaction.description.toLowerCase().includes(search)
        || transaction.category.toLowerCase().includes(search)
        || transaction.price.toString().includes(search)
        || new Date(transaction.createdAt).toLocaleDateString().includes(search)
      ) return true

      return false
    })

    console.log('filteredTransactions inside searchfn: ', filtered, filtered.length)

    setFilteredTransactions(filtered.length > 0 ? filtered : null)
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, filteredTransactions, createTransaction, searchTransactions }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
