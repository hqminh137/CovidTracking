import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getMapDataByCountryId } from "../../apis";
import HighMaps from "../Charts/HighMaps";
import LineCharts from "../Charts/LineCharts";

export default function Summary({ report, countryId }) {
    const [mapData, setMapData] = useState({});
    useEffect(() => {
        if (countryId) {
            getMapDataByCountryId(countryId)
                .then((res) => {
                    setMapData(res);
                })
                .catch((err) => console.log({ err }));
        }
    }, [countryId]);
    return (
        <Grid container spacing={3}>
            <Grid item sm={8} xs={12}>
                <LineCharts data={report}></LineCharts>
            </Grid>
            <Grid item sm={4} xs={12}>
                <HighMaps mapData={mapData} />
            </Grid>
        </Grid>
    );
}
