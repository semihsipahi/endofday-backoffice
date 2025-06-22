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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import {
  TRANSACTION_TYPE_LABELS,
  TransactionTypeCode,
  TransactionTypeRulesMap,
} from "./contants/transaction-type-enum";

// Zod schema
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
  meta: z.record(z.any()).optional(),
});

type FormData = z.infer<typeof schema>;

type MetaField = {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "date";
  required?: boolean;
  options?: string[];
};

function ImpactsTab({ form }: { form: any }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "impacts",
  });

  const currencyOptions = [
    { id: "uuid-try", name: "TRY" },
    { id: "uuid-usd", name: "USD" },
    { id: "uuid-eur", name: "EUR" },
  ];

  return (
    <div>
      <FormLabel className="mb-2 font-semibold">Cari Hareketler</FormLabel>
      <br />
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-4 gap-4 mb-4">
          <FormField
            control={form.control}
            name={`impacts.${index}.currencyId` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Para Birimi</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          <FormField
            control={form.control}
            name={`impacts.${index}.debit` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Borç</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`impacts.${index}.credit` as const}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alacak</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
      <Button
        type="button"
        onClick={() => append({ currencyId: "", debit: 0, credit: 0 })}
      >
        Cari Hareket Ekle
      </Button>
    </div>
  );
}

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
      meta: {},
    },
  });

  const transactionTypeCode = form.watch("transactionTypeCode");
  const [metaFields, setMetaFields] = useState<MetaField[]>([]);

  useEffect(() => {
    if (transactionTypeCode) {
      const selected = TransactionTypeRulesMap[transactionTypeCode];
      if (selected?.metaSchema?.fields) {
        setMetaFields(selected.metaSchema.fields);
      } else {
        setMetaFields([]);
      }
    }
  }, [transactionTypeCode]);

  const transactionTypeOptions = Object.entries(TRANSACTION_TYPE_LABELS).map(
    ([value, label]) => ({
      value: value as TransactionTypeCode,
      label,
    })
  );

  const onSubmit = (data: FormData) => {
    console.log("Submitted:", data);
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
                      {transactionTypeOptions.map((type: any) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <br />
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
                <TabsTrigger value="impacts">Cari Hareketler</TabsTrigger>
              </TabsList>

              <br />
              <TabsContent value="general" className="space-y-6">
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

                {/* Dynamic Meta Fields */}
                {metaFields.length > 0 && (
                  <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 shadow-md">
                    <CardHeader className="border-b border-gray-200 dark:border-gray-600">
                      <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                        Meta Alanlar
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                      {metaFields.map((metaField) => (
                        <FormField
                          key={metaField.name}
                          control={form.control}
                          name={`meta.${metaField.name}` as const}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-medium text-gray-600 dark:text-gray-300">
                                {metaField.label}
                              </FormLabel>
                              <FormControl>
                                {metaField.type === "select" ? (
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                  >
                                    <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                                      <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {metaField.options?.map((opt) => (
                                        <SelectItem key={opt} value={opt}>
                                          {opt}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input
                                    {...field}
                                    type={metaField.type}
                                    placeholder={metaField.label}
                                    className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </CardContent>
                  </Card>
                )}

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Açıklama</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="impacts">
                <ImpactsTab form={form} />
              </TabsContent>
            </Tabs>

            <Button type="submit" className="w-full">
              Başlat
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
