import { Box, Typography } from '@mui/joy'
import { Paper } from '@mui/material';
import React, { memo } from 'react'

const CandidateLang = ({ tableData }) => {

    const { malayalam_Poor, malayalam_Exe, malayalam_Nat, malayalam_pro, malayalam_Beg, english_Poor, english_Exe, english_Nat, english_pro, english_Beg,
        hindi_Poor, hindi_Exe, hindi_Nat, hindi_pro, hindi_Beg, tamil_Poor, tamil_Exe, tamil_Nat, tamil_pro, tamil_Beg, arabic_Poor, arabic_Exe, arabic_Nat,
        arabic_Pro, arabic_Beg
    } = tableData;


    const values = [english_Poor, english_Exe, english_Nat, english_pro, english_Beg]
    const valuesHindi = [hindi_Poor, hindi_Exe, hindi_Nat, hindi_pro, hindi_Beg]
    const valuesarabic = [arabic_Poor, arabic_Exe, arabic_Nat, arabic_Pro, arabic_Beg]
    const valuesmalayalam = [malayalam_Poor, malayalam_Exe, malayalam_Nat, malayalam_pro, malayalam_Beg]
    const valuesTamil = [tamil_Poor, tamil_Exe, tamil_Nat, tamil_pro, tamil_Beg,]

    return (
        <Paper
            variant="outlined"
            sx={{
                // backgroundColor: 'slate.50',
                padding: 3,
                borderRadius: 'md',
                // boxShadow: 'lg',
                // marginTop: 2,
                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
            <Box>
                <Box>
                    <Typography sx={{}} level="body-md" >
                        Langauges Known
                    </Typography>
                </Box>
                {tableData != null ?
                    <Box sx={{ borderTop: "1px solid #DFDFDF", }}>
                        <Box sx={{
                            display: "flex", justifyContent: 'space-between', mt: 1, width: '30%',
                            '@media screen and (max-width: 768px)': {
                                width: '100%'
                            },
                        }}>
                            <Box sx={{}}>
                                <Typography sx={{}} level="body-sm" >
                                    English
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                {values
                                    ?.sort((a, b) => (b === 1) - (a === 1))
                                    .map((value, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                borderRadius: '50%',
                                                padding: '3px',
                                                backgroundColor: value === 1 ? '#5AB2FF' : 'lightGray',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '8px'
                                            }}
                                        >
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                        {/* <Box>
                            <Typography sx={{}} level="body-sm" >
                                {EnglishKnown === 1 ? "Beginner" : EnglishKnown === 2 ? "Proficient" : EnglishKnown === 3 ? "Native" : "Poor"}
                            </Typography>
                        </Box> */}
                        <Box sx={{
                            display: "flex", justifyContent: 'space-between', mt: 1, width: '30%',
                            '@media screen and (max-width: 768px)': {
                                width: '100%'
                            },
                        }}>
                            <Box sx={{}}>
                                <Typography sx={{}} level="body-sm" >
                                    Malayalam
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                {valuesmalayalam
                                    ?.sort((a, b) => (b === 1) - (a === 1))
                                    .map((value, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                borderRadius: '50%',
                                                padding: '3px',
                                                backgroundColor: value === 1 ? '#5AB2FF' : 'lightGray',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '8px'
                                            }}
                                        >
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                        {/* <Box>
                            <Typography sx={{}} level="body-xs" >
                                {malayalamKnown === 1 ? "Beginner" : malayalamKnown === 2 ? "Proficient" : malayalamKnown === 3 ? "Native" : "Poor"}
                            </Typography>
                        </Box> */}
                        <Box sx={{
                            display: "flex", justifyContent: 'space-between', mt: 1, width: '30%',
                            '@media screen and (max-width: 768px)': {
                                width: '100%'
                            },
                        }}>
                            <Box sx={{}}>
                                <Typography sx={{}} level="body-sm" >
                                    Hindi
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                {valuesHindi
                                    ?.sort((a, b) => (b === 1) - (a === 1))
                                    .map((value, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                borderRadius: '50%',
                                                padding: '3px',
                                                backgroundColor: value === 1 ? '#5AB2FF' : 'lightGray',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '8px'
                                            }}
                                        >
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                        {/* <Box>
                            <Typography sx={{}} level="body-sm"  >
                                {HindiKnown === 1 ? "Beginner" : HindiKnown === 2 ? "Proficient" : HindiKnown === 3 ? "Native" : "Poor"}
                            </Typography>
                        </Box> */}
                        <Box sx={{
                            display: "flex", justifyContent: 'space-between', mt: 1, width: '30%',
                            '@media screen and (max-width: 768px)': {
                                width: '100%'
                            },
                        }}>
                            <Box sx={{}}>
                                <Typography sx={{}} level="body-sm" >
                                    Tamil
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>
                                {valuesTamil
                                    ?.sort((a, b) => (b === 1) - (a === 1))
                                    .map((value, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                borderRadius: '50%',
                                                padding: '3px',
                                                backgroundColor: value === 1 ? '#5AB2FF' : 'lightGray',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '8px'
                                            }}
                                        >
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                        {/* <Box>
                            <Typography sx={{}} level="body-sm" >
                                {TamilKnown === 1 ? "Beginner" : TamilKnown === 2 ? "Proficient" : TamilKnown === 3 ? "Native" : "Poor"}
                            </Typography>
                        </Box> */}
                        <Box sx={{
                            display: "flex", justifyContent: 'space-between', mt: 1, width: '30%',
                            '@media screen and (max-width: 768px)': {
                                width: '100%'
                            },
                        }}>
                            <Box sx={{}}>
                                <Typography sx={{}} level="body-sm" >
                                    Arabic
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex' }}>

                                {valuesarabic
                                    ?.sort((a, b) => (b === 1) - (a === 1))
                                    .map((value, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                borderRadius: '50%',
                                                padding: '3px',
                                                backgroundColor: value === 1 ? '#5AB2FF' : 'lightGray',
                                                width: '20px',
                                                height: '20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginRight: '8px'
                                            }}
                                        >
                                        </Box>
                                    ))}
                            </Box>
                        </Box>
                        {/* <Box>
                            <Typography sx={{}} level="body-sm" >
                                {ArabicKnown === 1 ? "Beginner" : ArabicKnown === 2 ? "Proficient" : ArabicKnown === 3 ? "Native" : "Poor"}
                            </Typography>
                        </Box> */}
                    </Box>
                    :
                    <Box>
                        <Typography sx={{}} level="body-md" >
                            No Data Found
                        </Typography>
                    </Box>
                }
            </Box>
        </Paper>
    )
}

export default memo(CandidateLang)