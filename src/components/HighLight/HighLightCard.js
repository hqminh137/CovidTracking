import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
    wrapper: (props) => {
        if (props.type === "confirm") {
            return { borderLeft: "5px solid red" };
        }
        if (props.type === "recovered") {
            return { borderLeft: "5px solid green" };
        } else return { borderLeft: "5px solid gray" };
    },
    title: {
        fontSize: 18,
        marginBottom: 5,
    },
    count: {
        fontSize: 18,
        fontWeight: "bold",
    },
});
export default function HighLightCard({ title, count, type }) {
    const style = useStyles({ type });
    return (
        <Card className={style.wrapper}>
            <CardContent>
                <Typography component="p" variant="body2" className={style.title}>
                    {title}
                </Typography>
                <Typography component="span" variant="body2" className={style.count}>
                    {count}
                </Typography>
            </CardContent>
        </Card>
    );
}
