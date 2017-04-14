let defectsPerDay = [
  [2, 0],
  [2, 1],
  [3, 1],
  [3, 0],
  [5, 2],
  [4, 0],
  [5, 1],
  [2, 0],
  [6, 2],
  [3, 1],
  [2, 1],
  [1, 2],
  [1, 1],
  [0, 1],
  [0, 0],
  [0, 2],
  [4, 2],
  [2, 2],
  [1, 2],
  [0, 1],
  [0, 0],
  [1, 2],
  [0, 0],
  [6, 2],
  [7, 1],
  [8, 3],
  [6, 4],
  [3, 5],
  [2, 6],
  [1, 5],
  [1, 6],
  [0, 5],
  [0, 2],
  [0, 2]
],
    cumulativeDefects = defectsPerDay.reduce((acc, [discovered, resolved]) => {
      let cumulativeDiscovered,
          cumulativeResolved;
      if (acc.length == 0) {
        [cumulativeDiscovered, cumulativeResolved] = [0, 0];
      } else {
        [cumulativeDiscovered, cumulativeResolved] = acc[acc.length - 1];
      }
      return acc.concat([
        [
          cumulativeDiscovered + discovered,
          cumulativeResolved + resolved
        ]
      ]);
    }, []),
    dates = [...Array(cumulativeDefects.length - 1).keys()].reduce(dateList => {
      let previousDate = dateList[dateList.length - 1],
          nextWeekDay = (date) => {
            let delta = 1,
                newDate = new Date(date.getTime());
            if (date.getDay() == 5) {
              delta = 3;
            } else if (date.getDay() == 6) {
              delta = 2;
            }
            newDate.setDate(newDate.getDate() + delta);
            return newDate;
          },
          nextList = dateList.concat([nextWeekDay(previousDate)]);
      return nextList;
    }, [new Date(2017, 2, 1)]),
    discoveredDefects = {
      description: "Defects Discovered",
      data: dates.reduce((acc, date, idx) => {
        acc[date.toDateString()] = cumulativeDefects[idx][0];
        return acc;
      }, {})
    },
    resolvedDefects = {
      description: "Defects Resolved",
      data: dates.reduce((acc, date, idx) => {
        acc[date.toDateString()] = cumulativeDefects[idx][1];
        return acc;
      }, {})
    },
    defectsOverTime = [
      discoveredDefects,
      resolvedDefects
    ];

console.log("Defects over time", defectsOverTime);


export { defectsOverTime };
