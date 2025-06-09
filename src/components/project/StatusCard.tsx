import { Card, CardContent, Typography } from "@mui/material"

interface StatusCardProps {
    status?: string
}

export const StatusCard = ({status}: StatusCardProps) => {
    return (
        // <Card>
        //     <CardContent>
                <Typography align={"center"} sx={{ minWidth: 85, borderRadius: 2, color: '#5E6C84'}} >
                    {status}
                </Typography>
        //     </CardContent>
        // </Card>
    )
}