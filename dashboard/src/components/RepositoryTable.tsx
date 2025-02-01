import { DataTable } from "@/components/data-table"
import { RepositoryDetailColumns } from "@/components/RepositoryDetailColumns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { repositories } from "@/data/repositories.json"
import { type Repository } from "@/lib/types"
import { RepositorySecurityColumns } from "./RepositorySecurityColumns"

const sortRepository = (a: Repository, b: Repository) => {
  return a.name.localeCompare(b.name)
}

const sortedRepositories = repositories.sort(sortRepository)

const sortedFlatRepositories = repositories.map((repository) => {
  return {
    ...repository,
    ...repository.repository_security_details,
    ...repository.repository_has_files,
  }
}
)

export default function RepositoryDetailTable() {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <DataTable
          columns={RepositoryDetailColumns}
          data={sortedFlatRepositories}
        />
      </TabsContent>
      <TabsContent value="security">
        <DataTable
          columns={RepositorySecurityColumns}
          data={sortedFlatRepositories}
        />
      </TabsContent>
    </Tabs>
  )
}
