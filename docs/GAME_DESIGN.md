# Phylogene — Game Design

## Core Pitch

Phylogene is a portrait-first, top-down action exploration game combining Zelda-like tiled rooms, Vampire Survivors-style automatic attacks, and Metroidvania progression through creature transformation.

The player directly controls movement. Weapons fire automatically when their spatial rules are satisfied.

## Player Health and Contact Combat

- The player starts with exactly 3 hearts.
- If an enemy occupies any of the 8 tiles touching the player, that enemy is in contact combat range.
- Whenever the player attacks while in contact range, the player and that enemy each lose 1 health simultaneously.
- Contact exchanges repeat on attack events until the player separates or one participant is defeated.
- Positioning is the player's main defense: defeat enemies before they become adjacent or create attack geometry that avoids forced trades.

## Genome and DNA Progression

Each species has an 8-piece genome.

- The first copy of each chromosome/genome fragment permanently fills that species' collection.
- Once the player owns at least one chromosome, spare DNA automatically heals missing health at a cost of 1 generic DNA per half-heart.
- Duplicate or spare DNA becomes generic reserve DNA.
- Completing all 8 unique pieces permanently completes that species' genome and creates its transformation blueprint.
- Transforming into a completed species requires 8 generic DNA, regardless of which species supplied that spare DNA.
- Creature forms provide traversal/world-interaction abilities used for Metroidvania progression.

Established examples:

- Skeleton: Skeleton Key ability.
- Cat: night vision; the game may tease the expected "nine lives" joke before revealing the real traversal ability.

## First Room

The game begins at the bottom entrance of the first 32x32 room.

- The room contains exactly 8 skeletons.
- Each skeleton drops one curated, unique piece of the Skeleton genome.
- The pieces become progressively harder to obtain, with the final skeleton carrying the rarest/end chromosome.
- The final skeleton is difficult because of authored placement rather than inflated health. It occupies a defensible hiding location that is awkward to line up with.
- Unlike ordinary pursuers, the final skeleton retreats back to its hiding position instead of continuing to chase/follow the player.
- Defeating all 8 skeletons completes the Skeleton genome.
- Enemies respawn after a delay so the player can continue hunting for generic DNA needed for healing and transformation.

## Rooms and Tiles

- Canonical room size: 32x32 tiles.
- Canonical source tile size: 32x32 pixels.
- Outdoor starting biome: plains.
- Walls and other blockers are full tiles, Zelda-style.
- Canonical tile booleans use positive property semantics:
  - `blocked: true` means the tile blocks occupancy/movement.
  - `opaque: true` means the tile blocks light/visibility.
- A tile may block movement without being opaque, for example deep water or a pit.
- Curated and procedural rooms should ultimately use the same room representation.
- Room generation may support no reflection, horizontal reflection, vertical reflection, or both.
- Reachability is validated after features are placed because features can change approach and traversal.
- Every meaningful tile must be reachable, touchable from a reachable tile, or intentionally gated by an explicit Metroidvania requirement.

## Doors and Safety

- Doorways are literal gaps in the outer wall.
- The doorway tiles themselves are the only safe zone.
- Neither player nor enemies may attack from a doorway tile.
- Attacks may not target, enter, pass through, or land on a doorway tile.
- Movement through the doorway remains allowed for room transitions.
- The minimap uses the normal door mark for unlocked and the double-line door mark for locked.

## Visibility, Drone, and Mapping

The player's AI companion is a hovering drone with a strong 360-degree light.

- The drone's light defines current visibility around the player.
- `opaque: true` terrain blocks the light and leaves darkness behind it.
- Enemies, DNA drops, and other live entities are shown only while currently illuminated.
- Terrain that has been illuminated once remains remembered in darkness afterward.
- Unexplored terrain remains fully dark.
- Runtime visibility can be represented by two 32x32 boolean maps: `visibleNow` and persistent `discovered`.
- `visibleNow` is recalculated as the player moves.
- `discovered` only changes from false to true.
- The remembered terrain is the in-world map: once the drone has scanned a wall or terrain tile, it stays painted on screen even after leaving current visibility.

## Unicode Minimap Grammar

The minimap is a direct compressed rendering of the same room grid rather than a separate approximation.

- `░` water
- `▒` sand
- `▓` grass
- `█` hedge
- normal door mark = unlocked doorway
- double-line door mark = locked doorway

The same 32x32 terrain data drives both gameplay and the minimap.

## Combat Grammar

Position is the player's attack input. Weapons automatically test geometric conditions against the tile grid.

Current prototype weapons:

- Sword: attacks all 8 neighboring tiles as a circular sweep, beginning at the adjacent enemy with the highest HP.
- Dagger: attacks the orthogonally adjacent + pattern, one target at a time in FIFO order.
- Spear: attacks a target exactly two orthogonal tiles away; an enemy in the intervening tile invalidates that lane, so the spear tries another lane.
- Bow: fires along horizontal or vertical alignment and stops at the first enemy/wall.
- Boomerang: fires along diagonal alignment, stops at the first enemy/wall, then returns along its path.

Attacks are animated tile-by-tile so their geometry is visible during play.

## Interface Direction

Portrait-first phone layout:

1. Game screen at the top.
2. Scrollable gene-sequence tracker below it.
3. Movement controls fixed at the bottom.

The gene tracker will show incomplete/completed genome collections and allow tapping a completed sequence to transform by spending reserve DNA.
