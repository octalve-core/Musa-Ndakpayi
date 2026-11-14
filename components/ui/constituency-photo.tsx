export function ConstituencyPhoto({className=''}:{className?:string}){
 return <figure className={['relative isolate flex min-h-[400px] flex-col justify-end overflow-hidden rounded-2xl bg-[#073f86] text-white',className].join(' ')}>
  <div role="img" aria-label="Minna City Gate in Niger State, Nigeria" className="absolute inset-0 bg-cover bg-center" style={{backgroundImage:'url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Minna%2C_Niger_state_City_gate.jpg/960px-Minna%2C_Niger_state_City_gate.jpg)'}}/>
  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#05274c]/95 via-[#073f86]/25 to-transparent"/>
  <figcaption className="relative z-10 px-7 pb-7 pt-44 sm:px-10 sm:pb-9">
   <p className="text-[11px] font-medium uppercase tracking-[.19em] text-[#ffd05c]">Constituency landmark</p>
   <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Minna · Niger State</p>
   <p className="mt-3 max-w-lg text-xs leading-6 text-blue-100">Minna City Gate photograph by F5pillar, <a className="underline decoration-white/60 underline-offset-2 hover:text-white" href="https://commons.wikimedia.org/wiki/File:Minna,_Niger_state_City_gate.jpg" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Cropped for presentation.</p>
  </figcaption>
 </figure>;
}
