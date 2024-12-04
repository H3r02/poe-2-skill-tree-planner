"use client"

import SkillTree from '../components/skill_tree/SkillTree';
import ChangeMessage from '@/components/ChangeMessage';
import Footer from '@/components/Footer';
import Header from '@/components/header/Header';

export default function Home() {
  return (
    <div className='bg-gray-900'>
      <ChangeMessage />
      <Header/>
      <SkillTree/>
      <Footer/>
    </div>
  );
}
