import React, { FC, useState } from "react";
import { Box, Newline, Text } from "ink";
import TextInput from "ink-text-input";

const App: FC<{ name?: string }> = ({ name = "Stranger" }) => {
  const [nickname, setNickname] = useState<string>("");

  return (
    <Box>
      <Text>
        Hello, <Text color="green">{name}</Text>
      </Text>

      <Newline />
      <Newline />
      <TextInput
        placeholder="Enter your name"
        value={nickname}
        onChange={setNickname}
      />
    </Box>
  );
};

module.exports = App;
export default App;
