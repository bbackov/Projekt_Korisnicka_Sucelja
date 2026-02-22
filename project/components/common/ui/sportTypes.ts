export type SportTip =
  | "FOOTBALL"
  | "BASKETBALL"
  | "RUNNING"
  | "VOLLEYBALL"
  | "CHESS"
  | "YOGA"
  | "TABLE_TENNIS"
  | "SKATING"
  | "BADMINTON"
  | "WORKOUT"
  | "CYCLING"
  | "DANCE"
  | "DARTS"
  | "SWIMMING"
  | "BOWLING"
  | "SKATEBOARD"
  | "TAI_CHI"
  | "HIKING"
  | "TENNIS"
  | "FRISBEE"
  | "MARTIAL_ARTS"
  | "HANDBALL"
  | "BOXING"
  | "PILATES"
  | "CLIMBING"
  | "BILLIARDS"
  | "ROWING"
  | "GYMNASTICS"
  | "ARCHERY"
  | "SLACKLINE"
  | "FITNESS"
  | "COMMUNITY"
  | "OTHER";

  export const SPORT_LABEL: Record<SportTip, string> = {
    FOOTBALL: "Nogomet",
    BASKETBALL: "Košarka",
    RUNNING: "Trčanje",
    VOLLEYBALL: "Odbojka",
    CHESS: "Šah",
    YOGA: "Joga",
    TABLE_TENNIS: "Stolni tenis",
    SKATING: "Rolanje",
    BADMINTON: "Badminton",
    WORKOUT: "Street workout",
    CYCLING: "Bicikliranje",
    DANCE: "Ples",
    DARTS: "Pikado",
    SWIMMING: "Plivanje",
    BOWLING: "Kuglanje",
    SKATEBOARD: "Skateboard",
    TAI_CHI: "Tai Chi",
    HIKING: "Planinarenje",
    TENNIS: "Tenis",
    FRISBEE: "Frizbi",
    MARTIAL_ARTS: "Borilačke vještine",
    HANDBALL: "Rukomet",
    BOXING: "Boks",
    PILATES: "Pilates",
    CLIMBING: "Penjanje",
    BILLIARDS: "Biljar",
    ROWING: "Veslanje",
    GYMNASTICS: "Gimnastika",
    ARCHERY: "Streličarstvo",
    SLACKLINE: "Slackline",
    FITNESS: "Fitness",
    COMMUNITY: "Zajednica / Plogging",
    OTHER: "Ostalo",
  };