import { ReservationForm } from "@/components/reservation-form";
import {
  Barber,
  ScheduleItem,
  Salon,
  Service,
  imhPublicAvailability,
  imhPublicCatalogForSalon,
  imhPublicSalons,
} from "@/lib/imh-api";

type ReservationUniverse = Salon["category"] | "spa";

type ReservationFormContainerProps = {
  accent: string;
  title: string;
  subtitle: string;
  locations: string[];
  ctaLabel?: string;
  universe?: ReservationUniverse;
};

export async function ReservationFormContainer({
  accent,
  title,
  subtitle,
  locations,
  ctaLabel,
  universe,
}: ReservationFormContainerProps) {
  void locations;
  let services: Service[] = [];
  let barbers: Barber[] = [];
  let schedule: ScheduleItem[] = [];
  let salons: Array<Pick<Salon, "id" | "name" | "category" | "address">> = [];
  let defaultSalonId = "";
  try {
    const salonsRes = await imhPublicSalons();
    const allSalons = salonsRes.items;
    salons =
      universe && universe !== "spa"
        ? allSalons.filter((s) => s.category === universe)
        : allSalons;
    defaultSalonId = salons[0]?.id ?? "";

    const catalog = defaultSalonId
      ? await imhPublicCatalogForSalon(defaultSalonId)
      : null;
    const rawServices = catalog?.services ?? [];
    services =
      universe === "spa"
        ? rawServices.filter((s) => s.isInSpa === true)
        : rawServices.filter((s) => s.isInSpa !== true);
    barbers = catalog?.barbers ?? [];
    const defaultServiceId = services[0]?.id ?? "";
    if (defaultSalonId && defaultServiceId) {
      const availability = await imhPublicAvailability({
        salonId: defaultSalonId,
        serviceId: defaultServiceId,
        days: 14,
      });
      schedule = availability.schedule;
    }
  } catch {
    services = [];
    barbers = [];
    schedule = [];
    salons = [];
    defaultSalonId = "";
  }

  const defaultServiceId = services[0]?.id ?? "";

  return (
    <ReservationForm
      accent={accent}
      title={title}
      subtitle={subtitle}
      universe={universe}
      salons={[
        { id: "", label: "Salon" },
        ...salons.map((s) => ({ id: s.id, label: s.name })),
      ]}
      services={[
        { id: "", label: "Service" },
        ...services.map((s) => ({ id: s.id, label: s.name })),
      ]}
      assistants={[
        { id: "", label: "Assistant : Peu importe" },
        ...barbers.map((b) => ({ id: b.id, label: b.name })),
      ]}
      initialSchedule={schedule}
      defaultSalonId={defaultSalonId}
      defaultServiceId={defaultServiceId}
      ctaLabel={ctaLabel}
    />
  );
}
