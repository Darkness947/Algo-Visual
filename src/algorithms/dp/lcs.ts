import type { Algorithm, Step } from '../../core/types';

export const lcs: Algorithm = {
    name: 'Longest Common Subsequence',
    category: 'DP',
    description: 'Finds the longest subsequence present in both strings.',
    complexity: {
        time: 'O(m * n)',
        space: 'O(m * n)'
    },
    code: `function lcs(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,
    run: (input: any) => {
        const { str1, str2 } = input as { str1: string, str2: string };
        const steps: Step[] = [];
        const m = str1.length;
        const n = str2.length;

        // Initialize table
        const table = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));

        steps.push({
            type: 'variable',
            indices: [],
            description: 'Initializing DP table with zeros',
            lineNumber: 4,
            variables: { table: JSON.parse(JSON.stringify(table)), str1, str2 }
        });

        // Fill table
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                const char1 = str1[i - 1];
                const char2 = str2[j - 1];
                const match = char1 === char2;

                steps.push({
                    type: 'comparison',
                    indices: [],
                    description: `Comparing ${char1} (Row ${i}) and ${char2} (Col ${j})`,
                    lineNumber: 8,
                    variables: { table: JSON.parse(JSON.stringify(table)), i, j, match, str1, str2 }
                });

                if (match) {
                    table[i][j] = table[i - 1][j - 1] + 1;
                    steps.push({
                        type: 'overwrite',
                        indices: [],
                        description: `Match! 1 + diagonal (${table[i - 1][j - 1]}) = ${table[i][j]}`,
                        lineNumber: 9,
                        variables: { table: JSON.parse(JSON.stringify(table)), i, j, match, str1, str2 }
                    });
                } else {
                    table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
                    steps.push({
                        type: 'overwrite',
                        indices: [],
                        description: `No match. Max of top (${table[i - 1][j]}) and left (${table[i][j - 1]}) = ${table[i][j]}`,
                        lineNumber: 11,
                        variables: { table: JSON.parse(JSON.stringify(table)), i, j, match, str1, str2 }
                    });
                }
            }
        }

        // Backtrack to find LCS
        let i = m;
        let j = n;
        const path: [number, number][] = [];
        const lcsChars: string[] = [];

        while (i > 0 && j > 0) {
            path.push([i, j]);
            steps.push({
                type: 'highlight',
                indices: [],
                description: `Backtracking at [${i}, ${j}]`,
                lineNumber: 15,
                variables: { table: JSON.parse(JSON.stringify(table)), i, j, path: [...path], str1, str2 }
            });

            if (str1[i - 1] === str2[j - 1]) {
                lcsChars.unshift(str1[i - 1]);
                i--;
                j--;
            } else if (table[i - 1][j] > table[i][j - 1]) {
                i--;
            } else {
                j--;
            }
        }
        path.push([i, j]); // Add final/start cell

        steps.push({
            type: 'highlight',
            indices: [],
            description: `LCS Found: ${lcsChars.join('')}`,
            lineNumber: 16,
            variables: { table: JSON.parse(JSON.stringify(table)), path: [...path], lcs: lcsChars.join(''), str1, str2 }
        });

        return { steps };
    }
};
