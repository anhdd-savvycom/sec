import { Module } from '@nestjs/common';
import { GameResolver } from './game.resolver';
import { GameService } from './game.service';

@Module({
  imports: [],
  providers: [GameService, GameResolver]
})
export class GameModule {}
