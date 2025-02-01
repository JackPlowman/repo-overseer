"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Repository } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CircleDot, GitPullRequest } from "lucide-react"

export const RepositoryDetailColumns: ColumnDef<Repository>[] = [
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
    accessorKey: "open_pull_requests",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <GitPullRequest className="h-4 w-4" />
          <span>Pull Requests</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant="default"
        className={
          row.getValue("open_pull_requests") > 3
            ? "bg-amber-600"
            : "bg-green-600"
        }
      >
        {/*  */}
        {row.getValue("open_pull_requests")}
      </Badge>
    ),
  },
  {
    accessorKey: "open_issues",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <CircleDot className="h-4 w-4" />
          <span>Issues</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),
    cell: ({ row }) => (
      <Badge
        variant="default"
        className={
          row.getValue("open_issues") > 3
            ? "bg-amber-600"
            : "bg-green-600"
        }
      >
        {row.getValue("open_issues")}
      </Badge>
    ),
  },
]
