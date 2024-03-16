import { useEffect, useState } from "react";
import "./App.css";

export interface Direction {
  up?: boolean;
  down?: boolean;
  left?: boolean;
  right?: boolean;
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [rows, setRows] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [snakeX, setSnakeX] = useState<number>(10);
  const [snakeY, setSnakeY] = useState<number>(10);
  const [snakePosition, setSnakePosition] = useState<string>(
    `#pos-${snakeX}-${snakeY}`
  );
  const [filledSquares, setFilledSquares] = useState<string[]>([]);
  const [direction, setDirection] = useState<Direction>();

  const i = 15;

  useEffect(() => {
    if (rows.length < i) {
      setRows(Array.from({ length: i }, () => ""));
    }

    if (columns.length < i) {
      setColumns(Array.from({ length: i }, () => ""));
    }

    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [rows, columns]);

  useEffect(() => {
    setSnakePosition(`#pos-${snakeY}-${snakeX}`);
  }, [snakeX, snakeY]);

  useEffect(() => {
    document.querySelector(snakePosition)?.classList.add("bg-red-500");

    setFilledSquares([...filledSquares, snakePosition]);

    if (!loading && filledSquares.find((elem) => elem === snakePosition)) {
      document.querySelector(snakePosition)?.classList.remove("bg-red-500");
    }
    setLoading(false);
  }, [snakePosition]);

  useEffect(() => {
    setTimeout(() => {
      if (direction?.right && snakeX < 15) {
        setSnakeX(snakeX + 1);
        console.log("left");
      }
    }, 1000);

    setTimeout(() => {
      if (direction?.left && snakeX > 0) {
        setSnakeX(snakeX - 1);
        console.log("right");
      }
    }, 1000);
  }, [snakeX]);

  useEffect(() => {
    setTimeout(() => {
      if (direction?.down && snakeY < 15) {
        setSnakeY(snakeY + 1);
        console.log("down");
      }
    }, 1000);

    setTimeout(() => {
      if (direction?.up && snakeY > 0) {
        setSnakeY(snakeY - 1);
        console.log("up");
      }
    }, 1000);
  }, [snakeY]);

  useEffect(() => {
    console.log(direction);
  }, [direction]);

  const keyPress = (e: KeyboardEvent) => {
    if (snakeX > -1 && snakeY > -1 && snakeX < 15 && snakeY < 15) {
      switch (e.which) {
        case 37: {
          // left
          setSnakeX((elementPosition) => elementPosition - 1);
          setDirection({ left: true, down: false, right: false, up: false });
          break;
        }
        case 38: {
          // up
          setSnakeY((elementPosition) => elementPosition - 1);
          setDirection({ left: false, down: false, right: false, up: true });

          break;
        }
        case 39: {
          // right
          setSnakeX((elementPosition) => elementPosition + 1);
          setDirection({ left: false, down: false, right: true, up: false });
          break;
        }
        case 40: {
          // down
          setSnakeY((elementPosition) => elementPosition + 1);
          setDirection({ left: false, down: true, right: false, up: false });
          break;
        }
        default:
      }
    }
  };

  return (
    <div className="p-10 text-center flex flex-col justify-center items-center w-screen h-screen">
      {Array.from({ length: i }, (_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: i }, (_, colIndex) => (
            <div
              id={`pos-${rowIndex}-${colIndex}`}
              key={colIndex}
              style={{ padding: 15, margin: 1 }}
              className="flex bg-gray-700"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
