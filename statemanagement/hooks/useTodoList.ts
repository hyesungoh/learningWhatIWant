import axios from "axios";
import { useMemo } from "react";
import {
    useQuery,
    useMutation,
    QueryClient,
    useQueryClient,
} from "react-query";

import { useRecoilValue } from "recoil";

import { Record } from "../interfaces";
import { doFilteringState } from "../store";

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

    const doFiltering = useRecoilValue(doFilteringState);
    const todoList = useMemo(() => {
        const arr = data ? (data.data.records as Record[]) : [];

        if (doFiltering) {
            return arr.filter((row) => row.fields.Done);
        } else {
            return arr;
        }
    }, [data, doFiltering]);

    return {
        todoList: data ? (data.data.records as Record[]) : [],
        isLoading,
        addNewTodo: createMutation.mutate,
        updateTodo: updateMutation.mutate,
        deleteTodo: deleteMutation.mutate,
    };
};

export default useTodoList;
