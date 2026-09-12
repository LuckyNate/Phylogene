const COLS = 11;
const ROWS = 15;

function isWall(x, y) {
    return (
        x === 0 ||
        y === 0 ||
        x === COLS - 1 ||
        y === ROWS - 1
    );
}

function isSafeTile(x, y) {
    return (
        !isWall(x, y) &&
        (
            x === 1 ||
            y === 1 ||
            x === COLS - 2 ||
            y === ROWS - 2
        )
    );
}
