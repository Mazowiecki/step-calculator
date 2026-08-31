# Kalkulator stopni CNC

Responsywna aplikacja React do konfigurowania stopni zabiegowych. Użytkownik wybiera materiał, grubość, kształt i wymiary, a aplikacja pokazuje podgląd SVG, oblicza powierzchnię oraz szacunkową cenę zestawienia.

## Technologie

- React
- TypeScript
- Vite
- Material UI
- Vitest
- pnpm

## Wymagania

- Node.js 24 lub nowszy
- pnpm 11 lub nowszy

Jeśli pnpm nie jest dostępny, można go włączyć przez Corepack:

```bash
corepack enable
corepack prepare pnpm@11.24.0 --activate
```

## Instalacja

```bash
pnpm install
```

## Uruchomienie lokalne

```bash
pnpm dev
```

Vite wyświetli adres lokalnego serwera, zwykle `http://localhost:5173`.

## Skrypty

```bash
pnpm dev             # serwer deweloperski
pnpm build           # sprawdzenie typów i build produkcyjny
pnpm test            # testy jednostkowe
pnpm lint            # sprawdzenie TypeScript
pnpm format          # formatowanie Prettierem
pnpm format:check    # sprawdzenie formatowania
```

## Konfiguracja cen

Przykładowe materiały, grubości, mnożniki i opcje wykończenia znajdują się w:

```text
src/constants.ts
```

Plik można edytować bez zmiany logiki komponentów.

## GitHub Pages

Projekt jest skonfigurowany do automatycznego wdrażania przez GitHub Actions.

Po wypchnięciu zmian do gałęzi `main` workflow:

1. instaluje zależności przez pnpm,
2. sprawdza formatowanie,
3. uruchamia testy,
4. buduje aplikację,
5. publikuje katalog `dist` na GitHub Pages.

Workflow znajduje się w:

```text
.github/workflows/deploy.yml
```

W ustawieniach repozytorium na GitHubie należy ustawić:

```text
Settings → Pages → Source: GitHub Actions
```

Adres aplikacji będzie miał postać:

```text
https://mazowiecki.github.io/step-calculator/
```

Vite ma ustawiony `base` `/step-calculator/` podczas budowania w GitHub Actions.
