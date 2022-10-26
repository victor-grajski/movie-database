import { Lightning } from '@lightningjs/sdk'
import { getMovies } from '../lib/api'

export class Movie extends Lightning.Component {
  static _template() {
    return {
      Background: {
        rect: true,
        w: 1920,
        h: 1080,
        color: 0xff808080,
        flex: {
          direction: 'column',
        },
        Movie: {
          rect: true,
          color: 0xff808080,
          flex: {
            direction: 'row',
            padding: 20,
          },
        },
        Label: {
          flexItem: { margin: 10 },
          text: {
            text: 'Similar Movies',
          },
        },
        SimilarMovies: {
          rect: true,
          color: 0xff808080,
          flex: {
            direction: 'row',
            padding: 20,
          },
        },
      },
    }
  }

  _active() {
    this.addDataToScreen()
  }

  set params(data) {
    this.movieID = data.movieID
    console.log(this.movieID)
  }

  async addDataToScreen() {
    const movie = await getMovies(
      `https://api.themoviedb.org/3/movie/${this.movieID}?api_key=1e2f5a6d65414beaa73e702120775f7b`,
    )

    const similarMovies = await getMovies(
      `https://api.themoviedb.org/3/movie/${this.movieID}/similar?api_key=1e2f5a6d65414beaa73e702120775f7b`,
    )

    this.tag('Movie').patch({
      Poster: {
        w: 250,
        h: 400,
        src: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      },
      Container: {
        flex: {
          direction: 'column',
        },
        flexItem: { margin: 10 },
        Title: {
          text: {
            text: movie.title,
          },
        },
        ReleaseDate: {
          text: {
            text: movie.release_date,
          },
        },
      },
      PlotOverview: {
        rect: true,
        w: 1000,
        text: {
          text: movie.overview,
        },
      },
    })

    let similarMoviesData = similarMovies.results.map((movie) => {
      return {
        rect: true,
        color: 0xff808080,
        flexItem: { margin: 10 },
        flex: {
          direction: 'column',
        },
        Poster: {
          w: 250,
          h: 400,
          src: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        },
        Title: {
          w: 250,
          text: {
            text: movie.title,
          },
        },
      }
    })

    this.tag('SimilarMovies').patch({
      children: similarMoviesData,
    })
  }
}
