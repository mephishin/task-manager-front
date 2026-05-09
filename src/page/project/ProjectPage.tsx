import {Box, Tab, Tabs} from "@mui/material";
import React from "react";
import TasksChart from "./components/taskChart/TasksChart";
import {ProjectInfo} from "./components/projectInfo/ProjectInfo";
import {SearchTaskTab} from "./components/searchTask/SearchTaskTab";
import {CreateTaskTab} from "./components/createTask/CreateTaskTab";
import {ParticipantsInfo} from "./components/participants/ParticipantsInfo";


interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 1}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export const ProjectPage = (projectId: string) => {
    const [tab, setTab] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <Box display={'flex'}>
            <Tabs
                orientation="vertical"
                value={tab}
                onChange={handleChange}
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    height: '92vh',
                    width: 200
                }}
            >
                <Tab label="О проекте"/>
                <Tab label="Участники"/>
                <Tab label="Доска"/>
                <Tab label="Задачи"/>
                <Tab label="Создание задачи"/>
            </Tabs>

            <Box sx={{width: '100%'}}>
                <TabPanel value={tab} index={0}>
                    <ProjectInfo projectId={projectId}/>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <ParticipantsInfo projectId={projectId}/>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <TasksChart projectId={projectId}/>
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    <SearchTaskTab projectId={projectId}/>
                </TabPanel>
                <TabPanel value={tab} index={4}>
                    <CreateTaskTab projectId={projectId} setTab={setTab}/>
                </TabPanel>
            </Box>
        </Box>
    );
}

