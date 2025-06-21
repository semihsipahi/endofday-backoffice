import TransactionForm from "./transaction-form";

type TTransactionViewPageProps = {
  transactionId: string;
};

export default async function TransactionViewPage({
  transactionId,
}: TTransactionViewPageProps) {
  let transaction = null;
  let pageTitle = "Yeni Cari İşlem Başlat";

  if (transactionId !== "new") {
    pageTitle = `Cari İşlem Kaydı`;
  }

  return <TransactionForm onSubmit={() => {}} />;
}
