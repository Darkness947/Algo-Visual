import type { Algorithm, Step } from '../../core/types';

export const activitySelection: Algorithm = {
    name: 'Activity Selection',
    category: 'Greedy',
    description: 'Selects the maximum number of activities that can be performed by a single person, assuming that a person can only work on a single activity at a time.',
    complexity: {
        time: 'O(n log n)',
        space: 'O(1)'
    },
    code: `function activitySelection(activities) {
  // Sort by finish time
  activities.sort((a, b) => a.end - b.end);

  let i = 0;
  let selected = [activities[0]];

  for (let j = 1; j < activities.length; j++) {
    if (activities[j].start >= activities[i].end) {
      selected.push(activities[j]);
      i = j;
    }
  }
  return selected;
}`,
    run: (input: any) => {
        const { intervals } = input as { intervals: { id: number, start: number, end: number }[] };
        const steps: Step[] = [];
        // Work on a copy
        const activities = [...intervals];

        steps.push({
            type: 'variable',
            indices: [],
            description: 'Initial unsorted activities',
            lineNumber: 1,
            variables: { activities: [...activities], selectedIds: [] }
        });

        // Sort by finish time
        activities.sort((a, b) => a.end - b.end);

        steps.push({
            type: 'variable',
            indices: [],
            description: 'Sorted activities by finish time',
            lineNumber: 3,
            variables: { activities: [...activities], selectedIds: [] }
        });

        const selectedIds: number[] = [];

        // Select first activity
        let i = 0;
        selectedIds.push(activities[0].id);

        steps.push({
            type: 'highlight',
            indices: [], // We'll use variables to drive visualization
            description: `Selected first activity ${activities[0].id} (Ends at ${activities[0].end})`,
            lineNumber: 6,
            variables: { activities: [...activities], selectedIds: [...selectedIds], currentId: activities[0].id, lastFinish: activities[0].end }
        });

        for (let j = 1; j < activities.length; j++) {
            const current = activities[j];
            const lastSelected = activities[i];

            steps.push({
                type: 'comparison',
                indices: [],
                description: `Checking Activity ${current.id} (Start: ${current.start}) vs Last Finish (${lastSelected.end})`,
                lineNumber: 9,
                variables: { activities: [...activities], selectedIds: [...selectedIds], currentId: current.id, lastFinish: lastSelected.end }
            });

            if (current.start >= lastSelected.end) {
                selectedIds.push(current.id);
                steps.push({
                    type: 'highlight',
                    indices: [],
                    description: `Start ${current.start} >= ${lastSelected.end}. Selected Activity ${current.id}`,
                    lineNumber: 10,
                    variables: { activities: [...activities], selectedIds: [...selectedIds], currentId: current.id, lastFinish: current.end }
                });
                i = j;
            } else {
                steps.push({
                    type: 'highlight',
                    indices: [],
                    description: `Start ${current.start} < ${lastSelected.end}. Conflict! Skipping Activity ${current.id}`,
                    lineNumber: 9,
                    variables: { activities: [...activities], selectedIds: [...selectedIds], currentId: current.id, lastFinish: lastSelected.end, conflict: true }
                });
            }
        }

        steps.push({
            type: 'highlight',
            indices: [],
            description: `Finished. Selected ${selectedIds.length} activities.`,
            lineNumber: 14,
            variables: { activities: [...activities], selectedIds: [...selectedIds] }
        });

        return { steps };
    }
};
