const WORLD_MAP_WIDTH = 32;
const WORLD_MAP_HEIGHT = 64;

const WORLD_GLYPHS = {
    ocean: " ",
    water: "░",
    sand: "▒",
    grass: "▓",
    high: "█",
    forest: "@",
    urban: "#"
};

// 32 rooms wide x 64 rooms high.
// Each glyph represents one complete local 32x32 room.
// This is a GTA-V-inspired island silhouette/biome study, not a street map.
const WORLD_MAP = [
"            ▓▓▓▓▓▓▓▓            ",
"          ▓▓▓▓▓▓▓▓▓▓▓           ",
"         ▓▓▓▓▓▓▓▓▓▓▓▓▓          ",
"        ▓▓▓▓▓████▓▓▓▓▓▓          ",
"       ▓▓▓▓████████▓▓▓▓▓         ",
"      ▓▓▓████████████▓▓▓▓        ",
"     ▓▓▓██████████████▓▓▓▓       ",
"    ▓▓▓██████@@@@██████▓▓▓▓      ",
"   ▓▓▓█████@@@@@@@█████▓▓▓▓      ",
"   ▓▓▓████@@@@@@@@█████▓▓▓▓▓     ",
"  ▓▓▓▓███@@@@@@@@@█████▓▓▓▓▓     ",
"  ▓▓▓▓███@@@@@@@@██████▓▓▓▓▓     ",
"  ▓▓▓▓████@@@@@@@██████▓▓▓▓▓     ",
"  ▓▓▓▓█████@@@@@██████▓▓▓▓▓▓     ",
"  ▓▓▓▓██████@@@██████▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓█████████████▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓███████████▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓█████████▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓███████▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓█████▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓███▓▓▓░░░░░▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ",
"   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ",
"   ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ",
"   ▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓       ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓        ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓        ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓        ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         ",
"  ▒▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓         ",
"   ▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ",
"   ▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓          ",
"   ▒▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           ",
"    ▒▒▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            ",
"    ▒▒▓▓▓▓▓############           ",
"     ▒▓▓###############           ",
"     ▒▓################           ",
"     ▒#################           ",
"     ▒################            ",
"      ###############             ",
"      ##############              ",
"       ###########                ",
"        #######                   "
];

if (WORLD_MAP.length !== WORLD_MAP_HEIGHT || WORLD_MAP.some(row => row.length !== WORLD_MAP_WIDTH)) {
    throw new Error("WORLD_MAP must be exactly 32x64 rooms.");
}

// West-coast beach, just north of the Del Perro-pier analogue.
const WORLD_START = Object.freeze({ x: 3, y: 53 });

function drawSquareGlyph(ctx, glyph, x, y, cellSize) {
    if (!glyph || glyph === " ") return;

    const cx = x * cellSize + cellSize / 2;
    const cy = y * cellSize + cellSize / 2;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.font = `${cellSize}px monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const measured = Math.max(1, ctx.measureText(glyph).width);
    ctx.scale(cellSize / measured, 1);
    ctx.fillText(glyph, 0, 0);
    ctx.restore();
}

function drawWorldMap(canvas, options = {}) {
    const cellSize = Math.max(2, Math.floor(options.cellSize || 8));
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const width = WORLD_MAP_WIDTH * cellSize;
    const height = WORLD_MAP_HEIGHT * cellSize;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = options.color || "#e9ecef";

    for (let y = 0; y < WORLD_MAP_HEIGHT; y++) {
        for (let x = 0; x < WORLD_MAP_WIDTH; x++) {
            drawSquareGlyph(ctx, WORLD_MAP[y][x], x, y, cellSize);
        }
    }

    const startX = WORLD_START.x * cellSize + cellSize / 2;
    const startY = WORLD_START.y * cellSize + cellSize / 2;
    ctx.save();
    ctx.strokeStyle = options.startColor || "#ff5252";
    ctx.lineWidth = Math.max(1, cellSize * 0.18);
    ctx.beginPath();
    ctx.arc(startX, startY, cellSize * 0.42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}
