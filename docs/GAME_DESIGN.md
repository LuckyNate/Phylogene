# Phylogene — Game Design

## Core Pitch

Phylogene is a portrait-first, top-down action exploration game combining Zelda-like tiled rooms, Vampire Survivors-style automatic attacks, and Metroidvania progression through creature transformation.

The player directly controls movement only. Weapons fire automatically when their spatial rules are satisfied.

## Genome Progression

Creature genomes behave like collectible card sets.

- Each species has a finite set of unique genome/chromosome fragments.
- The first copy of a fragment fills that species' collection.
- Duplicate fragments break down into generic reserve DNA.
- Completing every unique fragment permanently completes that creature's genome.
- A completed genome becomes a transformation blueprint.
- Tapping a completed genome consumes generic reserve DNA and rebuilds the player as that creature.
- Creature forms provide traversal/world-interaction abilities used for Metroidvania progression.

Examples established so far:

- Skeleton: Skeleton Key ability.
- Cat: night vision; the game can deliberately tease the expected "nine lives" joke before revealing the real progression ability.

## World and Rooms

- Top-down Zelda-like tiled spaces.
- Outdoor starting biome: plains.
- Enemies respawn when leaving and returning to a room.
- Rooms include a safe perimeter/approach space.
- Curated and procedural rooms should ultimately use the same room representation.
- Room generation may support no reflection, horizontal reflection, vertical reflection, or both.
- Reachability is validated after features are placed because features can change approach and traversal.
- Every meaningful tile must be reachable, touchable from a reachable tile, or intentionally gated by an explicit Metroidvania requirement.

## Tile Standard

- Canonical source tile size: 32x32 pixels.
- Walls and other blockers are full tiles, Zelda-style.
- Tiles carry both visual identity and gameplay properties such as solid, projectile-blocking, hazardous, interactive, or form-gated.
- The renderer may scale tiles for the phone display, but the logical/art tile grid remains 32x32.

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

The gene tracker will eventually show incomplete/completed genome collections and allow tapping a completed sequence to transform by spending reserve DNA.
