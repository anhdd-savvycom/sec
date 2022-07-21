import { useCallback } from 'react';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import { PUNCH_TYPES } from '@/share/const';

export type Punch = {
  color: PUNCH_TYPES;
  createdAt: number;
};

export type Game = {
  black: number;
  blue: number;
  orange: number;
  data: Punch[];
  isFinal: boolean;
  createdAt: null | number;
};

export type GameWsData = {
  subcribe: Game;
};

const useDashboardClient = () => {
  const PUNCHS_SUBSCRIPTION = gql`
    subscription subscription {
      subcribe {
        black
        blue
        orange
        data {
          color
          createdAt
        }
        isFinal
        createdAt
      }
    }
  `;
  const { loading, data } = useSubscription<GameWsData>(PUNCHS_SUBSCRIPTION);

  const NEW_GAME = gql`
    mutation newGame {
      newGame {
        black
        blue
        orange
      }
    }
  `;
  const [newGame] = useMutation(NEW_GAME);
  const newGameHandler = useCallback(async () => {
    try {
      await newGame();
    } catch(error) {
      console.log(error);
    }
  }, [newGame]);

  return {
    states: {
      loading,
      data,
    },
    handlers: {
      newGameHandler,
    }
  }
};

export default useDashboardClient;