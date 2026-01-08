import React from 'react'
import HeroSection from '../components/HeroSection'
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
  const {user} = useSelector(store=>store.auth);


  useGetAllJobs();
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
  )
}

export default Home


