import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Sex = [
    { key: 1, value: "Male" },
    { key: 2, value: "Female" }
]

function UploadPatientPage(props) {

    const [NameValue, setNameValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [AgeValue, setAgeValue] = useState(0)
    const [SexValue, setSexValue] = useState(1)

    const [Images, setImages] = useState([])


    const onNameChange = (event) => {
        setNameValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onAgeChange = (event) => {
        setAgeValue(event.currentTarget.value)
    }

    const onSexSelectChange = (event) => {
        setSexValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!NameValue || !DescriptionValue || !AgeValue ||
            !SexValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            writer: props.user.userData._id,
            name: NameValue,
            description: DescriptionValue,
            age: AgeValue,
            images: Images,
            sex: SexValue,
        }

        Axios.post('/api/patient/uploadPatient', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Patient data Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Patient data')
                }
            })

    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Patient's Data</Title>
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Name</label>
                <Input
                    onChange={onNameChange}
                    value={NameValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Age(Years)</label>
                <Input
                    onChange={onAgeChange}
                    value={AgeValue}
                    type="number"
                />
                <br />
                <br /><label>Sex</label><br />
                <select onChange={onSexSelectChange} value={SexValue}>
                    {Sex.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}

export default UploadPatientPage
