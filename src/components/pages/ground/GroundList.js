import React from 'react';
import GroundCard from '../../layout/GroundCard';
import Grid from '@material-ui/core/Grid';

export default function GroundList() {
    return (
        <Grid container type="flex" justify="center" spacing={3}>
            {
                [1, 2, 3, 5, 6, 7, 8, 9].map(item => (
                    <Grid item xs={3}>
                        <GroundCard />
                    </Grid>
                ))
            }
        </Grid>
    );
}
