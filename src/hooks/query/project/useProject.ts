import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getKey} from "../QueryUtility";
import {useProjectHttp} from "./useProjectHttp";
import {useAuth, useAxiosInstance} from "../../../AuthProvider";

export const PROJECT_QUERY_KEYS = {
    getAll: getKey('GET', 'PROJECT', 'MULTIPLE', 'QUERY'),
    get: getKey('GET', 'PROJECT', 'SINGLE', 'QUERY'),
    getInvite: getKey('GET', 'PROJECT-INVITE', 'SINGLE', 'QUERY'),
    getAllProjectFiles: getKey('GET', 'PROJECT-FILE', 'MULTIPLE', 'QUERY'),
}

export function useProjectsGet() {
    const {getProjects} = useProjectHttp(useAxiosInstance());

    return useQuery({
        queryKey: [PROJECT_QUERY_KEYS.getAll],
        queryFn: getProjects,
    });
}

export function useProjectGetById(projectId: string) {
    const {getProjectById} = useProjectHttp(useAxiosInstance());

    return useQuery({
        queryKey: [PROJECT_QUERY_KEYS.get, projectId],
        queryFn: () => getProjectById(projectId),
    });
}

export function useProjectFilesGet(projectId: string) {
    const {getProjectsFiles} = useProjectHttp(useAxiosInstance());

    return useQuery({
        queryKey: [PROJECT_QUERY_KEYS.getAllProjectFiles],
        queryFn: () => getProjectsFiles(projectId),
    });
}

export function useAuthParticipantProjectGet() {
    const {getProjectByAuth} = useProjectHttp(useAxiosInstance());
    const {getId} = useAuth();

    return useQuery({
        queryKey: [PROJECT_QUERY_KEYS.get, getId()],
        queryFn: getProjectByAuth
    });
}

export function useProjectInviteGet(projectId: string) {
    const {getProjectInviteByProjectId} = useProjectHttp(useAxiosInstance());

    return useQuery({
        queryKey: [PROJECT_QUERY_KEYS.getInvite, projectId],
        queryFn: () => getProjectInviteByProjectId(projectId)
    });
}

export function useProjectInviteAccept() {
    const {acceptProjectInvite} = useProjectHttp(useAxiosInstance());
    const queryClient = useQueryClient();
    const {getId} = useAuth();

    return useMutation({
        mutationFn: (inviteKey: string) => acceptProjectInvite(inviteKey),
        onSuccess: (data) =>
            queryClient.invalidateQueries({queryKey: [PROJECT_QUERY_KEYS.get, getId()]})
    });
}

export function useProjectCreate() {
    const {createProject} = useProjectHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProject,
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: [PROJECT_QUERY_KEYS.getAll]})
    });
}

export function useProjectInfoSave(projectId: string) {
    const {updateProject} = useProjectHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
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
            queryClient.invalidateQueries({queryKey: [PROJECT_QUERY_KEYS.getAllProjectFiles]}),
            queryClient.invalidateQueries({queryKey: [PROJECT_QUERY_KEYS.get, projectId]})
        ])
    });
}

export function useProjectFileDelete() {
    const {deleteProjectFile} = useProjectHttp(useAxiosInstance());
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (variables: {
            projectId: string,
            filename: string
        }) =>
            deleteProjectFile(
                variables.projectId,
                variables.filename
            ),
        onSuccess: () =>
            queryClient.invalidateQueries({queryKey: [PROJECT_QUERY_KEYS.getAllProjectFiles]})
    });
}