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
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

export enum TransactionTypeCode {
  GOLD_ENTRY = "GOLD_ENTRY",
  DISCOUNT_CREDIT = "DISCOUNT_CREDIT",
  DISCOUNT_DEBIT = "DISCOUNT_DEBIT",
  RETURNED_OUT = "RETURNED_OUT",
  CONVERSION = "CONVERSION",
  SCRAP_OUT = "SCRAP_OUT",
  SCRAP_IN = "SCRAP_IN",
  MATERIAL_OUT = "MATERIAL_OUT",
  MATERIAL_IN = "MATERIAL_IN",
  OFFSET = "OFFSET",
  MATERIAL_RETURN = "MATERIAL_RETURN",
  MATERIAL_SALE = "MATERIAL_SALE",
  CASH_PAYMENT = "CASH_PAYMENT",
  CASH_COLLECTION = "CASH_COLLECTION",
  CUSTOM_PRODUCT_OUT = "CUSTOM_PRODUCT_OUT",
  CUSTOM_PRODUCT_IN = "CUSTOM_PRODUCT_IN",
}

// Zod schema, impacts array eklendi
const impactSchema = z
  .object({
    currencyId: z
      .string()
      .uuid({ message: "Geçerli bir para birimi seçiniz." }),
    debit: z.number().min(0).optional(),
    credit: z.number().min(0).optional(),
  })
  .refine((data) => (data.debit ?? 0) > 0 || (data.credit ?? 0) > 0, {
    message: "Borç veya Alacak tutarından en az biri sıfırdan büyük olmalı.",
  });

const schema = z.object({
  transactionTypeCode: z.nativeEnum(TransactionTypeCode),
  accountId: z.string().uuid().optional(),
  referenceCode: z.string().optional(),
  description: z.string().optional(),
  cashAmount: z.number().optional(),
  productId: z.string().uuid().optional(),
  quantity: z.number().optional(),
  impacts: z
    .array(impactSchema)
    .min(1, { message: "En az bir para birimi etkisi girilmeli." }),
});

type FormData = z.infer<typeof schema>;

export default function TransactionForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      transactionTypeCode: undefined,
      accountId: "",
      referenceCode: "",
      description: "",
      cashAmount: undefined,
      productId: "",
      quantity: undefined,
      impacts: [{ currencyId: "", debit: 0, credit: 0 }],
    },
  });

  // impacts alanı dinamik bir array, react-hook-form'un useFieldArray kullanımı
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "impacts",
  });

  // Örnek para birimi seçenekleri, bunu API'den çekmen önerilir
  const currencyOptions = [
    { id: "uuid-try", name: "TRY" },
    { id: "uuid-usd", name: "USD" },
    { id: "uuid-eur", name: "EUR" },
  ];

  // TransactionType seçenekleri (enum’dan dönüştür)
  const transactionTypes = Object.entries(TransactionTypeCode).map(
    ([key, value]) => ({
      code: value,
      name: key.replace(/_/g, " ").toLocaleLowerCase(), // basit dönüştürme, istersen farklı yap
    })
  );

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
    // API çağrısı yap
  };

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Yeni Cari İşlem
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
                  <FormLabel>İşlem Tipi</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="İşlem Tipini Seçiniz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {transactionTypes.map((type) => (
                        <SelectItem key={type.code} value={type.code}>
                          {type.name.charAt(0).toUpperCase() +
                            type.name.slice(1)}
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
                  <FormLabel>Hesap</FormLabel>
                  <FormControl>
                    <Input placeholder="Altınbaş..." {...field} />
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
                  <FormLabel>Referans Kodu</FormLabel>
                  <FormControl>
                    <Input placeholder="Referans var ise" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Impacts - Borç/Alacak ve Para Birimi */}
            <div>
              <FormLabel className="mb-2 font-semibold">
                Cari Hareketler
              </FormLabel>
              <br />
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-4 gap-4 mb-4">
                  {/* Currency */}
                  <FormField
                    control={form.control}
                    name={`impacts.${index}.currencyId` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Para Birimi</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Birim Seçiniz" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {currencyOptions.map((currency) => (
                              <SelectItem key={currency.id} value={currency.id}>
                                {currency.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Debit */}
                  <FormField
                    control={form.control}
                    name={`impacts.${index}.debit` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Debit (Borç)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Credit */}
                  <FormField
                    control={form.control}
                    name={`impacts.${index}.credit` as const}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Credit (Alacak)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Remove Button */}
                  <div className="flex items-end">
                    <Button
                      variant="destructive"
                      onClick={() => remove(index)}
                      type="button"
                    >
                      Sil
                    </Button>
                  </div>
                </div>
              ))}
              <br />

              <Button
                type="button"
                onClick={() => append({ currencyId: "", debit: 0, credit: 0 })}
              >
                Cari Hareket Ekle
              </Button>
            </div>

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
