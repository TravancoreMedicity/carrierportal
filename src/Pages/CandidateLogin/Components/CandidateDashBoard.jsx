import { Avatar, Box, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../../Redux/LoginSlice'
import { Paper } from '@mui/material'


const CandidateDashDetails = lazy(() => import('./CandidateDashDetails'))

const CandidateDashBoard = ({ personalData, count, setcount, SkillData, pageToShow, SetPageToShow, jobData, setEditCount, EditCount, vaccancyData }) => {

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const imageUrl = data?.image[0]?.value
    const emal = data?.email[0]?.value
    const name = data?.name;
    const ApplicationId = data?.id;


    return (
        <Box sx={{
            // backgroundColor: 'red',

            display: 'flex',
            flexWrap: 'wrap',
            padding: .5,
            height: window.innerHeight - 100, overflowX: "auto",
            '@media screen and (max-width: 768px)': {
                display: 'block',

            },
        }}>
            {/* Left side box */}
            <Paper sx={{
                width: ['100%', '25%'],
                display: 'flex',
                flexDirection: 'column',
                // backgroundColor: 'slate.50',
                padding: 4,
                // borderRadius: 'md',
                // border: "1px solid #B7B7B7",
                // boxShadow: 'lg',
                marginBottom: [3, 0],

                '@media screen and (max-width: 768px)': {
                    padding: 1,
                },
            }}>
                {/* Image box */}
                <Paper
                    variant="outlined"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        borderRadius: 'md',
                        // border: "1px solid #B7B7B7",

                        // backgroundColor: 'slate.50',
                        padding: 4,
                        // boxShadow: 'lg',
                        '@media screen and (max-width: 768px)': {
                            padding: 1,
                        },
                    }}>
                    <Box sx={{
                        borderRadius: 'lg',
                        '@media screen and (max-width: 768px)': {
                            // width: 150,
                        },
                    }}>
                        <Avatar src={imageUrl} sx={{
                            "--Avatar-size": "200px", '@media screen and (max-width: 768px)': {
                                "--Avatar-size": "100px"
                            },
                        }} />
                    </Box>
                </Paper>

                {/* Description box */}
                <Paper
                    variant="outlined" sx={{
                        // backgroundColor: 'slate.50',
                        // border: "1px solid #B7B7B7",

                        padding: 4,
                        borderRadius: 'md',
                        // boxShadow: 'lg',
                        marginTop: 3,
                        height: window.innerHeight - 460, overflowX: "auto",
                        '@media screen and (max-width: 768px)': {
                            padding: 1,
                            height: window.innerHeight - 660,
                        },
                    }}>
                    <Box>
                        <Typography level='body-lg'>About</Typography>
                    </Box>
                    <Box sx={{ borderTop: '1px solid #DFDFDF', mt: 1 }}>
                        <Box sx={{ mt: 1 }}>
                            <Typography level='body-xs'>{personalData?.length !== 0 ? personalData?.About : "Not Updated"}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 1 }}>
                        <Typography level='body-lg'>Skills</Typography>
                    </Box>

                    {SkillData?.length > 0 ? (
                        <Box sx={{ mt: 1, borderTop: "1px solid #DFDFDF", }}>
                            {SkillData.map((item, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                    <Typography level='body-sm' sx={{ wordBreak: 'break-word' }}>
                                        {item?.skills_desc === null ? "not updated" : item?.skills_desc}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Typography level='body-xs'>
                            Not Updated
                        </Typography>
                    )}

                </Paper>
            </Paper>

            {/* Right side box */}
            <Paper
                variant="outlined"
                sx={{

                    width: ['100%', '75%'],
                    padding: 4,
                    borderRadius: 'md',
                    // border: "1px solid #B7B7B7",

                    // boxShadow: 'lg',
                    '@media screen and (max-width: 768px)': {
                        padding: 0,

                    },
                }}>
                <CandidateDashDetails emal={emal} name={name} ApplicationId={ApplicationId} personalData={personalData} count={count} vaccancyData={vaccancyData}
                    setcount={setcount} pageToShow={pageToShow} SetPageToShow={SetPageToShow} jobData={jobData} setEditCount={setEditCount} EditCount={EditCount} />
            </Paper>
        </Box>
    )
}

export default memo(CandidateDashBoard) 