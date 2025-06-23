"use client";
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header";
import { Product } from "@/constants/data";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Text } from "lucide-react";
import { TransactionTypeColumnModel } from "./columns-model";

export const columns: ColumnDef<TransactionTypeColumnModel>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({
      column,
    }: {
      column: Column<TransactionTypeColumnModel, unknown>;
    }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ cell }) => <div>{cell.getValue<Product["name"]>()}</div>,
    meta: {
      label: "Name",
      placeholder: "İşlem",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "description",
    accessorKey: "description",
    header: ({
      column,
    }: {
      column: Column<TransactionTypeColumnModel, unknown>;
    }) => <DataTableColumnHeader column={column} title="description" />,
    cell: ({ cell }) => <div>{cell.getValue<Product["description"]>()}</div>,
    meta: {
      label: "description",
      placeholder: "Açıklama",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
];
