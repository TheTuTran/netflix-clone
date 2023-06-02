import axios from 'axios';
import React, { useCallback, useMemo } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai'
import useCurrentUser from '@/hooks/use-current-user';
import useFavorites from '@/hooks/use-favorites';

interface FavoriteButtonProps {
    movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavorites } = useFavorites();
    const { data: currentUser, mutate } = useCurrentUser();
    
    const isFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavorites = useCallback(async () => {
        let response;

        // if it is already favorited, we will trigger the delete response, otherwise, we use a trigger post response
        if (isFavorite) {
            response = await axios.delete(`/api/favorite?movieId=${movieId}`);
        } else {
            response = await axios.post("/api/favorite", { movieId });
        }

        const updatedFavoriteIds = response?.data?.favoriteIds;

        mutateFavorites({
            ...currentUser, 
            favoriteIds: updatedFavoriteIds,
        });
        
        mutateFavorites();
    }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

    // toggles icon based on if it is in list of favorites or not
    const Icon = isFavorite? AiOutlineCheck : AiOutlinePlus
    
    return (
        <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
            <Icon className="text-white size={25}" />
        </div>
    )
};

export default FavoriteButton;

