-- Create events table
create table if not exists public.events (
  id bigint generated always as identity primary key,
  aktivnost text not null,
  lokacija text not null,
  vrijeme timestamptz,
  prijavljeno int default 0,
  kapacitet int not null,
  tip text,
  opis text,
  venue_id bigint,
  created_by uuid,
  inserted_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create registrations table
create table if not exists public.registrations (
  id bigint generated always as identity primary key,
  event_id bigint not null references public.events(id) on delete cascade,
  user_id uuid not null,
  inserted_at timestamptz default now(),
  unique(event_id, user_id)
);

-- Enable RLS
alter table public.events enable row level security;
alter table public.registrations enable row level security;

-- Create policies for public read
create policy "events_select_public" on public.events
  for select
  using (true);

create policy "registrations_insert_self" on public.registrations
  for insert
  with check (auth.uid() = user_id);

create policy "registrations_select_public" on public.registrations
  for select
  using (true);

create policy "registrations_delete_self" on public.registrations
  for delete
  using (auth.uid() = user_id);

-- Create indexes
create index if not exists idx_events_created_by on public.events(created_by);
create index if not exists idx_registrations_event on public.registrations(event_id);
create index if not exists idx_registrations_user on public.registrations(user_id);

-- Seed initial events
insert into public.events (aktivnost, lokacija, vrijeme, prijavljeno, kapacitet, tip, opis) values
('Mali nogomet (6 na 6)', 'Srednjaci, betonsko igralište', '2026-01-24T18:00:00Z', 10, 12, 'FOOTBALL', 'Fali nam dvoje ljudi za ozbiljan nogomet na male golove.'),
('Ulični Basket', 'Vukovarska, igralište kod raketa', '2026-01-21T17:30:00Z', 6, 6, 'BASKETBALL', 'Ekipa je skupljena, ali dođite ako netko odustane.'),
('Lagano trčanje', 'Nasip kod Boćarskog', '2026-01-25T09:00:00Z', 14, 40, 'RUNNING', 'Ruta od 7km, lagani tempo.'),
('Odbojka na pijesku', 'Jarun, južna strana', '2026-01-23T16:00:00Z', 3, 4, 'VOLLEYBALL', 'Trebamo četvrtu osobu za miješani par.'),
('Šah u parku', 'Trg Franje Tuđmana', '2026-01-21T10:00:00Z', 4, 10, 'CHESS', 'Donosimo ploče, vi donesite dobru volju.'),
('Jutarnja Yoga', 'Maksimir, livada kod vidikovca', '2026-01-24T08:30:00Z', 22, 30, 'YOGA', 'Besplatan sat yoge na otvorenom.'),
('Stolni tenis', 'Park mladenaca, Siget', '2026-01-21T14:00:00Z', 1, 2, 'TABLE_TENNIS', 'Tražim nekoga za par setova.'),
('Rolanje', 'Jarun, staza za role', '2026-01-20T19:00:00Z', 5, 15, 'SKATING', 'Zajednički krug oko Jaruna.'),
('Badminton', 'Bundek, zapadna livada', '2026-01-21T17:00:00Z', 2, 4, 'BADMINTON', 'Tražimo još jedan par.'),
('Street Workout', 'Velesajam, otvoreni gym', '2026-01-22T18:00:00Z', 4, 8, 'WORKOUT', 'Zajednički trening snage.'),
('Nogomet 5 na 5', 'Prečko, umjetna trava', '2026-01-21T20:00:00Z', 10, 10, 'FOOTBALL', 'Termin je popunjen.'),
('Bicikliranje na Sljeme', 'Gračani, parking žičara', '2026-01-25T10:00:00Z', 8, 20, 'CYCLING', 'Uspon cestom do vrha.'),
('Zumba na otvorenom', 'Park Ribnjak', '2026-01-19T19:00:00Z', 12, 25, 'DANCE', 'Trening uz glazbu.'),
('Pikado turnir', 'Kvartovski kafić, Dubrava', '2026-01-24T20:00:00Z', 8, 16, 'DARTS', 'Amatersko druženje uz pikado.'),
('Plivanje', 'Bazen Utrina', '2026-01-21T07:00:00Z', 3, 10, 'SWIMMING', 'Ranojutarnje plivanje.'),
('Kuglanje (Hobby)', 'Zaprešić, staza', '2026-01-20T18:00:00Z', 4, 6, 'BOWLING', 'Rekreativno kuglanje.'),
('Skate Session', 'Mimara', '2026-01-21T16:00:00Z', 5, 12, 'SKATEBOARD', 'Vježbamo nove trikove.'),
('Tai Chi', 'Park dr. Franje Tuđmana', '2026-01-22T07:30:00Z', 10, 15, 'TAI_CHI', 'Lagane jutarnje vježbe.'),
('Planinarenje Bikčevićeva', 'Bliznec', '2026-01-24T09:00:00Z', 25, 50, 'HIKING', 'Standardna ruta do Puntijarke.'),
('Tenis zid', 'Ravnice', '2026-01-21T15:00:00Z', 1, 2, 'TENNIS', 'Vježbanje udaraca.'),
('Frizbi na livadi', 'Bundek', '2026-01-25T16:00:00Z', 4, 10, 'FRISBEE', 'Ultimate frisbee osnove.'),
('Borilačke vještine osnove', 'Velesajam', '2026-01-19T20:00:00Z', 6, 12, 'MARTIAL_ARTS', 'Ogledni trening.'),
('Rukometni trening', 'Kutija Šibica', '2026-01-21T19:30:00Z', 9, 14, 'HANDBALL', 'Rekreativni rukomet.'),
('Boks na vreći', 'Jarun', '2026-01-22T18:00:00Z', 2, 4, 'BOXING', 'Tehnika udaraca.'),
('Pilates', 'Boćarski dom', '2026-01-23T08:00:00Z', 15, 20, 'PILATES', 'Snaga i fleksibilnost.'),
('Penjanje na stijeni', 'Velesajam', '2026-01-24T11:00:00Z', 4, 6, 'CLIMBING', 'Penjanje s osiguranjem.'),
('Biljar 8-ball', 'Metropolis Club', '2026-01-21T21:00:00Z', 2, 4, 'BILLIARDS', 'Igramo parove.'),
('Veslanje', 'Jarun', '2026-01-23T07:00:00Z', 4, 8, 'ROWING', 'Rekreativno veslanje.'),
('Gimnastika osnove', 'Otvoreni gym Jarun', '2026-01-19T17:00:00Z', 5, 10, 'GYMNASTICS', 'Osnovni elementi.'),
('Streličarstvo', 'Črnomerec', '2026-01-25T14:00:00Z', 2, 4, 'ARCHERY', 'Vlastita oprema.'),
('Slacklining', 'Zrinjevac', '2026-01-21T15:30:00Z', 3, 8, 'SLACKLINE', 'Balans i ravnoteža.'),
('Fitnes za umirovljenike', 'Peščenica', '2026-01-20T09:00:00Z', 18, 25, 'FITNESS', 'Lagane vježbe.'),
('Sakupljanje smeća (Plogging)', 'Nasip', '2026-01-24T11:00:00Z', 10, 100, 'COMMUNITY', 'Trčimo i skupljamo smeće.')
on conflict do nothing;
