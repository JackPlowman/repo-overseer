import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { repositories } from "@/data/repositories.json"

export default function RepositoryTable() {
  return (
    <Tabs defaultValue="details"className="w-full">
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>
      <TabsContent value="details">
        <DataTable columns={columns} data={repositories} />
      </TabsContent>
      <TabsContent value="security">Put content here</TabsContent>
    </Tabs>
  )
}
