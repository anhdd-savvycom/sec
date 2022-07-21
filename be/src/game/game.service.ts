import { Injectable } from '@nestjs/common';
import { now } from 'lodash';
import { GameDto, GameResponse, PunchType } from './game.dto';
const preGame = {
  black: 0,
  blue: 0,
  orange: 0,
  isFinal: false,
  data: [],
}

@Injectable()
export class GameService {
  game: GameDto;
  constructor() {

  }

  newGame() {
    this.game = Object.assign({}, {...preGame, data: [], createdAt: (new Date().getTime()).toString()});
    return this.gameMapper();
  }

  async get(): Promise<GameResponse> {
    return this.gameMapper();
  }

  punch(type: PunchType) {
    if(!this.game) {
      return;
    }

    this.game[type] = this.game[type] + 1;
    this.game.data.push({
      color: type,
      createdAt: (new Date().getTime()).toString()
    });

    return this.gameMapper();
  }


  gameMapper(): GameResponse {
    let _game = this.game;
    if(!_game) {
      _game = preGame;
    }
    return {
      black:  _game.blue - _game.orange,
      blue: _game.blue,
      orange: _game.orange,
      data: _game.data.map(item => ({
        color: item.color,
        createdAt: item.createdAt
      })),
      isFinal: _game.isFinal,
      createdAt: _game.createdAt
    }
  }
}
