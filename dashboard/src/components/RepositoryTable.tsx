import { DataTable } from "@/components/data-table"
import { RepositoryDetailColumns } from "@/components/RepositoryDetailColumns"
import { RepositoryKeyFileColumns } from "@/components/RepositoryKeyFilesColumns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { repositories } from "@/data/repositories.json"
import { RepositorySecurityColumns } from "./RepositorySecurityColumns"

const flatRepositories = repositories.map((repository) => {
  return {
    ...repository,
    ...repository.repository_details,
    ...repository.repository_security_details,
    ...repository.repository_key_files,
  }
})

export default function RepositoryDetailTable() {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="key-files">Key Files</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <DataTable columns={RepositoryDetailColumns} data={flatRepositories} />
      </TabsContent>
      <TabsContent value="key-files">
        <DataTable columns={RepositoryKeyFileColumns} data={flatRepositories} />
      </TabsContent>
      <TabsContent value="security">
        <DataTable
          columns={RepositorySecurityColumns}
          data={flatRepositories}
        />
      </TabsContent>
    </Tabs>
  )
}
