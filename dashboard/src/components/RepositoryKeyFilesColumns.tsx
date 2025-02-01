"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Repository } from "@/lib/types"
import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckIcon, CrossIcon, ShieldAlert } from "lucide-react"

export const GreenCheckIcon = () => (
  <CheckIcon className="h-4 w-4 text-green-500" />
)
export const RedCrossIcon = () => <CrossIcon className="h-4 w-4 text-red-500" />

export const RepositoryKeyFileColumns: ColumnDef<Repository>[] = [
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
    accessorKey: "has_license",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>License</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.getValue("has_license") ? <GreenCheckIcon /> : <RedCrossIcon />}
      </Badge>
    ),
  },
  {
    accessorKey: "has_readme",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Readme</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.getValue("has_readme") ? <GreenCheckIcon /> : <RedCrossIcon />}
      </Badge>
    ),
  },
  {
    accessorKey: "has_security_policy",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Security Policy</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.getValue("has_security_policy") ? (
          <GreenCheckIcon />
        ) : (
          <RedCrossIcon />
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "has_code_of_conduct",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Code of Conduct</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.getValue("has_code_of_conduct") ? (
          <GreenCheckIcon />
        ) : (
          <RedCrossIcon />
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "has_contributing",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Contributing</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.getValue("has_contributing") ? (
          <GreenCheckIcon />
        ) : (
          <RedCrossIcon />
        )}
      </Badge>
    ),
  },
  {
    accessorKey: "has_project_technologies",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          <span>Project Technologies</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      </Button>
    ),

    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.getValue("has_project_technologies") ? (
          <GreenCheckIcon />
        ) : (
          <RedCrossIcon />
        )}
      </Badge>
    ),
  },
]
