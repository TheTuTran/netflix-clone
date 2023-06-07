import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

// Don't need state managment for fetching user. 
// swr is used for fetching data and an alternative to react query
const useBillboard = () => {
    const { data, error, isLoading } = useSWR('/api/random', fetcher, {
        // swr options that makes disables data revalidation when user visits site
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    
    return {
        data,
        error,
        isLoading
    }
};

export default useBillboard;