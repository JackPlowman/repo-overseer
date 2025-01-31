"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, GitPullRequest, Shield, ShieldAlert } from "lucide-react"
type Repository = {
  name: string
  full_name: string
  repository_link: string
  secret_scanning_push_protection: boolean
  secret_scanning: boolean
  dependabot_security_updates: boolean
}

export const columns: ColumnDef<Repository>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          data-oid="mzy24.j"
        >
          Repository
          <ArrowUpDown className="ml-2 h-4 w-4" data-oid="vrmdjdu" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <a
          href={row.original.repository_link}
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          data-oid="rbrxftz"
        >
          {row.original.name}
        </a>
      )
    },
  },
  {
    accessorKey: "secret_scanning_push_protection",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        data-oid="vc45.rx"
      >
        <div className="flex items-center gap-2" data-oid="ilfoxue">
          <ShieldAlert className="h-4 w-4" data-oid="c4d1:45" />
          <span data-oid="99k9lox">Push Protection</span>
          <ArrowUpDown className="ml-2 h-4 w-4" data-oid="xftjt86" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue("secret_scanning_push_protection")
            ? "success"
            : "destructive"
        }
        data-oid="72pk1fs"
      >
        {row.getValue("secret_scanning_push_protection")
          ? "Enabled"
          : "Disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "secret_scanning",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        data-oid="w5h7r72"
      >
        <div className="flex items-center gap-2" data-oid="m1bkq7i">
          <Shield className="h-4 w-4" data-oid="cq2:avt" />
          <span data-oid="x2a4q_.">Secret Scanning</span>
          <ArrowUpDown className="ml-2 h-4 w-4" data-oid="_ryk0st" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge
        variant={row.getValue("secret_scanning") ? "success" : "destructive"}
        data-oid="oobta2d"
      >
        {row.getValue("secret_scanning") ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "dependabot_security_updates",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        data-oid="793p:2d"
      >
        <div className="flex items-center gap-2" data-oid="_b1m5g2">
          <GitPullRequest className="h-4 w-4" data-oid="qr3ftrv" />
          <span data-oid="9e1-f2v">Dependabot</span>
          <ArrowUpDown className="ml-2 h-4 w-4" data-oid="muz0bsd" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue("dependabot_security_updates")
            ? "success"
            : "destructive"
        }
        data-oid="79lcad:"
      >
        {row.getValue("dependabot_security_updates") ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
]
