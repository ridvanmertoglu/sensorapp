import axios from 'axios';

const apiUrl = 'https://5f29c439a1b6bf0016ead9dd.mockapi.io/api/sensor';

const getSensors = async () => {
  const result = await axios.get(apiUrl);
  console.log(result.data[0].items);
  return result.data[0].items;
};

export default getSensors;
