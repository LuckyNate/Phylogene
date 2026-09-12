# Phylogene — App Architecture

## Target Runtime

Phylogene targets Android as a standalone portrait APK.

The native shell is intentionally minimal: one fullscreen Android WebView loads the local game from `file:///android_asset/index.html`. The game itself remains plain HTML5/CSS/JavaScript with no framework.

A GitHub Actions workflow builds a debug APK artifact from `main`.

## Web Game Sources

The canonical game sources remain at repository root and are packaged into the APK at build time.

### Root

- `index.html` — application shell and DOM structure.

### CSS

- `css/app.css` — portrait layout, title/status bar, game canvas, weapon strip, and touch-control styling.

### JavaScript

- `js/room.js` — canonical room representation, room dimensions, doors, curated/generated room loading, symmetry, reachability validation, visibility maps, and transitions.
- `js/tiles.js` — canonical 32x32 tile registry, visual identity, tile assets, and gameplay properties.
- `js/game.js` — player/enemy state, movement, automatic weapon targeting, combat, attack animation, rendering, drone visibility, spawning, and main game loop.

Scripts load in this order: `room.js`, `tiles.js`, `game.js`.

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

## Canonical Room Model

- Room size: 32x32 logical tiles.
- Source tile size: 32x32 pixels.
- The same room grid drives gameplay and the Unicode minimap.
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

Each room owns two 32x32 boolean maps:

- `visibleNow` — current drone-light visibility.
- `discovered` — persistent terrain memory for the room.

At runtime:

1. Clear/recalculate `visibleNow` around the player/drone.
2. Cast 360-degree light across the local radius.
3. Stop visibility behind `opaque: true` tiles.
4. Set every currently illuminated coordinate in `visibleNow`.
5. Promote every illuminated coordinate to `discovered: true`.
6. Never reset a discovered coordinate during normal room exploration.

Visible terrain renders normally. Discovered-but-not-currently-visible terrain remains painted in darkness as map memory. Live entities such as enemies and DNA drops render only when currently visible.

At 32x32, each room contains only 1,024 tile coordinates, so simple flat arrays are sufficient:

- terrain tile IDs
- `visibleNow[1024]`
- `discovered[1024]`

Coordinate lookup can use `index = y * 32 + x`.

## Direction

The immediate implementation target is the authored first 32x32 outdoor room, including its terrain/minimap representation, doorway rules, drone visibility/discovery, eight-skeleton progression encounter, respawning DNA loop, and Skeleton transformation progression.
