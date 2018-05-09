import React from "react";
import { render } from "react-dom";
import {
  compose,
  withState,
  withHandlers,
  pure,
  onlyUpdateForKeys,
  setPropTypes,
  onlyUpdateForPropTypes,
  shouldUpdate
} from "recompose";
import Proptypes from "prop-types";
/*
TITLE:
Optimize Component Rendering using Recompose

DESCRIPTION:
Learn how and when to use the ‘pure’, ‘onlyUpdateForKeys’,
‘onlyUpdateForPropTypes’, and ‘shouldUpdate’ higher order components.
Each one provides a certain granularity of control over prevent
unnecessary renders. Learn how they build upon each other to provide
different options.
*/
const { Component } = React;

const optimize = compose(
  // #1
  pure,

  // #2
  // onlyUpdateForKeys(['data', 'width', 'onChange']),

  // #3
  // onlyUpdateForPropTypes,
  // setPropTypes({
  //   data: PropTypes.string,
  //   width: PropTypes.number,
  //   onChange: PropTypes.func,
  // })

  // #4
  // shouldUpdate((prev, next) =>
  //   prev.data !== next.data ||
  //   prev.width !== next.width ||
  //   prev.onChange !== next.onChange
  // ),

  withHandlers({
    onChange: ({ id, onChange }) => e => onChange(id, e.target.value)
  })
);

const Cell = optimize(({ data, onChange, width }) => (
  <div
    className="Cell"
    style={{
      width: `${width}%`,
      borderColor: randomColor()
    }}
  >
    <textarea type="text" value={data} onChange={onChange} />
  </div>
));

const Spreadsheet = ({ rows, cols, cellsData, onCellChange }) => (
  <div className="Spreadsheet">
    {range(rows).map((row, i) =>
      range(cols)
        .map((col, j) => `${i}-${j}`)
        .map(id => (
          <Cell
            key={id}
            id={id}
            data={cellsData[id] || ""}
            onChange={onCellChange}
            width={100 / cols}
          />
        ))
    )}
  </div>
);

const enhance = compose(
  withState("cellsData", "setCells", {}),
  withHandlers({
    setCellState: ({ cellsData, setCells }) => (id, val) =>
      setCells({
        ...cellsData,
        [id]: val
      })
  })
);

const App = enhance(({ cellsData, setCellState }) => (
  <div className="App">
    <Spreadsheet
      {...{ rows: 3, cols: 3, cellsData, onCellChange: setCellState }}
    />
  </div>
));

render(<App />, document.getElementById("root"));

function range(num) {
  return Array.from(Array(num).keys());
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
