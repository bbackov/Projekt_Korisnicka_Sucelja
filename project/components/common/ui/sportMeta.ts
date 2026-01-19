import { SportTip } from "./sportTypes";

export const SPORT_META: Record<
  SportTip,
  { icon: string; gradient: string }
> = {
  FOOTBALL: {
    icon: "mdi:soccer",
    gradient: "linear-gradient(135deg, #16a34a, #059669)",
  },
  BASKETBALL: {
    icon: "mdi:basketball",
    gradient: "linear-gradient(135deg, #f97316, #dc2626)",
  },
  RUNNING: {
    icon: "mdi:run",
    gradient: "linear-gradient(135deg, #3b82f6, #22d3ee)",
  },
  VOLLEYBALL: {
    icon: "mdi:volleyball",
    gradient: "linear-gradient(135deg, #fb923c, #ec4899)",
  },
  CHESS: {
    icon: "mdi:chess-king",
    gradient: "linear-gradient(135deg, #475569, #1e293b)",
  },
  YOGA: {
    icon: "mdi:yoga",
    gradient: "linear-gradient(135deg, #4ade80, #14b8a6)",
  },
  TABLE_TENNIS: {
    icon: "mdi:table-tennis",
    gradient: "linear-gradient(135deg, #6366f1, #2563eb)",
  },
  SKATING: {
    icon: "mdi:roller-skate",
    gradient: "linear-gradient(135deg, #a855f7, #d946ef)",
  },
  BADMINTON: {
    icon: "mdi:badminton",
    gradient: "linear-gradient(135deg, #84cc16, #16a34a)",
  },
  WORKOUT: {
    icon: "mdi:dumbbell",
    gradient: "linear-gradient(135deg, #52525b, #1e293b)",
  },
  FITNESS: {
    icon: "mdi:dumbbell",
    gradient: "linear-gradient(135deg, #334155, #020617)",
  },
  CYCLING: {
    icon: "mdi:bike",
    gradient: "linear-gradient(135deg, #2563eb, #4f46e5)",
  },
  DANCE: {
    icon: "mdi:dance-ballroom",
    gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
  },
  DARTS: {
    icon: "mdi:target",
    gradient: "linear-gradient(135deg, #9333ea, #c026d3)",
  },
  SWIMMING: {
    icon: "mdi:swim",
    gradient: "linear-gradient(135deg, #38bdf8, #2563eb)",
  },
  BOWLING: {
    icon: "mdi:bowling",
    gradient: "linear-gradient(135deg, #dc2626, #be123c)",
  },
  SKATEBOARD: {
    icon: "mdi:skateboard",
    gradient: "linear-gradient(135deg, #52525b, #18181b)",
  },
  TAI_CHI: {
    icon: "mdi:yin-yang",
    gradient: "linear-gradient(135deg, #10b981, #0d9488)",
  },
  HIKING: {
    icon: "mdi:hiking",
    gradient: "linear-gradient(135deg, #15803d, #84cc16)",
  },
  TENNIS: {
    icon: "mdi:tennis",
    gradient: "linear-gradient(135deg, #22c55e, #a3e635)",
  },
  FRISBEE: {
    icon: "mdi:disc",
    gradient: "linear-gradient(135deg, #facc15, #fb923c)",
  },
  MARTIAL_ARTS: {
    icon: "mdi:karate",
    gradient: "linear-gradient(135deg, #27272a, #09090b)",
  },
  HANDBALL: {
    icon: "mdi:handball",
    gradient: "linear-gradient(135deg, #ef4444, #be123c)",
  },
  BOXING: {
    icon: "mdi:boxing-glove",
    gradient: "linear-gradient(135deg, #dc2626, #ea580c)",
  },
  PILATES: {
    icon: "mdi:yoga",
    gradient: "linear-gradient(135deg, #14b8a6, #22d3ee)",
  },
  CLIMBING: {
    icon: "mdi:mountain",
    gradient: "linear-gradient(135deg, #57534e, #1c1917)",
  },
  BILLIARDS: {
    icon: "mdi:numeric-8-circle",
    gradient: "linear-gradient(135deg, #166534, #052e16)",
  },
  ROWING: {
    icon: "mdi:rowing",
    gradient: "linear-gradient(135deg, #1d4ed8, #312e81)",
  },
  GYMNASTICS: {
    icon: "mdi:gymnastics",
    gradient: "linear-gradient(135deg, #facc15, #f59e0b)",
  },
  ARCHERY: {
    icon: "mdi:target",
    gradient: "linear-gradient(135deg, #f43f5e, #db2777)",
  },
  SLACKLINE: {
    icon: "mdi:human-handsdown",
    gradient: "linear-gradient(135deg, #64748b, #334155)",
  },
  COMMUNITY: {
    icon: "mdi:account-group",
    gradient: "linear-gradient(135deg, #f59e0b, #facc15)",
  },
  OTHER: {
    icon: "mdi:calendar-clock",
    gradient: "linear-gradient(135deg, #94a3b8, #64748b)",
  },
};