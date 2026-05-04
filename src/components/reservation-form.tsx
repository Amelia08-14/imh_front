"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  imhPublicAvailability,
  imhPublicCatalogForSalon,
  imhPublicCreateAppointment,
} from "@/lib/imh-api";

type ScheduleItem = {
  value: string;
  label: string;
  times: string[];
};

type SelectOption = {
  id: string;
  label: string;
};

type ReservationFormProps = {
  accent: string;
  title: string;
  subtitle: string;
  universe?: "homme" | "femme" | "mrmrs" | "spa";
  salons: SelectOption[];
  services: SelectOption[];
  assistants: SelectOption[];
  initialSchedule: ScheduleItem[];
  defaultSalonId: string;
  defaultServiceId: string;
  ctaLabel?: string;
};

const steps = [
  "SERVICE",
  "RENDEZ-VOUS",
  "DÉTAILS",
  "PAIEMENT",
  "CONFIRMATION",
];

function FieldIcon({ symbol }: { symbol: string }) {
  return (
    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-white/45">
      {symbol}
    </span>
  );
}

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function buildCalendarDays(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - startOffset);

  return Array.from({ length: 35 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return date;
  });
}

function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hexToRgb(input: string) {
  const hex = input.trim();
  if (!hex.startsWith("#") || hex.length !== 7) return null;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (![r, g, b].every((x) => Number.isFinite(x))) return null;
  return { r, g, b };
}

type OptionSelectProps = {
  icon: string;
  accent: string;
  options: SelectOption[];
  valueId: string;
  setValueId: (value: string) => void;
  placeholder?: string;
};

function isLightHexColor(input: string) {
  const hex = input.trim();
  if (!hex.startsWith("#") || hex.length !== 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  if (![r, g, b].every((x) => Number.isFinite(x))) return false;
  const y = (r * 299 + g * 587 + b * 114) / 1000;
  return y > 180;
}

function OptionSelect({
  icon,
  accent,
  options,
  valueId,
  setValueId,
}: OptionSelectProps) {
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.id === valueId)?.label ?? options[0]?.label ?? "";
  const accentIsLight = isLightHexColor(accent);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-14 w-full items-center rounded-[1.2rem] border border-white/10 bg-black/20 px-14 pr-12 text-left text-sm text-white/75 outline-none transition-colors hover:border-white/20"
      >
        <FieldIcon symbol={icon} />
        <span className="truncate">{current}</span>
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/45">
          ˅
        </span>
      </button>

      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#0b0b0b] shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          {options.map((option) => {
            const active = option.id === valueId;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setValueId(option.id);
                  setOpen(false);
                }}
                className="block w-full px-5 py-3 text-left text-sm transition-colors hover:bg-white/5"
                style={{
                  color: active ? (accentIsLight ? "#000" : "#fff") : "var(--brand-slate)",
                  background: active ? accent : "transparent",
                }}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function ReservationForm({
  accent,
  title,
  subtitle,
  universe,
  salons,
  services,
  assistants,
  initialSchedule,
  defaultSalonId,
  defaultServiceId,
  ctaLabel = "VÉRIFIER LES DISPONIBILITÉS",
}: ReservationFormProps) {
  const softAccent = `${accent}1a`;
  const strongAccent = `${accent}59`;
  const accentRgb = hexToRgb(accent) ?? { r: 255, g: 255, b: 255 };
  const frameBackground = `radial-gradient(980px circle at 92% 8%, rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.16), transparent 58%), radial-gradient(820px circle at 8% 34%, rgba(${accentRgb.r},${accentRgb.g},${accentRgb.b},0.12), transparent 62%), linear-gradient(180deg, rgba(255,255,255,0.07), rgba(0,0,0,0.22))`;

  const [salonOptions, setSalonOptions] = useState<SelectOption[]>(salons);
  const [serviceOptions, setServiceOptions] = useState<SelectOption[]>(services);
  const [assistantOptions, setAssistantOptions] = useState<SelectOption[]>(assistants);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedSalonId, setSelectedSalonId] = useState(defaultSalonId);
  const [selectedServiceId, setSelectedServiceId] = useState(defaultServiceId);
  const [selectedAssistantId, setSelectedAssistantId] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule);
  const [selectedDate, setSelectedDate] = useState(initialSchedule[0]?.value ?? "");
  const [selectedTime, setSelectedTime] = useState(initialSchedule[0]?.times[0] ?? "");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    id: string;
    serviceName: string;
    barberName: string;
    location: string;
    startAt: string;
  } | null>(null);

  useEffect(() => {
    setSalonOptions(salons);
  }, [salons]);

  useEffect(() => {
    setServiceOptions(services);
    setAssistantOptions(assistants);
  }, [services, assistants]);

  const selectedSalonLabel = useMemo(() => {
    return salonOptions.find((s) => s.id === selectedSalonId)?.label ?? "";
  }, [salonOptions, selectedSalonId]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!selectedSalonId) return;
      setError(null);
      try {
        const catalog = await imhPublicCatalogForSalon(selectedSalonId);
        if (cancelled) return;

        const filteredServices =
          universe === "spa"
            ? catalog.services.filter((s) => s.isInSpa === true)
            : catalog.services.filter((s) => s.isInSpa !== true);

        const nextServices: SelectOption[] = [
          { id: "", label: "Service" },
          ...filteredServices.map((s) => ({ id: s.id, label: s.name })),
        ];
        const nextAssistants: SelectOption[] = [
          { id: "", label: "Assistant : Peu importe" },
          ...catalog.barbers.map((b) => ({ id: b.id, label: b.name })),
        ];

        setServiceOptions(nextServices);
        setAssistantOptions(nextAssistants);

        const nextDefaultServiceId = filteredServices[0]?.id ?? "";
        setSelectedServiceId(nextDefaultServiceId);
        setSelectedAssistantId("");
        setStepIndex(0);
      } catch {
        if (cancelled) return;
        setServiceOptions([{ id: "", label: "Service" }]);
        setAssistantOptions([{ id: "", label: "Assistant : Peu importe" }]);
        setSelectedServiceId("");
        setSelectedAssistantId("");
        setSchedule([]);
        setSelectedDate("");
        setSelectedTime("");
        setError("Impossible de charger les services.");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [selectedSalonId, universe]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!selectedSalonId || !selectedServiceId) return;
      setError(null);
      try {
        const { schedule: next } = await imhPublicAvailability({
          salonId: selectedSalonId,
          serviceId: selectedServiceId,
          barberId: selectedAssistantId || null,
          days: 14,
        });
        if (cancelled) return;
        setSchedule(next);
        setSelectedDate(next[0]?.value ?? "");
        setSelectedTime(next[0]?.times[0] ?? "");
      } catch {
        if (cancelled) return;
        setSchedule([]);
        setSelectedDate("");
        setSelectedTime("");
        setError("Impossible de charger les disponibilités.");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [selectedSalonId, selectedServiceId, selectedAssistantId]);

  const selectedSchedule = useMemo(
    () => schedule.find((item) => item.value === selectedDate) ?? schedule[0],
    [schedule, selectedDate],
  );

  const availableTimes = selectedSchedule?.times ?? [];

  const initialCalendarDate = useMemo(() => {
    if (!selectedSchedule) return new Date();
    return new Date(selectedSchedule.value);
  }, [selectedSchedule]);

  const [viewDate, setViewDate] = useState(initialCalendarDate);

  const calendarDays = useMemo(() => buildCalendarDays(viewDate), [viewDate]);
  const scheduleMap = useMemo(
    () => new Map(schedule.map((item) => [item.value, item])),
    [schedule],
  );

  const selectedDateLabel = selectedSchedule?.label ?? "Choisir une date";

  const canContinue =
    selectedSalonId &&
    selectedServiceId &&
    selectedDate &&
    selectedTime &&
    (selectedAssistantId !== undefined);

  return (
    <div
      className="ml-auto max-w-[42rem] rounded-[2.25rem] border border-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-8"
      style={
        {
          "--page-accent": accent,
          "--page-accent-rgb": `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`,
          background: frameBackground,
          boxShadow: `0 26px 90px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06) inset, 0 30px 120px ${accent}1a`,
        } as CSSProperties
      }
    >
      <div className="relative flex items-center justify-between gap-3 overflow-hidden pb-6">
        <div className="absolute left-0 right-0 top-2 h-px bg-white/8" />
        {steps.map((step, index) => (
          <div
            key={step}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <span
              className="grid size-4 place-items-center rounded-full border text-[8px]"
              style={{
                borderColor:
                  index <= stepIndex ? strongAccent : "rgba(255,255,255,0.1)",
                background: index <= stepIndex ? accent : "var(--brand-ink)",
                color: index <= stepIndex ? "#fff" : "transparent",
              }}
            >
              •
            </span>
            <span
              className="text-[10px] tracking-[0.2em]"
              style={{
                color: index <= stepIndex ? accent : "rgba(255,255,255,0.3)",
              }}
            >
              {`${index + 1}. ${step}`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <div className="text-luxe font-serif text-[2.45rem] leading-none tracking-tight">
          {title}
        </div>
        <div className="text-luxe-accent mt-2 text-[10px] tracking-[0.24em]">
          {subtitle}
        </div>
      </div>

      {error ? (
        <div className="mt-6 rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/70">
          {error}
        </div>
      ) : null}

      {stepIndex <= 1 ? (
        <>
          <div className="mt-8 space-y-4">
            <OptionSelect
              icon="⌂"
              accent={accent}
              options={salonOptions}
              valueId={selectedSalonId}
              setValueId={(id) => {
                setSelectedSalonId(id);
                setStepIndex(0);
              }}
            />

            <OptionSelect
              icon="✂"
              accent={accent}
              options={serviceOptions}
              valueId={selectedServiceId}
              setValueId={(id) => {
                setSelectedServiceId(id);
                setStepIndex(0);
              }}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <OptionSelect
                icon="◔"
                accent={accent}
                options={assistantOptions}
                valueId={selectedAssistantId}
                setValueId={(id) => {
                  setSelectedAssistantId(id);
                  setStepIndex(0);
                }}
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setCalendarOpen((current) => !current)}
                  className="flex h-14 w-full items-center rounded-[1.2rem] border border-white/10 bg-black/20 px-14 pr-12 text-left text-sm text-white/75 outline-none transition-colors hover:border-white/20"
                >
                  <FieldIcon symbol="◷" />
                  <span className="truncate">{selectedDateLabel}</span>
                  <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white/45">
                    ˅
                  </span>
                </button>

                {calendarOpen ? (
                  <div className="absolute z-30 mt-2 w-full rounded-[1.4rem] border border-white/10 bg-[#0b0b0b] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                    <div className="mb-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          setViewDate(
                            new Date(
                              viewDate.getFullYear(),
                              viewDate.getMonth() - 1,
                              1,
                            ),
                          )
                        }
                        className="grid size-8 place-items-center rounded-full border border-white/10 text-white/60"
                      >
                        ←
                      </button>
                      <div className="text-sm capitalize text-white">
                        {formatMonthLabel(viewDate)}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setViewDate(
                            new Date(
                              viewDate.getFullYear(),
                              viewDate.getMonth() + 1,
                              1,
                            ),
                          )
                        }
                        className="grid size-8 place-items-center rounded-full border border-white/10 text-white/60"
                      >
                        →
                      </button>
                    </div>

                    <div className="mb-2 grid grid-cols-7 gap-2 text-center text-[10px] tracking-[0.18em] text-white/30">
                      {["L", "M", "M", "J", "V", "S", "D"].map((day, index) => (
                        <span key={`${day}-${index}`}>{day}</span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day) => {
                        const dayIso = isoDate(day);
                        const available = scheduleMap.has(dayIso);
                        const active = selectedDate === dayIso;
                        const inMonth = day.getMonth() === viewDate.getMonth();

                        return (
                          <button
                            key={dayIso}
                            type="button"
                            disabled={!available}
                            onClick={() => {
                              if (!available) return;
                              setSelectedDate(dayIso);
                              setSelectedTime(
                                scheduleMap.get(dayIso)?.times[0] ?? "",
                              );
                              setCalendarOpen(false);
                            }}
                            className="grid h-10 place-items-center rounded-xl border text-sm transition-colors disabled:cursor-not-allowed"
                            style={{
                              borderColor: active
                                ? strongAccent
                                : "rgba(255,255,255,0.08)",
                              background: active
                                ? softAccent
                                : available
                                  ? "rgba(255,255,255,0.03)"
                                  : "rgba(255,255,255,0.01)",
                              color: !inMonth
                                ? "rgba(255,255,255,0.2)"
                                : active
                                  ? accent
                                  : available
                                    ? "#fff"
                                    : "rgba(255,255,255,0.25)",
                            }}
                          >
                            {day.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-[10px] tracking-[0.24em] text-white/35">
              Disponibilités suggérées
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="flex h-14 items-center rounded-[1.2rem] border border-white/10 bg-black/20 px-5 text-sm text-white/70">
                {selectedDateLabel}
              </div>
              <OptionSelect
                icon="⏱"
                accent={accent}
                options={[
                  { id: "", label: "Choisir un horaire" },
                  ...availableTimes.map((t) => ({ id: t, label: t })),
                ]}
                valueId={selectedTime}
                setValueId={setSelectedTime}
              />
            </div>
          </div>
        </>
      ) : null}

      {stepIndex === 2 ? (
        <div className="mt-8 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative">
              <FieldIcon symbol="✶" />
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
                  className="h-14 w-full rounded-[1.2rem] border border-white/10 bg-black/20 pl-14 pr-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
              />
            </div>
            <div className="relative">
              <FieldIcon symbol="✶" />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
                  className="h-14 w-full rounded-[1.2rem] border border-white/10 bg-black/20 pl-14 pr-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
              />
            </div>
          </div>

          <div className="relative">
            <FieldIcon symbol="☎" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Téléphone"
              className="h-14 w-full rounded-[1.2rem] border border-white/10 bg-black/20 pl-14 pr-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
            />
          </div>

          <div className="relative">
            <FieldIcon symbol="@" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optionnel)"
              className="h-14 w-full rounded-[1.2rem] border border-white/10 bg-black/20 pl-14 pr-5 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
            />
          </div>

          <div className="relative">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Message (optionnel)"
              className="min-h-24 w-full resize-none rounded-[1.2rem] border border-white/10 bg-black/20 px-5 py-4 text-sm text-white outline-none placeholder:text-white/55 focus:border-white/20"
            />
          </div>
        </div>
      ) : null}

      {stepIndex === 3 ? (
        <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-black/20 p-5 text-sm text-white/75">
          Paiement sur place (aucun paiement en ligne pour le moment).
        </div>
      ) : null}

      {stepIndex === 4 && confirmation ? (
        <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-black/20 p-6">
          <div className="text-[10px] tracking-[0.24em]" style={{ color: accent }}>
            CONFIRMATION
          </div>
          <div className="mt-4 font-serif text-3xl tracking-tight">
            Rendez-vous enregistré
          </div>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div>{confirmation.location}</div>
            <div>{confirmation.serviceName}</div>
            <div>{confirmation.barberName}</div>
            <div>{new Date(confirmation.startAt).toLocaleString("fr-FR")}</div>
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            if (stepIndex === 0) return;
            setError(null);
            setStepIndex((s) => Math.max(0, s - 1));
          }}
          className="btn-luxe-outline inline-flex h-14 w-full items-center justify-center rounded-[1.25rem] px-6 text-[11px] font-medium tracking-[0.24em] text-white transition-colors hover:bg-white/6 disabled:opacity-40"
          disabled={stepIndex === 0 || submitting}
        >
          RETOUR
        </button>

        <button
          type="button"
          disabled={submitting || (stepIndex <= 1 && !canContinue)}
          onClick={async () => {
            setError(null);

            if (stepIndex === 0) {
              setStepIndex(1);
              return;
            }

            if (stepIndex === 1) {
              setStepIndex(2);
              return;
            }

            if (stepIndex === 2) {
              if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
                setError("Merci de renseigner votre prénom, nom et téléphone.");
                return;
              }
              setStepIndex(3);
              return;
            }

            if (stepIndex === 3) {
              if (!selectedSalonId || !selectedServiceId || !selectedDate || !selectedTime) {
                setError("Sélection incomplète.");
                return;
              }
              setSubmitting(true);
              try {
                const created = await imhPublicCreateAppointment({
                  salonId: selectedSalonId,
                  serviceId: selectedServiceId,
                  barberId: selectedAssistantId || null,
                  location: selectedSalonLabel || "Salon",
                  date: selectedDate,
                  time: selectedTime,
                  firstName: firstName.trim(),
                  lastName: lastName.trim(),
                  phone: phone.trim(),
                  email: email.trim() || undefined,
                  notes: notes.trim() || undefined,
                });
                setConfirmation({
                  id: created.item.id,
                  serviceName: created.item.serviceName,
                  barberName: created.item.barberName,
                  location: created.item.location,
                  startAt: created.item.startAt,
                });
                setStepIndex(4);
              } catch {
                setError("Impossible d'enregistrer le rendez-vous.");
              } finally {
                setSubmitting(false);
              }
              return;
            }

            if (stepIndex === 4) {
              setConfirmation(null);
              setFirstName("");
              setLastName("");
              setPhone("");
              setEmail("");
              setNotes("");
              setStepIndex(0);
            }
          }}
          className="btn-luxe-cta inline-flex h-14 w-full items-center justify-center rounded-[1.25rem] px-6 text-[11px] font-medium tracking-[0.24em] text-black shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-0.5 disabled:opacity-50"
        >
          {stepIndex === 0
            ? ctaLabel
            : stepIndex === 1
              ? "CONTINUER"
              : stepIndex === 2
                ? "PASSER AU PAIEMENT"
                : stepIndex === 3
                  ? submitting
                    ? "EN COURS..."
                    : "CONFIRMER"
                  : "NOUVELLE RÉSERVATION"}
        </button>
      </div>
    </div>
  );
}
