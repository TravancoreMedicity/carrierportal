import React, { useEffect } from 'react'
import Table from '@mui/joy/Table';
import { Sheet } from '@mui/joy';
import { useSelector } from 'react-redux';
import { getUser } from '../../../Redux/LoginSlice';
import axioslogin from '../../../Axios/Axios';

const ApplicationView = () => {

    const loggedInfo = useSelector((state) => getUser(state))
    const data = JSON.parse(loggedInfo)
    const userGoogleID = data?.id

    useEffect(() => {
        const getApplication = async () => {
            const result = await axioslogin.get(`/app_registration/getregistration/${userGoogleID}`)
            const { success, data } = result.data;
            if (success === 2) {
                // setappStatus(true)
            }
        }
        getApplication()
    }, [])


    return (
        <Sheet className="m-5 rounded-lg overflow-hidden" >
            <Table aria-label="basic table" className="p-5" >
                <thead>
                    <tr>
                        <th style={{ width: '40%' }}>Dessert (100g serving)</th>
                        <th>Calories</th>
                        <th>Fat&nbsp;(g)</th>
                        <th>Carbs&nbsp;(g)</th>
                        <th>Protein&nbsp;(g)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Frozen yoghurt</td>
                        <td>159</td>
                        <td>6</td>
                        <td>24</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Ice cream sandwich</td>
                        <td>237</td>
                        <td>9</td>
                        <td>37</td>
                        <td>4.3</td>
                    </tr>
                    <tr>
                        <td>Eclair</td>
                        <td>262</td>
                        <td>16</td>
                        <td>24</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Cupcake</td>
                        <td>305</td>
                        <td>3.7</td>
                        <td>67</td>
                        <td>4.3</td>
                    </tr>
                    <tr>
                        <td>Gingerbread</td>
                        <td>356</td>
                        <td>16</td>
                        <td>49</td>
                        <td>3.9</td>
                    </tr>
                </tbody>
            </Table>
        </Sheet>
    )
}

export default ApplicationView