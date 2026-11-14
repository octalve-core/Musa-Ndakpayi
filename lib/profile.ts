import {BookOpenText,BriefcaseBusiness,UsersRound} from 'lucide-react';

// Career, education and community experience.
export const biographyHighlights=[
 {title:'Academic perspective',subtitle:'Political science · peace and conflict resolution',description:'Ndakpayi earned a B.Sc. in Political Science from the University of Abuja, with dissertation research on peace and conflict resolution focused on the Kaduna crisis.',icon:BookOpenText,accent:'blue'},
 {title:'Practical management',subtitle:'Project delivery · site coordination',description:'At Edile Construction Company Limited, he worked as a Site Manager, coordinating project responsibilities with attention to quality, safety, time and teamwork.',icon:BriefcaseBusiness,accent:'gold'},
 {title:'Community engagement',subtitle:'Enterprise support · public communication',description:'Through event organisation, debate leadership and enterprise-support initiatives, he has worked to encourage self-reliance among students, graduates and disadvantaged participants.',icon:UsersRound,accent:'green'}
] as const;
export const professionalSkills=[
 {title:'Management and delivery',description:'Prioritising competing work demands while remaining attentive to time, cost, quality and safety constraints.'},
 {title:'Communication and dialogue',description:'Written and spoken communication, including addressing groups in professional, civic and social settings.'},
 {title:'Collaborative working',description:'Participation in multidisciplinary activities and coordination with contributors carrying different responsibilities.'}
] as const;
export const biographicalRecord=[
 {label:'Higher education',title:'B.Sc. in Political Science',context:'University of Abuja · 2007–2012',detail:'Dissertation focus: peace and conflict resolution, with the Kaduna crisis identified as the case study.'},
 {label:'Professional experience',title:'Site Manager',context:'Edile Construction Company Limited',detail:'Site management experience involving project coordination, managing people, scheduling and maintaining standards of quality and safety.'},
 {label:'Enterprise initiatives',title:'Events, debates and entrepreneurship support',context:'Community and enterprise development',detail:'Organised events and debates, contributed to ideas competitions and supported entrepreneurship activities for students, graduates and people facing limited economic opportunities.'}
] as const;
