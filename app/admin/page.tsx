"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";
import { ROLES, getRoleLabel } from "@/lib/roles";

/* ─── Types ─────────────────────────────────────────────────────── */

interface RoleEmployee {
  id: string;
  name: string;
  email: string;
  language: string;
  createdAt: string;
  completedLessons: number;
}

interface RoleData {
  value: string;
  label: { tr: string; en: string };
  chapterCount: number;
  totalLessons: number;
  employees: RoleEmployee[];
}

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  language: string;
  isAdmin: boolean;
  createdAt: string;
}

type SidebarView = { type: "role"; value: string } | { type: "team" };

/* ─── Helpers ────────────────────────────────────────────────────── */

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* ─── Sub-views ─────────────────────────────────────────────────── */

function RoleView({ role }: { role: RoleData }) {
  const router = useRouter();
  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">{role.label.en}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {role.chapterCount} chapters · {role.totalLessons} lessons
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: role.chapterCount, label: "Chapters" },
          { value: role.totalLessons, label: "Lessons" },
          { value: role.employees.length, label: "Members" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-gray-200 rounded-xl p-4 text-center"
          >
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Members */}
      <h2 className="text-sm font-semibold text-gray-700 mb-3">
        Assigned Members
      </h2>

      {role.employees.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-sm text-gray-400">
            No members assigned to this role.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {role.employees.map((emp) => {
            const pct =
              role.totalLessons > 0
                ? Math.round((emp.completedLessons / role.totalLessons) * 100)
                : 0;
            return (
              <div
                key={emp.id}
                onClick={() => router.push(`/admin/view/${emp.id}`)}
                className="bg-white border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-indigo-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-semibold shrink-0">
                    {initials(emp.name)}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Name row */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {emp.name}
                        </p>
                        <p className="text-xs text-gray-400">{emp.email}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs text-gray-400 mt-0.5">
                          {emp.completedLessons}/{role.totalLessons} lessons
                        </p>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2.5">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500 rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {pct}% complete
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TeamView({ employees }: { employees: Employee[] }) {
  const members = employees.filter((e) => !e.isAdmin);
  const admins = employees.filter((e) => e.isAdmin);

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Team Members</h1>
        <p className="text-sm text-gray-500 mt-1">
          {members.length} members · {admins.length} admin
        </p>
      </div>

      {employees.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <p className="text-sm text-gray-400">No members added yet.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">
                  Name
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 hidden md:table-cell">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3 hidden lg:table-cell">
                  Added
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold shrink-0">
                        {initials(emp.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {emp.name}
                        </p>
                        <p className="text-xs text-gray-400">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 hidden md:table-cell">
                    {emp.isAdmin ? (
                      <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        Admin
                      </span>
                    ) : (
                      <span className="text-sm text-gray-600">
                        {getRoleLabel(emp.role, "en")}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 hidden lg:table-cell">
                    <span className="text-xs text-gray-400">
                      {new Date(emp.createdAt).toLocaleDateString("en-GB")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function AdminPage() {
  const [view, setView] = useState<SidebarView>({
    type: "role",
    value: ROLES[0].value,
  });
  const [rolesData, setRolesData] = useState<RoleData[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/roles").then((r) => r.json()),
      fetch("/api/admin/employees").then((r) => r.json()),
    ]).then(([roles, emps]) => {
      setRolesData(Array.isArray(roles) ? roles : []);
      setEmployees(Array.isArray(emps) ? emps : []);
      setLoading(false);
    });
  }, []);

  const selectedRole =
    view.type === "role"
      ? (rolesData.find((r) => r.value === view.value) ?? null)
      : null;

  const nonAdminCount = employees.filter((e) => !e.isAdmin).length;

  return (
    <>
      <NavBar />
      <div className="flex" style={{ height: "calc(100vh - 56px)" }}>
        {/* ── Sidebar ── */}
        <aside className="w-56 border-r border-gray-200 bg-white flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 flex-1 space-y-6">
            {/* Roles */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Roles
              </p>
              <div className="space-y-0.5">
                {ROLES.map((role) => {
                  const rd = rolesData.find((r) => r.value === role.value);
                  const active =
                    view.type === "role" && view.value === role.value;
                  return (
                    <button
                      key={role.value}
                      onClick={() =>
                        setView({ type: "role", value: role.value })
                      }
                      className={`w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-colors text-left ${
                        active
                          ? "bg-indigo-50 text-indigo-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="truncate">{role.label.en}</span>
                      {rd !== undefined && (
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ml-1 ${
                            active
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {rd.employees.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Team Members */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                Team Members
              </p>
              <button
                onClick={() => setView({ type: "team" })}
                className={`w-full flex items-center justify-between px-2 py-2 rounded-lg text-sm transition-colors text-left ${
                  view.type === "team"
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>All members</span>
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ml-1 ${
                    view.type === "team"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {nonAdminCount}
                </span>
              </button>
            </div>
          </div>

          {/* Add button */}
          <div className="p-4 border-t border-gray-100">
            <Link
              href="/admin/employees/new"
              className="flex items-center justify-center gap-1.5 w-full bg-indigo-600 text-white px-3 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Member
            </Link>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : view.type === "role" && selectedRole ? (
            <RoleView role={selectedRole} />
          ) : view.type === "team" ? (
            <TeamView employees={employees} />
          ) : null}
        </main>
      </div>
    </>
  );
}
