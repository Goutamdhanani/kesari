import React from 'react';
import LandingScreen from '../landing/LandingScreen';
export default function OnboardingScreen({onFinish=()=>{},onNavigate}){
 return <LandingScreen embedded onNavigate={onNavigate||(()=>onFinish())}/>;
}
