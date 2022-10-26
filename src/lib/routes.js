import MovieList from '../components/MovieList'
import { Movie } from '../components/Movie'

export default {
  root: '$',
  routes: [
    {
      path: '$',
      component: MovieList,
    },
    {
      path: 'movie',
      component: Movie,
    },
    {
      path: 'movie/:id',
      component: Movie,
    },
  ],
}
