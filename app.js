/* ===== DATA ===== */
const FEATURES = [
  { icon:'📋', title:'Voter Registration', desc:'Learn how to register, check eligibility requirements, and understand the documents you need to exercise your right to vote.' },
  { icon:'🏛️', title:'Types of Elections', desc:'Understand the difference between general, primary, local, and special elections — and why each one matters.' },
  { icon:'🗳️', title:'Casting Your Vote', desc:'Step-by-step guidance on how voting works — from entering the booth to submitting your ballot securely.' },
  { icon:'📊', title:'Counting & Results', desc:'Discover how votes are counted, verified, and how results are officially declared and certified.' },
  { icon:'⚖️', title:'Electoral Laws', desc:'Explore the legal framework that governs elections, ensuring fairness, transparency, and accountability.' },
  { icon:'🌍', title:'Global Perspectives', desc:'Compare electoral systems from around the world and understand different democratic models.' }
];

const TIMELINE = [
  { step:1, title:'Election Announcement', desc:'The Election Commission announces the schedule, including key dates for nominations, campaigning, and polling.' },
  { step:2, title:'Nomination Filing', desc:'Candidates file their nomination papers. The commission verifies eligibility and publishes the final candidate list.' },
  { step:3, title:'Campaign Period', desc:'Candidates and parties campaign to win voter support through rallies, debates, advertisements, and outreach programs.' },
  { step:4, title:'Voter Registration Deadline', desc:'The final date for citizens to register or update their voter information before the election.' },
  { step:5, title:'Election Day', desc:'Voters head to polling stations to cast their ballots. Officials ensure a smooth, fair, and secure voting process.' },
  { step:6, title:'Vote Counting', desc:'After polls close, ballots are counted — either manually or electronically — under strict supervision.' },
  { step:7, title:'Results Declaration', desc:'Official results are announced. Winning candidates are declared based on the electoral system in use.' },
  { step:8, title:'Government Formation', desc:'The winning party or coalition forms the government. Elected officials take their oaths and begin their terms.' }
];

const QUIZ_DATA = [
  { q:'What is the minimum voting age in most democracies?', opts:['16 years','18 years','21 years','25 years'], correct:1, explain:'In most democracies around the world, the minimum voting age is 18 years.' },
  { q:'What is a "ballot" in the context of elections?', opts:['A campaign speech','A voting district','A paper or device used to cast a vote','An election official'], correct:2, explain:'A ballot is the paper, card, or electronic device used by voters to indicate their choice.' },
  { q:'What does "universal suffrage" mean?', opts:['Only educated people can vote','All adult citizens have the right to vote','Voting is optional','Only property owners can vote'], correct:1, explain:'Universal suffrage means that all adult citizens, regardless of wealth, gender, or education, have the right to vote.' },
  { q:'Who is responsible for conducting elections in India?', opts:['The President','The Supreme Court','The Election Commission','The Parliament'], correct:2, explain:'The Election Commission of India is an autonomous constitutional body responsible for administering election processes.' },
  { q:'What is a "constituency"?', opts:['A type of ballot','A geographic area represented by an elected official','A political party','An election result'], correct:1, explain:'A constituency is a defined geographic area whose residents elect a representative to a legislative body.' },
  { q:'What is the purpose of an "exit poll"?', opts:['To register voters','To predict results based on voter surveys after voting','To count the final votes','To announce official results'], correct:1, explain:'Exit polls survey voters after they have cast their ballots to predict election outcomes before official counting.' }
];




/* ===== INITIALIZATION ===== */
document.addEventListener('DOMContentLoaded', () => {
  renderFeatures();
  renderTimeline();
  renderQuickQuestions();
  initChat();
  initQuiz();
  initNavbar();
  initScrollAnimations();
  animateStats();
  initSmoothNav();
});

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  });

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.getElementById('nav-cta').addEventListener('click', () => {
    document.getElementById('features').scrollIntoView({ behavior:'smooth' });
  });

  document.getElementById('hero-start-btn').addEventListener('click', () => {
    document.getElementById('features').scrollIntoView({ behavior:'smooth' });
  });

  document.getElementById('hero-explore-btn').addEventListener('click', () => {
    document.getElementById('timeline').scrollIntoView({ behavior:'smooth' });
  });
}

function initSmoothNav() {
  const links = document.querySelectorAll('.nav-link');
  const sections = ['hero','features','timeline','assistant','quiz'];

  links.forEach(l => l.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  }));

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop - 120 <= window.scrollY) current = id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.dataset.section === current);
    });
  });
}

/* ===== FEATURES ===== */
function renderFeatures() {
  const grid = document.getElementById('features-grid');
  grid.innerHTML = FEATURES.map((f, i) => `
    <div class="feature-card" style="animation:fadeInUp .5s ${i * .1}s ease both">
      <div class="feature-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');
}

/* ===== TIMELINE ===== */
function renderTimeline() {
  const wrapper = document.getElementById('timeline-wrapper');
  wrapper.innerHTML = '<div class="timeline-line"></div>' + TIMELINE.map(t => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-step">Step ${t.step}</span>
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
      </div>
    </div>
  `).join('');
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold:0.15 });

  document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
}

/* ===== STATS COUNTER ===== */
function animateStats() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.dataset.target);
        const isDecimal = el.dataset.decimal === 'true';
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = eased * target;
          el.textContent = isDecimal ? val.toFixed(1) : (target > 999 ? Math.floor(val).toLocaleString() + '+' : Math.floor(val));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      }
    });
  }, { threshold:0.5 });

  document.querySelectorAll('.stat-number').forEach(el => observer.observe(el));
}

/* ===== GEMINI AI CHAT ASSISTANT ===== */
// Backend handles Gemini API keys securely


let conversationHistory = [];

function initChat() {
  addBotMessage("👋 Hi! I'm **ElectEd**, your AI-powered Election Assistant! Ask me anything about the election process, voter registration, electoral systems, or how democracy works. I'm here to help!");
}

function renderQuickQuestions() {
  const quickQs = [
    'How do I register to vote?',
    'Types of elections?',
    'Why is voting important?',
    'How are votes counted?'
  ];
  const container = document.getElementById('quick-questions');
  container.innerHTML = quickQs.map(q => `<button class="quick-q-btn" data-q="${q}">${q}</button>`).join('');
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('quick-q-btn')) {
      handleUserMessage(e.target.dataset.q);
    }
  });
}

async function handleUserMessage(text) {
  if (!text.trim()) return;
  addUserMessage(text);
  document.getElementById('chat-input').value = '';
  document.getElementById('chat-send-btn').disabled = true;

  conversationHistory.push({ role: 'user', parts: [{ text }] });

  const typingEl = addTypingIndicator();

  try {
    const answer = await askGemini(text);
    typingEl.remove();
    addBotMessage(answer);
    conversationHistory.push({ role: 'model', parts: [{ text: answer }] });
  } catch (err) {
    typingEl.remove();
    console.warn('Gemini API unavailable, using local fallback:', err.message);
    const fallback = getLocalAnswer(text);
    addBotMessage(fallback);
    conversationHistory.push({ role: 'model', parts: [{ text: fallback }] });
  }

  document.getElementById('chat-send-btn').disabled = false;
}

async function askGemini(userMessage) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: userMessage,
      history: conversationHistory
    })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `API error ${res.status}`);
  }

  const data = await res.json();
  return data.answer || "I couldn't generate a response. Please try rephrasing your question!";
}

/* ===== LOCAL FALLBACK KNOWLEDGE BASE ===== */
const LOCAL_KB = [
  { keywords:['register','registration','sign up','enroll'], answer:'To register to vote in most countries, you need to:\n\n1️⃣ **Check eligibility** — You must be a citizen and meet the minimum age (18 in most countries including India)\n2️⃣ **Visit** your local election office or the official website (e.g., voters.eci.gov.in in India)\n3️⃣ **Fill out Form 6** (in India) or the equivalent registration form\n4️⃣ **Provide ID proof** — Aadhaar, passport, or other valid documents\n5️⃣ **Submit** before the registration deadline\n\n📱 Many countries including India now offer **online voter registration** for convenience!' },
  { keywords:['minimum age','voting age','age to vote','how old','age limit','age requirement'], answer:'🗳️ The **minimum voting age** varies by country:\n\n• **India** — 18 years (for both male and female, equal for all genders)\n• **USA** — 18 years\n• **UK** — 18 years\n• **Brazil** — 16 years (optional), 18 (mandatory)\n• **Austria** — 16 years\n• **Japan** — 18 years\n\nIn **India**, any citizen who is **18 years or older** on the qualifying date can register to vote, regardless of gender. This was changed from 21 to 18 by the **61st Amendment Act, 1988**.' },
  { keywords:['india','indian election','indian voting','lok sabha','rajya sabha'], answer:'🇮🇳 **Elections in India** are conducted by the **Election Commission of India (ECI)**:\n\n🏛️ **Lok Sabha** (Lower House) — 543 seats, elected directly by voters every 5 years\n🏛️ **Rajya Sabha** (Upper House) — 245 members, elected by state legislators\n📍 **State Assembly** (Vidhan Sabha) — Elected by voters in each state\n🏘️ **Local Body** — Panchayat & Municipal elections\n\n📋 India uses the **First-Past-The-Post (FPTP)** system where the candidate with the most votes wins. India is the **world\'s largest democracy** with over 900 million eligible voters!' },
  { keywords:['evm','electronic voting','voting machine'], answer:'🗳️ **EVM (Electronic Voting Machine)** is used in India for conducting elections:\n\n📌 **What is it?** — A portable electronic device that records votes electronically instead of paper ballots\n📌 **Components** — It has two units: the **Control Unit** (with the officer) and the **Ballot Unit** (in the voting booth)\n📌 **How it works** — Voters press the button next to their chosen candidate\'s name and symbol\n📌 **VVPAT** — A paper trail printer attached to verify the vote was recorded correctly\n\n✅ **Benefits**: Faster counting, no invalid votes, tamper-resistant\n🔒 **Security**: EVMs are standalone devices, not connected to any network, and are rigorously tested' },
  { keywords:['type','types','kind','kinds','different election'], answer:'There are several types of elections:\n\n🗳️ **General Elections** — Held to elect national representatives (e.g., Lok Sabha in India, Congress in USA)\n🏛️ **State/Provincial Elections** — To elect state-level legislators\n🏘️ **Local Elections** — For city, municipal, or panchayat offices\n📋 **By-Elections** — Fill vacant seats between general elections\n🗳️ **Referendums** — Citizens vote on specific policy issues\n🔄 **Primary Elections** — Parties select their candidates (common in USA)\n\nEach type plays a vital role in keeping democracy alive! 🌟' },
  { keywords:['count','counting','tally','result','how votes'], answer:'Vote counting follows a strict process:\n\n1️⃣ **Polls close** at the scheduled time\n2️⃣ **EVMs/Ballots** are sealed and transported to counting centers\n3️⃣ **Counting begins** under official supervision with agents from all parties present\n4️⃣ **Votes are tallied** — In India, EVMs are opened round by round\n5️⃣ **VVPAT verification** — A random sample of paper trails is matched\n6️⃣ **Results verified** and officially declared by the Returning Officer\n\n📊 In India, EVM counting is much faster — results often come within hours! The Election Commission provides **live updates** on its website.' },
  { keywords:['important','why vote','matter','significance','why should'], answer:'Voting is the cornerstone of democracy! Here\'s why it matters:\n\n✅ **Your voice counts** — Every single vote shapes the future of your community and country\n⚖️ **Accountability** — Elected officials answer to voters, not the other way around\n🌍 **Representation** — Ensures diverse voices from all sections of society are heard\n📜 **Hard-won right** — People fought and sacrificed for this privilege\n🔄 **Peaceful change** — Voting is the most powerful tool for bringing change without conflict\n\n💪 Remember: **Your vote is your power!** Not voting means letting others decide your future.' },
  { keywords:['commission','election commission','eci','ec'], answer:'The **Election Commission** is an independent body responsible for conducting elections:\n\n🏛️ **Administering** free and fair elections at all levels\n📋 **Managing** voter registration and electoral rolls\n📅 **Setting** election schedules and enforcing the Model Code of Conduct\n⚖️ **Enforcing** electoral laws and monitoring campaign spending\n📊 **Overseeing** vote counting and result declaration\n\n🇮🇳 In India, the **ECI** was established on **25th January 1950** (celebrated as National Voters\' Day). It is headed by the **Chief Election Commissioner** and operates independently from the government.' },
  { keywords:['constituency','district','ward','seat'], answer:'A **constituency** is a geographic area whose residents elect a representative:\n\n📍 Each constituency elects **one representative** (in FPTP systems like India)\n👥 Boundaries are drawn by the **Delimitation Commission** to ensure roughly equal population\n🔄 Boundaries may be **redrawn** periodically based on census data\n🏛️ Representatives serve and advocate for their constituents in the legislature\n\n🇮🇳 India has **543 Lok Sabha constituencies** and around **4,120+ state assembly constituencies**.' },
  { keywords:['ballot','paper ballot'], answer:'A **ballot** is the method by which a voter indicates their choice:\n\n📝 **Paper ballot** — Traditional method where voters mark their choice on paper\n💻 **Electronic ballot** — Using EVMs or touchscreen machines\n📮 **Postal ballot** — Sent by mail (for military, diplomats, senior citizens in some countries)\n\n🇮🇳 India has largely moved from paper ballots to **EVMs** since 1999, with **VVPAT** paper trail added for verification. Paper ballots are still used in a few special cases.' },
  { keywords:['party','parties','political party','political parties'], answer:'**Political parties** are organized groups that seek to influence government policy:\n\n🏛️ They **nominate candidates** for elections\n📜 They present a **manifesto** outlining their policy positions\n🗳️ Voters choose the party or candidate that aligns with their values\n\n🇮🇳 In India, parties are classified as:\n• **National Parties** — Recognized across India (e.g., BJP, INC, AAP)\n• **State Parties** — Recognized in specific states\n• **Registered Unrecognized Parties** — Registered but not yet recognized\n\nThe **ECI** grants party status based on election performance and organizational requirements.' },
  { keywords:['campaign','rally','manifesto','election campaign'], answer:'**Election campaigns** are organized efforts to win voter support:\n\n📢 **Rallies** — Large public gatherings with speeches\n📺 **Advertisements** — TV, newspaper, and social media campaigns\n🚪 **Door-to-door** canvassing and grassroots outreach\n📜 **Manifestos** — Published policy documents and promises\n🤝 **Debates** — Discussions between candidates on key issues\n\n⚖️ In India, the **Model Code of Conduct** comes into effect once elections are announced, regulating campaign behavior. Campaigning must **stop 48 hours** before polling day.' },
  { keywords:['first time','new voter','young voter','18 year'], answer:'🎉 **Congratulations on becoming a voter!** Here\'s what first-time voters need to know:\n\n1️⃣ **Register** — Apply for a Voter ID (EPIC) using Form 6 online at voters.eci.gov.in\n2️⃣ **Documents needed** — Age proof, address proof, and passport-size photo\n3️⃣ **Find your booth** — Check your polling station on the ECI website or Voter Helpline app\n4️⃣ **On election day** — Carry your Voter ID or any approved photo ID\n5️⃣ **At the booth** — Your finger will be inked, then you enter the booth and press the EVM button\n\n🗳️ **National Voters\' Day** (Jan 25) celebrates new voters. Your vote is your voice — use it wisely!' },
  { keywords:['voter id','epic','voter card','election card'], answer:'📋 **Voter ID (EPIC - Elector\'s Photo Identity Card)** is your key document for voting:\n\n🆔 It contains your **name, photo, address, and unique voter ID number**\n📝 Apply using **Form 6** at voters.eci.gov.in or through the **Voter Helpline App**\n📦 You\'ll receive it after verification by the electoral officer\n\n✅ While Voter ID is the primary ID for voting, you can also use **12 other approved IDs** like Aadhaar, passport, driving license, PAN card, etc.\n\n🔄 To update details, use **Form 8** (correction) or **Form 8A** (address change).' }
];

function getLocalAnswer(query) {
  const q = query.toLowerCase().replace(/[?!.,]/g, '').trim();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of LOCAL_KB) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore >= 3) return bestMatch.answer;

  return "That's a great question! 🤔 I'm currently having trouble connecting to my AI engine, but here are topics I can help with right now:\n\n• **Voter Registration** — How to register, documents needed\n• **Types of Elections** — General, state, local, by-elections\n• **Voting Process** — EVMs, ballot, polling booth steps\n• **Election Commission** — Role, responsibilities\n• **Minimum Voting Age** — Age requirements by country\n• **Indian Elections** — Lok Sabha, Rajya Sabha, ECI\n\nTry asking about any of these topics! 🗳️";
}

function addUserMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg user';
  msgDiv.textContent = text;
  document.getElementById('chat-messages').appendChild(msgDiv);
  scrollChat();
}

function addBotMessage(text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg bot';
  msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  document.getElementById('chat-messages').appendChild(msgDiv);
  scrollChat();
}

function addTypingIndicator() {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-msg bot typing';
  msgDiv.innerHTML = '<div class="dots"><span></span><span></span><span></span></div>';
  document.getElementById('chat-messages').appendChild(msgDiv);
  scrollChat();
  return msgDiv;
}

function scrollChat() {
  const container = document.getElementById('chat-messages');
  container.scrollTop = container.scrollHeight;
}

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  handleUserMessage(document.getElementById('chat-input').value);
});

/* ===== QUIZ ===== */
let quizState = { current:0, score:0, answered:false };

function initQuiz() {
  quizState = { current:0, score:0, answered:false };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const data = QUIZ_DATA[quizState.current];
  const total = QUIZ_DATA.length;
  const card = document.getElementById('quiz-card');
  const progressFill = document.getElementById('quiz-progress-fill');

  progressFill.style.width = `${((quizState.current) / total) * 100}%`;

  card.innerHTML = `
    <div class="quiz-question-num">Question ${quizState.current + 1} of ${total}</div>
    <div class="quiz-question">${data.q}</div>
    <div class="quiz-options" id="quiz-options">
      ${data.opts.map((o, i) => `<button class="quiz-option" data-idx="${i}">${o}</button>`).join('')}
    </div>
    <div id="quiz-feedback-area"></div>
  `;

  quizState.answered = false;

  document.getElementById('quiz-options').addEventListener('click', (e) => {
    if (quizState.answered) return;
    const btn = e.target.closest('.quiz-option');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    handleQuizAnswer(idx);
  });
}

function handleQuizAnswer(idx) {
  quizState.answered = true;
  const data = QUIZ_DATA[quizState.current];
  const options = document.querySelectorAll('.quiz-option');
  const feedbackArea = document.getElementById('quiz-feedback-area');

  options.forEach((o, i) => {
    o.disabled = true;
    if (i === data.correct) o.classList.add('correct');
    if (i === idx && idx !== data.correct) o.classList.add('wrong');
    if (i === idx) o.classList.add('selected');
  });

  const isCorrect = idx === data.correct;
  if (isCorrect) quizState.score++;

  feedbackArea.innerHTML = `
    <div class="quiz-feedback ${isCorrect ? 'correct' : 'wrong'}">
      ${isCorrect ? '🎉 Correct!' : '❌ Not quite.'} ${data.explain}
    </div>
    <button class="quiz-next-btn" id="quiz-next-btn">${quizState.current < QUIZ_DATA.length - 1 ? 'Next Question →' : 'See Results 🎯'}</button>
  `;

  document.getElementById('quiz-next-btn').addEventListener('click', () => {
    quizState.current++;
    if (quizState.current < QUIZ_DATA.length) {
      renderQuizQuestion();
    } else {
      showQuizResults();
    }
  });
}

function showQuizResults() {
  const total = QUIZ_DATA.length;
  const pct = Math.round((quizState.score / total) * 100);
  const progressFill = document.getElementById('quiz-progress-fill');
  progressFill.style.width = '100%';

  let msg;
  if (pct === 100) msg = '🏆 Perfect score! You\'re an election expert!';
  else if (pct >= 70) msg = '🌟 Great job! You know your elections well!';
  else if (pct >= 40) {
    msg = '📚 Good effort! Keep learning to improve!';
  } else {
    msg = '💪 Don\'t worry — explore our lessons and try again!';
  }

  document.getElementById('quiz-card').innerHTML = `
    <div class="quiz-result">
      <div class="quiz-question-num">Quiz Complete!</div>
      <div class="quiz-score"><span class="gradient-text">${quizState.score}/${total}</span></div>
      <div class="quiz-result-msg">${msg}</div>
      <button class="quiz-retry-btn" id="quiz-retry-btn">Try Again 🔄</button>
    </div>
  `;

  document.getElementById('quiz-retry-btn').addEventListener('click', initQuiz);
}
