import { Lightning, Router } from '@lightningjs/sdk'

export class Tile extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xff333333,
      flex: {
        direction: 'column',
        padding: 10,
      },
      flexItem: { margin: 10 },
      Poster: {
        w: 250,
        h: 400,
        src: this.bindProp('posterPath'),
      },
      Title: {
        text: {
          text: this.bindProp('title'),
        },
      },
    }
  }

  _handleEnter() {
    Router.navigate('movie', { movieID: this.movieID })
  }

  _focus() {
    this.patch({
      color: 0xff219897,
    })
  }

  _unfocus() {
    this.patch({
      color: 0xff333333,
    })
  }
}
