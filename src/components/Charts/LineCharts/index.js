import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { Button, ButtonGroup } from "@material-ui/core";

const generatorOption = (data) => {
    const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));
    return {
        chart: {
            height: 500,
        },
        title: {
            text: "Tổng ca nhiễm ",
        },
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ["#F3585B"],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
            labels: {
                align: "right",
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: "Tổng Ca nhiễm",
                data: data.map((item) => item.Confirmed),
            },
        ],
    };
};
export default function LineCharts({ data }) {
    const [options, setOptions] = useState({});
    const [reportType, setReportType] = useState("");

    useEffect(() => {
        let customDate = [];
        // xử lý thay đổi của reportType trước khi dữ liệu data truyền vào function generatorOption
        switch (reportType) {
            case "all":
                customDate = data;
                break;
            case "30":
                customDate = data.slice(data.length - 30);
                break;

            case "7":
                customDate = data.slice(data.length - 7);
                break;

            default:
                customDate = data;
        }
        setOptions(generatorOption(customDate));
    }, [data, reportType]);

    //mỗi khi dữ liệu data thay đổi khi người dùng chọn quốc giá,
    // chạy lại function generatorOption và gán vào sate SetOptions

    return (
        <div>
            <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                size="small"
                style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <Button
                    color={reportType === "all" ? "secondary" : "primary"}
                    onClick={() => {
                        setReportType("all");
                    }}
                >
                    Tất cả
                </Button>
                <Button
                    color={reportType === "30" ? "secondary" : "primary"}
                    onClick={() => {
                        setReportType("30");
                    }}
                >
                    30 Ngày
                </Button>
                <Button
                    color={reportType === "7" ? "secondary" : "primary"}
                    onClick={() => {
                        setReportType("7");
                    }}
                >
                    7 Ngày
                </Button>
            </ButtonGroup>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}
