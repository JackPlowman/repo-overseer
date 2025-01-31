import { DataTable } from "@/components/data-table"
import { RepositoryDetailColumns } from "@/components/RepositoryDetailColumns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { repositories } from "@/data/repositories.json"
import { RepositorySecurityColumns } from "./RepositorySecurityColumns"

export default function RepositoryDetailTable() {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <DataTable columns={RepositoryDetailColumns} data={repositories} />
      </TabsContent>
      <TabsContent value="security">
        <DataTable columns={RepositorySecurityColumns} data={repositories} />
      </TabsContent>
    </Tabs>
  )
}
