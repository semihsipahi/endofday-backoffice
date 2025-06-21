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

type TransactionTypeField = {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "date";
  required?: boolean;
  options?: string[]; // only for select
};

export const TransactionTypeRulesMap: {
  [key in TransactionTypeCode]: {
    requiresAccount: boolean;
    requiresStock: boolean;
    requiresCash: boolean;
    requiresReferenceCode?: boolean;
    metaSchema?: {
      fields: TransactionTypeField[];
    };
  };
} = {
  GOLD_ENTRY: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    requiresReferenceCode: true,
    metaSchema: {
      fields: [
        { name: "productName", label: "Ürün Adı", type: "text" },
        { name: "gram", label: "Gram", type: "number", required: true },
        { name: "ayar", label: "Ayar", type: "number", required: true },
        { name: "has", label: "Has", type: "number" },
        { name: "labor", label: "Toplam İşçilik", type: "number" },
        { name: "unitLabor", label: "Birim İşçilik", type: "number" },
      ],
    },
  },
  DISCOUNT_CREDIT: {
    requiresAccount: true,
    requiresStock: false,
    requiresCash: false,
    metaSchema: {
      fields: [
        {
          name: "amount",
          label: "Alacak İskonto Tutarı",
          type: "number",
          required: true,
        },
        {
          name: "currency",
          label: "Para Birimi",
          type: "select",
          options: ["TL", "USD", "EUR"],
          required: true,
        },
      ],
    },
  },
  DISCOUNT_DEBIT: {
    requiresAccount: true,
    requiresStock: false,
    requiresCash: false,
    metaSchema: {
      fields: [
        {
          name: "amount",
          label: "Borç İskonto Tutarı",
          type: "number",
          required: true,
        },
        {
          name: "currency",
          label: "Para Birimi",
          type: "select",
          options: ["TL", "USD", "EUR"],
          required: true,
        },
      ],
    },
  },
  RETURNED_OUT: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    requiresReferenceCode: true,
    metaSchema: {
      fields: [
        { name: "productName", label: "Ürün", type: "text" },
        { name: "quantity", label: "Miktar", type: "number" },
        { name: "unit", label: "Birim", type: "text" },
      ],
    },
  },
  CONVERSION: {
    requiresAccount: false,
    requiresStock: true,
    requiresCash: false,
    requiresReferenceCode: true,
    metaSchema: {
      fields: [
        {
          name: "fromCurrency",
          label: "Dönüştürülen Birim",
          type: "select",
          options: ["TL", "USD", "HAS"],
        },
        {
          name: "toCurrency",
          label: "Yeni Birim",
          type: "select",
          options: ["TL", "USD", "HAS"],
        },
        { name: "amount", label: "Miktar", type: "number" },
      ],
    },
  },
  SCRAP_OUT: {
    requiresAccount: false,
    requiresStock: true,
    requiresCash: false,
    requiresReferenceCode: true,
    metaSchema: {
      fields: [
        { name: "productName", label: "Hurda Ürün", type: "text" },
        { name: "gram", label: "Gram", type: "number" },
        { name: "ayar", label: "Ayar", type: "number" },
      ],
    },
  },
  SCRAP_IN: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    requiresReferenceCode: true,
    metaSchema: {
      fields: [
        { name: "productName", label: "Hurda Ürün", type: "text" },
        { name: "gram", label: "Gram", type: "number" },
        { name: "ayar", label: "Ayar", type: "number" },
      ],
    },
  },
  MATERIAL_OUT: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    metaSchema: {
      fields: [
        { name: "materialName", label: "Malzeme", type: "text" },
        { name: "quantity", label: "Miktar", type: "number" },
        { name: "unit", label: "Birim", type: "text" },
      ],
    },
  },
  MATERIAL_IN: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    metaSchema: {
      fields: [
        { name: "materialName", label: "Malzeme", type: "text" },
        { name: "quantity", label: "Miktar", type: "number" },
        { name: "unit", label: "Birim", type: "text" },
      ],
    },
  },
  OFFSET: {
    requiresAccount: true,
    requiresStock: false,
    requiresCash: false,
    requiresReferenceCode: true,
    metaSchema: {
      fields: [
        {
          name: "offsetAmount",
          label: "Mahsup Tutarı",
          type: "number",
          required: true,
        },
        {
          name: "currency",
          label: "Para Birimi",
          type: "select",
          options: ["TL", "USD", "HAS"],
          required: true,
        },
        { name: "targetAccount", label: "Karşı Hesap", type: "text" },
      ],
    },
  },
  MATERIAL_RETURN: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    metaSchema: {
      fields: [
        { name: "materialName", label: "İade Malzeme", type: "text" },
        { name: "quantity", label: "Miktar", type: "number" },
        { name: "unit", label: "Birim", type: "text" },
      ],
    },
  },
  MATERIAL_SALE: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    requiresReferenceCode: true,
    metaSchema: {
      fields: [
        { name: "materialName", label: "Satılan Malzeme", type: "text" },
        { name: "quantity", label: "Miktar", type: "number" },
        { name: "unit", label: "Birim", type: "text" },
        { name: "amount", label: "Tutar", type: "number" },
        {
          name: "currency",
          label: "Para Birimi",
          type: "select",
          options: ["TL", "USD"],
        },
      ],
    },
  },
  CASH_PAYMENT: {
    requiresAccount: true,
    requiresStock: false,
    requiresCash: true,
    metaSchema: {
      fields: [
        { name: "amount", label: "Ödeme Tutarı", type: "number" },
        {
          name: "currency",
          label: "Para Birimi",
          type: "select",
          options: ["TL", "USD", "EUR"],
        },
      ],
    },
  },
  CASH_COLLECTION: {
    requiresAccount: true,
    requiresStock: false,
    requiresCash: true,
    metaSchema: {
      fields: [
        { name: "amount", label: "Tahsilat Tutarı", type: "number" },
        {
          name: "currency",
          label: "Para Birimi",
          type: "select",
          options: ["TL", "USD", "EUR"],
        },
      ],
    },
  },
  CUSTOM_PRODUCT_OUT: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    metaSchema: {
      fields: [
        { name: "productName", label: "Özel Ürün", type: "text" },
        { name: "gram", label: "Gram", type: "number" },
        { name: "ayar", label: "Ayar", type: "number" },
        { name: "has", label: "Has", type: "number" },
      ],
    },
  },
  CUSTOM_PRODUCT_IN: {
    requiresAccount: true,
    requiresStock: true,
    requiresCash: false,
    metaSchema: {
      fields: [
        { name: "productName", label: "Özel Ürün", type: "text" },
        { name: "gram", label: "Gram", type: "number" },
        { name: "ayar", label: "Ayar", type: "number" },
        { name: "has", label: "Has", type: "number" },
      ],
    },
  },
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionTypeCode, string> = {
  GOLD_ENTRY: "Altın Girişi",
  DISCOUNT_CREDIT: "İskonto (Alacak)",
  DISCOUNT_DEBIT: "İskonto (Borç)",
  RETURNED_OUT: "Çıkan İade",
  CONVERSION: "Dönüştürme",
  SCRAP_OUT: "Hurda Çıkış",
  SCRAP_IN: "Hurda Giriş",
  MATERIAL_OUT: "Malzeme Çıkış",
  MATERIAL_IN: "Malzeme Giriş",
  OFFSET: "Mahsup",
  MATERIAL_RETURN: "Malzeme İade",
  MATERIAL_SALE: "Malzeme Satış",
  CASH_PAYMENT: "Nakit Ödeme",
  CASH_COLLECTION: "Nakit Tahsilat",
  CUSTOM_PRODUCT_OUT: "Özel Ürün Çıkış",
  CUSTOM_PRODUCT_IN: "Özel Ürün Giriş",
};
