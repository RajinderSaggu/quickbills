import { SharedTable } from '@/app/components/table';
import React from 'react'
import InvoiceActions from './invoice-actions';

const InvoiceList = () => {
    const columns = [
        { key: "id", label: "Invoice ID" },
        { key: "customer", label: "Customer" },
        { key: "amount", label: "Amount" },
        { key: "status", label: "Status" },
        { key: "date", label: "Date" },
        { key: "actions", label: "Actions" },
    ];

    const data = [
        { id: 1, customer: "Alice", amount: "5500", status: "ready", date: 21 / 29 / 200, actions: <InvoiceActions/> }, ,
        { id: 2, customer: "Alice", amount: "5500", status: "ready", date: 21 / 29 / 200, actions:  <InvoiceActions/> },
        { id: 3, customer: "Alice", amount: "5500", status: "ready", date: 21 / 29 / 200, actions:  <InvoiceActions/> },
        { id: 4, customer: "Alice", amount: "5500", status: "ready", date: 21 / 29 / 200, actions:  <InvoiceActions/> },
        { id: 5, customer: "Alice", amount: "5500", status: "ready", date: 21 / 29 / 200, actions:  <InvoiceActions/> },

    ];
    return (
        <div>
            <SharedTable columns={columns} data={data} />
        </div>
    )
}

export default InvoiceList
