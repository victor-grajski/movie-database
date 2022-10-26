import { Lightning, Utils } from '@lightningjs/sdk'
import { getMovies } from '../lib/api'
import { Tile } from './Tile'

export default class MovieList extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }

  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        src: Utils.asset('images/background.png'),
      },
      Results: {
        rect: true,
        color: 0xff808080,
        flex: {
          direction: 'column',
          padding: 20,
        },
      },
    }
  }

  _init() {
    this.page = 1
    this.addDataToScreen(this.page)
    this.index = 0
  }

  _handleDown() {
    this.tag('Results').patch({
      y: this.tag('Results').y - 20,
    })
  }

  _handleUp() {
    this.tag('Results').patch({
      y: this.tag('Results').y + 20,
    })
  }

  _handleLeft() {
    if (this.index > 0) {
      this.index--
    }
  }

  _handleRight() {
    if (this.index < this.tag('Results').children.length - 1) {
      this.index++
    }
  }

  async addDataToScreen(page) {
    const data = await getMovies(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=1e2f5a6d65414beaa73e702120775f7b&page=${page}`,
    )

    let movies = data.results.map((movie) => {
      return {
        rect: true,
        type: Tile,
        title: movie.title,
        posterPath: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        movieID: movie.id,
      }
    })

    let tempChildren = this.tag('Results').children

    this.tag('Results').patch({
      children: tempChildren.concat(movies),
    })
  }

  getActiveItem() {
    return this.tag('Results').children[this.index]
  }

  _getFocused() {
    return this.getActiveItem()
  }
}
