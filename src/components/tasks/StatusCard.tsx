import { Card, CardContent, Typography } from "@mui/material"
interface StatusCardProps {
    status?: string
}

export const StatusCard = ({status}: StatusCardProps) => {
    return (
        <Card sx={{ borderRadius: 3}}>
            <CardContent>
                <Typography align={"center"} sx={{ minWidth: 85, borderRadius: 2}} >
                    {status}
                </Typography>
            </CardContent>
        </Card>
    )
}