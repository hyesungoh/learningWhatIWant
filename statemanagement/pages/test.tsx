import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";

import styled from "@emotion/styled";
import axios from "axios";
import produce from "immer";
import { useMutation } from "react-query";

import useTodoList from "../hooks/useTodoList";

const Test = () => {
    const { todoList, isLoading, addNewTodo, updateTodo, deleteTodo } =
        useTodoList();

    return (
        <StyledMain>
            {todoList.map((todo) => (
                <StyledTodo key={todo.id}>
                    <Checkbox
                        defaultChecked={todo.fields.Done === true}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            const newTodo = produce(todo, (nextTodo) => {
                                nextTodo.fields.Done = checked;
                            });
                            updateTodo(newTodo);
                        }}
                    />
                    {todo.fields.Name}
                    <Button
                        size={"xs"}
                        onClick={() => {
                            deleteTodo(todo.id);
                        }}
                    >
                        삭제
                    </Button>
                </StyledTodo>
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

const StyledTodo = styled.div`
    width: 500px;

    display: flex;
    justify-content: space-between;
`;
