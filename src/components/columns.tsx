"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Shield, ShieldAlert, GitPullRequest } from "lucide-react"

type Repository = {
  name: string
  full_name: string
  secret_scanning_push_protection: boolean
  secret_scanning: boolean
  dependabot_security_updates: boolean
}

export const columns: ColumnDef<Repository>[] = [
  {
    accessorKey: "name",
    header: "Repository",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "secret_scanning_push_protection",
    header: () => (
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4" />
        <span>Push Protection</span>
      </div>
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue("secret_scanning_push_protection") ? "success" : "destructive"}>
        {row.getValue("secret_scanning_push_protection") ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "secret_scanning",
    header: () => (
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        <span>Secret Scanning</span>
      </div>
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue("secret_scanning") ? "success" : "destructive"}>
        {row.getValue("secret_scanning") ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "dependabot_security_updates",
    header: () => (
      <div className="flex items-center gap-2">
        <GitPullRequest className="h-4 w-4" />
        <span>Dependabot</span>
      </div>
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue("dependabot_security_updates") ? "success" : "destructive"}>
        {row.getValue("dependabot_security_updates") ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
]
