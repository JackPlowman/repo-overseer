"use client"

import type { ColumnDef } from "@tanstack/react-table"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"

import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  return (
    <div data-oid="qa4mgng">
      <Table data-oid="0q22gk7">
        <TableHeader data-oid=":ufh-hf">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} data-oid="_bb6spf">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} data-oid="vszox0:">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody data-oid="c4ufubr">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-oid="alp5:um">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} data-oid="2f_zqbu">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow data-oid="el7n3k7">
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
                data-oid="0ycj-ei"
              >
                No repositories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        className="flex items-center justify-end space-x-2 py-4"
        data-oid=".oi0s4t"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          data-oid="d:l-xkm"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          data-oid="nlvwwn4"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
