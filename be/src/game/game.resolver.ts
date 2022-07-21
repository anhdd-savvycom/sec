import { PunchType } from './game.dto';
import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { GameService } from "./game.service";
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('game')
export class GameResolver {
  constructor(private gameService: GameService) {}

  @Query()
  async game() {
    return this.gameService.get();
  }


  @Subscription('subcribe')
  subcribe() {
    return pubSub.asyncIterator('subcribe');
  }

  @Mutation('newGame')
  async newGame() {
    const game = this.gameService.newGame();
    pubSub.publish('subcribe', { subcribe: {...game} });
    return game;
  }

  @Mutation('punch')
  async punch(
    @Args('type', { type: () => toString }) type: PunchType,
  ) {
    const game = this.gameService.punch(type);
    if(game) {
      pubSub.publish('subcribe', { subcribe: {...game} });

      if(game.data.length === 1) {
        setTimeout(() => {
          pubSub.publish('subcribe', { subcribe: {
            ...this.gameService.gameMapper(),
            isFinal: true,
          } });
          this.gameService.game = null;
          
        }, 5000)
      }
    }
    return game;
  }
}


