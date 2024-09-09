import { Box, Typography } from '@mui/joy'
import React, { memo } from 'react'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const CandidateReference = ({ tableData }) => {

    return (
        <Box sx={{
            backgroundColor: 'slate.50',
            padding: 4,
            borderRadius: 'md',
            boxShadow: 'lg',
            marginTop: 2,
            '@media screen and (max-width: 768px)': {
                padding: 1,
            },
        }}>
            <Box>
                <Box>
                    <Typography sx={{}} level="body-md" >
                        Reference
                    </Typography>
                </Box>
                {tableData?.length > 0 ? (
                    tableData?.map((item, index) => (
                        <Box key={index} sx={{ mt: 1, display: "flex", width: '100%' }}>
                            <Box sx={{
                                width: "100%", borderTop: "1px solid #DFDFDF",
                                // width: "20%", '@media screen and (max-width: 768px)': {
                                //     width: "40%",
                                // },
                            }}>

                                <Box sx={{ display: 'flex', gap: 2, mt: 1, }}>
                                    <Box><ConnectWithoutContactIcon /></Box>
                                    <Box sx={{ mt: .5, display: 'flex', gap: 1 }}>
                                        <Box><Typography level="title-md" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}>{item?.name === null ? "not updated" : item?.name}</Typography></Box>

                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {item?.designation === null ? "not updated" : item?.designation}</Typography> </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {item?.number === null ? "not updated" : item?.number}</Typography> </Box>
                                </Box>
                                <Box sx={{ display: 'flex', gap: 5 }}>
                                    <Box></Box>
                                    <Box ><Typography level="body-sm" sx={{ wordBreak: 'break-word', textTransform: 'capitalize' }}> {item?.mail_id === null ? "not updated" : item?.mail_id}</Typography> </Box>
                                </Box>
                            </Box>

                        </Box>
                    ))
                ) : (
                    <Typography level="body-sm">No  details found.</Typography>
                )}

            </Box>
        </Box>
    )
}

export default memo(CandidateReference)