import { Button } from "@chakra-ui/button";

import styled from "@emotion/styled";
import axios from "axios";
import { useMutation } from "react-query";

import useTodoList from "../hooks/useTodoList";

const Test = () => {
    const { todoList, isLoading, addNewTodo, updateTodo, deleteTodo } =
        useTodoList();

    return (
        <StyledMain>
            {todoList.map((todo) => (
                <div key={todo.id}>{todo.fields.Name}</div>
            ))}

            <Button
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                    addNewTodo();
                }}
            >
                Button
            </Button>
        </StyledMain>
    );
};

export default Test;

const StyledMain = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
