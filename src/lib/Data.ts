export interface Society {
  id: number
  name: string
  unitCount: number
}

export interface Activity {
  id: number
  action: string
  society: string
  timestamp: string
  type: "approval" | "edit" | "login" | "ticket"
}

export interface Admin {
  id: number
  name: string
  email: string
  phone: string
  avatar?: string
  status: "active" | "inactive" | "pending"
  assignedSocieties: Society[]
  lastActivity: string
  createdAt: string
  loginCount: number
  ticketsResolved: number
  recentActivities: Activity[]
}

export type SortField = "name" | "lastActivity" | "societyCount"
export type SortOrder = "asc" | "desc"

 export interface AdminContextType {
  admins: Admin[]
  societies: Society[]
  selectedAdmin: Admin | null
  setSelectedAdmin: (admin: Admin | null) => void
  createAdmin: (admin: Omit<Admin, "id" | "createdAt" | "recentActivities">) => void
  updateAdmin: (id: number, updates: Partial<Admin>) => void
  deleteAdmin: (id: number) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  sortField: SortField | null
  setSortField: (field: SortField | null) => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
  handleSort: (field: SortField) => void
}



// Mock data
export const mockSocieties: Society[] = [
  { id: 1, name: "Green Valley Residency", unitCount: 245 },
  { id: 2, name: "Sunshine Apartments", unitCount: 180 },
  { id: 3, name: "Palm Grove Society", unitCount: 320 },
  { id: 4, name: "Ocean View Towers", unitCount: 156 },
  { id: 5, name: "Maple Heights", unitCount: 298 },
  { id: 6, name: "Rose Garden Complex", unitCount: 412 },
  { id: 7, name: "Silver Oak Residency", unitCount: 189 },
  { id: 8, name: "Golden Gate Society", unitCount: 267 },
  { id: 9, name: "Crystal Park Apartments", unitCount: 334 },
  { id: 10, name: "Emerald Heights", unitCount: 201 },
  { id: 11, name: "Diamond Plaza", unitCount: 156 },
  { id: 12, name: "Ruby Residency", unitCount: 289 },
  { id: 13, name: "Sapphire Gardens", unitCount: 378 },
  { id: 14, name: "Pearl Tower", unitCount: 445 },
  { id: 15, name: "Coral Bay Society", unitCount: 223 },
]

export const mockActivities: Activity[] = [
  {
    id: 1,
    action: "Approved resident registration",
    society: "Green Valley Residency",
    timestamp: "2025-01-25T10:30:00Z",
    type: "approval",
  },
  {
    id: 2,
    action: "Updated unit status",
    society: "Sunshine Apartments",
    timestamp: "2025-01-25T09:15:00Z",
    type: "edit",
  },
  {
    id: 3,
    action: "Resolved maintenance complaint",
    society: "Palm Grove Society",
    timestamp: "2025-01-24T16:45:00Z",
    type: "ticket",
  },
  {
    id: 4,
    action: "Created new poll",
    society: "Green Valley Residency",
    timestamp: "2025-01-24T14:20:00Z",
    type: "edit",
  },
  {
    id: 5,
    action: "Logged into system",
    society: "",
    timestamp: "2025-01-24T08:00:00Z",
    type: "login",
  },
  {
    id: 6,
    action: "Approved visitor registration",
    society: "Ocean View Towers",
    timestamp: "2025-01-23T15:30:00Z",
    type: "approval",
  },
  {
    id: 7,
    action: "Updated society rules",
    society: "Maple Heights",
    timestamp: "2025-01-23T11:45:00Z",
    type: "edit",
  },
  {
    id: 8,
    action: "Resolved parking dispute",
    society: "Rose Garden Complex",
    timestamp: "2025-01-22T17:20:00Z",
    type: "ticket",
  },
  {
    id: 9,
    action: "Approved maintenance request",
    society: "Silver Oak Residency",
    timestamp: "2025-01-22T13:10:00Z",
    type: "approval",
  },
  {
    id: 10,
    action: "Updated admin permissions",
    society: "Golden Gate Society",
    timestamp: "2025-01-21T16:00:00Z",
    type: "edit",
  },
  {
    id: 11,
    action: "Resolved noise complaint",
    society: "Crystal Park Apartments",
    timestamp: "2025-01-21T12:30:00Z",
    type: "ticket",
  },
  {
    id: 12,
    action: "Logged into system",
    society: "",
    timestamp: "2025-01-21T09:00:00Z",
    type: "login",
  },
  {
    id: 13,
    action: "Approved security camera installation",
    society: "Emerald Heights",
    timestamp: "2025-01-20T14:15:00Z",
    type: "approval",
  },
  {
    id: 14,
    action: "Updated billing information",
    society: "Diamond Plaza",
    timestamp: "2025-01-20T10:45:00Z",
    type: "edit",
  },
  {
    id: 15,
    action: "Resolved water supply issue",
    society: "Ruby Residency",
    timestamp: "2025-01-19T18:30:00Z",
    type: "ticket",
  },
  {
    id: 16,
    action: "Approved renovation request",
    society: "Sapphire Gardens",
    timestamp: "2025-01-19T14:00:00Z",
    type: "approval",
  },
  {
    id: 17,
    action: "Updated emergency contacts",
    society: "Pearl Tower",
    timestamp: "2025-01-18T11:20:00Z",
    type: "edit",
  },
  {
    id: 18,
    action: "Resolved elevator maintenance",
    society: "Coral Bay Society",
    timestamp: "2025-01-18T09:45:00Z",
    type: "ticket",
  },
  {
    id: 19,
    action: "Logged into system",
    society: "",
    timestamp: "2025-01-17T08:30:00Z",
    type: "login",
  },
  {
    id: 20,
    action: "Approved pet registration",
    society: "Green Valley Residency",
    timestamp: "2025-01-17T16:10:00Z",
    type: "approval",
  },
  {
    id: 21,
    action: "Updated society newsletter",
    society: "Sunshine Apartments",
    timestamp: "2025-01-16T13:25:00Z",
    type: "edit",
  },
  {
    id: 22,
    action: "Resolved internet connectivity issue",
    society: "Palm Grove Society",
    timestamp: "2025-01-16T15:40:00Z",
    type: "ticket",
  },
  {
    id: 23,
    action: "Approved guest parking request",
    society: "Ocean View Towers",
    timestamp: "2025-01-15T12:00:00Z",
    type: "approval",
  },
  {
    id: 24,
    action: "Updated fire safety protocols",
    society: "Maple Heights",
    timestamp: "2025-01-15T10:30:00Z",
    type: "edit",
  },
  {
    id: 25,
    action: "Resolved garbage collection complaint",
    society: "Rose Garden Complex",
    timestamp: "2025-01-14T17:15:00Z",
    type: "ticket",
  },
]

 export const mockAdmins: Admin[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@platform.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    assignedSocieties: [mockSocieties[0], mockSocieties[1], mockSocieties[2]],
    lastActivity: "2025-01-25T04:00:00Z",
    createdAt: "2024-08-15T00:00:00Z",
    loginCount: 156,
    ticketsResolved: 89,
    recentActivities: mockActivities.slice(0, 5),
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@platform.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    assignedSocieties: [mockSocieties[3], mockSocieties[4]],
    lastActivity: "2025-01-25T02:15:00Z",
    createdAt: "2024-07-20T00:00:00Z",
    loginCount: 203,
    ticketsResolved: 134,
    recentActivities: mockActivities.slice(1, 4),
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@platform.com",
    phone: "+1 (555) 345-6789",
    status: "inactive",
    assignedSocieties: [mockSocieties[5]],
    lastActivity: "2025-01-20T07:50:00Z",
    createdAt: "2024-09-10T00:00:00Z",
    loginCount: 87,
    ticketsResolved: 45,
    recentActivities: mockActivities.slice(2, 5),
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.kim@platform.com",
    phone: "+1 (555) 456-7890",
    status: "pending",
    assignedSocieties: [mockSocieties[6], mockSocieties[7]],
    lastActivity: "",
    createdAt: "2025-01-20T00:00:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: [],
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.thompson@platform.com",
    phone: "+1 (555) 567-8901",
    status: "active",
    assignedSocieties: [mockSocieties[8], mockSocieties[9], mockSocieties[10]],
    lastActivity: "2025-01-25T05:45:00Z",
    createdAt: "2024-06-05T00:00:00Z",
    loginCount: 298,
    ticketsResolved: 187,
    recentActivities: mockActivities.slice(0, 4),
  },
  {
    id: 6,
    name: "Robert Wilson",
    email: "robert.wilson@platform.com",
    phone: "+1 (555) 678-9012",
    status: "active",
    assignedSocieties: [mockSocieties[11], mockSocieties[12]],
    lastActivity: "2025-01-24T18:30:00Z",
    createdAt: "2024-05-12T00:00:00Z",
    loginCount: 245,
    ticketsResolved: 156,
    recentActivities: mockActivities.slice(5, 8),
  },
  {
    id: 7,
    name: "Amanda Foster",
    email: "amanda.foster@platform.com",
    phone: "+1 (555) 789-0123",
    status: "active",
    assignedSocieties: [mockSocieties[13]],
    lastActivity: "2025-01-25T07:20:00Z",
    createdAt: "2024-04-18T00:00:00Z",
    loginCount: 189,
    ticketsResolved: 112,
    recentActivities: mockActivities.slice(6, 9),
  },
  {
    id: 8,
    name: "James Anderson",
    email: "james.anderson@platform.com",
    phone: "+1 (555) 890-1234",
    status: "inactive",
    assignedSocieties: [mockSocieties[14]],
    lastActivity: "2025-01-18T14:15:00Z",
    createdAt: "2024-03-22T00:00:00Z",
    loginCount: 76,
    ticketsResolved: 38,
    recentActivities: mockActivities.slice(7, 10),
  },
  {
    id: 9,
    name: "Maria Garcia",
    email: "maria.garcia@platform.com",
    phone: "+1 (555) 901-2345",
    status: "active",
    assignedSocieties: [mockSocieties[0], mockSocieties[5]],
    lastActivity: "2025-01-25T03:45:00Z",
    createdAt: "2024-02-14T00:00:00Z",
    loginCount: 267,
    ticketsResolved: 198,
    recentActivities: mockActivities.slice(8, 11),
  },
  {
    id: 10,
    name: "Christopher Lee",
    email: "christopher.lee@platform.com",
    phone: "+1 (555) 012-3456",
    status: "pending",
    assignedSocieties: [mockSocieties[1]],
    lastActivity: "",
    createdAt: "2025-01-15T00:00:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: [],
  },
  {
    id: 11,
    name: "Jessica Brown",
    email: "jessica.brown@platform.com",
    phone: "+1 (555) 123-5678",
    status: "active",
    assignedSocieties: [mockSocieties[2], mockSocieties[3], mockSocieties[4]],
    lastActivity: "2025-01-24T22:10:00Z",
    createdAt: "2024-01-08T00:00:00Z",
    loginCount: 312,
    ticketsResolved: 245,
    recentActivities: mockActivities.slice(9, 12),
  },
  {
    id: 12,
    name: "Daniel Martinez",
    email: "daniel.martinez@platform.com",
    phone: "+1 (555) 234-6789",
    status: "active",
    assignedSocieties: [mockSocieties[6], mockSocieties[7], mockSocieties[8]],
    lastActivity: "2025-01-25T01:30:00Z",
    createdAt: "2023-12-03T00:00:00Z",
    loginCount: 423,
    ticketsResolved: 289,
    recentActivities: mockActivities.slice(10, 13),
  },
  {
    id: 13,
    name: "Ashley Davis",
    email: "ashley.davis@platform.com",
    phone: "+1 (555) 345-7890",
    status: "inactive",
    assignedSocieties: [mockSocieties[9]],
    lastActivity: "2025-01-16T11:20:00Z",
    createdAt: "2023-11-15T00:00:00Z",
    loginCount: 145,
    ticketsResolved: 67,
    recentActivities: mockActivities.slice(11, 14),
  },
  {
    id: 14,
    name: "Kevin White",
    email: "kevin.white@platform.com",
    phone: "+1 (555) 456-8901",
    status: "active",
    assignedSocieties: [mockSocieties[10], mockSocieties[11]],
    lastActivity: "2025-01-24T19:45:00Z",
    createdAt: "2023-10-28T00:00:00Z",
    loginCount: 278,
    ticketsResolved: 201,
    recentActivities: mockActivities.slice(12, 15),
  },
  {
    id: 15,
    name: "Stephanie Taylor",
    email: "stephanie.taylor@platform.com",
    phone: "+1 (555) 567-9012",
    status: "pending",
    assignedSocieties: [mockSocieties[12]],
    lastActivity: "",
    createdAt: "2025-01-18T00:00:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: [],
  },
  {
    id: 16,
    name: "Ryan Clark",
    email: "ryan.clark@platform.com",
    phone: "+1 (555) 678-0123",
    status: "active",
    assignedSocieties: [mockSocieties[13], mockSocieties[14]],
    lastActivity: "2025-01-25T06:15:00Z",
    createdAt: "2023-09-12T00:00:00Z",
    loginCount: 356,
    ticketsResolved: 267,
    recentActivities: mockActivities.slice(13, 16),
  },
  {
    id: 17,
    name: "Nicole Miller",
    email: "nicole.miller@platform.com",
    phone: "+1 (555) 789-1234",
    status: "active",
    assignedSocieties: [mockSocieties[0], mockSocieties[1]],
    lastActivity: "2025-01-24T16:30:00Z",
    createdAt: "2023-08-25T00:00:00Z",
    loginCount: 234,
    ticketsResolved: 178,
    recentActivities: mockActivities.slice(14, 17),
  },
  {
    id: 18,
    name: "Brandon Lewis",
    email: "brandon.lewis@platform.com",
    phone: "+1 (555) 890-2345",
    status: "inactive",
    assignedSocieties: [mockSocieties[2]],
    lastActivity: "2025-01-19T09:25:00Z",
    createdAt: "2023-07-10T00:00:00Z",
    loginCount: 98,
    ticketsResolved: 52,
    recentActivities: mockActivities.slice(15, 18),
  },
  {
    id: 19,
    name: "Samantha Harris",
    email: "samantha.harris@platform.com",
    phone: "+1 (555) 901-3456",
    status: "active",
    assignedSocieties: [mockSocieties[3], mockSocieties[4], mockSocieties[5]],
    lastActivity: "2025-01-25T08:40:00Z",
    createdAt: "2023-06-18T00:00:00Z",
    loginCount: 389,
    ticketsResolved: 312,
    recentActivities: mockActivities.slice(16, 19),
  },
  {
    id: 20,
    name: "Jonathan Moore",
    email: "jonathan.moore@platform.com",
    phone: "+1 (555) 012-4567",
    status: "pending",
    assignedSocieties: [mockSocieties[6], mockSocieties[7]],
    lastActivity: "",
    createdAt: "2025-01-22T00:00:00Z",
    loginCount: 0,
    ticketsResolved: 0,
    recentActivities: [],
  },
]