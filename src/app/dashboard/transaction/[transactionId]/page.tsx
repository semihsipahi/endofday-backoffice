import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import TransactionViewPage from '@/features/transaction/components/transaction-view-page';
import { Suspense } from 'react';

export const metadata = {
  title: 'Yönetim : Cari İşlemler'
};

type PageProps = { params: Promise<{ transactionId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <TransactionViewPage transactionId={params.transactionId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
