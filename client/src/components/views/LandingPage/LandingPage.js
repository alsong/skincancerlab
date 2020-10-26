import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import { age, sex } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

const { Meta } = Card;

function LandingPage() {

    const [Patients, setPatients] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [SearchTerms, setSearchTerms] = useState("")

    const [Filters, setFilters] = useState({
        sex: [],
        age: []
    })

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }

        getPatients(variables)

    }, [])

    const getPatients = (variables) => {
        Axios.post('/api/patient/getPatients', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setPatients([...Patients, ...response.data.patients])
                    } else {
                        setPatients(response.data.patients)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fetch Patients data')
                }
            })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
        }
        getPatients(variables)
        setSkip(skip)
    }


    const renderCards = Patients.map((patient, index) => {

        return <Col lg={6} md={8} xs={24}>
            <Card
                hoverable={true}
                cover={<a href={`/patient/${patient._id}`} > <ImageSlider images={patient.images} /></a>}
            >
                <Meta
                    title={patient.name}
                    description={`${patient.description}`}
                />
            </Card>
        </Col>
    })


    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getPatients(variables)
        setSkip(0)

    }

    const handleAge = (value) => {
        const data = age;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "age") {
            let ageValues = handleAge(filters)
            newFilters[category] = ageValues

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerms(newSearchTerm)

        getPatients(variables)
    }


    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Look Through Patients' images  <Icon type="image" />  </h2>
            </div>


            {/* Filter  */}

            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >
                    <CheckBox
                        list={sex}
                        handleFilters={filters => handleFilters(filters, "sex")}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox
                        list={age}
                        handleFilters={filters => handleFilters(filters, "age")}
                    />
                </Col>
            </Row>


            {/* Search  */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>


            {Patients.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No patient image yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }
            <br /><br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
                </div>
            }


        </div>
    )
}

export default LandingPage
