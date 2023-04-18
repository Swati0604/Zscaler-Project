import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

//Custom Component
import Sidebar from '../../component/Sidebar';
import LineGraph from '../../component/LineGraph';
import Loader from '../../component/Loader';

//Utils
import { isEmpty, SIDEBAR_ITEMS } from '../../utils';
import { AttackerDataType } from '../../utils/types';

//Store
import { getAttackerData } from '../../store/action';

//Style
import './eventGraph.scss';
import Page500 from '../Page500';

const EventGraph = () => {

    const dispatch = useDispatch();

    const attackerDetailsdata = useSelector(({ attackerDetails }: any) => attackerDetails?.attackerDetails);

    const { isLoading, data: attackersData, isError } = attackerDetailsdata ?? {}

    useEffect(() => {
        dispatch(getAttackerData() as unknown as unknown as AnyAction);
    }, [dispatch]);

    const initialValue = new Date();
    const [startDate, setStartDate] = useState<Date>(initialValue);
    const [endDate, setEndDate] = useState<Date>(initialValue);


    useEffect(() => {
        if (attackersData.length) {
            const startDateIntialValue = new Date(attackersData[0]?.timestamp);

            setStartDate(startDateIntialValue)
        }
    }, [attackersData])


    // Filter events within the specified time range
    const filteredData = attackersData.filter((event: AttackerDataType) =>
        new Date(event.timestamp) >= startDate && new Date(event.timestamp) <= endDate
    );


    // Group events by date and count the number of events per day
    const groupedData: { [key: string]: number } = filteredData.reduce((acc: CountByDate, event: AttackerDataType) => {
        const date = event.timestamp.substring(0, 10);
        acc[date] = acc[date] ? acc[date] + 1 : 1;
        return acc;
    }, []);


    const graphData = Object.entries(groupedData).map(([x, y]) => ({ x, y }))

    return (
        <>
            <Sidebar
                currentPage={SIDEBAR_ITEMS[0].title}
                sidebarItems={SIDEBAR_ITEMS}
            >

                {((isLoading && isEmpty(attackersData) && !isError)) &&
                    <Loader />
                }

                {
                    attackersData.length>0 && !isLoading && !isError &&
                    <div className='event-graph-style'>
                        <h1 className='left-align graph-page-heading heading'>Event Graph</h1>
                        <p className='title left-align'>Select Date Range</p>
                        <div className='valign-wrapper date-picker-ui left-align'>
                            <div className='vflex vflex-colomn'>
                                <label className='sub-title'>Start Date</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date: Date) => setStartDate(date)}
                                />
                            </div>
                            <div className='vflex vflex-colomn'>
                                <label className='sub-title'>End Date</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date: Date) => setEndDate(date)}
                                />
                            </div>
                        </div>
                        <LineGraph
                            graphData={graphData}
                        />
                    </div>
                }

                {((!isLoading && isEmpty(attackersData) && isError)) &&
                    <Page500 />
                }

            </Sidebar>
        </>
    );
}


type CountByDate = {
    [date: string]: number;
}


export default EventGraph;