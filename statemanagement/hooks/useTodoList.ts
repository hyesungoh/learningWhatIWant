import axios from "axios";
import {
    useQuery,
    useMutation,
    QueryClient,
    useQueryClient,
} from "react-query";

import { Record } from "../interfaces";

const useTodoList = () => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery("todoList", () => {
        return axios.get("/api/todo");
    });

    const refresh = () => {
        queryClient.invalidateQueries(["todoList"]);
    };

    const createMutation = useMutation(
        () => {
            return axios.post("api/todo", {
                fields: { Name: "새 투두", Done: false },
            });
        },
        {
            onSuccess: () => {
                refresh();
            },
        }
    );

    const updateMutation = useMutation(
        (record: Record) => {
            return axios.patch(`api/todo?id=${record.id}`, record);
        },
        {
            onSuccess: () => {
                refresh();
            },
        }
    );

    const deleteMutation = useMutation(
        (id: string) => {
            return axios.delete(`api/todo?id=${id}`);
        },
        {
            onSuccess: () => {
                refresh();
            },
        }
    );

    return {
        todoList: data ? (data.data.records as Record[]) : [],
        isLoading,
        addNewTodo: createMutation.mutate,
        updateTodo: updateMutation.mutate,
        deleteTodo: deleteMutation.mutate,
    };
};

export default useTodoList;
