import EditInvoice from "@/app/components/edit-invoice";
import { requireUser } from "@/hooks/requireUser";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: userId,
      },
    });
  
    if (!data) {
      return notFound();
    }
  
    return data;
  }
type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoiceRoute({ params }: { params: Params }) {
  const { invoiceId } = await params;
  const session = await requireUser();
  const data = await getData(invoiceId, session.user?.id as string);

  return <EditInvoice data={data} />;
}