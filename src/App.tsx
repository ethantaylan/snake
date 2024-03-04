import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [rows, setRows] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const [snakeX, setSnakeX] = useState<number>(10);
  const [snakeY, setSnakeY] = useState<number>(10);

  const [filledSquares, setFilledSquares] = useState<string[]>([]);

  const [snakePosition, setSnakePosition] = useState<string>(
    `pos-${snakeX}-${snakeY}`
  );

  const i = 15;

  useEffect(() => {
    if (rows.length < i) {
      setRows(Array.from({ length: i }, () => ""));
    }

    if (columns.length < i) {
      setColumns(Array.from({ length: i }, () => ""));
    }

    // snake position
    setSnakePosition(`#pos-${snakeY}-${snakeX}`);

    // keyboard event
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [snakeX, snakeY, rows, columns]);

  useEffect(() => {
    document.querySelector(snakePosition)?.classList.add("bg-red-500");

    // if filledSquares does not contain snakePosition, setFilledSquares

    setFilledSquares([...filledSquares, snakePosition]);

    if (filledSquares.find((elem) => elem === snakePosition)) {
      document.querySelector(snakePosition)?.classList.remove("bg-red-500");
    }
  }, [snakePosition]);

  const keyPress = (e: KeyboardEvent) => {
    if (snakeX > -1 && snakeY > -1 && snakeX < 15 && snakeY < 15) {
      switch (e.which) {
        case 37: {
          // left
          setSnakeX((elementPosition) => elementPosition - 1);
          break;
        }
        case 38: {
          // up
          setSnakeY((elementPosition) => elementPosition - 1);
          break;
        }
        case 39: {
          // right
          setSnakeX((elementPosition) => elementPosition + 1);
          break;
        }
        case 40: {
          // down
          setSnakeY((elementPosition) => elementPosition + 1);
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
