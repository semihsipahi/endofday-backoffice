import { TransactionTypeTable } from "./transaction-type-tables";
import { columns } from "./transaction-type-tables/columns";
import { TransactionTypeColumnModel } from "./transaction-type-tables/columns-model";

type TransactionTypeListingPage = {};

export default async function TransactionTypeListingPage({}: TransactionTypeListingPage) {
  const totalTransactions = 0;
  const transactions: TransactionTypeColumnModel[] = [];

  return (
    <TransactionTypeTable
      data={transactions}
      totalItems={totalTransactions}
      columns={columns}
    />
  );
}
