
import { requireUser } from "@/hooks/requireUser";
import prisma from "@/utils/db";
import { emailClient } from "@/utils/mailtrap";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  try {
    const session = await requireUser();

    const { invoiceId } = await params;

    const invoiceData = await prisma.invoice.findUnique({
      where: {
        id: invoiceId,
        userId: session.user?.id,
      },
    });

    if (!invoiceData) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Rajinder Kaur saggu",
    };

    emailClient.send({
      from: sender,
      to: [{ email: "rajinderkaursaggu22@gmail.com" }],
      template_uuid: "0ef69a2e-69c5-4228-b4c8-436bea365af7",
      template_variables: {
        first_name: invoiceData.clientName,
        company_info_name: "QuickBills",
        company_info_address: "Chad street 124",
        company_info_city: "Munich",
        company_info_zip_code: "345345",
        company_info_country: "Germany",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send Email reminder" },
      { status: 500 }
    );
  }
}