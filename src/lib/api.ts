export type Metric = {
  label: string;
  value: string;
  trend: string;
};

export type Arrival = {
  guest: string;
  room: string;
  time: string;
  status: string;
};

export type Operation = {
  area: string;
  open: number;
  critical: number;
};

export type Overview = {
  metrics: Metric[];
  arrivals: Arrival[];
  operations: Operation[];
};

const fallbackOverview: Overview = {
  metrics: [
    { label: "Occupancy", value: "78%", trend: "+12%" },
    { label: "Today check-ins", value: "18", trend: "+4" },
    { label: "Available rooms", value: "42", trend: "-6" },
    { label: "Revenue this month", value: "$84,260", trend: "+18%" }
  ],
  arrivals: [
    { guest: "Sarah Ahmed", room: "204", time: "12:30 PM", status: "confirmed" },
    { guest: "Arman Chowdhury", room: "512", time: "2:00 PM", status: "payment due" },
    { guest: "Nadia Khan", room: "318", time: "5:30 PM", status: "vip" }
  ],
  operations: [
    { area: "Housekeeping", open: 19, critical: 3 },
    { area: "Maintenance", open: 7, critical: 1 },
    { area: "Front desk", open: 11, critical: 0 }
  ]
};

export async function getOverview(): Promise<{ data: Overview; source: "api" | "demo" }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

  try {
    const response = await fetch(`${apiUrl}/overview`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Overview request failed");
    }

    const payload = (await response.json()) as { data: Overview };
    return { data: payload.data, source: "api" };
  } catch {
    return { data: fallbackOverview, source: "demo" };
  }
}
