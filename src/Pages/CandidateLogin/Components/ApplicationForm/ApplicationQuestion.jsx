import { Typography } from '@mui/joy'
import React, { memo, lazy } from 'react'


const WorkAndEducation = lazy(() => import('./WorkAndEducation'))

const ApplicationQuestion = ({ setformdata, formdata, seteducation, Regionexp, setRegionexp, Regionedu, setRegionedu, eduname, course, setCourse, SpecilizationData, setSpecialization,
    handleOnClick, education, expdata, expdataset, experience, setexprience, education_details, seteducation_details, edudata, edudataset, setUniData, UniData,
    board, setBoard }) => {

    return (
        <>

            <Typography sx={{ mt: 3, fontFamily: "Bahnschrift", fontSize: 20, fontWeight: 500, color: '#555555', }}>WORK AND EDUCATION HISTORY</Typography>
            <Typography sx={{ fontFamily: "Bahnschrift", color: '#555555', }}>Please enter details about your work experience and education.</Typography>
            <WorkAndEducation
                setformdata={setformdata} formdata={formdata} seteducation={seteducation} Regionexp={Regionexp} course={course} setCourse={setCourse}
                setRegionexp={setRegionexp} Regionedu={Regionedu} setRegionedu={setRegionedu} handleOnClick={handleOnClick} eduname={eduname}
                education={education} expdata={expdata} expdataset={expdataset} experience={experience} setexprience={setexprience}
                education_details={education_details} seteducation_details={seteducation_details} edudata={edudata} edudataset={edudataset}
                SpecilizationData={SpecilizationData} setSpecialization={setSpecialization} setUniData={setUniData} UniData={UniData} board={board} setBoard={setBoard}
            />
        </>
    )
}

export default memo(ApplicationQuestion) 