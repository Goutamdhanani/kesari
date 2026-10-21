import React,{lazy,Suspense,useCallback,useEffect,useState} from 'react';
import {ArrowUpRight,Home,Compass,CalendarDays,UserRound,Ticket} from 'lucide-react';
import LandingScreen from './components/landing/LandingScreen';
import StudioShell from './components/common/StudioShell';
import {ProfilePage} from './components/pages/MemoryPages';
import {EventList,EventBooking,LiveTickets} from './components/booking/EventPages';
import {api} from './lib/api';
import {eventImage} from './lib/events';
import './App.css';
const Showcase=lazy(()=>import('./Showcase'));
const AdminPage=lazy(()=>import('./components/pages/AdminPage'));
const readRoute=()=>window.location.hash.startsWith('#/')?window.location.hash.slice(2).replace(/\/$/,'')||'home':'home';
const readStored=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const defaults={upiId:'kesari.memory@okhdfcbank',payeeName:'',email:'Kesari.memory@gmail.com',phone:'+917760539955'};
const tabs=[{id:'home',label:'Home',icon:Home},{id:'events',label:'Events',icon:CalendarDays},{id:'discover',label:'Discover',icon:Compass},{id:'profile',label:'My profile',icon:UserRound},{id:'tickets',label:'My tickets',icon:Ticket}];
export default function Application(){
 const[route,setRoute]=useState(readRoute),[events,setEvents]=useState([]),[settings,setSettings]=useState(defaults),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const[profile,setProfile]=useState(()=>readStored('kesari-ui-profile',{name:'',email:'',city:'Bengaluru'})),[saved,setSaved]=useState(()=>{const d=readStored('kesari-ui-saved',[]);return Array.isArray(d)?d:[]}),[orders,setOrders]=useState(()=>{const d=readStored('kesari-ui-orders',[]);return Array.isArray(d)?d:[]});
 const refresh=useCallback(async()=>{try{const d=await api('/api/content');setEvents(d.events);setSettings(d.settings);setError('')}catch(e){setError(e.message)}finally{setLoading(false)}},[]);
 useEffect(()=>{refresh();const timer=setInterval(()=>{if(!document.hidden)refresh()},15000);window.addEventListener('focus',refresh);window.addEventListener('kesari-content-changed',refresh);const channel='BroadcastChannel'in window?new BroadcastChannel('kesari-content'):null;if(channel)channel.onmessage=refresh;return()=>{clearInterval(timer);window.removeEventListener('focus',refresh);window.removeEventListener('kesari-content-changed',refresh);channel?.close()}},[refresh]);
 useEffect(()=>{const changed=()=>{setRoute(readRoute());window.scrollTo({top:0,behavior:'instant'});refresh()};window.addEventListener('hashchange',changed);return()=>window.removeEventListener('hashchange',changed)},[refresh]);
 useEffect(()=>{const event=events.find(e=>e.id===route.split('/')[1]);const current=tabs.find(t=>t.id===route);document.title=`${event?.title||current?.label||(route==='admin'?'Team admin':'Kesari')} · The Memory Studio`},[route,events]);
 function navigate(id){window.location.hash=id==='home'?'/':'/'+id}
 function saveProfile(next){setProfile(next);try{localStorage.setItem('kesari-ui-profile',JSON.stringify(next));return true}catch{return false}}
 function toggleSaved(id){setSaved(previous=>{const next=previous.includes(id)?previous.filter(x=>x!==id):[...previous,id];try{localStorage.setItem('kesari-ui-saved',JSON.stringify(next))}catch{}return next})}
 function keepOrder(order){setOrders(previous=>{const next=[order,...previous.filter(o=>o.id!==order.id)];try{localStorage.setItem('kesari-ui-orders',JSON.stringify(next))}catch{}return next})}
 if(route==='admin')return <Suspense fallback={<div className="preview-loading">Opening team space…</div>}><AdminPage/></Suspense>;
 if(route==='showcase')return <><a className="back-to-landing" href="#/">← Back to Kesari</a><Suspense fallback={<div className="preview-loading">Opening design preview…</div>}><Showcase/></Suspense></>;
 if(route==='home')return <main id="landing-main"><LandingScreen events={events} loading={loading} error={error} onNavigate={navigate}/></main>;
 const home=()=>navigate('home');
 const content=route==='events'||route==='discover'?<EventList key={route} events={events} loading={loading} error={error} discover={route==='discover'} onHome={home} onSelect={id=>navigate('event/'+id)} saved={saved} onSave={toggleSaved}/>:route==='profile'?<ProfilePage onHome={home} profile={profile} onSave={saveProfile} saved={saved} onEvents={()=>navigate('events')}/>:route==='tickets'?<LiveTickets events={events} orders={orders} onResume={o=>navigate('event/'+o.eventId+'/'+o.id)} onUpdate={keepOrder} onHome={home} onEvents={()=>navigate('events')}/>:route.startsWith('event/')||route.startsWith('experience/')?<EventBooking key={route} resumeOrder={orders.find(o=>o.id===route.split('/')[2])} event={events.find(e=>e.id===route.split('/')[1])} settings={settings} loading={loading} onBack={()=>navigate('events')} onOrder={keepOrder} onTickets={()=>navigate('tickets')} saved={saved} onSave={toggleSaved}/>:<div className="memory-page"><h1>Let’s find your next memory.</h1><button className="memory-action" onClick={home}>Back home <ArrowUpRight size={17}/></button></div>;
 const currentEvent=events.find(event=>event.id===route.split('/')[1]);
 return <StudioShell route={route} backdrop={currentEvent?currentEvent.landingImage||eventImage(currentEvent):undefined} onNavigate={navigate}>{content}</StudioShell>;
}

