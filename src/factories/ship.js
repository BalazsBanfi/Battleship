// Factory function for add ships
export const ship = (l) => {
    const length = l;
    let hits = 0;
    const hit = () => hits++;
    const hitCounter = () => hits;
    const isSunk = () => {
        if (length == hits) { return true }
        return false
    };
    return { length, hit, hitCounter, isSunk }
}