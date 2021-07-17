import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  value: number;
  category: string;
  type: string;
  createdAt: string;
}

type TransactionForm = Omit<Transaction, "id" | "createdAt">;

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionForm) => void;
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((res) => setTransactions(res.data.transactions));
  }, []);

  function createTransaction(transaction: TransactionForm) {
    api.post("transactions", transaction);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
