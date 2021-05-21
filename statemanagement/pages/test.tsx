import { Button } from "@chakra-ui/button";
import { Checkbox } from "@chakra-ui/checkbox";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import _ from "lodash";

import styled from "@emotion/styled";
import produce from "immer";
import { Record } from "../interfaces";

import useTodoList from "../hooks/useTodoList";
import { useRecoilState } from "recoil";
import { doFilteringState } from "../store";

const Test = () => {
    const { todoList, isLoading, addNewTodo, updateTodo, deleteTodo } =
        useTodoList();

    const [doFiltering, setDoFiltering] = useRecoilState(doFilteringState);

    return (
        <StyledMain>
            <div>
                <Checkbox
                    isChecked={doFiltering}
                    onClick={() => {
                        setDoFiltering((prev) => !prev);
                    }}
                >
                    안한 것만 보기
                </Checkbox>
            </div>

            {todoList.map((todo) => {
                const debouncingInput = _.debounce(
                    (todo: Record, nextValue: string) => {
                        const newTodo = produce(todo, (nextTodo) => {
                            nextTodo.fields.Name = nextValue;
                        });
                        updateTodo(newTodo);
                    },
                    2000
                );

                return (
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

                        <Editable
                            defaultValue={todo.fields.Name}
                            onChange={(nextValue) => {
                                debouncingInput(todo, nextValue);
                            }}
                        >
                            <EditablePreview />
                            <EditableInput />
                        </Editable>

                        <Button
                            size={"xs"}
                            onClick={() => {
                                deleteTodo(todo.id);
                            }}
                        >
                            삭제
                        </Button>
                    </StyledTodo>
                );
            })}
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
