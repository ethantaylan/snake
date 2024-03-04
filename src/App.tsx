import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [rows, setRows] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const [snakeX, setSnakeX] = useState<number>(10);
  const [snakeY, setSnakeY] = useState<number>(10);

  const [filledSquares, setFilledSquares] = useState<Element[]>([]);

  const [snakePosition, setSnakePosition] = useState<string>(
    `pos${snakeX}-${snakeY}`
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
    const pos = document.querySelector(`#pos-${snakeY}-${snakeX}`);

    if (!filledSquares.find((element: Element) => element === pos)) {
      pos && setFilledSquares([...filledSquares, pos]);
      pos?.classList.add("bg-red-500");

      console.log(filledSquares);
    }

    // keyboard event
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [snakeX, snakeY, rows, columns]);

  useEffect(() => {
    const pos = document.querySelector(`#pos-${snakeY}-${snakeX}`);

    if (filledSquares.find((element: Element) => element !== pos)) {
      filledSquares.map((square) => square.classList.remove("bg-red-500"));
    }
  }, [snakeX, snakeY, rows, columns]);

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
