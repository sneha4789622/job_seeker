import React from 'react'
import HeroSection from '../components/HeroSection'
import CategoryCarousel from '../components/CategoryCarousel'
import JobsFeaturs from "../components/JobFeatures"
import LatestJobs from './LatestJobs'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
        <HeroSection/>
        <CategoryCarousel/>
      <JobsFeaturs/>
      <LatestJobs/>
   <Footer/> 

     </div>
  )
}

export default Home


