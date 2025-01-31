import { columns } from "@/components/columns"
import { DataTable } from "@/components/data-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { repositories } from "@/data/repositories.json"

export default function RepositoryTable() {
  return (
    <Tabs defaultValue="details" className="w-full" data-oid="ta6u1k3">
      <TabsList data-oid="m63_zzl">
        <TabsTrigger value="details" data-oid="ovi6q_5">
          Details
        </TabsTrigger>
        <TabsTrigger value="security" data-oid="n87_ht1">
          Security
        </TabsTrigger>
      </TabsList>
      <TabsContent value="details" data-oid="8x-4q-k">
        <DataTable columns={columns} data={repositories} data-oid="xaq_j_f" />
      </TabsContent>
      <TabsContent value="security" data-oid="dp.d_bj">
        Put content here
      </TabsContent>
    </Tabs>
  )
}
