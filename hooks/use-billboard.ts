import useSWR from 'swr';
import fetcher from '@/lib/fetcher';

const useBillboard = () => {
    const { data, error, isLoading } = useSWR('/api/random', fetcher, {
        // swr options that makes data load once user visits a page
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    })
    
    return {
        data,
        error,
        isLoading
    }
}

export default useBillboard