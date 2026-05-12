# FitTrack

A cross-platform diet tracking application built with **React Native (Expo)**. FitTrack allows users to log daily meals, track macronutrients (calories, protein, fat, carbs), and review nutritional summaries per day.

## Features

- **Daily diary** with 5 fixed meal categories: Breakfast, Lunch, Dinner, Afternoon Snack, Supper
- **Horizontal calendar strip** for quick date navigation
- **Product management** — add and remove food items with name and full macro breakdown
- **Automatic daily summary** — real-time calculation of total kcal, protein, fat, and carbs
- **Persistent storage** — all data saved locally via AsyncStorage, survives app restarts
- **Cross-platform** — runs on iOS, Android, and Web

## Tech Stack

| Layer            | Technology                                  |
| ---------------- | ------------------------------------------- |
| Framework        | React Native 0.81 (Expo SDK 54)             |
| Routing          | Expo Router (file-based routing)            |
| Language         | TypeScript 5.9                              |
| State Management | React Context                               |
| Storage          | @react-native-async-storage/async-storage   |
| Date Utilities   | date-fns                                    |
| Icons            | lucide-react-native                         |
| Linting          | ESLint (eslint-config-expo)                 |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Run

```bash
npx expo start
```

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm start`       | Start Expo dev server    |
| `npm run ios`     | Open in iOS simulator    |
| `npm run android` | Open in Android emulator |
| `npm run web`     | Open in browser          |

### Lint

```bash
npm run lint
```

### Type Check

```bash
npx tsc --noEmit
```

## Project Structure

```
FitTrack/
├── app/
│   ├── _layout.tsx            # Root layout (SafeAreaProvider, MealProvider, Stack navigator)
│   ├── add-product.tsx        # Modal screen — form for adding a product to a meal
│   └── (tabs)/
│       ├── _layout.tsx        # Tab navigator (bottom tab bar)
│       └── index.tsx          # Main diary screen
├── components/
│   ├── CalendarStrip.tsx      # Horizontal scrollable week calendar
│   ├── Header.tsx             # App bar with logo and current month label
│   ├── MealCard.tsx           # Single meal section (title, kcal, product list, add/delete)
│   └── SummaryFooter.tsx      # Sticky bottom bar with daily macro totals and remaining kcal
├── context/
│   └── MealContext.tsx         # Global state provider (mealLogs, addProduct, removeProduct, AsyncStorage sync)
├── types/
│   └── index.ts               # Product, DailyLog, MealLogs, MealType type definitions
├── utils/
│   └── calculations.ts        # getDailySummary, getProductsForMeal, getMealKcal helpers
└── constants/
    └── theme.ts               # Color and font tokens
```

## Architecture

### Data Model

```
MealLogs                    Record<string, DailyLog>
  └── DailyLog              Record<MealType, Product[]>
       └── Product          { id, name, kcal, protein, fat, carbs }
```

Each day is keyed by ISO date string (`yyyy-MM-dd`). A `DailyLog` contains arrays of `Product` entries for each of the five meal types.

### State Flow

```
AddProduct screen  ──addProduct()──▶  MealContext (React Context + useState)
                                                  │
                                          useEffect (save)
                                                  ▼
                                           AsyncStorage
                                                  │
                                          useEffect (load)
                                                  ▼
HomeScreen  ◀──useMealContext()────────  MealContext
  ├── MealCard        → getProductsForMeal()
  ├── MealCard        → getMealKcal()
  └── SummaryFooter   → getDailySummary()
```

- **Write path**: Adding/removing a product updates `useState` in `MealProvider`. A `useEffect` persists the entire `mealLogs` object to AsyncStorage on every change.
- **Read path**: On mount, `MealProvider` loads data from AsyncStorage. An `isLoading` flag gates rendering in the home screen.

### Navigation

The app uses Expo Router with a **Stack + Tabs** layout:

| Screen         | Route            | Type   |
| -------------- | ---------------- | ------ |
| Home (Diary)   | `/`              | Tab    |
| Add Product    | `/add-product`   | Modal  |

The Add Product screen receives `dateKey` and `mealType` as route params and dismisses itself on save.

## License

This project was created as part of a university course assignment.
