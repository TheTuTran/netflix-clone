import axios from 'axios';

// front-end fetching
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default fetcher;