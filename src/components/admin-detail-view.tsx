import { useAdmin } from "./admin-context"
import {
  X,
  Edit,
  UserX,
  Phone,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle,
  Building2,
  Activity,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { formatDate, formatDateTime, getStatusBadge } from "../lib/utils"

export function AdminDetailView() {
  const { selectedAdmin, setSelectedAdmin, updateAdmin } = useAdmin()

  if (!selectedAdmin) return null

 const getActivityIcon = (type: string) => {
      switch (type) {
        case "approval":
          return <CheckCircle className="w-4 h-4 text-green-600" />
        case "edit":
          return <Edit className="w-4 h-4 text-blue-600" />
        case "login":
          return <Activity className="w-4 h-4 text-purple-600" />
        case "ticket":
          return <CheckCircle className="w-4 h-4 text-orange-600" />
        default:
          return <Activity className="w-4 h-4 text-gray-600" />
      }
    }

  const handleToggleStatus = () => {
    const newStatus = selectedAdmin.status === "active" ? "inactive" : "active"
    updateAdmin(selectedAdmin.id, { status: newStatus })
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Platform Admin Details</h2>
          <p className="text-sm text-gray-600">Comprehensive view of admin profile and activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Admin
          </Button>
          <Button size="sm" variant="destructive" onClick={handleToggleStatus}>
            <UserX className="w-4 h-4 mr-2" />
            {selectedAdmin.status === "active" ? "Disable" : "Enable"}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedAdmin(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Profile Section */}
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl rounded-2xl">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl">
                  {selectedAdmin.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900">{selectedAdmin.name}</h3>
                <p className="text-gray-600">{selectedAdmin.email}</p>
                <Badge className={`${getStatusBadge(selectedAdmin.status)} capitalize mt-2`}>
                  {selectedAdmin.status}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{selectedAdmin.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(selectedAdmin.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  Last active {selectedAdmin.lastActivity ? formatDateTime(selectedAdmin.lastActivity) : "Never"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">{selectedAdmin.loginCount}</p>
                <p className="text-sm text-gray-600">Total Logins</p>
                <p className="text-xs text-gray-500">All time</p>
              </div>

              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{selectedAdmin.ticketsResolved}</p>
                <p className="text-sm text-gray-600">Tickets Resolved</p>
                <p className="text-xs text-gray-500">This month</p>
              </div>

              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-2">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-600">{selectedAdmin.assignedSocieties.length}</p>
                <p className="text-sm text-gray-600">Societies Managed</p>
                <p className="text-xs text-gray-500">Currently assigned</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Societies */}
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Assigned Societies</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              Manage Assignments
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedAdmin.assignedSocieties.map((society) => (
                <div key={society.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{society.name}</p>
                      <p className="text-sm text-gray-600">{society.unitCount} units</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activities</CardTitle>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              View All Activities
            </Button>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {selectedAdmin.recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 mt-1">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    {activity.society && <p className="text-sm text-gray-600">{activity.society}</p>}
                    <p className="text-xs text-gray-500 mt-1">{formatDateTime(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
