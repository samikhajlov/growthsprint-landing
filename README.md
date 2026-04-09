# GrowthSprint Landing Page

Japanese B2B landing page for **GrowthSprint Consulting** — a consulting service that helps B2B companies fix their sales follow-up flows and landing page conversion in a 14-day focused sprint.

**Live:** https://stanislav.jp/

---

## О проекте / About

Лендинг рекламирует два сервиса:

| Сервис | Описание | Цена (JP) |
|--------|----------|-----------|
| **Ops & CRM Sprint** | Аудит и автоматизация follow-up воронки | ¥450,000 |
| **Landing & CVR Sprint** | Аудит LP, фиксы конверсии за 14 дней | ¥500,000 |

Поддерживаемые языки: 🇯🇵 Японский (по умолчанию) · 🇬🇧 English · 🇨🇳 中文 · 🇷🇺 Русский

Язык определяется автоматически по IP. Выбор пользователя сохраняется в `localStorage`.

---

## Стек / Tech Stack

```
Monorepo: pnpm workspaces
Frontend:  React 19 + Vite + Tailwind CSS v4
Backend:   Node.js + Express
DB:        PostgreSQL + Drizzle ORM
Email:     Resend API
Types:     TypeScript throughout, Zod validation
```

### Структура монорепозитория

```
/
├── artifacts/
│   ├── landing/          # React + Vite фронтенд
│   └── api-server/       # Express API сервер
├── lib/
│   ├── db/               # Drizzle ORM схема и клиент
│   ├── api-zod/          # Zod-схемы запросов/ответов
│   └── api-client-react/ # React Query клиент (сгенерирован)
├── package.json          # Workspace root
└── pnpm-workspace.yaml
```

---

## Требования / Requirements

- **Node.js** 20+
- **pnpm** 9+
- **PostgreSQL** 14+ (локальная или облачная)
- Аккаунт **Resend** с верифицированным доменом

---

## Установка / Installation

### 1. Клонировать репозиторий

```bash
git clone https://github.com/samikhajlov/growthsprint-landing.git
cd growthsprint-landing
```

### 2. Установить зависимости

```bash
pnpm install
```

### 3. Настроить переменные окружения

Создайте файл `.env` в корне проекта:

```env
# База данных PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/growthsprint

# Resend API (https://resend.com → API Keys)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Порты (можно оставить как есть)
PORT=3001          # API server
VITE_PORT=5173     # Frontend dev server
```

> **Важно:** домен отправителя `stanislav.jp` должен быть верифицирован в Resend.  
> Если у вас другой домен — измените `FROM_EMAIL` в `artifacts/api-server/src/lib/email.ts`.

### 4. Создать таблицы в БД

```bash
pnpm --filter @workspace/db run db:push
```

Это создаст таблицу `contacts`:

```sql
CREATE TABLE contacts (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  company      TEXT NOT NULL,
  email        TEXT NOT NULL,
  sprint_interest TEXT NOT NULL,
  message      TEXT,
  created_at   TIMESTAMP DEFAULT NOW() NOT NULL
);
```

---

## Запуск / Running

### Разработка (development)

Запустите каждый сервис в отдельном терминале:

```bash
# Терминал 1 — API сервер (порт 3001)
pnpm --filter @workspace/api-server run dev

# Терминал 2 — Фронтенд (порт 5173)
pnpm --filter @workspace/landing run dev
```

Или через concurrently (если установлен):

```bash
pnpm run dev
```

Откройте в браузере: http://localhost:5173

### Сборка для продакшена / Production build

```bash
# Собрать оба артефакта
pnpm run build

# Запустить API в прод-режиме
NODE_ENV=production PORT=3001 pnpm --filter @workspace/api-server run start

# Сервировать собранный фронтенд (например через nginx или serve)
pnpm --filter @workspace/landing run serve
```

---

## API

### POST `/api/contacts`

Сохраняет форму обратной связи в БД и отправляет письма.

**Request body:**
```json
{
  "name": "山田太郎",
  "company": "株式会社サンプル",
  "email": "yamada@example.com",
  "sprintInterest": "ops-crm",
  "message": "詳細を教えてください。"
}
```

`sprintInterest`: `"ops-crm"` | `"landing-cvr"` | `"both"` | `"unsure"`

**Response 201:**
```json
{ "id": 42, "message": "お問い合わせを受け付けました。" }
```

### GET `/api/healthz`

```json
{ "status": "ok" }
```

---

## Мультиязычность / i18n

Все переводы находятся в `artifacts/landing/src/i18n/index.ts`.

Логика определения языка:
1. Проверяет `localStorage` (ключ `gs_lang`) — если есть, использует его
2. Если нет — делает запрос к `https://ipapi.co/json/` для определения страны по IP
3. Маппинг: `JP → ja`, `CN/TW/HK → zh`, `RU/BY/KZ/UA → ru`, остальные → `en`

---

## Email-уведомления

При отправке формы автоматически уходят два письма:

| Письмо | Кому | Содержание |
|--------|------|------------|
| Admin notification | `contact@stanislav.jp` | Все данные лида |
| User confirmation | Пользователю | Подтверждение получения заявки |

Шаблоны: `artifacts/api-server/src/lib/email.ts`

---

## Деплой / Deployment

Проект оптимизирован для деплоя на **Replit** (уже настроены workflows).

Для других платформ:

**Vercel / Railway / Render** — задеплойте API-сервер как Node.js сервис, фронтенд как статику.

Обязательные переменные окружения на сервере:
- `DATABASE_URL`
- `RESEND_API_KEY`
- `PORT`

---

## Лицензия / License

MIT © GrowthSprint Consulting
