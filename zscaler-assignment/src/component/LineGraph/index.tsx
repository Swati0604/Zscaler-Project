import { useEffect, useState } from "react";
import {
    AnimatedAxis,
    AnimatedGrid,
    AnimatedLineSeries,
    XYChart
} from "@visx/xychart";

//CustomComponent
import LineGraphToolTip from "../LineGraphToolTip";
import EmptyState from "../EmptyState";

//Utils
import { ChartContainer, tickLabelOffset } from "../../utils";
import { graphDataType } from "../../utils/types";


//Styles
import './lineGraph.scss'


const LineGraph = (props: Props) => {
    const { graphData } = props;
    const [sortedGraphData, setSortedGraphData] = useState(graphData);


    useEffect(()=> {
        const sortedGraphData = graphData.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());
        setSortedGraphData(sortedGraphData)
    }, [graphData])


    if (!Array.isArray(sortedGraphData) ||sortedGraphData.length === 0 || sortedGraphData === undefined || sortedGraphData === null) {
        return (
            <div className="valign-wrapper vflex-colomn empty-state-ui">
                <EmptyState
                    title='Oopsie! No Data Found in this range...'
                    subTitle='Please select any other date range'
                />
            </div>
        )
    }
    

    const accessors = {
        xAccessor: (d: graphDataType) => new Date(`${d?.x}T00:00:00`),
        yAccessor: (d: graphDataType) => d?.y
    };
    

    return (
        <ChartContainer>
            <XYChart
                height={700}
                margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
                xScale={{ type: "time" }}
                yScale={{ type: "linear" }}
            >
                <AnimatedGrid
                    columns={false}
                    numTicks={4}
                    lineStyle={{
                        stroke: "#e1e1e1",
                        strokeLinecap: "round",
                        strokeWidth: 1
                    }}
                    strokeDasharray="0, 4"
                />
                <AnimatedAxis
                    hideAxisLine
                    hideTicks
                    orientation="bottom"
                    tickLabelProps={() => ({ dy: tickLabelOffset })}
                    left={30}
                    numTicks={4}
                />
                <AnimatedAxis
                    hideAxisLine
                    hideTicks
                    orientation="left"
                    numTicks={4}
                    tickLabelProps={() => ({ dx: -10 })}
                />

                <AnimatedLineSeries
                    stroke="#008561"
                    dataKey="primary_line"
                    data={sortedGraphData}
                    {...accessors}
                />
                <LineGraphToolTip
                    accessors={accessors}
                />
            </XYChart>
        </ChartContainer>
    )
}

type Props = {
    graphData: graphDataType[];
}

export default LineGraph;