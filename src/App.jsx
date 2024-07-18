import { useState } from "react";
import "./App.css";

const App = () => {
  const [matrix, setMatrix] = useState([
    ["white", "white", "white"],
    ["white", "white", "white"],
    ["white", "white", "white"],
  ]);
  const [clickOrder, setClickOrder] = useState([]);
  const [clickCount, setClickCount] = useState(1);

  const handleClick = (row, col) => {
    if (matrix[row][col] !== "white") return;

    const newMatrix = matrix.map((rArray, rIndex) =>
      rArray.map((colColor, cIndex) =>
        rIndex === row && cIndex === col ? "green" : colColor
      )
    );

    setMatrix(newMatrix);
    console.log("newMatrix", newMatrix);

    const newClickOrder = [...clickOrder, { row, col }];
    setClickOrder(newClickOrder);
    console.log("newClickOrder", newClickOrder);

    setClickCount(clickCount + 1);
    console.log("clickCount", clickCount);

    if (clickCount === 9) {
      setTimeout(() => {
        const sequenceMatrix = newMatrix.map((rowArray) => [...rowArray]);
        newClickOrder.forEach(({ row, col }, index) => {
          setTimeout(() => {
            sequenceMatrix[row][col] = "orange";
            setMatrix(sequenceMatrix.map((rowArray) => [...rowArray]));
          }, index * 500);
        });
      }, 500);
    }
  };

  return (
    <div className="container">
      <div className="matrix">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((color, colIndex) => (
              <div
                key={colIndex}
                className="box"
                style={{ backgroundColor: color }}
                onClick={() => handleClick(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
