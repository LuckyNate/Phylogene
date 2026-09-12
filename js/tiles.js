const tilePalette = {
    wall: "#202226",
    wallInset: "#30333a",
    wallGrid: "#4a4d54",
    safe: "#263126",
    floor: "#324331",
    floorGrid: "#425342"
};

const tileTypes = {
    floor: {
        blocked: false,
        opaque: false
    },

    safe: {
        blocked: false,
        opaque: false
    },

    wall: {
        blocked: true,
        opaque: true
    },

    deepWater: {
        blocked: true,
        opaque: false
    },

    pit: {
        blocked: true,
        opaque: false
    }
};
