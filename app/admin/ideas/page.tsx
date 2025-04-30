import { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { requireAdmin } from "@/lib/auth-utils"
import { AdminConfigMessage } from "@/components/admin/admin-config-message"
import { DevEnvNotice } from "@/components/admin/dev-env-notice"
import { Heading } from "@/components/typography/heading"
import { IdeasUploader } from "@/components/admin/ideas/ideas-uploader"
import { IdeasTable } from "@/components/admin/ideas/ideas-table"

export const metadata: Metadata = {
  title: "Manage Ideas - Admin Dashboard",
  description: "Import and manage startup ideas",
}

export default async function IdeasAdminPage() {
  const { isAdmin, requiresSetup } = await requireAdmin()
  const isDev = process.env.NODE_ENV === "development"

  if (requiresSetup) {
    return (
      <div className="container max-w-2xl py-8 md:py-12">
        <AdminConfigMessage />
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-2xl text-center">
          <Heading variant="h1" className="mb-4">
            Access Denied
          </Heading>
          <p className="text-muted-foreground text-balance mb-8">You don&apos;t have permission to access this page. Please contact an administrator if you believe this is an error.</p>
          {isDev && <DevEnvNotice />}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <Heading variant="h3" className="mb-8 text-center text-primary">
          Manage Ideas
        </Heading>

        <div className="grid gap-8">
          {/* Import Section */}
          <Card>
            <CardHeader>
              <CardTitle>Import Ideas</CardTitle>
              <CardDescription>Upload a JSON file to import new ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <IdeasUploader />
            </CardContent>
          </Card>

          {/* Ideas Table Section */}
          <Card>
            <CardHeader>
              <CardTitle>Current Ideas</CardTitle>
              <CardDescription>View and manage existing ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <IdeasTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
