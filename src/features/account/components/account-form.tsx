'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as Label from '@radix-ui/react-label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@radix-ui/react-select';
import React, { useState } from 'react';

type AccountFormProps = {
  accountTypes: { code: string; name: string }[];
  onSubmit: (data: any) => Promise<AccountResult>;
};

type AccountResult = {
  transactionId: string;
  transactionTypeCode: string;
  directionCode: 'DEBIT' | 'CREDIT';
  amount: number;
  balanceAfterTransaction: number;
  date: string;
  description?: string;
};

export function AccountForm({ accountTypes, onSubmit }: AccountFormProps) {
  const [formData, setFormData] = useState({
    transactionTypeCode: '',
    accountId: '',
    amount: '',
    description: ''
  });

  const [result, setResult] = useState<AccountResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res: AccountResult = await onSubmit({
        ...formData,
        amount: Number(formData.amount)
      });
      setResult(res);
    } catch (e) {
      setError('Transaction failed. Please check your inputs.');
    }
  };

  return (
    <div className='mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Label.Root
            htmlFor='transactionType'
            className='mb-1 block font-semibold'
          >
            Transaction Type
          </Label.Root>
          <Select
            value={formData.transactionTypeCode}
            onValueChange={(v) => handleChange('transactionTypeCode', v)}
          >
            <SelectTrigger
              id='transactionType'
              className='w-full rounded border px-3 py-2'
            >
              <SelectValue placeholder='Select transaction type' />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map((type: any) => (
                <SelectItem key={type.code} value={type.code}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label.Root htmlFor='accountId' className='mb-1 block font-semibold'>
            Account ID
          </Label.Root>
          <Input
            id='accountId'
            type='text'
            value={formData.accountId}
            onChange={(e) => handleChange('accountId', e.target.value)}
            placeholder='Enter Account UUID'
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>

        <div>
          <Label.Root htmlFor='amount' className='mb-1 block font-semibold'>
            Amount
          </Label.Root>
          <Input
            id='amount'
            type='number'
            step='0.01'
            min='0'
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            placeholder='Amount'
            className='w-full rounded border px-3 py-2'
            required
          />
        </div>

        <div>
          <Label.Root
            htmlFor='description'
            className='mb-1 block font-semibold'
          >
            Description (optional)
          </Label.Root>
          <Input
            id='description'
            type='text'
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder='Description'
            className='w-full rounded border px-3 py-2'
          />
        </div>

        <Button
          type='submit'
          className='w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700'
        >
          Submit Transaction
        </Button>
      </form>

      {error && <p className='mt-4 text-red-600'>{error}</p>}

      {result && (
        <div className='mt-6'>
          <h2 className='mb-2 text-lg font-bold'>Transaction Result</h2>
          <table className='w-full table-auto border-collapse border border-gray-300'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border border-gray-300 px-3 py-1 text-left'>
                  Transaction ID
                </th>
                <th className='border border-gray-300 px-3 py-1 text-left'>
                  Type
                </th>
                <th className='border border-gray-300 px-3 py-1 text-left'>
                  Direction
                </th>
                <th className='border border-gray-300 px-3 py-1 text-right'>
                  Amount
                </th>
                <th className='border border-gray-300 px-3 py-1 text-right'>
                  Balance After
                </th>
                <th className='border border-gray-300 px-3 py-1 text-left'>
                  Date
                </th>
                <th className='border border-gray-300 px-3 py-1 text-left'>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='border border-gray-300 px-3 py-1'>
                  {result.transactionId}
                </td>
                <td className='border border-gray-300 px-3 py-1'>
                  {result.transactionTypeCode}
                </td>
                <td className='border border-gray-300 px-3 py-1'>
                  {result.directionCode === 'DEBIT' ? 'Borç' : 'Alacak'}
                </td>
                <td className='border border-gray-300 px-3 py-1 text-right'>
                  {result.amount.toFixed(2)}
                </td>
                <td className='border border-gray-300 px-3 py-1 text-right'>
                  {result.balanceAfterTransaction.toFixed(2)}
                </td>
                <td className='border border-gray-300 px-3 py-1'>
                  {new Date(result.date).toLocaleString()}
                </td>
                <td className='border border-gray-300 px-3 py-1'>
                  {result.description || '-'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
