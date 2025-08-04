import { useState, useMemo, useEffect } from "react";
import type React from "react";
import { useAdmin } from "./admin-context";
import { type Admin, type SortField } from "../lib/Data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Users,
  UserX,
  Clock,
  Building2,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  SortAsc,
  Check,
  X,
} from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { formatLastActivity, getStatusBadge } from "../lib/utils";

interface AdminListViewProps {
  onCreateAdmin: () => void;
  onEditAdmin: (admin: Admin) => void;
}

export function AdminListView({
  onCreateAdmin,
  onEditAdmin,
}: AdminListViewProps) {
  const {
    admins,
    setSelectedAdmin,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    updateAdmin,
    deleteAdmin,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    handleSort,
  } = useAdmin();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortField, sortOrder]);

  // Reset selected admins when filters change
  useEffect(() => {
    setSelectedAdmins([]);
  }, [searchTerm, statusFilter, sortField, sortOrder]);

  const filteredAdmins = useMemo(() => {
    let filtered = admins.filter((admin) => {
      const matchesSearch =
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || admin.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    if (sortField) {
      filtered = filtered.sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;

        switch (sortField) {
          case "name":
            aValue = a.name.toLowerCase();
            bValue = b.name.toLowerCase();
            break;
          case "lastActivity":
            aValue = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
            bValue = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
            break;
          case "societyCount":
            aValue = a.assignedSocieties.length;
            bValue = b.assignedSocieties.length;
            break;
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [admins, searchTerm, statusFilter, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);

  const safePage = Math.max(1, currentPage || 1);

  const paginatedAdmins = useMemo(() => {
    const startIndex = (safePage - 1) * itemsPerPage;
    return filteredAdmins.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAdmins, safePage]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const stats = useMemo(() => {
    const active = admins.filter((a) => a.status === "active").length;
    const inactive = admins.filter((a) => a.status === "inactive").length;
    const pending = admins.filter((a) => a.status === "pending").length;
    const totalAssignments = admins.reduce(
      (sum, admin) => sum + admin.assignedSocieties.length,
      0
    );

    return { active, inactive, pending, totalAssignments };
  }, [admins]);

 

  const handleToggleStatus = (admin: Admin) => {
    const newStatus = admin.status === "active" ? "inactive" : "active";
    updateAdmin(admin.id, { status: newStatus });
  };

  // Bulk action functions
  const handleSelectAdmin = (adminId: number, checked: boolean) => {
    if (checked) {
      setSelectedAdmins((prev) => [...prev, adminId]);
    } else {
      setSelectedAdmins((prev) => prev.filter((id) => id !== adminId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAdmins(paginatedAdmins.map((admin) => admin.id));
    } else {
      setSelectedAdmins([]);
    }
  };

  const handleBulkStatusChange = (newStatus: "active" | "inactive") => {
    selectedAdmins.forEach((adminId) => {
      updateAdmin(adminId, { status: newStatus });
    });
    setSelectedAdmins([]);
  };

  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedAdmins.length} admin(s)?`
      )
    ) {
      selectedAdmins.forEach((adminId) => {
        deleteAdmin(adminId);
      });
      setSelectedAdmins([]);
    }
  };

  const isAllSelected =
    paginatedAdmins.length > 0 &&
    selectedAdmins.length === paginatedAdmins.length;
  const isIndeterminate =
    selectedAdmins.length > 0 && selectedAdmins.length < paginatedAdmins.length;

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />;
    }
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const SortableHeader = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <th
      className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100/50 transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1 md:space-x-2">
        <span>{children}</span>
        {getSortIcon(field)}
      </div>
    </th>
  );

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">
            Platform Admins Management
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Manage platform administrators and their society assignments
            {selectedAdmins.length > 0 && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {selectedAdmins.length} selected
              </span>
            )}
          </p>
        </div>
        <Button
          onClick={onCreateAdmin}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg text-sm md:text-base w-full md:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Create New Admin</span>
          <span className="sm:hidden">Create Admin</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active}
                </p>
                <p className="text-sm text-gray-600">Active Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <UserX className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.inactive}
                </p>
                <p className="text-sm text-gray-600">Inactive Admins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
                <p className="text-sm text-gray-600">Pending Approval</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalAssignments}
                </p>
                <p className="text-sm text-gray-600">Total Assignments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-1 max-w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search admins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 backdrop-blur-xl bg-white/80 border-0 shadow-lg text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 backdrop-blur-xl bg-white/80 border-0 shadow-lg text-sm">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="backdrop-blur-xl bg-white/80 border-0 shadow-lg text-sm"
              >
                <SortAsc className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">
                  Sort{" "}
                  {sortField &&
                    `by ${
                      sortField === "societyCount" ? "societies" : sortField
                    }`}
                </span>
                <span className="sm:hidden">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort("name")}>
                <div className="flex items-center justify-between w-full">
                  <span>Name</span>
                  {sortField === "name" && getSortIcon("name")}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("lastActivity")}>
                <div className="flex items-center justify-between w-full">
                  <span>Last Activity</span>
                  {sortField === "lastActivity" && getSortIcon("lastActivity")}
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort("societyCount")}>
                <div className="flex items-center justify-between w-full">
                  <span>Society Count</span>
                  {sortField === "societyCount" && getSortIcon("societyCount")}
                </div>
              </DropdownMenuItem>
              {sortField && (
                <>
                  <div className="border-t my-1"></div>
                  <DropdownMenuItem
                    onClick={() => {
                      setSortField(null);
                      setSortOrder("asc");
                    }}
                  >
                    <span>Clear Sorting</span>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="backdrop-blur-xl bg-white/80 border-0 shadow-lg text-sm"
          >
            <Filter className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">More Filters</span>
            <span className="sm:hidden">Filters</span>
          </Button>
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      {selectedAdmins.length > 0 && (
        <Card className="backdrop-blur-xl bg-blue-50/80 border border-blue-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">
                  {selectedAdmins.length} admin
                  {selectedAdmins.length !== 1 ? "s" : ""} selected
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusChange("active")}
                  className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Enable All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkStatusChange("inactive")}
                  className="bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200"
                >
                  <UserX className="w-4 h-4 mr-2" />
                  Disable All
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleBulkDelete}
                  className="bg-red-100 text-red-700 border-red-300 hover:bg-red-200"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete All
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedAdmins([])}
                  className="text-gray-600 hover:text-gray-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear Selection
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admin Table */}
      <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-xl rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-900 w-8 md:w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={(checked) => handleSelectAll(!!checked)}
                    aria-label="Select all admins"
                    className={`${
                      isIndeterminate ? "opacity-50" : ""
                    } data-[state=checked]:bg-white data-[state=checked]:border-blue-600 data-[state=checked]:text-black`}
                  />
                </th>
                <SortableHeader field="name">Admin Details</SortableHeader>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-900">
                  Status
                </th>
                <SortableHeader field="societyCount">Societies</SortableHeader>
                <SortableHeader field="lastActivity">
                  <span className="hidden lg:inline">Last Activity</span>
                  <span className="lg:hidden">Activity</span>
                </SortableHeader>
                <th className="hidden md:table-cell px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-900">
                  Performance
                </th>
                <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className={`hover:bg-gray-50/50 transition-colors ${
                    selectedAdmins.includes(admin.id)
                      ? "bg-blue-300 border-blue-200"
                      : ""
                  }`}
                >
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <Checkbox
                      id={`select-admin-${admin.id}`}
                      checked={selectedAdmins.includes(admin.id)}
                      onCheckedChange={(checked) =>
                        handleSelectAdmin(admin.id, !!checked)
                      }
                      aria-label={`Select ${admin.name}`}
                      className="data-[state=checked]:bg-white data-[state=checked]:border-blue-600 data-[state=checked]:text-black"
                    />
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div className="flex items-center space-x-2 md:space-x-3">
                      <Avatar className="w-8 h-8 md:w-10 md:h-10">
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm">
                          {admin.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900 text-xs md:text-sm">
                          {admin.name}
                        </p>
                        <p className="text-xs text-gray-600 hidden md:block">
                          {admin.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <Badge
                      className={`${getStatusBadge(
                        admin.status
                      )} capitalize text-xs`}
                    >
                      {admin.status}
                    </Badge>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div>
                      <p className="font-medium text-gray-900 text-xs md:text-sm">
                        {admin.assignedSocieties.length}
                      </p>
                      <p className="text-xs text-gray-600 hidden md:block">
                        {admin.assignedSocieties.reduce(
                          (sum, society) => sum + society.unitCount,
                          0
                        )}{" "}
                        units
                      </p>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div>
                      <p className="font-medium text-gray-900 text-xs md:text-sm">
                        {formatLastActivity(admin.lastActivity)}
                      </p>
                      {admin.lastActivity && (
                        <p className="text-xs text-gray-600 hidden lg:block">
                          {new Date(admin.lastActivity).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="hidden md:table-cell px-3 md:px-6 py-3 md:py-4">
                    <div>
                      <p className="font-medium text-gray-900 text-xs md:text-sm">
                        {admin.loginCount} logins
                      </p>
                      <p className="text-xs text-gray-600">
                        {admin.ticketsResolved} tickets
                      </p>
                    </div>
                  </td>
                  <td className="px-3 md:px-6 py-3 md:py-4">
                    <div className="flex items-center space-x-1 md:space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedAdmin(admin)}
                        className="hidden md:flex text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1 md:p-2"
                      >
                        <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600 hover:text-gray-700 p-1 md:p-2"
                          >
                            <MoreHorizontal className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setSelectedAdmin(admin)}
                            className="md:hidden"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEditAdmin(admin)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleStatus(admin)}
                          >
                            {admin.status === "active" ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Disable
                              </>
                            ) : (
                              <>
                                <Users className="w-4 h-4 mr-2" />
                                Enable
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteAdmin(admin.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-3 md:px-6 py-3 md:py-4 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
          <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
            Showing{" "}
            {Math.min((safePage - 1) * itemsPerPage + 1, filteredAdmins.length)}{" "}
            to {Math.min(safePage * itemsPerPage, filteredAdmins.length)} of{" "}
            {filteredAdmins.length} admins
          </p>

          <div className="flex items-center space-x-1 md:space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={safePage === 1}
              className="text-xs md:text-sm px-2 md:px-3"
            >
              <span className="hidden md:inline">Previous</span>
              <span className="md:hidden">Prev</span>
            </Button>

            {Array.from({ length: Math.min(1, totalPages) }, (_, i) => {
              const page = i + 0;
              return (
                <Button
                  key={page}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`text-xs md:text-sm px-2 md:px-3 ${
                    safePage === page
                      ? "bg-blue-500 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {currentPage}
                </Button>
              );
            }).filter(Boolean)}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={safePage === totalPages || totalPages === 0}
              className="text-xs md:text-sm px-2 md:px-3"
            >
              <span className="hidden md:inline">Next</span>
              <span className="md:hidden">Next</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
