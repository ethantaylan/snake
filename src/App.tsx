import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [rows, setRows] = useState<string[]>([]);
  const [columns, setColumns] = useState<string[]>([]);

  const [snakeX, setSnakeX] = useState<number>(10);
  const [snakeY, setSnakeY] = useState<number>(10);

  // const [snakePosition, setSnakePosition] = useState<number>()
  const i = 15;

  useEffect(() => {
    if (rows.length < i) {
      setRows(Array.from({ length: i }, () => ""));
    }

    if (columns.length < i) {
      setColumns(Array.from({ length: i }, () => ""));
    }
  }, [rows, columns]);

  useEffect(() => {
    const pos = document.querySelector(`#pos-${snakeY}-${snakeX}`);

    pos?.classList.add("bg-red-500");

    console.log(snakeX);
  }, [snakeX, snakeY]);

  const keyPress = (e: KeyboardEvent) => {
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
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, []);

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
