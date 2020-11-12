import React, { useState } from 'react';
import TableUser from './component/TableUser';
import DropdownV2 from "../../custom/DropdownV2";
import { Grid } from '@material-ui/core';
function LoyalCustomer(props) {
    const [selectedDropdownData, setSelectedDropdownData] = useState({
        selectedCategoryIndex: 0,
    });
    const onSelectCategory = (selectedCategoryIndex) => {
        setSelectedDropdownData({
            ...selectedDropdownData,
            selectedCategoryIndex,
        });
    };

    const { selectedCategoryIndex } = selectedDropdownData;
    const categoryArr = [
        {
            name: 'Monday',
            id: 0
        }, 
        {
            name: 'Tuesday',
            id: 1,
        }, 
        {
            id: 2,
            name: 'Webnesday'
        },
        {
            id: 3,
            name: 'Thursday'
        },
        {
            id: 4,
            name: 'Friday'
        },
        {
            id: 5,
            name: 'Saturday'
        },
        {
            id: 6,
            name: 'Sunday'
        }
    ]

    return (
        <div>
            <Grid item xs={4} className="mb-4">
                <DropdownV2
                    fullWidth
                    label="Select Day"
                    value={selectedCategoryIndex.toString()}
                    options={categoryArr || []}
                    valueBasedOnProperty="id"
                    displayProperty="name"
                    onChange={(index) => onSelectCategory(index)}
                    variant="outlined"
                />
            </Grid>
            <TableUser />
        </div>
    );
}

export default LoyalCustomer;