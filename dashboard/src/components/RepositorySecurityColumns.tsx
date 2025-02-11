"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Repository } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
  GitPullRequest,
  MessageCircleWarning,
  Shield,
  ShieldAlert,
} from "lucide-react"

export const RepositorySecurityColumns: ColumnDef<Repository>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting()}>
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
        onClick={() => column.toggleSorting()}
        data-testid="secret-scanning-push-protection"
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
        variant="default"
        className={
          row.getValue("secret_scanning_push_protection")
            ? "bg-green-400"
            : "bg-red-400"
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
        onClick={() => column.toggleSorting()}
        data-testid="secret-scanning"
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
        variant="default"
        className={
          row.getValue("secret_scanning") ? "bg-green-400" : "bg-red-400"
        }
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
        onClick={() => column.toggleSorting()}
        data-testid="dependabot-security-updates"
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
        className={
          row.getValue("dependabot_security_updates")
            ? "bg-green-400"
            : "bg-red-400"
        }
      >
        {row.getValue("dependabot_security_updates") ? "Enabled" : "Disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "private_vulnerability_disclosures",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting()}
        data-testid="private-vulnerability-disclosures"
      >
        <div className="flex items-center gap-2">
          <MessageCircleWarning className="h-4 w-4" />
          <span>Private Vulnerability Disclosures</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge
        className={
          row.getValue("private_vulnerability_disclosures")
            ? "bg-green-400"
            : "bg-red-400"
        }
      >
        {row.getValue("private_vulnerability_disclosures")
          ? "Enabled"
          : "Disabled"}
      </Badge>
    ),
  },
  {
    accessorKey: "code_scanning_alerts",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting()}
        data-testid="code-scanning-alerts"
      >
        <div className="flex items-center gap-2">
          <MessageCircleWarning className="h-4 w-4" />
          <span>Code Scanning Alerts</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge
        className={
          row.getValue("code_scanning_alerts") === 0
            ? "bg-green-400"
            : "bg-red-400"
        }
      >
        {row.getValue("code_scanning_alerts")}
      </Badge>
    ),
  },
]
