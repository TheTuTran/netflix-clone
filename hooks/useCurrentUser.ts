import useSWR from 'swr';
import fetcher from '@/lib/fetcher'

// Don't need state managment for fetching user. 
// swr is used for fetching data and an alternative to react query
const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('@/pages/api/current', fetcher);
    return {
        data,
        error,
        isLoading,
        mutate,
    }
};

export default useCurrentUser;