import React, { FC } from "react";
import { Newline, Text, useApp, useInput } from "ink";

const App: FC<{ name?: string }> = ({ name = "Stranger" }) => {
  const { exit } = useApp();
  const [x, setX] = React.useState(1);
  const [y, setY] = React.useState(1);

  useInput((input, key) => {
    if (input === "q") {
      exit();
    }

    if (key.leftArrow) {
      setX(Math.max(1, x - 1));
    }

    if (key.rightArrow) {
      setX(Math.min(20, x + 1));
    }

    if (key.upArrow) {
      setY(Math.max(1, y - 1));
    }

    if (key.downArrow) {
      setY(Math.min(10, y + 1));
    }
  });

  return (
    <Text>
      Hello, <Text color="green">{name}</Text>
      <Newline />
      <Text color="cyan">
        {x}, {y}
      </Text>
      <Newline />
      Bye, <Text color="red">{name}</Text>
    </Text>
  );
};

module.exports = App;
export default App;
