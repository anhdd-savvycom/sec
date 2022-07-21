import { useCallback } from "react";

import useClientClient from "@/share/useClientClient";
import { PUNCH_TYPES } from "@/share/const";

export type UseClient = () => ({
  handlers: {
    clickHandler: Function;
  };
});

const useClient: UseClient = () => {
  const { handlers } = useClientClient();
  const { punchHandler } = handlers;

  const clickHandler = useCallback((type: PUNCH_TYPES) => {
    punchHandler(type);
  }, []);

  return {
    handlers: {
      clickHandler,
    },
  }
};

export default useClient;