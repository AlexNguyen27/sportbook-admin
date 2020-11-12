import React, { useState } from 'react';
import 'date-fns';
import MultipleSummary from './MultipleSummary';
import DropdownV2 from "../../custom/DropdownV2";
import { Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    // KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import StatisticTable from '../../layout/StatictisTable';

const Statistic = (props) => {
    const [selectedDropdownData, setSelectedDropdownData] = useState({
        selectedCategoryIndex: 0,
    });

    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const onSelectCategory = (selectedCategoryIndex) => {
        setSelectedDropdownData({
            ...selectedDropdownData,
            selectedCategoryIndex,
        });
    };

    const { selectedCategoryIndex } = selectedDropdownData;
    const categoryArr = [
        {
            name: '7 days ago',
            id: 0
        }, {
            name: 'A month ago',
            id: 1,
        }, {
            id: 2,
            name: 'In a year'
        }
    ]


    return (
        <div>
            <Grid item xs={4} className="mb-4">
                <DropdownV2
                    fullWidth
                    label="Select Chart Display Type"
                    value={selectedCategoryIndex.toString()}
                    options={categoryArr || []}
                    valueBasedOnProperty="id"
                    displayProperty="name"
                    onChange={(index) => onSelectCategory(index)}
                    variant="outlined"
                />
            </Grid>

            {/* Select box */}
            <MultipleSummary name={['erer', 'er', 'wererer', 'ererer', 'erererer']} like={[2, 123, , 123, 123, 123, 123]} />

            <hr className="m-4" />

            <h4>Customizable timed sales reports</h4>
            <Grid item className="mb-4">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        className="mr-4"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="From date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        disableToolbar
                        className="mr-4"
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="To date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
            </Grid>
            <StatisticTable />
        </div>
    );
}

export default Statistic;