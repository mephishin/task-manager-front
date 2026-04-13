import { Typography } from "@mui/material"

interface StatusCardProps {
    status: string
}

export const StatusCard = ({ status }: StatusCardProps) => {
    return (
        <Typography align={"center"} justifyContent={"center"} sx={{ minWidth: 85, borderRadius: 1, color: '#5E6C84' }} >
            {status}
        </Typography>
    )
}