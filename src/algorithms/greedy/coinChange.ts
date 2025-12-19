import type { Algorithm, Step } from '../../core/types';

export const coinChange: Algorithm = {
    name: 'Counting Money',
    category: 'Greedy',
    description: 'Find the minimum number of coins to make a target amount using a greedy approach.',
    complexity: {
        time: 'O(N) where N is the number of denominations',
        space: 'O(1)'
    },
    code: `function coinChange(coins, target) {
    let remaining = target;
    const selectedCoins = {};
    
    // Sort coins descending
    coins.sort((a, b) => b - a);

    for (let coin of coins) {
        if (coin <= remaining) {
            const count = Math.floor(remaining / coin);
            remaining -= count * coin;
            selectedCoins[coin] = count;
        }
    }
    return selectedCoins;
}`,
    run: (data: { coins: number[], target: number }): { steps: Step[] } => {
        const steps: Step[] = [];
        const { coins, target } = data;
        let remaining = target;
        const selectedCoins: { [key: number]: number } = {};

        // Initialize selected coins count
        coins.forEach(coin => selectedCoins[coin] = 0);

        steps.push({
            type: 'variable',
            indices: [],
            description: `Target amount: ${target}`,
            lineNumber: 1,
            variables: { remaining, selectedCoins: { ...selectedCoins } }
        });

        // Sort coins descending just in case, though usually provided sorted
        const sortedCoins = [...coins].sort((a, b) => b - a);

        for (let i = 0; i < sortedCoins.length; i++) {
            const coin = sortedCoins[i];

            steps.push({
                type: 'comparison',
                indices: [],
                description: `Checking coin denomination: ${coin}`,
                lineNumber: 8,
                variables: { remaining, currentCoin: coin, selectedCoins: { ...selectedCoins } }
            });

            if (coin <= remaining) {
                const count = Math.floor(remaining / coin);
                remaining -= count * coin;
                selectedCoins[coin] = count;

                steps.push({
                    type: 'highlight',
                    indices: [],
                    description: `Selected ${count} coin(s) of value ${coin}. Remaining: ${remaining}`,
                    lineNumber: 10,
                    variables: { remaining, currentCoin: coin, selectedCoins: { ...selectedCoins }, addedCount: count }
                });
            }
        }

        steps.push({
            type: 'variable',
            indices: [],
            description: `Finished! Remaining amount: ${remaining}`,
            lineNumber: 14,
            variables: { remaining, selectedCoins: { ...selectedCoins } }
        });

        return { steps };
    }
};
