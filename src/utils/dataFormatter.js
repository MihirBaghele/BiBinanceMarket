export const formatDataForChart = (data) => {
    return data.map((point) => ({
      time: new Date(point.time).toLocaleTimeString(),
      close: point.close,
    }));
  };
  