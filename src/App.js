import React, { useState, useEffect, useMemo } from 'react';
import { Box, Paper, Grid, Button, Typography } from '@material-ui/core';
import { Progress } from 'antd';
import BezierEasing from 'bezier-easing';
import CardFlip from 'react-card-flip';
import 'antd/dist/antd.css';

const App = () => {
    const easing = BezierEasing(0.76, 0, 0.24, 1);
    const maxNumber = useMemo(() => [80, 40], []);

    const [number, setNumber] = useState([0, 0]);
    const [buttonClick, setButtonClick] = useState(false);

    useEffect(() => {
        const increase = () => {
            return setTimeout(() => {
                const copyNumber = number.slice();
                copyNumber.forEach((num, index) => {
                    if (num < maxNumber[index])
                        copyNumber.splice(index, 1, num + maxNumber[index] / 100);
                });
                setNumber(copyNumber);
            }, 10);
        };
        const decrease = () => {
            return setTimeout(() => {
                const copyNumber = number.slice();
                copyNumber.forEach((num, index) => {
                    if (num > 0) copyNumber.splice(index, 1, num - maxNumber[index] / 100);
                });
                setNumber(copyNumber);
            }, 10);
        };

        if (buttonClick && maxNumber[1] > number[1]) increase();
        else if (!buttonClick && number[1] !== 0) decrease();

        return () => {
            if (buttonClick) clearTimeout(increase);
            else clearTimeout(decrease);
        };
    }, [number, maxNumber, buttonClick]);

    return (
        <Grid item xs={8}>
            <Box display="flex" justifyContent="center">
                <CardFlip isFlipped={!buttonClick} flipDirection="horizontal">
                    <Box
                        width="700px"
                        height="500px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        component={Paper}
                        elevation={12}
                    >
                        <Box display="flex" height="150px">
                            <Box m={3} display="flex" flexDirection="column" alignItems="center">
                                <Box>프로젝트 진행률</Box>
                                <Progress
                                    type="circle"
                                    percent={maxNumber[0] * easing(number[0] / maxNumber[0])}
                                    status="active"
                                    strokeColor={{ '0%': '#ffe200', '100%': '#ff0000' }}
                                    format={() => `${parseInt(number[0])}%`}
                                    width={80}
                                    strokeWidth={10}
                                />
                            </Box>
                            <Box m={3} display="flex" flexDirection="column" alignItems="center">
                                <Box>프로젝트 관여율</Box>
                                <Progress
                                    type="circle"
                                    percent={maxNumber[1] * easing(number[1] / maxNumber[1])}
                                    status="active"
                                    strokeColor={{ '0%': '#ffe200', '100%': '#ff0000' }}
                                    format={() => `${parseInt(number[1])}%`}
                                    width={80}
                                    strokeWidth={10}
                                />
                            </Box>
                        </Box>

                        <Box m={2}>
                            <Button
                                variant="contained"
                                onClick={() => setButtonClick(!buttonClick)}
                            >
                                카드 뒷면 열기
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        width="700px"
                        height="500px"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        component={Paper}
                        elevation={12}
                    >
                        <Box height="150px" display="flex" alignItems="center">
                            <Typography style={{ fontSize: '24px', fontWeight: 600 }}>
                                프로젝트 진행상황
                            </Typography>
                        </Box>
                        <Box m={2}>
                            <Button
                                variant="contained"
                                onClick={() => setButtonClick(!buttonClick)}
                            >
                                카드 앞면 열기
                            </Button>
                        </Box>
                    </Box>
                </CardFlip>
            </Box>
        </Grid>
    );
};

export default App;
