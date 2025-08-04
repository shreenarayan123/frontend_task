import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import type { AdminContextType, Admin, SortField, SortOrder  } from "../lib/Data"
import { mockAdmins,  mockSocieties } from "../lib/Data"

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins)
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortField, setSortField] = useState<SortField | null>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }, [sortField])

  const createAdmin = useCallback(
    (adminData: Omit<Admin, "id" | "createdAt" | "recentActivities">) => {
      const newAdmin: Admin = {
        ...adminData,
        id: Math.max(...admins.map((a) => a.id)) + 1,
        createdAt: new Date().toISOString(),
        recentActivities: [],
      }
      setAdmins((prev) => [...prev, newAdmin])
    },
    [admins],
  )

  const updateAdmin = useCallback(
    (id: number, updates: Partial<Admin>) => {
      setAdmins((prev) => prev.map((admin) => (admin.id === id ? { ...admin, ...updates } : admin)))
      if (selectedAdmin?.id === id) {
        setSelectedAdmin((prev) => (prev ? { ...prev, ...updates } : null))
      }
    },
    [selectedAdmin],
  )

  const deleteAdmin = useCallback(
    (id: number) => {
      setAdmins((prev) => prev.filter((admin) => admin.id !== id))
      if (selectedAdmin?.id === id) {
        setSelectedAdmin(null)
      }
    },
    [selectedAdmin],
  )

  return (
    <AdminContext.Provider
      value={{
        admins,
        societies: mockSocieties,
        selectedAdmin,
        setSelectedAdmin,
        createAdmin,
        updateAdmin,
        deleteAdmin,
        searchTerm,
        setSearchTerm,
        statusFilter,
        setStatusFilter,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder,
        handleSort,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider")
  }
  return context
}
