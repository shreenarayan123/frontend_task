import type React from "react"

import { useState, useEffect } from "react"
import { useAdmin } from "./admin-context"
import { type Admin, type Society } from "../lib/Data"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { X, Building2, Search } from "lucide-react"

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  admin?: Admin | null
}

export function AdminModal({ isOpen, onClose, admin }: AdminModalProps) {
  const { createAdmin, updateAdmin, societies } = useAdmin()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "pending" as "pending" | "active" | "inactive",
    assignedSocieties: [] as Society[],
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (admin) {
      setFormData({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        status: admin.status,
        assignedSocieties: admin.assignedSocieties,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        status: "pending",
        assignedSocieties: [],
      })
    }
    setErrors({})
  }, [admin, isOpen])

  const filteredSocieties = societies.filter((society) => society.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const adminData = {
      ...formData,
      loginCount: admin?.loginCount || 0,
      ticketsResolved: admin?.ticketsResolved || 0,
      lastActivity: admin?.lastActivity || "",
    }

    if (admin) {
      updateAdmin(admin.id, adminData)
    } else {
      createAdmin(adminData)
    }

    onClose()
  }

  const handleSocietyToggle = (society: Society, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        assignedSocieties: [...prev.assignedSocieties, society],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        assignedSocieties: prev.assignedSocieties.filter((s) => s.id !== society.id),
      }))
    }
  }

  const removeSociety = (societyId: number) => {
    setFormData((prev) => ({
      ...prev,
      assignedSocieties: prev.assignedSocieties.filter((s) => s.id !== societyId),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/95 border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {admin ? "Edit Admin" : "Create New Admin"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={`backdrop-blur-xl bg-white/80 border-0 shadow-lg ${errors.name ? "border-red-500" : ""}`}
                  placeholder="Enter full name"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={`backdrop-blur-xl bg-white/80 border-0 shadow-lg ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className={`backdrop-blur-xl bg-white/80 border-0 shadow-lg ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value: "active" | "inactive" | "pending") =>
                    setFormData((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="backdrop-blur-xl bg-white/80 border-0 shadow-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Society Assignment */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Society Assignment</h3>

            {/* Selected Societies */}
            {formData.assignedSocieties.length > 0 && (
              <div className="space-y-2">
                <Label>Selected Societies ({formData.assignedSocieties.length})</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.assignedSocieties.map((society) => (
                    <Badge key={society.id} variant="secondary" className="flex items-center space-x-2 px-3 py-1">
                      <Building2 className="w-3 h-3" />
                      <span>{society.name}</span>
                      <button
                        type="button"
                        onClick={() => removeSociety(society.id)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Society Search */}
            <div className="space-y-2">
              <Label>Available Societies</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search societies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 backdrop-blur-xl bg-white/80 border-0 shadow-lg"
                />
              </div>
            </div>

            {/* Society List */}
            <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-200 rounded-lg p-3 bg-gray-50/50">
              {filteredSocieties.map((society) => {
                const isSelected = formData.assignedSocieties.some((s) => s.id === society.id)
                return (
                  <div key={society.id} className="flex items-center space-x-3 p-2 hover:bg-white rounded-lg">
                    <Checkbox
                      id={`society-${society.id}`}
                      checked={isSelected}
                      onCheckedChange={(checked) => handleSocietyToggle(society, checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={`society-${society.id}`} className="font-medium text-gray-900 cursor-pointer">
                        {society.name}
                      </Label>
                      <p className="text-sm text-gray-600">{society.unitCount} units</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              {admin ? "Update Admin" : "Create Admin"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         