# Plan Projektu: FitTrack (Aplikacja Wieloplatformowa)

**FitTrack** to uproszczona wersja aplikacji do monitorowania diety (typu Fitatu), stworzona w technologii React Native (Expo). Projekt realizuje wymagania przedmiotu "Aplikacje wieloplatformowe".

---

## Specyfikacja Funkcjonalna

1. **Header**: Logo + nazwa aplikacji.
2. **Kalendarz**: Pasek aktualnego tygodnia z możliwością wyboru dnia.
3. **Sekcje Posiłków**: Stałe 5 sekcji (Śniadanie, Lunch, Obiad, Podwieczorek, Kolacja).
4. **Zarządzanie Produktami**: Dodawanie nazwy i makroskładników (Kcal, B, T, W) do konkretnych posiłków.
5. **Podsumowanie**: Automatyczne sumowanie wartości odżywczych na dole ekranu dla wybranego dnia.

---

## Lista Zadań (Backlog)

### ETAP 1: Konfiguracja i Fundamenty (Setup)

- [*] **Task 1.1**: Inicjalizacja projektu: `npx create-expo-app FitTrack` (Router-based).
- [*] **Task 1.2**: Instalacja zależności:
  - `lucide-react-native` (ikony).
  - `date-fns` (logika kalendarza).
  - `@react-native-async-storage/async-storage` (baza danych).
- [*] **Task 1.3**: Konfiguracja struktury plików: stworzenie folderów `/components`, `/constants`, `/hooks`.

### ETAP 2: Budowa Interfejsu (UI Skeleton)

- [ ] **Task 2.1**: **Header**: Implementacja górnej belki z logo i nazwą.
- [ ] **Task 2.2**: **Calendar Strip**:
  - Logika generowania 7 dni tygodnia.
  - Implementacja poziomego paska wyboru daty.
  - Obsługa wizualna wybranego dnia (Active State).
- [ ] **Task 2.3**: **Meal Sections**:
  - Stworzenie komponentu `MealCard`.
  - Wyświetlenie stałych 5 kategorii posiłków.
  - Dodanie przycisków "Dodaj (+)".
- [ ] **Task 2.4**: **Summary Footer**:
  - Budowa paska sumarycznego przyklejonego do dołu ekranu.
  - Layout dla 4 wskaźników (Kcal, B, T, W).

### ETAP 3: Logika Danych i Stanu (Logic)

- [ ] **Task 3.1**: **Model Danych**: Definicja typu `Product` i struktury `DailyLog` (klucz = data).
- [ ] **Task 3.2**: **Formularz Dodawania**:
  - Ekran/Modal `AddProduct`.
  - Walidacja pól numerycznych.
  - Przekazywanie danych do globalnego stanu.
- [ ] **Task 3.3**: **Obliczenia**: Funkcja sumująca makroskładniki dla aktywnej daty.
- [ ] **Task 3.4**: **Nawigacja**: Obsługa przejść między widokiem głównym a formularzem.

### ETAP 4: Pamięć Trwała (Persistence)

- [ ] **Task 4.1**: **Zapis Lokalny**: Automatyczny zapis stanu do `AsyncStorage` po każdej zmianie.
- [ ] **Task 4.2**: **Inicjalny Odczyt**: Ładowanie danych z pamięci przy starcie aplikacji (`useEffect`).
- [ ] **Task 4.3**: **Zarządzanie wpisami**: Dodanie funkcji usuwania konkretnego produktu z listy.

### ETAP 5: Szlify i Dokumentacja (Polish & Docs)

- [ ] **Task 5.1**: **Stylizacja (UX)**: Dopracowanie kolorystyki zgodnej z brandingiem FitTrack.
- [ ] **Task 5.2**: **Testy**: Sprawdzenie działania na iOS/Android (Expo Go) oraz Web.
- [ ] **Task 5.3**: **Dokumentacja**: Przygotowanie prezentacji (zrzuty ekranu, analiza zalet/wad środowiska).
