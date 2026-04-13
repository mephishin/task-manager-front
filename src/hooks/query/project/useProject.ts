import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKey } from "../QueryUtility";
import { useProjectHttp } from "./useProjectHttp";
import { useCreateAxiosInstance } from "../HttpUtils";
import {Project} from "./useProjectHttpDto";

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

export function useProjectGetById(projectId: string) {
    const { getProjectById } = useProjectHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.get, projectId],
        queryFn: () => getProjectById(projectId),
    });
}

export function useProjectFilesGet(projectId: string) {
    const { getProjectsFiles } = useProjectHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.getAllProjectFiles],
        queryFn: () => getProjectsFiles(projectId),
    });
}

export function useAuthParticipantProjectGet() {
    const { getProjectByAuth } = useProjectHttp(useCreateAxiosInstance());

    return useQuery({
        queryKey: [KEYS.get, "Auth"],
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

export function useProjectInfoSave(projectId: string) {
    const { updateProject } = useProjectHttp(useCreateAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [KEYS.saveProjectFile],
        mutationFn: (variables: {
            files?: ArrayBuffer,
            description: string
        }) =>
            updateProject(
                variables.description,
                projectId,
                variables.files,
            ),
        onSuccess: () => Promise.all([
            queryClient.invalidateQueries({ queryKey: [KEYS.getAllProjectFiles] }),
            queryClient.invalidateQueries({ queryKey: [KEYS.get, projectId] })
        ])
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