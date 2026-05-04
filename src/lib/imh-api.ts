export type Barber = {
  id: string;
  salonId: string;
  name: string;
  active: boolean;
  createdAt: string;
};

export type Service = {
  id: string;
  salonId: string | null;
  isInSpa?: boolean;
  name: string;
  durationMin: number;
  priceCents: number;
  active: boolean;
  createdAt: string;
};

export type Salon = {
  id: string;
  name: string;
  category: "homme" | "femme" | "mrmrs";
  address: string | null;
  active?: boolean;
  createdAt?: string;
};

export type Manager = {
  id: string;
  email: string;
  name: string | null;
  salonId: string;
  active: boolean;
  createdAt: string;
};

export type Appointment = {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  salonId?: string;
  salonName?: string;
  location: string;
  serviceId: string | null;
  serviceName: string;
  durationMin: number;
  barberId: string | null;
  barberName: string;
  startAt: string;
  endAt: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
  };
  notes: string | null;
  createdAt: string;
};

export type ScheduleItem = {
  value: string;
  label: string;
  times: string[];
};

const API_BASE =
  process.env.NEXT_PUBLIC_IMH_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:5000";

async function http<T>(
  path: string,
  options?: RequestInit & { token?: string },
): Promise<T> {
  const url = `${API_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
  const headers = new Headers(options?.headers);
  headers.set("content-type", "application/json");
  if (options?.token) headers.set("authorization", `Bearer ${options.token}`);
  const res = await fetch(url, { ...options, headers, cache: "no-store" });
  if (!res.ok) {
    const raw = await res.text().catch(() => "");
    let message = raw || `HTTP ${res.status}`;
    try {
      const parsed = raw ? JSON.parse(raw) : null;
      const parsedMessage =
        typeof parsed?.message === "string"
          ? parsed.message
          : typeof parsed?.error === "string"
            ? parsed.error
            : null;
      if (parsedMessage) message = parsedMessage;
    } catch {}
    throw new Error(`HTTP ${res.status} ${res.statusText} — ${message}`);
  }
  return (await res.json()) as T;
}

export function imhPublicCatalog() {
  return http<{ salon: Pick<Salon, "id" | "name" | "category">; services: Service[]; barbers: Barber[] }>(
    "/public/catalog",
  );
}

export function imhPublicAvailability(params: {
  salonId: string;
  serviceId: string;
  barberId?: string | null;
  days?: number;
}) {
  const search = new URLSearchParams();
  search.set("salonId", params.salonId);
  search.set("serviceId", params.serviceId);
  if (params.barberId) search.set("barberId", params.barberId);
  if (params.days) search.set("days", String(params.days));
  return http<{ schedule: ScheduleItem[] }>(`/public/availability?${search.toString()}`);
}

export function imhPublicSalons() {
  return http<{ items: Array<Pick<Salon, "id" | "name" | "category" | "address">> }>(
    "/public/salons",
  );
}

export function imhPublicCatalogForSalon(salonId: string) {
  const search = new URLSearchParams();
  search.set("salonId", salonId);
  return http<{ salon: Pick<Salon, "id" | "name" | "category">; services: Service[]; barbers: Barber[] }>(
    `/public/catalog?${search.toString()}`,
  );
}

export function imhPublicCreateAppointment(input: {
  salonId: string;
  serviceId: string;
  barberId?: string | null;
  location: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  notes?: string;
}) {
  return http<{ item: Appointment }>("/public/appointments", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function imhAdminLogin(input: { username: string; password: string }) {
  return http<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function imhAdminListBarbers(token: string, params?: { salonId?: string }) {
  const search = new URLSearchParams();
  if (params?.salonId) search.set("salonId", params.salonId);
  const suffix = search.toString() ? `?${search.toString()}` : "";
  return http<{ items: Barber[] }>(`/admin/barbers${suffix}`, { token });
}

export function imhAdminCreateBarber(
  token: string,
  input: { name: string; salonId?: string },
) {
  return http<{ item: Barber }>("/admin/barbers", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export function imhAdminDeleteBarber(token: string, id: string) {
  const url = `/admin/barbers/${encodeURIComponent(id)}`;
  return http<void>(url, { method: "DELETE", token });
}

export function imhAdminListServices(token: string, params?: { salonId?: string }) {
  const search = new URLSearchParams();
  if (params?.salonId) search.set("salonId", params.salonId);
  const suffix = search.toString() ? `?${search.toString()}` : "";
  return http<{ items: Service[] }>(`/admin/services${suffix}`, { token });
}

export function imhAdminCreateService(
  token: string,
  input: { name: string; durationMin: number; priceCents: number; salonId?: string; isInSpa?: boolean },
) {
  return http<{ item: Service }>("/admin/services", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export function imhAdminDeleteService(token: string, id: string) {
  const url = `/admin/services/${encodeURIComponent(id)}`;
  return http<void>(url, { method: "DELETE", token });
}

export function imhAdminListAppointments(
  token: string,
  params: { from?: string; to?: string; status?: string; salonId?: string } = {},
) {
  const search = new URLSearchParams();
  if (params.from) search.set("from", params.from);
  if (params.to) search.set("to", params.to);
  if (params.status) search.set("status", params.status);
  if (params.salonId) search.set("salonId", params.salonId);
  const suffix = search.toString() ? `?${search.toString()}` : "";
  return http<{ items: Appointment[] }>(`/admin/appointments${suffix}`, { token });
}

export function imhAdminUpdateAppointment(
  token: string,
  id: string,
  input: { status?: Appointment["status"]; barberId?: string | null },
) {
  return http<{ item: Appointment }>(`/admin/appointments/${encodeURIComponent(id)}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(input),
  });
}

export function imhAdminListSalons(token: string) {
  return http<{ items: Salon[] }>("/admin/salons", { token });
}

export function imhAdminCreateSalon(
  token: string,
  input: { name: string; category: Salon["category"]; address?: string },
) {
  return http<{ item: Salon }>("/admin/salons", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}

export function imhAdminDeleteSalon(token: string, id: string) {
  return http<void>(`/admin/salons/${encodeURIComponent(id)}`, { method: "DELETE", token });
}

export function imhAdminListManagers(token: string) {
  return http<{ items: Manager[] }>("/admin/managers", { token });
}

export function imhAdminCreateManager(
  token: string,
  input: { email: string; password: string; salonId: string; name?: string },
) {
  return http<{ item: Manager }>("/admin/managers", {
    method: "POST",
    token,
    body: JSON.stringify(input),
  });
}
