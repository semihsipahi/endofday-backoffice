import { NavItem } from "@/types";

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

//Info: The following data is used for the sidebar navigation and Cmd K bar.
export const navItems: NavItem[] = [
  {
    title: "Yönetim",
    url: "/dashboard/overview",
    icon: "dashboard",
    isActive: true,
    shortcut: ["o", "o"],
    items: [], // Empty array as there are no child items for Dashboard
  },
  // {
  //   title: 'Product',
  //   url: '/dashboard/product',
  //   icon: 'product',
  //   shortcut: ['p', 'p'],
  //   isActive: false,
  //   items: [] // No child items
  // },
  {
    title: "Cari",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "billing",
    isActive: false,
    items: [
      {
        title: "Meta",
        url: "/dashboard/meta",
        shortcut: ["m", "m"],
      },
      {
        title: "Cari İşlemler",
        url: "/dashboard/transaction",
        shortcut: ["t", "t"],
      },
      {
        title: "İşlem Tipleri",
        url: "/dashboard/transaction_type",
        shortcut: ["p", "p"],
      },
    ],
  },
  {
    title: "Stok",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "product",
    isActive: false,
    items: [
      {
        title: "Stok İşlemler",
        url: "",
        shortcut: ["s", "s"],
      },
    ],
  },

  {
    title: "Hesap",
    url: "#", // Placeholder as there is no direct link for the parent
    icon: "userPen",
    isActive: false,
    items: [
      {
        title: "Profil",
        url: "/dashboard/profile",
        shortcut: ["p", "p"],
      },
    ],
  },
  {
    title: "Kanban",
    url: "/dashboard/kanban",
    icon: "kanban",
    shortcut: ["k", "k"],
    isActive: false,
    items: [], // No child items
  },
];

export interface SaleUser {
  id: number;
  name: string;
  email: string;
  amount: string;
  image: string;
  initials: string;
}

export const recentSalesData: SaleUser[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    image: "https://api.slingacademy.com/public/sample-users/1.png",
    initials: "OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/2.png",
    initials: "JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    image: "https://api.slingacademy.com/public/sample-users/3.png",
    initials: "IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    image: "https://api.slingacademy.com/public/sample-users/4.png",
    initials: "WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    image: "https://api.slingacademy.com/public/sample-users/5.png",
    initials: "SD",
  },
];
