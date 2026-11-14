import {BookOpenText,BriefcaseBusiness,UsersRound} from 'lucide-react';

// Source: biographical document supplied 14 November 2026.
// Career and education details are not independently credential-verified.
export const biographyHighlights=[
 {title:'Academic perspective',subtitle:'Political science · peace and conflict resolution',description:'His supplied biography lists a B.Sc. in Political Science at the University of Abuja and dissertation work examining the Kaduna crisis.',icon:BookOpenText,accent:'blue'},
 {title:'Practical management',subtitle:'Project delivery · site coordination',description:'The biography records a Site Manager role at Edile Construction Company Limited and an emphasis on quality, safety, schedules and teamwork.',icon:BriefcaseBusiness,accent:'gold'},
 {title:'Community engagement',subtitle:'Enterprise support · public communication',description:'It describes event organisation, debate leadership and enterprise activities intended to help students, graduates and disadvantaged participants.',icon:UsersRound,accent:'green'}
] as const;
export const professionalSkills=[
 {title:'Management and delivery',description:'Prioritising competing work demands while remaining attentive to time, cost, quality and safety constraints.'},
 {title:'Communication and dialogue',description:'Written and spoken communication, including addressing groups in professional, civic and social settings.'},
 {title:'Collaborative working',description:'Participation in multidisciplinary activities and coordination with contributors carrying different responsibilities.'}
] as const;
export const biographicalRecord=[
 {label:'Higher education',title:'B.Sc. in Political Science',context:'University of Abuja · 2007–2012',detail:'Dissertation focus: peace and conflict resolution, with the Kaduna crisis identified as the case study.'},
 {label:'Professional experience',title:'Site Manager',context:'Edile Construction Company Limited · dates not stated',detail:'The supplied profile associates the role with practical project management and coordinating work against quality, time and safety constraints.'},
 {label:'Enterprise initiatives',title:'Events, debates and entrepreneurship support',context:'Dates and institutional affiliation not clearly specified',detail:'The profile describes event organisation, debate leadership, ideas competitions and activities intended to encourage self-reliance among students, graduates and economically disadvantaged participants.'}
] as const;
