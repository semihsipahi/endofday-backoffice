'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Product } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { TransactionColumnModel } from './columns-model';

export const columns: ColumnDef<TransactionColumnModel>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({
      column
    }: {
      column: Column<TransactionColumnModel, unknown>;
    }) => <DataTableColumnHeader column={column} title='Name' />,
    cell: ({ cell }) => <div>{cell.getValue<Product['name']>()}</div>,
    meta: {
      label: 'Name',
      placeholder: 'Cari İşlem Ara...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  }
];
