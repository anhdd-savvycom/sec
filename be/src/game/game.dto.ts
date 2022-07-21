export enum PunchType {
  blue = 'blue',
  orange = 'orange'
}

export class PunchDto {
  color?: PunchType;
  createdAt?: string;
}

export class GameDto {
  black?: number;
  orange?: number;
  blue?: number;
  createdAt?: string;
  isFinal?: boolean;
  data?: PunchDto[];
}

export class PunchResponseItem {
  color: PunchType;
  createdAt: string;
}

export class GameResponse {
  black: number;
  orange: number;
  blue: number;
  isFinal: boolean;
  data: PunchResponseItem[];
  createdAt: string;
}