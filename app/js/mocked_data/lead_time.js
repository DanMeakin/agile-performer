let leadTimeData = {
    "Jul 01": 13,
    "Jul 11": 15,
    "Jul 21": 16,
    "Aug 01": 13,
    "Aug 11": 11,
    "Aug 21": 10,
    "Sep 01": 9,
    "Sep 11": 11,
    "Sep 21": 8,
},
    calcAverageLeadTime = (dataPoints) => {
        let accVals = Object.values(dataPoints).reduce((acc, value) => {
            return acc + value;
        })
        let avgVal = accVals / Object.keys(dataPoints).length;
        let avgLeadTime = Object.keys(dataPoints).reduce((avgLine, key) => {
            avgLine[key] = avgVal;
            return avgLine;
        }, {})
        return avgLeadTime;
    }

const averageLeadTime = [
    {
        description: "Rolling Average",
        data: leadTimeData
    },
    {
        description: "Average",
        data: calcAverageLeadTime(leadTimeData)
    },
]

export {averageLeadTime};


   

