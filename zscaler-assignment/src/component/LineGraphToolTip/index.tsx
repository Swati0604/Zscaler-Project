import { format } from "date-fns";
import {
    Tooltip
} from "@visx/xychart";

//Utils
import { ColoredSquare, TooltipContainer } from "../../utils";


const LineGraphToolTip = (props: Props) => {
    const { accessors} = props;
    return (
        <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showSeriesGlyphs
            glyphStyle={{
                fill: "#008561",
                strokeWidth: 0
            }}
            renderTooltip={({ tooltipData}) => {
                if (!tooltipData) return null;
                
                return (
                    <TooltipContainer>
                        {Object.entries(tooltipData.datumByKey).map((lineDataArray) => {
                            const [key, value] = lineDataArray;

                            return (
                                <div className="row" key={key}>
                                    <div className="date">
                                        {format(accessors.xAccessor(value?.datum), "yyyy MMM d")}
                                    </div>
                                    <div className="value">
                                        <ColoredSquare color="#008561" />
                                        {accessors.yAccessor(value.datum)}
                                    </div>
                                </div>
                            );
                        })}
                    </TooltipContainer>
                );
            }}
        />
    )
}




type Props= {
    accessors: Accessor;
}


type Accessor = {
    xAccessor: Function;
    yAccessor: Function;
}

export default LineGraphToolTip;

