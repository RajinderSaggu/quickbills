"use server";
import { requireUser } from "@/hooks/requireUser";
import prisma from "@/utils/db";
import { formatCurrency } from "@/utils/helpers";
import { emailClient } from "@/utils/mailtrap";
import { invoiceSchema, onboardingSchema } from "@/utils/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function onboardUser(prevState: any, formData: FormData) {
    const session = await requireUser();
    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address
        }
    });
    return redirect("/dashboard");
};


export async function getUser(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            firstName: true,
            lastName: true,
            address: true,
        }
    });
    if (!data?.firstName || !data?.lastName || !data?.address) {
        redirect("/onboarding");
    }
}
export async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            clientName: true,
            total: true,
            createdAt: true,
            status: true,
            invoiceNumber: true,
            currency: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return data;
}
export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session.user?.id,
        },
    });

    const sender = {
        email: "hello@demomailtrap.com",
        name: "Rajinder Kaur Saggu",
    };

    emailClient.send({
        from: sender,
        to: [{ email: "rajinderkaursaggu22@gmail.com" }],
        template_uuid: "003439d4-9892-430b-9d29-7d359e63d864",
        template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            dueDate: new Intl.DateTimeFormat("en-IN", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            totalAmount: submission.value.total,
            // invoiceAmount: formatCurrency({
            //     totalAmount: submission.value.total,
            //   currency: submission.value.currency as any,
            // }),
            invoiceLink:
                process.env.NODE_ENV !== "production"
                    ? `http://localhost:3000/api/invoice/${data.id}`
                    : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
        },
    });

    return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id,
        },
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        },
    });

    const sender = {
        email: "hello@demomailtrap.com",
        name: "Rajinder Kaur",
    };

    emailClient.send({
        from: sender,
        to: [{ email: "rajinderkaursaggu22@gmail.com" }],
        template_uuid: "a4612e77-3b85-4549-9c89-c1fa7d570512",
        template_variables: {
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber,
            invoiceDueDate: new Intl.DateTimeFormat("en-US", {
                dateStyle: "long",
            }).format(new Date(submission.value.date)),
            invoiceAmount: formatCurrency({
                amount: submission.value.total,
                currency: submission.value.currency as any,
            }),
            invoiceLink:
                process.env.NODE_ENV !== "production"
                    ? `http://localhost:3000/api/invoice/${data.id}`
                    : `https://invoice-marshal.vercel.app/api/invoice/${data.id}`,
        },
    });

    return redirect("/dashboard/invoices");
}

export async function DeleteInvoice(invoiceId: string) {
    const session = await requireUser();

    const data = await prisma.invoice.delete({
        where: {
            userId: session.user?.id,
            id: invoiceId,
        },
    });

    return redirect("/dashboard/invoices");
}

export async function MarkAsPaidAction(invoiceId: string) {
    const session = await requireUser();

    const data = await prisma.invoice.update({
        where: {
            userId: session.user?.id,
            id: invoiceId,
        },
        data: {
            status: "PAID",
        },
    });

    return redirect("/dashboard/invoices");
}