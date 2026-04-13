import {Box, Tab, Tabs, Typography} from "@mui/material";
import React from "react";
import {useParams} from "react-router-dom";
import {TasksChart} from "./components/taskChart/TasksChart";
import {ProjectInfo} from "./components/projectInfo/ProjectInfo";
import {SearchTaskTab} from "./components/searchTask/SearchTaskTab";
import {CreateTaskTab} from "./components/createTask/CreateTaskTab";


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

export const ProjectPage = () => {
    const [value, setValue] = React.useState(0);

    const {projectId} = useParams();


    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box display={'flex'}>
            <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
                sx={{
                    borderRight: 1,
                    borderColor: 'divider',
                    height: '92vh',
                    width: 200
                }}
            >
                <Tab label="О проекте"/>
                <Tab label="Доска"/>
                <Tab label="Задачи"/>
                <Tab label="Создание задачи"/>
            </Tabs>

            <Box sx={{width: '100%'}}>
                <TabPanel value={value} index={0}>
                    <ProjectInfo projectId={projectId!}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TasksChart projectId={projectId!}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <SearchTaskTab/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <CreateTaskTab/>
                </TabPanel>
            </Box>
        </Box>
    );
}

