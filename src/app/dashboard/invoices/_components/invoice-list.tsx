import React from 'react'
import InvoiceActions from './invoice-actions';
import { requireUser } from '@/hooks/requireUser';
import { getData } from '@/app/actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import EmptyState from './empty-state';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/helpers';

const InvoiceList = async () => {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    return (
        <>
          {data.length === 0 ? (
            <EmptyState
              title="No invoices found"
              description="Create an invoice to get started"
              buttontext="Create invoice"
              href="/dashboard/invoices/create"
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell>#{invoice.invoiceNumber}</TableCell>
                    <TableCell>{invoice.clientName}</TableCell>
                    <TableCell>
                      {formatCurrency({
                        amount: invoice.total,
                        currency: invoice.currency as any,
                      })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={invoice.status === "PAID" ? "secondary" : "default"}>{invoice.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-IN", {
                        dateStyle: "medium",
                      }).format(invoice.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <InvoiceActions status={invoice.status} id={invoice.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </>
      );
}

export default InvoiceList
