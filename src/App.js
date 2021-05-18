import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Button } from '@material-ui/core';
import { Progress } from 'antd';
import BezierEasing from 'bezier-easing';
import CardFlip from 'react-card-flip';
import 'antd/dist/antd.css';

const App = () => {
    const easing = BezierEasing(0.76, 0, 0.24, 1);
    const maxNumber = 80;

    const [number, setNumber] = useState(0);
    const [buttonClick, setButtonClick] = useState(false);

    useEffect(() => {
        const increase = () => {
            if (number < maxNumber) return setTimeout(() => setNumber(number + 1), 10);
        };
        const decrease = () => {
            if (number > 0) return setTimeout(() => setNumber(number - 1), 10);
        };

        if (buttonClick) increase();
        else decrease();

        return () => {
            if (buttonClick) clearTimeout(increase);
            else clearTimeout(decrease);
        };
    }, [number, buttonClick]);

    return (
        <Grid item xs={8}>
            <CardFlip isFlipped={!buttonClick} flipDirection="horizontal">
                <Box
                    width="100%"
                    height="500px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    component={Paper}
                    elevation={12}
                >
                    <Box>프로젝트 관여</Box>
                    <Progress
                        type="circle"
                        percent={maxNumber * easing(number / maxNumber)}
                        status="active"
                        strokeColor={{ '0%': '#ffe200', '100%': '#ff0000' }}
                        format={() => `${number}%`}
                        width={80}
                    />

                    <Box m={2}>
                        <Button variant="contained" onClick={() => setButtonClick(!buttonClick)}>
                            카드 뒷면 열기
                        </Button>
                    </Box>
                </Box>
                <Box
                    width="100%"
                    height="500px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    component={Paper}
                    elevation={12}
                >
                    <Box m={2}>
                        <Button variant="contained" onClick={() => setButtonClick(!buttonClick)}>
                            카드 앞면 열기
                        </Button>
                    </Box>
                </Box>
            </CardFlip>
        </Grid>
    );
};

export default App;
