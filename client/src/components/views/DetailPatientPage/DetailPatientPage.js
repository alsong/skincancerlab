import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'antd';
import PatientImage from './Sections/PatientImage';
import PatientInfo from './Sections/PatientInfo';

function DetailPatientPage(props) {
    const patientId = props.match.params.patientId
    const [Patient, setPatient] = useState([])
    const [ImageSource, setImageSource] = useState("")

    useEffect(() => {
        Axios.get(`/api/patient/patients_by_id?id=${patientId}&type=single`)
            .then(response => {
                setPatient(response.data[0])
            })

    }, [patientId])

    const getSource = (img_src) => {
        setImageSource(img_src)
    }

    return (
        <div className="postPage" style={{ width: '100%', padding: '3rem 4rem' }}>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Patient.name}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24}>
                    <PatientImage detail={Patient} getImgSrc={getSource}/>
                </Col>
                <Col lg={12} xs={24}>
                    <PatientInfo
                        image={ImageSource}
                        detail={Patient} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailPatientPage
