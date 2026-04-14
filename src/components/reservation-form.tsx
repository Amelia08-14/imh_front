"use client";

import { useMemo, useState } from "react";

type ScheduleItem = {
  value: string;
  label: string;
  times: string[];
};

type ReservationFormProps = {
  accent: string;
  title: string;
  subtitle: string;
  locations: string[];
  services: string[];
  assistants: string[];
  schedule: ScheduleItem[];
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
    <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
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

type OptionSelectProps = {
  icon: string;
  accent: string;
  options: string[];
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
};

function OptionSelect({
  icon,
  accent,
  options,
  value,
  setValue,
}: OptionSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-14 w-full items-center rounded-[1.2rem] border border-white/10 bg-black/20 px-14 pr-12 text-left text-sm text-[var(--brand-slate)] outline-none transition-colors hover:border-white/20"
      >
        <FieldIcon symbol={icon} />
        <span className="truncate">{value}</span>
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
          ˅
        </span>
      </button>

      {open ? (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-[1.2rem] border border-white/10 bg-[#0b0b0b] shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
          {options.map((option) => {
            const active = option === value;
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setValue(option);
                  setOpen(false);
                }}
                className="block w-full px-5 py-3 text-left text-sm transition-colors hover:bg-white/5"
                style={{
                  color: active ? "#fff" : "var(--brand-slate)",
                  background: active ? accent : "transparent",
                }}
              >
                {option}
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
  locations,
  services,
  assistants,
  schedule,
  ctaLabel = "VÉRIFIER LES DISPONIBILITÉS",
}: ReservationFormProps) {
  const softAccent = `${accent}1a`;
  const strongAccent = `${accent}59`;
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedAssistant, setSelectedAssistant] = useState(assistants[0]);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(schedule[0]?.value ?? "");
  const [selectedTime, setSelectedTime] = useState(schedule[0]?.times[0] ?? "");

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

  return (
    <div className="ml-auto max-w-[42rem] rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm sm:p-8">
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
                borderColor: index === 0 ? accent : "rgba(255,255,255,0.1)",
                background: index === 0 ? accent : "var(--brand-ink)",
                color: index === 0 ? "#fff" : "transparent",
              }}
            >
              •
            </span>
            <span
              className="text-[10px] tracking-[0.2em]"
              style={{ color: index === 0 ? accent : "rgba(255,255,255,0.3)" }}
            >
              {`${index + 1}. ${step}`}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2">
        <div className="font-serif text-[2.45rem] leading-none tracking-tight">
          {title}
        </div>
        <div
          className="mt-2 text-[10px] tracking-[0.24em]"
          style={{ color: accent }}
        >
          {subtitle}
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <OptionSelect
          icon="⌖"
          accent={accent}
          options={locations}
          value={selectedLocation}
          setValue={setSelectedLocation}
        />

        <OptionSelect
          icon="✂"
          accent={accent}
          options={services}
          value={selectedService}
          setValue={setSelectedService}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <OptionSelect
            icon="◔"
            accent={accent}
            options={assistants}
            value={selectedAssistant}
            setValue={setSelectedAssistant}
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setCalendarOpen((current) => !current)}
              className="flex h-14 w-full items-center rounded-[1.2rem] border border-white/10 bg-black/20 px-14 pr-12 text-left text-sm text-[var(--brand-slate)] outline-none transition-colors hover:border-white/20"
            >
              <FieldIcon symbol="◷" />
              <span className="truncate">{selectedDateLabel}</span>
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[var(--brand-slate)]">
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
                          setSelectedTime(scheduleMap.get(dayIso)?.times[0] ?? "");
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
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {[selectedDateLabel, ...availableTimes].map((slot, index) => (
            <button
              key={slot}
              type="button"
              className="flex h-14 items-center justify-center rounded-[1rem] border text-[11px] tracking-[0.18em] transition-colors"
              onClick={() => {
                if (index === 0) return;
                setSelectedTime(slot);
              }}
              style={{
                borderColor:
                  index === 0 || selectedTime === slot
                    ? strongAccent
                    : "rgba(255,255,255,0.1)",
                background:
                  index === 0 || selectedTime === slot
                    ? softAccent
                    : "rgba(255,255,255,0.03)",
                color:
                  index === 0 || selectedTime === slot
                    ? accent
                    : "rgba(255,255,255,0.45)",
              }}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-[1.25rem] bg-white px-6 text-[11px] font-medium tracking-[0.24em] text-black transition-colors hover:bg-white/90"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
