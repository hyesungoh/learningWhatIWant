import React, { FC, useEffect } from "react";
import { Box, Text } from "ink";

import shell from "shelljs";

const App: FC<{ name?: string }> = () => {
  useEffect(() => {
    shell.exec("git clone https://github.com/hyesungoh/comet-land");
  }, []);

  if (shell.which("git")) return <Text>git!</Text>;

  return (
    <Box>
      <Text>Cloning Comet land ... </Text>
    </Box>
  );
};

module.exports = App;
export default App;
