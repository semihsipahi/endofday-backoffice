import transactionTypeApi from "@/services/transaction-type/transactionService";
import { TransactionTypeTable } from "./transaction-type-tables";
import { columns } from "./transaction-type-tables/columns";
import { TransactionTypeColumnModel } from "./transaction-type-tables/columns-model";

type TransactionTypeListingPage = {};

export default async function TransactionTypeListingPage({}: TransactionTypeListingPage) {
  let totalTransactions = 0;

  const transactions: TransactionTypeColumnModel[] = (
    await transactionTypeApi.getAll()
  ).map(
    (x): TransactionTypeColumnModel => ({
      id: x.id,
      name: x.name,
      code: x.code,
      description: x.description,
    })
  );

  totalTransactions = transactions.length;

  return (
    <TransactionTypeTable
      data={transactions}
      totalItems={totalTransactions}
      columns={columns}
    />
  );
}
