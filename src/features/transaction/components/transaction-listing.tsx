import { TransactionTable } from './transaction-tables';
import { columns } from './transaction-tables/columns';
import { TransactionColumnModel } from './transaction-tables/columns-model';

type TransactionListingPage = {};

export default async function TransactionListingPage({}: TransactionListingPage) {
  const totalTransactions = 0;
  const transactions: TransactionColumnModel[] = [];

  return (
    <TransactionTable
      data={transactions}
      totalItems={totalTransactions}
      columns={columns}
    />
  );
}
