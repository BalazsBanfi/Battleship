export const ship = (l) => {
    const length = l;
    let hit = 0;
    const hitOne = () => hit++;
    const hitCounter = () => hit;
    const isSunk = () => {
        if (length == hit) { return true }
        return false
    };

    return { length, hitOne, hitCounter, isSunk }
}