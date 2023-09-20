import { create } from 'zustand';

const GRID_WIDTH = 18;
const GRID_HEIGHT = 20;
const eatSound = new Audio('./public/success.mp3');

const useStore = create(set => ({
  snake: [{ x: 10, y: 10 }],
  apple: { x: Math.floor(Math.random() * GRID_WIDTH), y: Math.floor(Math.random() * GRID_HEIGHT) },
  direction: "RIGHT",
  gameInProgress: false,
  stateGame: {
    state:"inactif",
    value:1
  },
  pausedTime: 0,
  game: {
    apple:0,
    time: Date.now()
  },
  startGame: () => set((state) => {
    return {
      ...state,
      gameInProgress: true,
      game: {
        ...state.game,
        time: Date.now() - state.pausedTime,
      },
    };
  }),
  
  stopGame: (elapsedTime) => set((state) => {
    return {
      ...state,
      gameInProgress: false,
      pausedTime: elapsedTime,
    };
  }),
  resetGame: () => set({
    gameInProgress: false,
    pausedTime: 0,
    snake: [{ x: 10, y: 10 }],
    apple: { x: Math.floor(Math.random() * GRID_WIDTH), y: Math.floor(Math.random() * GRID_HEIGHT) },
    direction: "RIGHT",
    game: {
      apple:0,
      time: Date.now()
    },
  }),

  setStateGame:(newStateGame) => set({stateGame:newStateGame}),
  setGame:(game) => set({game}),
  setStateBase:(base) => set({base}),
  setSnake: (snake) => set({ snake }),
  setApple: (apple) => set({ apple }),
  setDirection: (newDirection) => set((state) => {
    const { direction } = state;
    let isOpposite;
    switch (direction) {
      case 'UP':
        isOpposite = (newDirection === 'DOWN');
        break;
      case 'DOWN':
        isOpposite = (newDirection === 'UP');
        break;
      case 'LEFT':
        isOpposite = (newDirection === 'RIGHT');
        break;
      case 'RIGHT':
        isOpposite = (newDirection === 'LEFT');
        break;
      default:
        isOpposite = false;
        break;
    }
    if (!isOpposite) {
      return { direction: newDirection };
    } else {
      return state 
    }
  }),

  moveSnake: () => set((state) => {
    const { snake, direction, apple } = state;
    let newHead;
    switch (direction) {
      case 'UP':
        newHead = { x: snake[0].x, y: (snake[0].y - 1 + GRID_HEIGHT) % GRID_HEIGHT };
        break;
      case 'DOWN':
        newHead = { x: snake[0].x, y: (snake[0].y + 1) % GRID_HEIGHT };
        break;
      case 'LEFT':
        newHead = { x: (snake[0].x - 1 + GRID_WIDTH) % GRID_WIDTH, y: snake[0].y };
        break;
      case 'RIGHT':
        newHead = { x: (snake[0].x + 1) % GRID_WIDTH, y: snake[0].y };
        break;
      default:
        break;
    }

    if(snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
       return {
        gameInProgress: false,
        pausedTime: 0,
        snake: [{ x: 10, y: 10 }],
        apple: { x: Math.floor(Math.random() * GRID_WIDTH), y: Math.floor(Math.random() * GRID_HEIGHT) },
        direction: "RIGHT",
        game: {
          apple:0,
          time: Date.now()
        },
        stateGame: {
          state:"Death",
          value:1
        },
      }
    }
  
    let newSnake;
    let newApple = apple;
    let newGame = {...state.game};
    
    if(newHead && apple && newHead.x === apple.x && newHead.y === apple.y) {
      eatSound.play();
      newSnake = [newHead, ...snake];
      newApple = { x: Math.floor(Math.random() * GRID_WIDTH), y: Math.floor(Math.random() * GRID_HEIGHT) };
      newGame = { ...state.game, apple: state.game.apple + 1 };
    } else {
      newSnake = [newHead, ...snake.slice(0, -1)];
    }
  
    return { 
      ...state,
      snake: newSnake,
      apple: newApple,
      game: newGame
    };
  }),
}));

export default useStore;
