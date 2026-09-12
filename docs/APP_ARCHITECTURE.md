# Phylogene — App Architecture

## Current Runtime

Phylogene currently runs as a plain HTML5/CSS/JavaScript portrait browser prototype with no framework.

### Root

- `index.html` — application shell and DOM structure.

### CSS

- `css/app.css` — portrait layout, title/status bar, game canvas, weapon strip, and touch-control styling.

### JavaScript

- `js/room.js` — current room dimensions and room-boundary/safe-tile rules. This is the ownership point for room representation, room generation, curated room loading, symmetry, and reachability validation as those systems are added.
- `js/tiles.js` — current tile visual palette. This is the ownership point for the canonical 32x32 tile registry, gameplay properties, and tile assets.
- `js/game.js` — current one-room combat prototype: player/enemy state, movement, auto-weapon targeting, attack animation, enemy movement, rendering, and game loop.

Scripts load in this order: `room.js`, `tiles.js`, `game.js`.

### Assets

- `assets/tiles/plains/` — canonical 32x32 image assets for the starting outdoor plains biome.

### Documentation

- `docs/GAME_DESIGN.md` — established game rules and design direction.
- `docs/APP_ARCHITECTURE.md` — current runtime/file ownership.
- `docs/todo.list` — live work list; keep current as tasks are added, completed, or revised.

## Current Prototype Room

The prototype is an 11x15 logical grid. The outer ring is blocking wall space and the inner ring is the current safe perimeter. Enemies remain inside that safe perimeter. Bow, spear, and boomerang targeting stop at blocking walls.

The current wall implementation is temporary. The agreed direction is a Zelda-style full-tile map using canonical 32x32 source tiles rather than edge-owned walls.

## Direction

The next room architecture should represent each grid cell as one canonical tile definition. A tile definition owns its asset and gameplay properties, for example whether it is walkable, solid, projectile-blocking, hazardous, interactive, or gated by a creature form.

Curated rooms and generated rooms should resolve into the same runtime room format and pass the same final reachability/interaction validation after features are placed.
