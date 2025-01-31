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
        >
          Repository
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Push Protection</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Secret Scanning</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge
        variant={row.getValue("secret_scanning") ? "success" : "destructive"}
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
      >
        <div className="flex items-center gap-2">
          <GitPullRequest className="h-4 w-4" />
          <span>Dependabot</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      >
        {row.getValue("dependabot_security_updates") ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
]
