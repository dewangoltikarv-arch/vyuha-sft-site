'use strict';
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduced) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const progress = document.querySelector('.reading-progress');
let ticking = false;
function updateProgress() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${total > 0 ? (scrollY / total) * 100 : 0}%`;
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); } }, {passive:true});
addEventListener('resize', updateProgress); updateProgress();
const stages = {
 before: {label:'01 / BEFORE THE SHOW',title:'Arrive with<br><em>a reason to meet.</em>',description:'A booth calendar starts with knowing who belongs on it. We research the right companies and prepare a specific approach around your show.',image:'before.jpg',alt:'Exhibition research and planning before a trade show',caption:'THE FIRST MEETING STARTS BEFORE THE FLIGHT.',items:['Named targets, contact routes, and reasons they fit','A local buyer and partner pack around the event city','Approved meeting outreach and reply handling'],note:'You approve the audience, the message, and the sender.'},
 during: {label:'02 / ON THE FLOOR',title:'Keep the details.<br><em>While they’re still fresh.</em>',description:'Your team runs the booth. We support the notes and lead exports you share, so a good conversation becomes a useful follow-up instead of a forgotten scan.',image:'during.jpg',alt:'Conversation notes being reviewed during a trade show',caption:'THE QUESTION THEY ASKED IS THE PLACE TO START.',items:['Visitor grading against the agreed buyer profile','Same-night drafts for priority booth conversations','Technical questions routed to your approval owner'],note:'Remote support, around an agreed note-capture and approval process.'},
 after: {label:'03 / BEYOND THE BOOTH',title:'Carry the interest<br><em>into a next step.</em>',description:'The floor closes. The work continues. We follow through on the agreed conversations and keep replies, owners, and actions visible until handoff.',image:'after.jpg',alt:'Post-show follow-through and meeting preparation',caption:'A CONVERSATION DESERVES AN OWNER.',items:['Follow-up grounded in what was actually discussed','Reply handling and meeting next steps where there is interest','A final handoff with status, exclusions, and owners'],note:'Follow-up timing and coverage are agreed before the engagement.'}
};
const tabs = [...document.querySelectorAll('[data-stage]')];
function chooseStage(tab, focus=false) {
 const data = stages[tab.dataset.stage];
 tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;});
 const panel=document.getElementById('stage-panel');panel.setAttribute('aria-labelledby',tab.id);
 document.getElementById('stage-title').innerHTML=data.title;
 document.getElementById('stage-description').textContent=data.description;
 const img=document.getElementById('stage-image');img.src='/assets/'+data.image;img.alt=data.alt;
 const list=document.getElementById('stage-list');list.replaceChildren(...data.items.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
 document.getElementById('stage-note').textContent=data.note;
 if(focus)tab.focus();
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>chooseStage(tab));tab.addEventListener('keydown',event=>{let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();chooseStage(tabs[next],true);});});
document.getElementById('show-form').addEventListener('submit',event=>{
 event.preventDefault();const data=new FormData(event.currentTarget);
 const company=String(data.get('company')).trim(),show=String(data.get('show')).trim(),dates=String(data.get('dates')).trim();
 if(!company||!show||!dates){document.getElementById('form-note').textContent='Please add your company, show name, and dates.';return;}
 const body=`Hi Dewang,\n\nI’d like to discuss Show Follow-Through.\n\nCompany: ${company}\nShow: ${show}\nDates: ${dates}\nWho we want to meet: ${String(data.get('buyer')).trim()}\n\n`;
 location.href='mailto:dewang@dvyuha.com?subject='+encodeURIComponent('Show Follow-Through — '+show)+'&body='+encodeURIComponent(body);
 document.getElementById('form-note').textContent='Your email draft is ready in your email app. If it did not open, email dewang@dvyuha.com directly.';
});
