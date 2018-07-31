import axios from 'axios';

const groupByAndSum = (array, keyGroupBy, keyToSum) => {
  let result = [];
  array.reduce(function(acc, obj) {
    if (!acc[obj[keyGroupBy]]) {
      acc[obj[keyGroupBy]] = {
        links_quantity: 0,
        name: obj[keyGroupBy],
      };
      result.push(acc[obj[keyGroupBy]]);
    }
    acc[obj[keyGroupBy]].links_quantity += obj[keyToSum];
    return acc;
  }, {});
  return result;
};

const roundToTwo = num => Math.round(num * 100) / 100;

const sumBy = (result, key) => result.reduce((acc, cur) => acc + cur[key], 0);

const linksPercentage = result => {
  const linksTotalQty = sumBy(result, 'links_quantity');
  return result.map(item => ({
    ...item,
    links_percentage: roundToTwo((item.links_quantity / linksTotalQty) * 100),
  }));
};

const weightedRand = spec => {
  let table = [];
  for (let i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (let j = 0; j < spec[i].links_percentage * 10; j++) {
      table.push(spec[i].name);
    }
  }
  return function() {
    return table[Math.floor(Math.random() * table.length)];
  };
};

const getParticipants = () => {
  return axios({
    method: 'get',
    url: 'https://api.airtable.com/v0/appWtd4eUJ04bhcXb/Posiciones',
    headers: {
      Authorization: 'Bearer ' + process.env.REACT_APP_AIRTABLE_API_KEY,
    },
  })
    .then(response => {
      const fields = response.data.records
        .map(item => item.fields)
        .sort((a, b) => a.Id - b.Id);

      // REF: https://stackoverflow.com/questions/29364262/how-to-group-by-and-sum-array-of-object-in-jquery
      const keyGroupBy = '¿Quién lo envió?';
      const keyToSum = 'Cantidad de envíos';
      const result = groupByAndSum(fields, keyGroupBy, keyToSum);

      const withPercentage = linksPercentage(result);

      return {
        participants: fields,
        positions: withPercentage,
      };
    })
    .catch(function(error) {
      return error;
    });
};

const helpers = {
  getParticipants,
  weightedRand,
};

export default helpers;
