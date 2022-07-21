import { useEffect, useState, useCallback } from "react";

import useDashboardClient, { Game, GameWsData } from "@/share/useDashboardClient";
import { PUNCH_TYPES } from "@/share/const";

type ChartData = {
  labels: number[];
  datasets: any[];
};
export type UseDashboard = () => ({
  states: {
    options: {[key: string]: any};
    isFinal: boolean;
    defaultData: ChartData;
    data: ChartData;
    gameWsData: GameWsData | undefined;
  },
});

const useDashboard: UseDashboard = () => {
  const defaultData: ChartData = {
    labels: (Array(11).fill(0)).map((value, index) => index * 0.5),
    datasets: [
      {
        label: 'black',
        backgroundColor: 'black',
        borderColor: 'black',
        tension: 0.5,
        data: [],
      },
      {
        label: 'yellow',
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        tension: 0.5,
        data: [],
      },
      {
        label: 'blue',
        backgroundColor: 'blue',
        borderColor: 'blue',
        tension: 0.5,
        data: [],
      }
    ],
  };
  const calculateData = useCallback((gameData: Game) => {
    let firstCreated: number | null = null;
    let newData = JSON.parse(JSON.stringify(defaultData));
    newData.datasets[0].data = Array(11).fill(0);
    newData.datasets[1].data = Array(11).fill(0);
    newData.datasets[2].data = Array(11).fill(0);

    gameData.data.forEach((punch) => {
      const { color, createdAt } = punch;

      let blockIndex: number;
      if (null === firstCreated) {
        blockIndex = 0;
        firstCreated = createdAt;
      } else {
        blockIndex = Math.floor((createdAt - firstCreated) / 500);
      }

      newData.datasets[0].data[blockIndex] = newData.datasets[0].data[blockIndex] || 0;
      newData.datasets[1].data[blockIndex] = newData.datasets[1].data[blockIndex] || 0;
      newData.datasets[2].data[blockIndex] = newData.datasets[2].data[blockIndex] || 0;

      if (PUNCH_TYPES.ORANGE === color) {
        newData.datasets[0].data[blockIndex] += -1;
        newData.datasets[1].data[blockIndex] += -1;
      } else {
        newData.datasets[0].data[blockIndex] += 1;
        newData.datasets[2].data[blockIndex] += 1;
      }
    });

    return newData;
  }, []);

  const [options] = useState({
    responsive: true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Seconds(s)',
        },
        ticks: {
          stepSize: 0.5,
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Click(s)',
        },
        ticks: {
          stepSize: 1,
        },
        suggestedMin: 0,
        suggestedMax: 4,
      }
    },
    maintainAspectRatio: false,
  });
  const [isFinal, setIsFinal] = useState(false);
  const [data, setData] = useState(JSON.parse(JSON.stringify(defaultData)));

  const { states, handlers } = useDashboardClient();
  const { data: gameWsData, loading: gameLoading } = states;
  const { newGameHandler } = handlers;

  useEffect(() => {
    newGameHandler();
  }, []);

  useEffect(() => {
    if (!gameLoading && gameWsData?.subcribe.isFinal) {
      const newData = calculateData(gameWsData.subcribe);

      setData(newData);

      if (gameWsData.subcribe.isFinal) {
        setIsFinal(true);
      }
    }
  }, [gameLoading, gameWsData]);

  return {
    states: {
      options,
      isFinal,
      defaultData,
      data,
      gameWsData,
    },
  };
};

export default useDashboard;