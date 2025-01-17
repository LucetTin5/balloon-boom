const createBalloonCell = () => {
  return Math.floor(Math.random() * 10) > 5;
};

export const createInitialBoard = (width: number) => {
  return Array.from({ length: width }, () =>
    Array.from({ length: width }, createBalloonCell),
  );
};
