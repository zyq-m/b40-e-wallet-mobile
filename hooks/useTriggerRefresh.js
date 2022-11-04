import { useState, useEffect } from "react";

export const useTriggerRefresh = refresh => {
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    if (refresh) {
      setTrigger(prev => !prev);
    }
  }, [refresh]);

  return { trigger };
};
