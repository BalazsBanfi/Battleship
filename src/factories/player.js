// Factory function for add players
export const player = (name) => {
    const attackedCells = [];
    const attack = (coord) => {
        attackedCells.push(coord);
    }
    return { name, attackedCells, attack }
};