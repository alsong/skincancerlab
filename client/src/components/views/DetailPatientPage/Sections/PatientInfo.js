import React, { useEffect, useState } from 'react'
import { Descriptions, Button } from 'antd';
import axios from 'axios'

function PatientInfo(props) {

    const [Patient, setPatient] = useState({})
    const [DetectedValue, setDetectedValue] = useState({})

    useEffect(() => {

        setPatient(props.detail)

    }, [props.detail])

    var bodyFormData = new FormData();



    const detectImage = () => {
        console.log('image source', props.image);
        bodyFormData.append('url', 'https://tf-sound.s3.amazonaws.com/uploads/ISIC_0052060.jpg');

        axios({
            method: 'post',
            url: 'https://skin-cancer-detector.herokuapp.com/classify-url',
            data: bodyFormData,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept' : 'text/html' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            })
            

    }

    return (
        <div>
            <Descriptions title="Patient Info">
                <Descriptions.Item label="Age"> {Patient.age}</Descriptions.Item>
                <Descriptions.Item label="Sex">{Patient.sex == 1 ? 'Male' : 'Female'}</Descriptions.Item>
                <Descriptions.Item label="Description"> {Patient.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger"
                    onClick={detectImage}
                >
                    Detect
                    </Button>
            </div>

            <Descriptions title="Detected Info">
                <Descriptions.Item label="Age"> </Descriptions.Item>
                <Descriptions.Item label="Sex"></Descriptions.Item>
                <Descriptions.Item label="Description"></Descriptions.Item>
            </Descriptions>


        </div>
    )
}

export default PatientInfo
