import { Avatar, Box, Typography } from '@mui/joy'
import React, { lazy, memo, } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../../Redux/LoginSlice'




const CandidateDashDetails = lazy(() => import('./CandidateDashDetails'))

const CandidateDashBoard = ({ personalData, count, setcount, pageToShow, SetPageToShow, jobData, setEditCount, EditCount, vaccancyData, profilePic }) => {

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const imageUrl = data?.image[0]?.value
    const emal = data?.email[0]?.value
    const name = data?.name;
    const ApplicationId = data?.id;



    return (
        <Box sx={{
            display: 'flex',
            backgroundColor: '#FFFBF5',
            flexWrap: 'wrap',
            padding: .5,
            height: window.innerHeight - 90, overflowX: "auto",
            '@media screen and (max-width: 768px)': {
                display: 'block',

            },
        }}>
            {/* Left side box */}
            <Box

                sx={{
                    width: ['100%', '25%'],
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 4,
                    marginBottom: [3, 0],

                    '@media screen and (max-width: 768px)': {
                        padding: 1,
                    },
                }}>
                {/* Image box */}
                <Box

                    sx={{
                        display: 'flex',
                        // justifyContent: 'center',
                        alignItems: 'end',
                        flexDirection: 'column',
                        borderRadius: 'md',

                        // padding: 4,
                        // boxShadow: 'lg',
                        '@media screen and (max-width: 768px)': {
                            padding: 1,
                            alignItems: 'center',

                        },
                    }}>
                    <Box sx={{
                    }}>
                        {profilePic === '' ?
                            <Avatar src={imageUrl} sx={{

                                width: '250px',
                                height: '250px',
                                borderRadius: '50px', // Set border radius here
                                '@media screen and (max-width: 768px)': {
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '10px',
                                    mr: 2
                                },
                            }} />
                            :
                            <Avatar
                                src={profilePic}
                                sx={{
                                    width: '250px',
                                    height: '250px',
                                    borderRadius: '50px', // Set border radius here
                                    '@media screen and (max-width: 768px)': {
                                        width: '150px',
                                        height: '150px',
                                        borderRadius: '10px',
                                        mr: 2
                                    },
                                }}
                            />

                        }



                        <Box sx={{
                            mt: 1,
                            '@media screen and (max-width: 768px)': {
                                // padding: 1,
                                // alignItems: 'center',
                            },
                        }}>
                            <Typography
                                sx={{ fontFamily: "Bahnschrift", fontSize: 33, fontWeight: 500, color: '#555555', p: 0, m: 0, }}
                            >{name}
                            </Typography>
                            <Typography
                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0 }}
                            >{personalData?.length !== 0 ? personalData?.address2 : "Not Updated"}
                            </Typography>
                            <Typography
                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0 }}
                            >{emal}
                            </Typography>
                            <Typography
                                sx={{ fontFamily: "Bahnschrift", fontSize: 18, fontWeight: 400, color: '#555555', p: 0, m: 0, }}
                            >{personalData?.length !== 0 ? personalData?.mobile_num : "Not Updated"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>


            </Box>

            {/* Right side box */}
            <Box

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
            </Box>
        </Box>
    )
}

export default memo(CandidateDashBoard) 