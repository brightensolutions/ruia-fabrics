"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { Inbox, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Inquiry {
  _id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
}

interface PaginationData {
  total: number
  pages: number
  page: number
  limit: number
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [pagination, setPagination] = useState<PaginationData>({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10,
  })

  const fetchInquiries = async (tab: string, page: number) => {
    try {
      const response = await fetch(`/api/inquiries?tab=${tab}&page=${page}&limit=10`)
      if (!response.ok) {
        throw new Error("Failed to fetch inquiries")
      }
      const data = await response.json()
      setInquiries(data.inquiries)
      setPagination(data.pagination)
    } catch (error) {
      console.error("Error fetching inquiries:", error)
      toast.error("Failed to load inquiries")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInquiries(activeTab, pagination.page)
  }, [activeTab, pagination.page])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="p-6 bg-white shadow-lg rounded-[5px] border-custom-black/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-custom-green">Customer Inquiries</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Total Messages:</span>
            <span className="font-semibold text-custom-green">{pagination.total}</span>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-8 p-0">
            <TabsTrigger value="all" className="text-base">
              All Messages
            </TabsTrigger>
            <TabsTrigger value="today" className="text-base">
              Today&apos;s Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <InquiriesTable
              inquiries={inquiries}
              isLoading={isLoading}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </TabsContent>

          <TabsContent value="today" className="space-y-4">
            <InquiriesTable
              inquiries={inquiries}
              isLoading={isLoading}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

interface InquiriesTableProps {
  inquiries: Inquiry[]
  isLoading: boolean
  pagination: PaginationData
  onPageChange: (page: number) => void
}

function InquiriesTable({ inquiries, isLoading, pagination, onPageChange }: InquiriesTableProps) {
  if (isLoading) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center gap-4 text-custom-green">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm">Loading messages...</p>
      </div>
    )
  }

  if (!inquiries.length) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Inbox className="h-12 w-12" />
        <p className="text-lg font-medium">No messages found</p>
        <p className="text-sm">When customers send inquiries, they will appear here.</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-custom-green text-white hover:bg-custom-green">
                <TableHead className="w-[180px] text-white">Date</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Email</TableHead>
                <TableHead className="text-white">Phone</TableHead>
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="w-[300px] text-white">Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry._id} className="hover:bg-white">
                  <TableCell className="font-medium text-custom-black">{format(new Date(inquiry.createdAt), "PPp")}</TableCell>
                  <TableCell className="text-custom-black">{inquiry.name}</TableCell>
                  <TableCell className="text-custom-green hover:underline">
                    <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                  </TableCell>
                  <TableCell className="text-custom-black">
                    <a href={`tel:${inquiry.phone}`} className="hover:underline">
                      {inquiry.phone}
                    </a>
                  </TableCell>
                  <TableCell className="text-custom-black">{inquiry.subject}</TableCell>
                  <TableCell className="max-w-xs text-custom-black">
                    <div className="truncate" title={inquiry.message}>
                      {inquiry.message}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {pagination.pages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground">
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

