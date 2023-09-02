import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser } = useCurrentUser();

  // Local state to manage favorite status
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const list = currentUser?.favoriteIds || [];
    setIsFavorite(list.includes(movieId));
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

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

    // Update local state
    setIsFavorite((prev) => !prev);
  }, [movieId, isFavorite, currentUser, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default React.memo(FavoriteButton);
