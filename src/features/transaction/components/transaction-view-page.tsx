import TransactionForm from "./transaction-form";

type TTransactionViewPageProps = {
  transactionId: string;
};

export default async function TransactionViewPage({
  transactionId,
}: TTransactionViewPageProps) {
  return <TransactionForm />;
}
