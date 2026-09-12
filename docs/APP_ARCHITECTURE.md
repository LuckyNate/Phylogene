# Phylogene — App Architecture

## Target Runtime

Phylogene targets Android as a standalone portrait APK.

The native shell is intentionally minimal: one fullscreen Android WebView loads the local game from `file:///android_asset/index.html`. The game itself remains plain HTML5/CSS/JavaScript with no framework.

A GitHub Actions workflow builds a debug APK artifact from `main`.

## Web Game Sources

The canonical game sources remain at repository root and are packaged into the APK at build time.

### Root

- `index.html` — application shell and DOM structure.
- `worldmap-preview.html` — standalone square-cell preview for the 32x64 world-map prototype.

### CSS

- `css/app.css` — portrait layout, title/status bar, game canvas, weapon strip, and touch-control styling.

### JavaScript

- `js/worldmap.js` — 32x64 macro world-map data, glyph grammar, world start coordinate, and square-cell Unicode renderer. One glyph equals one complete local room.
- `js/room.js` — canonical 32x32 local-room representation, local doors, curated/generated room loading, symmetry, reachability validation, visibility maps, and transitions.
- `js/tiles.js` — canonical 32x32 local tile registry, visual identity, tile assets, and gameplay properties.
- `js/game.js` — player/enemy state, movement, automatic weapon targeting, combat, attack animation, rendering, drone visibility, spawning, and main game loop.

Local gameplay scripts currently load separately from the world-map preview. World-map integration into the main game shell comes after the local-room prototype is converted to the canonical 32x32 room model.

### Assets

- `assets/tiles/plains/` — canonical 32x32 image assets for the starting outdoor plains biome.

### Documentation

- `docs/GAME_DESIGN.md` — established game rules and design direction.
- `docs/APP_ARCHITECTURE.md` — current runtime/file ownership.
- `docs/todo.list` — live work list; keep current as tasks are added, completed, or revised.

## Android Wrapper

- `app/` — Android application module.
- The WebView has no browser chrome and loads only the bundled local game.
- No network permission is required for the current game.
- Root `index.html`, `css/`, `js/`, and `assets/` are copied into the APK assets during the build.
- `.github/workflows/build-apk.yml` builds the Android APK artifact.

## World Map Model

- World-map dimensions: 32 rooms wide x 64 rooms high.
- One world-map coordinate equals one complete local room.
- World glyphs encode macro biome/elevation only; local walls and doorways do not appear in the world-map data.
- Current glyph grammar:
  - `░` water
  - `▒` sand / lowland
  - `▓` grass / plains
  - `█` high elevation
  - `@` forest
  - `#` urban / dense settlement
- The renderer draws each glyph into a square logical cell and horizontally scales the glyph to fill that square, preserving meaningful world-map proportions.
- `WORLD_START` stores the starting world-room coordinate on the west-coast beach north of the pier analogue.

## Canonical Local Room Model

- Room size: 32x32 logical tiles.
- Source tile size: 32x32 pixels.
- Outer boundaries are full blocked tiles except at doorway gaps.
- Doorway gap tiles are the only safe zone and are combat-blocked from both sides.
- Curated rooms and generated rooms resolve into the same runtime representation.

## Tile Contract

Canonical tile booleans use direct positive semantics:

- `blocked: true` — the tile blocks occupancy/movement.
- `opaque: true` — the tile blocks the drone's light/visibility.

These properties are independent. A tile such as deep water or a pit may be `blocked: true` and `opaque: false`.

Additional interaction/state properties may be added only when the mechanic requires them.

## Visibility and Discovery

Each local room owns two 32x32 boolean maps:

- `visibleNow` — current drone-light visibility.
- `discovered` — persistent terrain memory for the room.

At runtime:

1. Clear/recalculate `visibleNow` around the player/drone.
2. Cast 360-degree light across the local radius.
3. Stop visibility behind `opaque: true` tiles.
4. Set every currently illuminated coordinate in `visibleNow`.
5. Promote every illuminated coordinate to `discovered: true`.
6. Never reset a discovered coordinate during normal room exploration.

Visible terrain renders normally. Discovered-but-not-currently-visible terrain remains painted in darkness in local screen space. Live entities such as enemies and DNA drops render only when currently visible.

At 32x32, each room contains only 1,024 tile coordinates, so simple flat arrays are sufficient:

- terrain tile IDs
- `visibleNow[1024]`
- `discovered[1024]`

Coordinate lookup can use `index = y * 32 + x`.

## Direction

The immediate implementation target is the authored first 32x32 outdoor room, while the separate 32x64 world-map layer provides the macro island structure and future room-to-room navigation.
