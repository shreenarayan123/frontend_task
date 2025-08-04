import { useState } from "react"
import { AdminListView } from "./admin-list-view"
import { AdminDetailView } from "./admin-detail-view"
import { AdminModal } from "./admin-modal"
import { useAdmin } from "./admin-context"
import {  type Admin } from "../lib/Data"
import { Sidebar } from "./sidebar"

export function AdminDashboard() {
  const { selectedAdmin } = useAdmin()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 w-full">
      <Sidebar />

      <div className="flex-1 flex">
        <div className={`transition-all duration-300 ${selectedAdmin ? "w-2/3" : "w-full"}`}>
          <AdminListView
            onCreateAdmin={() => {
              setEditingAdmin(null)
              setIsModalOpen(true)
            }}
            onEditAdmin={(admin) => {
              setEditingAdmin(admin)
              setIsModalOpen(true)
            }}
          />
        </div>

        {selectedAdmin && (
          <div className="w-1/3 border-l border-gray-200 bg-white">
            <AdminDetailView />
          </div>
        )}
      </div>

      <AdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} admin={editingAdmin} />
    </div>
  )
}
