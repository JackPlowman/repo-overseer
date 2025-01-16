import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { repositories } from "@/data/repositories.json"

export default function RepositoryTable() {
  return <DataTable columns={columns} data={repositories} />
}
