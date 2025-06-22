import PageContainer from "@/components/layout/page-container";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export const metadata = {
  title: "Yönetim: Meta",
};

type pageProps = {
  // Your page props
};

export default async function Page(props: pageProps) {
  // Your page implementation

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading
            title="Meta"
            description="Cari işlem modülüne ait META ayarlar yönetimi"
          />
          <Link
            href="/dashboard/transaction/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <IconPlus className="mr-2 h-4 w-4" /> Yeni META (Yakında)
          </Link>
        </div>
        <Separator />
      </div>
    </PageContainer>
  );
}
