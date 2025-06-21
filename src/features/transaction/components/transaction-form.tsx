"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export enum TransactionTypeCode {
  GOLD_IN = "GOLD_IN",
  DISCOUNT_RECEIVABLE = "DISCOUNT_RECEIVABLE",
  DISCOUNT_PAYABLE = "DISCOUNT_PAYABLE",
  RETURN_OUT = "RETURN_OUT",
  CONVERT = "CONVERT",
  SCRAP_OUT = "SCRAP_OUT",
  SCRAP_IN = "SCRAP_IN",
  MATERIAL_OUT = "MATERIAL_OUT",
  MATERIAL_IN = "MATERIAL_IN",
  OFFSET = "OFFSET",
  MATERIAL_RETURN = "MATERIAL_RETURN",
  MATERIAL_SALE = "MATERIAL_SALE",
  CASH_PAYMENT = "CASH_PAYMENT",
  CASH_COLLECTION = "CASH_COLLECTION",
  SPECIAL_PRODUCT_OUT = "SPECIAL_PRODUCT_OUT",
  SPECIAL_PRODUCT_IN = "SPECIAL_PRODUCT_IN",
}

const schema = z.object({
  transactionTypeCode: z.nativeEnum(TransactionTypeCode),
  accountId: z.string().uuid().optional(),
  referenceCode: z.string().optional(),
  description: z.string().optional(),
  cashAmount: z.coerce.number().optional(),
  productId: z.string().uuid().optional(),
  quantity: z.coerce.number().optional(),
});

export default function TransactionForm({
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof schema>) => void;
}) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionTypeCode: undefined,
      accountId: "",
      referenceCode: "",
      description: "",
      cashAmount: undefined,
      productId: "",
      quantity: undefined,
    },
  });

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Create Transaction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Transaction Type */}
            <FormField
              control={form.control}
              name="transactionTypeCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[].map((type: any) => (
                        <SelectItem key={type.code} value={type.code}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Account ID */}
            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input placeholder="UUID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reference Code */}
            <FormField
              control={form.control}
              name="referenceCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Reference if exists" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Cash Amount */}
            <FormField
              control={form.control}
              name="cashAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cash Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product ID */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product ID</FormLabel>
                  <FormControl>
                    <Input placeholder="UUID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Transaction details..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Transaction
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
