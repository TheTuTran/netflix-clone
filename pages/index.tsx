import { getSession } from 'next-auth/react';
import { NextPageContext } from 'next';
import Navbar from '@/components/navbar';
import BillBoard from '@/components/billboard';
import MovieList from '@/components/movie-list';
import useMovieList from '@/hooks/use-movie-list';
import useFavorites from '@/hooks/use-favorites';

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);
	
	if (!session) {
		return {
		redirect: {
			destination: '/auth',
			permanent: false,
		}
		}
	}

	return {
		props: {}
	}
}

export default function Home() {
	const { data: movies = [] } = useMovieList();
	const { data: favorites = [] } = useFavorites();

	return (
	<>
		<Navbar />
		<BillBoard />
		<div className="pb-40">
			<MovieList data={movies} title="Trending Now"/>
			<MovieList data={favorites} title="My List"/>
		</div>
	</>
	)
};
