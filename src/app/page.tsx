import {
  BedDouble,
  Bell,
  CalendarCheck,
  CircleDollarSign,
  ClipboardCheck,
  DoorOpen,
  Hotel,
  LogIn,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Wrench
} from "lucide-react";
import { getOverview } from "@/lib/api";

const navigation = [
  { label: "Dashboard", icon: Hotel, active: true },
  { label: "Reservations", icon: CalendarCheck },
  { label: "Rooms", icon: BedDouble },
  { label: "Guests", icon: UsersRound },
  { label: "Housekeeping", icon: ClipboardCheck },
  { label: "Payments", icon: CircleDollarSign },
  { label: "Maintenance", icon: Wrench },
  { label: "Settings", icon: Settings }
];

const roomStatus = [
  { label: "Available", value: 42, color: "bg-teal-500" },
  { label: "Occupied", value: 88, color: "bg-blue-600" },
  { label: "Reserved", value: 21, color: "bg-amber-500" },
  { label: "Service", value: 9, color: "bg-rose-500" }
];

const modules = [
  "Room type and rate setup",
  "Reservation calendar",
  "Guest profile history",
  "Check-in and check-out desk",
  "Manual payment and invoice tracking",
  "Housekeeping task board",
  "Maintenance work orders",
  "Staff role permissions"
];

export default async function Home() {
  const { data, source } = await getOverview();

  return (
    <main className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-slate-200 bg-white px-5 py-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Hotel size={24} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Hotel Ops</p>
              <h1 className="text-lg font-bold">Management System</h1>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.label}
                className={`flex h-11 w-full items-center gap-3 rounded-md px-3 text-left text-sm font-medium transition ${
                  item.active ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100"
                }`}
                type="button"
                title={item.label}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <ShieldCheck size={18} className="text-teal-600" />
              Role model ready
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Owner, manager, front desk, housekeeping, accounting, maintenance, and guest roles are planned.
            </p>
          </div>
        </aside>

        <section className="min-w-0">
          <header className="flex flex-col gap-4 border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <p className="text-sm font-medium text-slate-500">Thursday operations</p>
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">Front desk control center</h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex h-10 min-w-64 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-slate-500">
                <Search size={17} />
                <span className="text-sm">Search guests, rooms, bookings</span>
              </div>
              <button className="flex size-10 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700" type="button" title="Notifications">
                <Bell size={18} />
              </button>
              <button className="flex h-10 items-center gap-2 rounded-md bg-blue-600 px-4 text-sm font-semibold text-white" type="button">
                <LogIn size={17} />
                New booking
              </button>
            </div>
          </header>

          <div className="px-5 py-6 lg:px-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-slate-600">
                Data source: <span className="font-semibold text-slate-900">{source === "api" ? "backend API" : "demo fallback"}</span>
              </p>
              <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                <Sparkles size={16} />
                Ready for MongoDB connection
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.metrics.map((metric) => (
                <article key={metric.label} className="rounded-lg border border-slate-200 bg-white p-5">
                  <p className="text-sm font-medium text-slate-500">{metric.label}</p>
                  <div className="mt-3 flex items-end justify-between gap-3">
                    <strong className="text-3xl font-bold text-slate-950">{metric.value}</strong>
                    <span className="rounded-md bg-teal-50 px-2 py-1 text-sm font-semibold text-teal-700">{metric.trend}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
              <section className="rounded-lg border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <h3 className="text-base font-bold">Today arrivals</h3>
                  <button className="flex h-9 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700" type="button">
                    <CalendarCheck size={16} />
                    Calendar
                  </button>
                </div>
                <div className="divide-y divide-slate-100">
                  {data.arrivals.map((arrival) => (
                    <div key={`${arrival.guest}-${arrival.room}`} className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
                      <div>
                        <p className="font-semibold text-slate-950">{arrival.guest}</p>
                        <p className="mt-1 text-sm text-slate-500">Room {arrival.room} arrival at {arrival.time}</p>
                      </div>
                      <span className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium capitalize text-slate-700">{arrival.status}</span>
                      <button className="flex h-9 items-center justify-center gap-2 rounded-md bg-slate-900 px-3 text-sm font-semibold text-white" type="button">
                        <DoorOpen size={16} />
                        Check in
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="text-base font-bold">Room status</h3>
                <div className="mt-5 space-y-4">
                  {roomStatus.map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-600">{item.label}</span>
                        <span className="font-bold text-slate-950">{item.value}</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100">
                        <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${Math.min(item.value, 100)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <section className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="text-base font-bold">Operations queue</h3>
                <div className="mt-4 grid gap-3">
                  {data.operations.map((item) => (
                    <div key={item.area} className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="font-semibold">{item.area}</p>
                        <p className="text-sm text-slate-500">{item.open} open tasks</p>
                      </div>
                      <span className={`rounded-md px-2 py-1 text-sm font-bold ${item.critical ? "bg-rose-50 text-rose-700" : "bg-teal-50 text-teal-700"}`}>
                        {item.critical} critical
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border border-slate-200 bg-white p-5">
                <h3 className="text-base font-bold">Included modules</h3>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {modules.map((module) => (
                    <div key={module} className="flex items-start gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                      <ClipboardCheck size={16} className="mt-0.5 shrink-0 text-blue-600" />
                      <span>{module}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
