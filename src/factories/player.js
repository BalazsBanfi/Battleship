// Factory function for add players
export const player = (name) => {
    const attacks = [];
    const attack = (coord) => {
        attacks.push(coord);
    }
    return { name, attacks, attack }
};

