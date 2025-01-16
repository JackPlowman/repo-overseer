import { DataTable } from  "@/components/data-table"
import { columns } from "@/components/columns"
import { repositories } from  "@/data/repositories.json"

export default function RepositoryTable() {
  return (
    <DataTable columns={columns} data={repositories}
    />
  )
}
