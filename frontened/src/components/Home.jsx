import React from 'react'
import HeroSection from '../components/HeroSection'
<<<<<<< HEAD
import JobsFeaturs from "../components/JobFeatures"
import LatestJobs from './LatestJobs'
import Footer from '../components/Footer'
import Companies from './Companies'
import Analytics from './Analytics'
import useGetAllJobs from '../hooks/useGetAllJobs '
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Categories from './Categories'

function Home() {
  useGetAllJobs();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();

  useEffect (() => {
    if(user?.role === 'recruiter'){
      navigate('/admin/companies');
    }
  }, [user, navigate]);
  return (
    <div>
      <HeroSection />
      <JobsFeaturs />
      <Categories />
      <LatestJobs />
      <Companies />
      <Analytics />
      <Footer />

    </div>
=======
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
>>>>>>> 99c2990f774df0329fafe0f462d72128dc74cb71
  )
}

export default Home


