import React, { useContext } from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import ChartAge from '../components/charts/ChartAge'
import ChartCity from '../components/charts/ChartCity'
import ChartProblems from '../components/charts/ChartProblems'
import ChartSex from '../components/charts/ChartSex'
import Loader from '../components/layout/Loading'
import { AppContext } from '../context/appContext'

const Dashboard = () => {
  const { loading } = useContext(AppContext)

  if (loading) return <Loader />

  return (
    <Container fluid className='pt-3 gray'>
      <h1 className='text-center mb-4'>Some Header Goes Here</h1>
      <Wrapper>
        <ChartAge />
        <ChartCity />
        <ChartSex />
        <ChartProblems />
      </Wrapper>
    </Container>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  @media (max-width: 800px) {
    gap: 4rem;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Dashboard
