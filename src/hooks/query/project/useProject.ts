import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKey } from "../QueryUtility";
import { Project } from "../../../model/project/Project";
import { useProjectHttp } from "./useProjectHttp";
import { useCreateAxiosInstance } from "../HttpUtils";

const KEYS = {
    getAll: getKey('GET', 'PROJECT', 'MULTIPLE', 'QUERY'),
    get: getKey('GET', 'PROJECT', 'SINGLE', 'QUERY'),
    create: getKey('POST', 'PROJECT', 'SINGLE', 'MUTATION'),
    getAllProjectFiles: getKey('GET', 'PROJECT-FILE', 'MULTIPLE', 'QUERY'),
    saveProjectFile: getKey('POST', 'PROJECT-FILE', 'SINGLE', 'MUTATION'),
}

export function useProjectsGet() {
    const { getProjects } = useProjectHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getAll],
        queryFn: getProjects,
        initialData: new Array<Project>()
    });
}

export function useProjectsFilesGet(projectId: string) {
    const { getProjectsFiles } = useProjectHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getAllProjectFiles],
        queryFn: () => getProjectsFiles(projectId),
    });
}

export function useAuthParticipantProjectGet() {
    const { getProjectByAuth } = useProjectHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.get],
        queryFn: getProjectByAuth
    });
}

export function useProjectCreate() {
    const { createProject } = useProjectHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.create],
        mutationFn: createProject,
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: [KEYS.getAll] })
    });
}

export function useProjectFilesSave() {
    const { saveProjectFiles } = useProjectHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.saveProjectFile],
        mutationFn: (variables: {
            files: File[],
            projectId: string,
        }) =>
            saveProjectFiles(
                variables.files,
                variables.projectId
            ),
        onSuccess: () =>
                    queryClient.invalidateQueries({ queryKey: [KEYS.getAllProjectFiles] })
    });
}

export function useProjectFileDelete() {
    const { deleteProjectFile } = useProjectHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.saveProjectFile],
        mutationFn: (variables: {
            projectId: string,
            filename: string
        }) =>
            deleteProjectFile(
                variables.projectId,
                variables.filename
            ),
        onSuccess: () =>
                    queryClient.invalidateQueries({ queryKey: [KEYS.getAllProjectFiles] })
    });
}