import axios from "axios";
import { useQuery, useMutation } from "react-query";

import { Record } from "../interfaces";

const useTodoList = () => {
    const { data, isLoading } = useQuery("todoList", () => {
        return axios.get("/api/todo");
    });

    const createMutation = useMutation(() => {
        return axios.post("api/todo", {
            fields: { Name: "새 투두", Done: false },
        });
    });

    return {
        todoList: data ? (data.data.records as Record[]) : [],
        isLoading,
        addNewTodo: createMutation.mutate,
        updateTodo: (id: string, record: Record) => {},
        deleteTodo: (id: string) => {},
    };
};

export default useTodoList;
