import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { PUNCH_TYPES } from '@/share/const';

const useClientClient = () => {
  const NEW_PUNCH = gql`
    mutation punch($type: String) {
      punch(type: $type) {
        black
        blue
        orange
      }
    }
  `;
  const [newPunch] = useMutation(NEW_PUNCH);
  const punchHandler = useCallback(async (punchType: PUNCH_TYPES) => {
    try {
      await newPunch({variables: {
        type: punchType,
      }});
    } catch(error) {
      console.log(error);
    }
  }, []);

  return {
    handlers: {
      punchHandler,
    },
  };
};

export default useClientClient;
