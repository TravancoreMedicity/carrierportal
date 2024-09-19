import { Box, Button, IconButton, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import axioslogin from '../../../../Axios/Axios';
import { succesNofity, warningNofity } from '../../../CommonCode/CommonFunc';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star'; // Import the filled star icon

const CandidateLang = ({ ApplicationId }) => {

    const [starPoor, setStarPoor] = useState(0);
    const [starExe, setStarExe] = useState(0);
    const [starNat, setStarNav] = useState(0);
    const [starPro, setStarPro] = useState(0);
    const [starBeg, setStarBeg] = useState(0);

    const [starMalPoor, setStarMalPoor] = useState(0);
    const [starMalExe, setStarMalExe] = useState(0);
    const [starMalnat, setStarMalNav] = useState(0);
    const [starMalpro, setStarMalpro] = useState(0);
    const [starMalbeg, setStarMalbeg] = useState(0);

    const [starHinPoor, setStarHinPoor] = useState(0);
    const [starHinExe, setStarHinExe] = useState(0);
    const [starHinnat, setStarHinNav] = useState(0);
    const [starHinpro, setStarHinpro] = useState(0);
    const [starHinbeg, setStarHinbeg] = useState(0);


    const [starTamilPoor, setStarTamilPoor] = useState(0);
    const [starTamilExe, setStarTamilExe] = useState(0);
    const [starTamilnat, setStarTamilNav] = useState(0);
    const [starTamilpro, setStarTamilpro] = useState(0);
    const [starTamilbeg, setStarTamilbeg] = useState(0);

    const [starArbPoor, setStarArbPoor] = useState(0);
    const [starArbExe, setStarArbExe] = useState(0);
    const [starArbnat, setStarArbNav] = useState(0);
    const [starArbpro, setStarArbpro] = useState(0);
    const [starArbbeg, setStarArbbeg] = useState(0);


    const [count, setCount] = useState(0)
    const [langdata, setdata] = useState([])



    const checkData = useMemo(() => {
        return {
            ApplicationId: ApplicationId,
        }
    }, [ApplicationId])

    useEffect(() => {
        const getJobSkills = async (checkData) => {
            const result = await axioslogin.post('/career/lang/get', checkData)
            const { success, data } = result.data
            if (success === 1) {
                setdata(data)
                setCount(0)
                const { malayalam_Poor, malayalam_Exe, malayalam_Nat, malayalam_pro, malayalam_Beg,
                    english_Poor, english_Exe, english_Nat, english_pro, english_Beg, hindi_Poor, hindi_Exe, hindi_Nat, hindi_pro, hindi_Beg, tamil_Poor,
                    tamil_Exe, tamil_Nat, tamil_pro, tamil_Beg, arabic_Poor, arabic_Exe, arabic_Nat, arabic_Pro, arabic_Beg } = data[0]
                setStarPoor(english_Poor)
                setStarBeg(english_Beg)
                setStarPro(english_pro)
                setStarExe(english_Exe)
                setStarNav(english_Nat)
                setStarMalPoor(malayalam_Poor)
                setStarMalbeg(malayalam_Beg)
                setStarMalpro(malayalam_pro)
                setStarMalExe(malayalam_Exe)
                setStarMalNav(malayalam_Nat)
                setStarHinPoor(hindi_Poor)
                setStarHinbeg(hindi_Beg)
                setStarHinpro(hindi_pro)
                setStarHinExe(hindi_Exe)
                setStarHinNav(hindi_Nat)
                setStarTamilPoor(tamil_Poor)
                setStarTamilbeg(tamil_Beg)
                setStarTamilpro(tamil_pro)
                setStarTamilExe(tamil_Exe)
                setStarTamilNav(tamil_Nat)
                setStarArbPoor(arabic_Poor)
                setStarArbbeg(arabic_Beg)
                setStarArbpro(arabic_Pro)
                setStarArbExe(arabic_Exe)
                setStarArbNav(arabic_Nat)


            } else {
                setStarPoor(0)
                setStarBeg(0)
                setStarPro(0)
                setStarExe(0)
                setStarNav(0)
                setStarMalPoor(0)
                setStarMalbeg(0)
                setStarMalpro(0)
                setStarMalExe(0)
                setStarMalNav(0)
                setStarHinPoor(0)
                setStarHinbeg(0)
                setStarHinpro(0)
                setStarHinExe(0)
                setStarHinNav(0)
                setStarTamilPoor(0)
                setStarTamilbeg(0)
                setStarTamilpro(0)
                setStarTamilExe(0)
                setStarTamilNav(0)
                setStarArbPoor(0)
                setStarArbbeg(0)
                setStarArbpro(0)
                setStarArbExe(0)
                setStarArbNav(0)
            }
        }
        getJobSkills(checkData)

    }, [count, checkData])

    const insertLang = useMemo(() => {
        return {
            applicationId: ApplicationId,

            malayalam_Poor: starMalPoor,
            malayalam_Exe: starMalExe,
            malayalam_Nat: starMalnat,
            malayalam_Pro: starMalpro,
            malayalam_Beg: starMalbeg,

            hindi_Poor: starHinPoor,
            hindi_Exe: starHinExe,
            hindi_Nat: starHinnat,
            hindi_Pro: starHinpro,
            hindi_Beg: starHinbeg,

            english_Poor: starPoor,
            english_Exe: starExe,
            english_Nat: starNat,
            english_Pro: starPro,
            english_Beg: starBeg,

            tamil_Poor: starTamilPoor,
            tamil_Exe: starTamilExe,
            tamil_Nat: starTamilnat,
            tamil_Pro: starTamilpro,
            tamil_Beg: starTamilbeg,

            arabic_Poor: starArbPoor,
            arabic_Exe: starArbExe,
            arabic_Nat: starArbnat,
            arabic_Pro: starArbpro,
            arabic_Beg: starArbbeg

        }
    }, [starMalPoor, starMalExe, starMalnat, starMalpro, starMalbeg, starHinPoor, starHinExe, starHinnat, starHinpro, starHinbeg, starPoor, starExe, starNat, starPro,
        starBeg, starTamilPoor, starTamilExe, starTamilnat, starTamilpro, starTamilbeg, starArbPoor, starArbExe, starArbnat, starArbpro, starArbbeg
    ])

    const SubmitFormData = useCallback(async (event) => {
        if (langdata?.length > 0) {
            const result = await axioslogin.post('/career/UpdateLangdata', insertLang)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
            }
            else {
                warningNofity(message)
            }

        }
        else {
            const result = await axioslogin.post('/career/insertLangdata', insertLang)
            const { success, message } = result.data
            if (success === 2) {
                succesNofity(message)
                setCount(count + 1)
            } else {
                warningNofity(message)
            }
        }
    }, [insertLang])


    // Function to handle star click
    const handleStarNative = () => {
        setStarPoor(1)
        setStarBeg(1)
        setStarPro(1)
        setStarExe(1)
        setStarNav(1)
    }
    const handleStarExecellent = () => {
        setStarPoor(1)
        setStarBeg(1)
        setStarPro(1)
        setStarExe(1)
        setStarNav(0)
    }
    const handleStarProficient = () => {
        setStarPoor(1)
        setStarBeg(1)
        setStarPro(1)
        setStarExe(0)
        setStarNav(0)
    }
    const handleStarBeginner = () => {
        setStarPoor(1)
        setStarBeg(1)
        setStarPro(0)
        setStarExe(0)
        setStarNav(0)
    }
    const handleStarPoor = () => {
        setStarPoor(1)
        setStarBeg(0)
        setStarPro(0)
        setStarExe(0)
        setStarNav(0)
    }
    // malayalam
    const handleStarMalNative = () => {

        setStarMalPoor(1)
        setStarMalbeg(1)
        setStarMalpro(1)
        setStarMalExe(1)
        setStarMalNav(1)
    }
    const handleStarMalExecellent = () => {
        setStarMalPoor(1)
        setStarMalbeg(1)
        setStarMalpro(1)
        setStarMalExe(1)
        setStarMalNav(0)
    }
    const handleStarMalProficient = () => {
        setStarMalPoor(1)
        setStarMalbeg(1)
        setStarMalpro(1)
        setStarMalExe(0)
        setStarMalNav(0)
    }
    const handleStarMalBeginner = () => {
        setStarMalPoor(1)
        setStarMalbeg(1)
        setStarMalpro(0)
        setStarMalExe(0)
        setStarMalNav(0)
    }
    const handleStarMalPoor = () => {
        setStarMalPoor(1)
        setStarMalbeg(0)
        setStarMalpro(0)
        setStarMalExe(0)
        setStarMalNav(0)
    }
    // hindi
    const handleStarHinNative = () => {

        setStarHinPoor(1)
        setStarHinbeg(1)
        setStarHinpro(1)
        setStarHinExe(1)
        setStarHinNav(1)
    }
    const handleStarHinExecellent = () => {
        setStarHinPoor(1)
        setStarHinbeg(1)
        setStarHinpro(1)
        setStarHinExe(1)
        setStarHinNav(0)
    }
    const handleStarHinProficient = () => {
        setStarHinPoor(1)
        setStarHinbeg(1)
        setStarHinpro(1)
        setStarHinExe(0)
        setStarHinNav(0)
    }
    const handleStarHinBeginner = () => {
        setStarHinPoor(1)
        setStarHinbeg(1)
        setStarHinpro(0)
        setStarHinExe(0)
        setStarHinNav(0)
    }
    const handleStarHinPoor = () => {
        setStarHinPoor(1)
        setStarHinbeg(0)
        setStarHinpro(0)
        setStarHinExe(0)
        setStarHinNav(0)
    }
    // Tamil
    const handleStarTamilNative = () => {

        setStarTamilPoor(1)
        setStarTamilbeg(1)
        setStarTamilpro(1)
        setStarTamilExe(1)
        setStarTamilNav(1)
    }
    const handleStarTamilExecellent = () => {
        setStarTamilPoor(1)
        setStarTamilbeg(1)
        setStarTamilpro(1)
        setStarTamilExe(1)
        setStarTamilNav(0)
    }
    const handleStarTamilProficient = () => {
        setStarTamilPoor(1)
        setStarTamilbeg(1)
        setStarTamilpro(1)
        setStarTamilExe(0)
        setStarTamilNav(0)
    }
    const handleStarTamilBeginner = () => {
        setStarTamilPoor(1)
        setStarTamilbeg(1)
        setStarTamilpro(0)
        setStarTamilExe(0)
        setStarTamilNav(0)
    }
    const handleStarTamilPoor = () => {
        setStarTamilPoor(1)
        setStarTamilbeg(0)
        setStarTamilpro(0)
        setStarTamilExe(0)
        setStarTamilNav(0)
    }
    // Arabic
    const handleStarArbNative = () => {
        setStarArbPoor(1)
        setStarArbbeg(1)
        setStarArbpro(1)
        setStarArbExe(1)
        setStarArbNav(1)
    }
    const handleStarArbExecellent = () => {
        setStarArbPoor(1)
        setStarArbbeg(1)
        setStarArbpro(1)
        setStarArbExe(1)
        setStarArbNav(0)
    }
    const handleStarArbProficient = () => {
        setStarArbPoor(1)
        setStarArbbeg(1)
        setStarArbpro(1)
        setStarArbExe(0)
        setStarArbNav(0)
    }
    const handleStarArbBeginner = () => {
        setStarArbPoor(1)
        setStarArbbeg(1)
        setStarArbpro(0)
        setStarArbExe(0)
        setStarArbNav(0)
    }
    const handleStarArbPoor = () => {
        setStarArbPoor(1)
        setStarArbbeg(0)
        setStarArbpro(0)
        setStarArbExe(0)
        setStarArbNav(0)
    }


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
            <Box sx={{ borderBottom: "1px solid #DFDFDF", }}>
                <Typography sx={{}}  >
                    Langauges Known
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", mt: 1, gap: 1, cursor: 'pointer', }}>
                <Box sx={{ display: 'flex', gap: 2, }}>
                    <Box sx={{ width: "20%" }}>
                        <Typography >
                            English
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Poor">
                            <Box sx={{}}>
                                {starPoor ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarPoor()}
                                /> : <StarBorderIcon
                                    sx={{ color: starPoor ? 'green' : 'inherit' }}
                                    onClick={() => handleStarPoor()}
                                />}
                            </Box>
                        </Tooltip>
                        <Tooltip title="Beginner">
                            <Box>
                                {starBeg ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarBeginner()}
                                /> : <StarBorderIcon
                                    sx={{ color: starBeg ? 'green' : 'inherit' }}
                                    onClick={() => handleStarBeginner()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Proficient">
                            <Box>
                                {starPro ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarProficient()}
                                /> : <StarBorderIcon
                                    sx={{ color: starPro ? 'green' : 'inherit' }}
                                    onClick={() => handleStarProficient()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Execellent">
                            <Box>
                                {starExe ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarExecellent()}
                                /> : <StarBorderIcon
                                    sx={{ color: starExe ? 'green' : 'inherit' }}
                                    onClick={() => handleStarExecellent()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Native">
                            <Box>
                                {starNat ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarNative()}
                                /> : <StarBorderIcon
                                    sx={{ color: starNat ? 'green' : 'inherit' }}
                                    onClick={() => handleStarNative()}
                                />}

                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ width: '20%' }}>
                        <Typography >
                            Malayalam
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Poor">
                            <Box sx={{}}>
                                {starMalPoor ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarMalPoor()}
                                /> : <StarBorderIcon
                                    sx={{ color: starMalPoor ? 'green' : 'inherit' }}
                                    onClick={() => handleStarMalPoor()}
                                />}
                            </Box>
                        </Tooltip>
                        <Tooltip title="Beginner">
                            <Box>
                                {starMalbeg ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarMalBeginner()}
                                /> : <StarBorderIcon
                                    sx={{ color: starMalbeg ? 'green' : 'inherit' }}
                                    onClick={() => handleStarMalBeginner()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Proficient">
                            <Box>
                                {starMalpro ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarMalProficient()}
                                /> : <StarBorderIcon
                                    sx={{ color: starMalpro ? 'green' : 'inherit' }}
                                    onClick={() => handleStarMalProficient()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Execellent">
                            <Box>
                                {starMalExe ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarMalExecellent()}
                                /> : <StarBorderIcon
                                    sx={{ color: starMalExe ? 'green' : 'inherit' }}
                                    onClick={() => handleStarMalExecellent()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Native">
                            <Box>
                                {starMalnat ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarMalNative()}
                                /> : <StarBorderIcon
                                    sx={{ color: starMalnat ? 'green' : 'inherit' }}
                                    onClick={() => handleStarMalNative()}
                                />}

                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ width: '20%' }}>
                        <Typography >
                            Hindi
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Poor">
                            <Box sx={{}}>
                                {starHinPoor ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarHinPoor()}
                                /> : <StarBorderIcon
                                    sx={{ color: starHinPoor ? 'green' : 'inherit' }}
                                    onClick={() => handleStarHinPoor()}
                                />}
                            </Box>
                        </Tooltip>
                        <Tooltip title="Beginner">
                            <Box>
                                {starHinbeg ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarHinBeginner()}
                                /> : <StarBorderIcon
                                    sx={{ color: starHinbeg ? 'green' : 'inherit' }}
                                    onClick={() => handleStarHinBeginner()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Proficient">
                            <Box>
                                {starHinpro ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarHinProficient()}
                                /> : <StarBorderIcon
                                    sx={{ color: starHinpro ? 'green' : 'inherit' }}
                                    onClick={() => handleStarHinProficient()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Execellent">
                            <Box>
                                {starHinExe ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarHinExecellent()}
                                /> : <StarBorderIcon
                                    sx={{ color: starHinExe ? 'green' : 'inherit' }}
                                    onClick={() => handleStarHinExecellent()}
                                />}

                            </Box>
                        </Tooltip>
                        <Tooltip title="Native">
                            <Box>
                                {starHinnat ? <StarIcon
                                    sx={{ color: 'green' }}
                                    onClick={() => handleStarHinNative()}
                                /> : <StarBorderIcon
                                    sx={{ color: starHinnat ? 'green' : 'inherit' }}
                                    onClick={() => handleStarHinNative()}
                                />}

                            </Box>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{}}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ width: "20%" }}>
                            <Typography >
                                Tamil
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Tooltip title="Poor">
                                <Box sx={{}}>
                                    {starTamilPoor ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarTamilPoor()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starTamilPoor ? 'green' : 'inherit' }}
                                        onClick={() => handleStarTamilPoor()}
                                    />}
                                </Box>
                            </Tooltip>
                            <Tooltip title="Beginner">
                                <Box>
                                    {starTamilbeg ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarTamilBeginner()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starTamilbeg ? 'green' : 'inherit' }}
                                        onClick={() => handleStarTamilBeginner()}
                                    />}

                                </Box>
                            </Tooltip>
                            <Tooltip title="Proficient">
                                <Box>
                                    {starTamilpro ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarTamilProficient()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starTamilpro ? 'green' : 'inherit' }}
                                        onClick={() => handleStarTamilProficient()}
                                    />}

                                </Box>
                            </Tooltip>
                            <Tooltip title="Execellent">
                                <Box>
                                    {starTamilExe ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarTamilExecellent()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starTamilExe ? 'green' : 'inherit' }}
                                        onClick={() => handleStarTamilExecellent()}
                                    />}

                                </Box>
                            </Tooltip>
                            <Tooltip title="Native">
                                <Box>
                                    {starTamilnat ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarTamilNative()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starTamilnat ? 'green' : 'inherit' }}
                                        onClick={() => handleStarTamilNative()}
                                    />}

                                </Box>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{}}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Box sx={{ width: "20%" }}>
                            <Typography >
                                Arabic
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>

                            <Tooltip title="Poor">
                                <Box sx={{}}>
                                    {starArbPoor ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarArbPoor()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starArbPoor ? 'green' : 'inherit' }}
                                        onClick={() => handleStarArbPoor()}
                                    />}
                                </Box>
                            </Tooltip>
                            <Tooltip title="Beginner">
                                <Box>
                                    {starArbbeg ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarArbBeginner()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starArbbeg ? 'green' : 'inherit' }}
                                        onClick={() => handleStarArbBeginner()}
                                    />}

                                </Box>
                            </Tooltip>
                            <Tooltip title="Proficient">
                                <Box>
                                    {starArbpro ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarArbProficient()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starArbpro ? 'green' : 'inherit' }}
                                        onClick={() => handleStarArbProficient()}
                                    />}

                                </Box>
                            </Tooltip>
                            <Tooltip title="Execellent">
                                <Box>
                                    {starArbExe ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarArbExecellent()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starArbExe ? 'green' : 'inherit' }}
                                        onClick={() => handleStarArbExecellent()}
                                    />}

                                </Box>
                            </Tooltip>
                            <Tooltip title="Native">
                                <Box>
                                    {starArbnat ? <StarIcon
                                        sx={{ color: 'green' }}
                                        onClick={() => handleStarArbNative()}
                                    /> : <StarBorderIcon
                                        sx={{ color: starArbnat ? 'green' : 'inherit' }}
                                        onClick={() => handleStarArbNative()}
                                    />}

                                </Box>
                            </Tooltip>

                        </Box>
                    </Box>
                </Box>

            </Box>

            <Box sx={{ flex: 0, px: 0.5, display: 'flex', mt: 2 }} >
                <Tooltip title="save" >
                    {langdata?.length > 0 ?
                        <Button variant="outlined" size='sm' color='primary' onClick={SubmitFormData} sx={{
                            width: '10%',
                            '@media screen and (max-width: 768px)': {
                                width: '30%'

                            },
                        }}>
                            Langauge Edit
                        </Button>
                        :
                        <Button variant="outlined" size='sm' color='primary' onClick={SubmitFormData} sx={{ width: '10%' }}>
                            Save
                        </Button>
                    }

                </Tooltip>

            </Box>

        </Box>
    )
}

export default memo(CandidateLang)