import { Users, Building2, BarChart3, Settings, Bell, MessageSquare, FileText, Home } from "lucide-react"

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: false },
  { icon: Users, label: "Admins", active: true },
  { icon: Building2, label: "Societies", active: false },
  { icon: MessageSquare, label: "Messages", active: false },
  { icon: FileText, label: "Reports", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Bell, label: "Notifications", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export function Sidebar() {
  return (
    <div className="w-16 bg-slate-800 flex flex-col items-center py-4 space-y-4">
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          className={`w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 ${
            item.active
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white"
          }`}
        >
          <item.icon className="w-5 h-5" />
        </div>
      ))}
    </div>
  )
}
