import { UserProfile } from '@clerk/nextjs';

export default function ProfileViewPage() {
  return (
    <div className='flex justify-center'>
      <div className='flex w-full max-w-4xl flex-col p-4'>
        <UserProfile />
      </div>
    </div>
  );
}
