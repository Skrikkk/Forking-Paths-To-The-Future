/* 小型姜崃漫游 H5 功能Demo · 261013 AMD#35 */
(() => {
  "use strict";

  const APP_VERSION = "261013 AMD#35";
  const STORAGE_KEY = "jianglai-vn-demo-player-v1";
  const LOG_KEY = "jianglai-vn-demo-debug-log-v1";
  const ENDINGS = ["E1", "E2", "E3", "E4"];
  const ABOUT_COPY = '<div class="about-copy"><h3>小径分岔的未来</h3><p class="about-english">Forking Paths To The Future</p><p class="about-motto">“穿过可能性的花园，成为自己。”</p><p>这个游戏的灵感来自于博尔赫斯的短篇小说《小径分岔的花园》：这个故事重要的美学特征之一，就是时间在意识概念中的非线性。我们说出“将来”的时刻，依旧是此刻；我们对于“将来”的祝福，已经是未来。</p><p>游戏共两周目，五个结局。当你完成全部流程，走到花园的出口，会听到一首小小的、轻盈的歌曲（不包括小红书小工具版本）。</p><p>祝大家游玩愉快！</p></div>';
  const SCENE_ART = {
    L: ["1.png", "卢卡"], C: ["2.png", "ChiChi"], S: ["3.png", "学生1"],
    R: ["4.png", "Richard"], A: ["5.png", "阿辽沙"], AN: ["6.png", "安欣"],
    E1: ["3.png", "学生1"], E2: ["4.png", "Richard"], E3: ["5.png", "阿辽沙"], E4: ["6.png", "安欣"],
    E5: ["7.png", "姜崃"],
  };
  // Approved manuscript: 2026-10-12 DOCX; blank paragraphs are page breaks.
  const ENDING_INFO = {
  "E1": {
    "title": "外面的世界很宽广，很大！",
    "html": "<p class=\"manuscript-line\">青春之火燃烧，年轻的心悸动。</p><p class=\"manuscript-line\">你是这样相信的，也因此逃离了。</p><p class=\"manuscript-line\">世界，你好啊！</p>"
  },
  "E2": {
    "title": "大房间归我自己",
    "html": "<p class=\"manuscript-line\">贪婪的占有，命运的合奏。</p><p class=\"manuscript-line\">恶劣迎来了对手，羁绊融化了自由。</p><p class=\"manuscript-line\">或许你也向往高墙外的天空？</p>"
  },
  "E3": {
    "title": "明明是一颗天真的心从未爱过",
    "html": "<p class=\"manuscript-line\">初生的神祇，对人世还一无所知。</p><p class=\"manuscript-line\">可心灵早已做出选择，怜悯如先知。</p><p class=\"manuscript-line\">牵众人的手，行你的路；</p><p class=\"manuscript-line\">我们承诺永不相忘。</p>"
  },
  "E4": {
    "title": "头顶的天空没变过 依然透明",
    "html": "<p class=\"manuscript-line\">再回去选一次，一切仍不会变。</p><p class=\"manuscript-line\">周遭颜色万千，你胆色如从前。</p><p class=\"manuscript-line\">做正义的事吧，结局已经注定：</p><p class=\"manuscript-line\">你一生平凡，你终身灿烂。</p>"
  },
  "E5": {
    "title": "真正的世界",
    "html": "<p class=\"manuscript-line\">花园在姜崃的身后消失，仿佛未曾存在过。</p><p class=\"manuscript-line\">就像每个平常的一天，姜崃回到自己的房间。</p><!--page--><p class=\"manuscript-line\">关上窗，拖了地，做完了猫饭。</p><p class=\"manuscript-line\">把剧本和谱子放进包里。</p><!--page--><p class=\"manuscript-line\">他把猫饭递给猫，“生日蛋糕，分你一块。”</p>"
  }
};

  const STORY = {
  "P1": {
    "name": "初次前言",
    "html": "<p class=\"manuscript-line\">有些没有脚的东西，能比现实走得更远。</p><p class=\"manuscript-line\">我们称之为——孩子的幻想。</p><!--page--><p class=\"manuscript-line\">幻想的光亮澄明，站在此刻就能看到将来。</p><p class=\"manuscript-line\">未曾遍历的远方，离散为分岔的小径；</p><p class=\"manuscript-line\">把所有可能收集，就诞生了诗意的花园。</p><!--page--><p class=\"manuscript-line\">一切开始前，我想给你讲一个传说。</p><!--page--><p class=\"manuscript-line\"><em>在世界上的某个地方，有一名总督辞去了高官厚禄，一心想要写一部伟大的小说。</em></p><p class=\"manuscript-line\"><em>他写了整整十三年，直到被一个不速之客刺杀。</em></p><p class=\"manuscript-line\"><em>它在纸面上落笔的那一刻，就成为了一座人造的、困难的花园。</em></p><!--page--><p class=\"manuscript-line\"><em>小说没人发现，花园也无人问津。</em></p><p class=\"manuscript-line\"><em>这座花园里，时间永远分岔，通向无数的将来。</em></p><!--page--><p class=\"manuscript-line\">从这里向前走，分岔的时间就开始了转动。</p><p class=\"manuscript-line\">那么，现在出发吗？</p>"
  },
  "L": {
    "name": "卢卡",
    "html": "<p class=\"manuscript-line\">卢卡，好名字。</p><p class=\"manuscript-line\">在成为天使以前，我只是一只白色小鸟。</p><p class=\"manuscript-line\">脑仁不大，翅膀可以保温。</p><p class=\"manuscript-line\">面对提问，总是招架不住。</p><!--page--><p class=\"manuscript-line\">想要成为怎样的人——真是复杂的问题。</p><p class=\"manuscript-line\">想要度过怎样的一生——别让一只鸟回答这个。</p><!--page--><p class=\"manuscript-line\">其实我只关心，如果我成为一个人，我会有私人的神吗。</p><p class=\"manuscript-line\">做人会让我获得什么？</p>"
  },
  "C": {
    "name": "ChiChi",
    "html": "<p class=\"manuscript-line\">皮鞋、西装、父亲锃亮的手枪。</p><!--page--><p class=\"manuscript-line\">ChiChi Bochetti，黑手党家族教父的幼子。</p><p class=\"manuscript-line\">……</p><p class=\"manuscript-line\">ChiChi Bochetti，<del>黑手党家族教父的幼子。</del></p><!--page--><p class=\"manuscript-line\">令人闻风丧胆的大反派。</p><p class=\"manuscript-line\">这是我为自己选择的身份。</p><!--page--><p class=\"manuscript-line\">胆小鬼拥有悲伤的结尾，</p><p class=\"manuscript-line\">故事、戏剧，都这么写。</p><p class=\"manuscript-line\">我的命运，没这么写。</p><!--page--><p class=\"manuscript-line\">陀思妥耶夫斯基摔掉了他的笔，我还没走到终点。</p><!--page--><p class=\"manuscript-line\">这一切都因为我捧着一颗花蕊一样珍贵的爱，并决定：</p>"
  },
  "S": {
    "name": "学生1",
    "html": "<p class=\"manuscript-line\">知识是浩如烟海的渴望，是鲜艳欲滴的诅咒。</p><p class=\"manuscript-line\">把人的面孔变得模糊，化开流逝的时间。</p><!--page--><p class=\"manuscript-line\">学生1就是学生1，没有别的姓名。</p><p class=\"manuscript-line\">在教会学校念书时，我们得到善意无私的教导：</p><!--page--><p class=\"manuscript-line\">不必挂念外面的世界。</p><p class=\"manuscript-line\">不能看向外面的世界。</p><p class=\"manuscript-line\">不准肖想外面的世界。</p><p class=\"manuscript-line\">不——</p>"
  },
  "R": {
    "name": "Richard",
    "html": "<p class=\"manuscript-line\">把一只鸟捕进望远镜还不够。</p><p class=\"manuscript-line\">把一只鸟输进大脑也不够。</p><p class=\"manuscript-line\">把一只鸟做成标本还不够。</p><!--page--><p class=\"manuscript-line\">Richard意气风发，Richard心想事成。</p><p class=\"manuscript-line\">Richard是哈佛法学院最有前途的新生。</p><!--page--><p class=\"manuscript-line\">世界是，一座樊笼。</p><p class=\"manuscript-line\">我，戴着镣铐。</p><!--page--><p class=\"manuscript-line\">噢，我记得最开始我是一只</p><p class=\"manuscript-line\">[[BIRD]]。</p><p class=\"manuscript-line\">这时候，你要对我做什么？</p>"
  },
  "A": {
    "name": "阿辽沙",
    "html": "<p class=\"manuscript-line\">拯救一个当街殴打潦倒老人的人，愿他真心为此忏悔。</p><p class=\"manuscript-line\">拯救一个试图和魔鬼抗辩的人，愿他的内心得到宁静。</p><p class=\"manuscript-line\">拯救一个未被世界善待的病人，愿他下世后重获幸福。</p><p class=\"manuscript-line\">拯救一个向我要爱的人……</p><!--page--><p class=\"manuscript-line\">我，阿列克塞·卡拉马佐夫，能做的，只有伸出我的手。</p><!--page--><p class=\"manuscript-line\">如果我的双眼没有看见你，</p><p class=\"manuscript-line\">如果我的心不能被纯洁的激情打动，</p><p class=\"manuscript-line\">如果我不曾流泪、没有犯罪，或者觉得这世界和我没有关系……</p><!--page--><p class=\"manuscript-line\">我无法拯救你。我是在向你要一个回答。</p><p class=\"manuscript-line\">我对于这世界来说，是什么？</p>"
  },
  "AN": {
    "name": "安欣",
    "html": "<p class=\"manuscript-line\">我的脚踩在地面，我的手握住证据和战友。</p><p class=\"manuscript-line\">这一切不是梦：</p><p class=\"manuscript-line\">警察安欣，背负沉重的执念行走。</p><p class=\"manuscript-line\">走得艰难，但还活着。</p><!--page--><p class=\"manuscript-line\">愿望简单，所求不多。</p><p class=\"manuscript-line\">唯一怀念的是，</p><p class=\"manuscript-line\">如果可以，请让我再一次站在这一刻：</p>"
  },
  "P2": {
    "name": "二阶段前言",
    "html": "<p class=\"manuscript-line\">有些没有脚的东西，能比现实走得更远。</p><p class=\"manuscript-line\">我们称之为——孩子的幻想。</p><!--page--><p class=\"manuscript-line\">幻想的光亮澄明，站在将来却看不清此刻。</p><p class=\"manuscript-line\">走遍了分岔的小径，远方之外还有远方；</p><p class=\"manuscript-line\">在诗意的花园中休息，抓住一些飞舞的尘埃。</p><!--page--><p class=\"manuscript-line\">一切开始后，我想再讲一遍这个传说。</p><!--page--><p class=\"manuscript-line\"><em>在世界上的某个地方，有一名总督辞去了高官厚禄，一心想要写一部伟大的小说。</em></p><p class=\"manuscript-line\"><em>他写了整整十三年，直到被一个不速之客刺杀。</em></p><!--page--><p class=\"manuscript-line\"><em>它在纸面上落笔的那一刻，就成为了一座人造的、困难的花园。</em></p><p class=\"manuscript-line\"><em>小说没人发现，花园也无人问津。</em></p><p class=\"manuscript-line\"><em>这座花园里，时间永远分岔，通向无数的将来。</em></p><!--page--><p class=\"manuscript-line\">而你，来到了这里。</p><p class=\"manuscript-line\">这是小径分岔的花园，一个平平无奇的起点。</p><p class=\"manuscript-line\">从这里向前走，永恒的岁月便发生了扰动。</p><p class=\"manuscript-line\">那么，现在出发吗？</p>"
  }
};
  const RICHARD_COPY = STORY.R.html;
  STORY.R.html = () => RICHARD_COPY.replace("[[BIRD]]", state.richardBird ? '<button class="interactive-word bird-action bird-word" data-action="bird">鸟</button>' : '<span class="bird-word">鸟</span>');
  const TE_COPY = {
  "TE_IDENTITY": "<p class=\"manuscript-line\">找到了真正世界的入口，才算穿过了这座可能性的花园。</p><p class=\"manuscript-line\">离开这里后，幻想的魔力就要消失了。</p><!--page--><p class=\"manuscript-line\">结束前的最后一个问题是——</p><p class=\"manuscript-line\"><strong>你最想要成为谁？</strong></p>",
  "TE_EMPTY": "<p class=\"manuscript-line\">没有别的选项了。</p>",
  "TE_LAST": "<p class=\"manuscript-line\">……还有最后一个。</p>",
  "TE_FINAL": "<p class=\"manuscript-line\">你的名字是：姜崃。</p><!--page--><p class=\"manuscript-line\"><strong>你 成 为 你。</strong></p>"
};

  const NODE_NAMES = {
    menu: "主菜单", INTRO: "前言过渡", E5_FINAL:"真正的世界最终画面", P1: "初次前言", L: "卢卡", C: "ChiChi", S: "学生1", R: "Richard", A: "阿辽沙", AN: "安欣", P2: "二阶段前言", TE_IDENTITY: "TE：身份选择", TE_ERASE: "TE：擦除互动", TE_EMPTY: "TE：没有别的选项", TE_LAST: "TE：还有最后一个", TE_YOU: "TE：最后选项", TE_FINAL: "TE：你成为你", E1: "结局1", E2: "结局2", E3: "结局3", E4: "结局4", E5: "真正的世界",
  };

  const app = document.querySelector("#app");
  function sizeInterface() {
    const viewport=window.visualViewport,box=getComputedStyle(document.body);
    const left=parseFloat(box.paddingLeft)||0,top=parseFloat(box.paddingTop)||0;
    const physicalWidth=(viewport&&viewport.scale===1?viewport.width:window.innerWidth)-left-(parseFloat(box.paddingRight)||0);
    const physicalHeight=(viewport&&viewport.scale===1?viewport.height:window.innerHeight)-top-(parseFloat(box.paddingBottom)||0);
    const rotated=physicalHeight>physicalWidth;
    const width=rotated?physicalHeight:physicalWidth,height=rotated?physicalWidth:physicalHeight;
    const stage=Math.min(width,height*16/9,1920),style=document.documentElement.style;
    style.setProperty('--viewport-width',width+'px');style.setProperty('--viewport-height',height+'px');
    style.setProperty('--stage-width',stage+'px');style.setProperty('--stage-unit',stage/100+'px');
    app.style.width=width+'px';app.style.height=height+'px';app.style.left=left+'px';app.style.top=top+'px';
    app.style.transform=rotated?'matrix(0,1,-1,0,'+physicalWidth+',0)':'none';
    app.classList.toggle('host-portrait',rotated);
    app.classList.toggle('short-landscape',height<=540);
    window.GameViewport={rotated:rotated,left:left,top:top,width:width,height:height};
  }
  function gamePoint(x,y) {
    const v=window.GameViewport;
    return v.rotated?{x:y-v.top,y:v.height-(x-v.left)}:{x:x-v.left,y:y-v.top};
  }
  function canvasPoint(point,rect) {
    return window.GameViewport.rotated?[(point.y-rect.top)/rect.height,(rect.right-point.x)/rect.width]:[(point.x-rect.left)/rect.width,(point.y-rect.top)/rect.height];
  }
  sizeInterface();
  window.addEventListener('resize',sizeInterface);
  window.visualViewport?.addEventListener('resize',sizeInterface);
  let storageOK = true;
  let state = loadState();
  let birthdayMusicStarted = !!state.birthdayMusicStarted;
  let debugOpen = false;
  let modal = null;
  let debugProfile = null;
  let debugLogs = loadLogs();
  let toastTimer = null;
  let pageHistory = [];
  let menuView = "cover";
  let introStartedAt = 0, introReady = false, introTimer = null;
  let readingKey = "";
  let revealedLetters = 0;
  let letterTimer = null;
  let finishReading = null;
  let currentPageCount = 1;
  let turnLocked = false;
  let endingTimer=null, endingStartedAt=0, endingReady=false;
  let flowFromEnding=false;
  let foolTimer=null, foolPhase='', foolStartedAt=0;
  const ENDING_DURATION = 7600;
  let keepPageRevealed = false;
  let flowScale = .75;
  let savePage = 0;
  let playClock = Date.now();
  const SLOT_KEY = 'jianglai-vn-save-slots-v1';
  const bgm = document.createElement('audio');
  bgm.id = 'game-bgm'; bgm.loop = true; bgm.preload = 'metadata';
  bgm.setAttribute('aria-hidden','true'); document.body.append(bgm);
  let musicUnlocked = false;
  let musicRequest = null;
  function assetUrl(path) { return window.JIANGLAI_ASSETS?.[path.split('?')[0]] || path; }
  function packedMarkup(html) {
    return window.JIANGLAI_ASSETS ? html.replace(/src="(assets\/[^" ]+)"/g,(_,path)=>`src="${assetUrl(path)}"`) : html;
  }
  function syncMusic() {
    if (['E5','E5_FINAL'].includes(state.node) || state.birthdayMusicStarted) birthdayMusicStarted = true;
    if (birthdayMusicStarted && !state.birthdayMusicStarted) { state.birthdayMusicStarted = true; saveState(); }
    const track = birthdayMusicStarted ? 'true-end' : 'garden';
    if (bgm.dataset.track !== track) {
      bgm.pause(); bgm.src = assetUrl(`assets/audio/${track}.mp3`);
      bgm.dataset.track = track; musicRequest = null;
    }
    const level = Number(state.settings.music);
    bgm.volume = (Number.isFinite(level) ? Math.max(0,Math.min(100,level))/100 : .7) * .45;
    if (bgm.volume === 0) { bgm.pause(); return; }
    if (musicUnlocked && bgm.paused && !musicRequest) {
      const request = {}; musicRequest = request;
      try {
        Promise.resolve(bgm.play()).catch(() => {
          // A blocked autoplay attempt is retried on the next user gesture.
        }).finally(() => { if(musicRequest === request) musicRequest = null; });
      } catch (_) { musicRequest = null; }
    }
  }
  function unlockMusic() { musicUnlocked=true; syncMusic(); }
  document.addEventListener('click',unlockMusic,true);
  document.addEventListener('keydown',event=>{if(['Enter',' ','ArrowRight'].includes(event.key))unlockMusic();},true);
  const flowNode = () => state.node === 'R' && state.richardBird ? 'RB' : state.node === 'A' && state.alyoshaFool ? 'AF' : state.node;
  function visitFlow(id) {
    if (!debugProfile && !state.visited.includes(id)) state.visited.push(id);
  }
  function traceFlow(from, to) {
    if (debugProfile) return;
    const edge = `${from}>${to}`;
    if (!state.seenEdges.includes(edge)) state.seenEdges.push(edge);
    visitFlow(from); visitFlow(to);
  }

  function blankState() {
    return {
      node: "menu",
      resumeNode: null,
      page: 0,
      resumePage: 0,
      endings: [],
      visited: [],
      seenEdges: [],
      chosenChoices: [],
      playedMs: 0,
      secondCoverPending: false,
      birthdayMusicStarted: false,
      richardBird: false,
      alyoshaFool: false,
      teChosen: [],
      erasure: 0,
      nameErasure: null,
      settings: { textSpeed: 65, motion: true, music: 70, sound: 70 },
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      const result = { ...blankState(), ...(saved || {}), settings: { ...blankState().settings, ...(saved?.settings || {}) } };
      if(result.node==='ABOUT_OPENING'){result.node='P1';result.page=0;}
      if(result.resumeNode==='ABOUT_OPENING'){result.resumeNode='P1';result.resumePage=0;}
      result.visited = [...new Set([...(Array.isArray(saved?.visited) ? saved.visited : []), ...(result.endings || []), result.node])];
      result.seenEdges = Array.isArray(saved?.seenEdges) ? saved.seenEdges : [];
      result.chosenChoices = Array.isArray(saved?.chosenChoices) ? saved.chosenChoices : [];
      result.birthdayMusicStarted = typeof saved?.birthdayMusicStarted === 'boolean' ? saved.birthdayMusicStarted : result.visited.includes('E5') || result.visited.includes('E5_FINAL');
      return result;
    } catch (_) {
      storageOK = false;
      return blankState();
    }
  }

  function saveState() {
    const now = Date.now();
    if (!document.hidden && state.node !== 'menu') state.playedMs = (state.playedMs || 0) + now - playClock;
    playClock = now;
    if (debugProfile) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (_) { storageOK = false; }
  }

  function loadLogs() {
    try { return JSON.parse(localStorage.getItem(LOG_KEY)) || []; }
    catch (_) { return []; }
  }

  function saveLogs() {
    try { localStorage.setItem(LOG_KEY, JSON.stringify(debugLogs.slice(-80))); }
    catch (_) { /* Debug history is optional. */ }
  }

  function effectiveEndings() {
    return [...new Set([...(state.endings || []), ...(debugProfile?.endings || [])])];
  }

  function ordinaryEndingComplete() { return ENDINGS.every((id) => effectiveEndings().includes(id)); }
  function isEnding(node) { return Object.prototype.hasOwnProperty.call(ENDING_INFO, node); }
  function log(from, action, to, detail = "") {
    debugLogs.push({ time: new Date().toLocaleTimeString("zh-CN", { hour12: false }), from, action, to, detail });
    debugLogs = debugLogs.slice(-80);
    saveLogs();
  }

  function go(node, { action = "系统", recordEnding = true, remember = true, page = 0, trace = true } = {}) {
    if(node==='ABOUT_OPENING'){node='P1';page=0;}
    flowFromEnding=false;
    const from = state.node;
    if(node!==from){clearTimeout(foolTimer);foolPhase='';}
    const fadingPage = ENDINGS.includes(node) && from !== node && !reducedMotion() ? app.querySelector('.game-stage').cloneNode(true) : null;
    if(ENDINGS.includes(node) || node==='E5_FINAL'){endingStartedAt=Date.now();endingReady=false;}
    if (trace && (action === '开始体验' || action === '鸟' || from.startsWith('TE_') && node !== 'menu')) traceFlow(flowNode(), node);
    visitFlow(node);
    if (remember && from !== node) pageHistory.push({ node: from, page: state.page });
    if (pageHistory.length > 40) pageHistory.shift();
    if (recordEnding && !debugProfile && isEnding(node) && !state.endings.includes(node)) {
      const wasComplete = ordinaryEndingComplete();
      state.endings.push(node);
      if (!wasComplete && ordinaryEndingComplete()) state.secondCoverPending = true;
    }
    if (node === 'INTRO') { introStartedAt = Date.now(); introReady = false; }
    if (node === 'menu' && from !== 'menu') {
      menuView = state.secondCoverPending ? 'cover' : 'menu';
      state.secondCoverPending = false;
    }
    state.node = node;
    if (node === "menu" && from !== "menu") { state.resumeNode = from; state.resumePage = state.page; }
    state.page = page;
    readingKey = "";
    if (node !== "menu") state.resumeNode = null;
    if (node !== "R") state.richardBird = false;
    if (node !== "A") state.alyoshaFool = false;
    if (node !== "TE_IDENTITY") { state.teChosen = []; }
    if (node !== "TE_ERASE" && node !== "menu") { state.erasure = 0; state.nameErasure = null; }
    log(from, action, node);
    saveState();
    render();
    if(fadingPage){fadingPage.className='ending-previous';fadingPage.setAttribute('aria-hidden','true');fadingPage.removeAttribute('data-node');app.querySelector('.game-stage').appendChild(fadingPage);setTimeout(()=>fadingPage.remove(),1000);}
  }

  function dissolveScreen(old,duration) {
    turnLocked=true;
    const overlay=document.createElement('div');overlay.className='screen-dissolve';overlay.setAttribute('aria-hidden','true');
    overlay.style.animationDuration=duration+'ms';overlay.appendChild(old);app.appendChild(overlay);
    setTimeout(()=>{overlay.remove();turnLocked=false;},duration);
  }

  async function beginExperience() {
    birthdayMusicStarted=false;
    state.birthdayMusicStarted=false;
    const target = ordinaryEndingComplete() ? "P2" : "P1";
    state.richardBird = false;
    state.alyoshaFool = false;
    go(target, { action: "开始体验" });
  }

  function choicesFor(node, flags = state) {
    if (node === "P1") return [{ label: "出发吧", to: "L", id: "A01", primary: true }, { label: "我再想想", stay: true, id: "A02" }];
    if (node === "L") return [{ label: "优渥的生活", to: "C", id: "A03" }, { label: "大量的知识", to: "S", id: "A04" }];
    if (node === "C") return [{ label: "控制", to: "R", id: "A05" }, { label: "救赎", to: "A", id: "A06" }];
    if (node === "S") return [{ label: "不可丢弃外面的世界", to: "AN", id: "A07" }, { label: "不许小瞧外面的世界", to: "E1", id: "A08" }];
    if (node === "R") return [{ label: "让我在监狱里被关着吧", to: "E2", id: "A09" }, ...(flags.richardBird ? [] : [{ label: "帮我离开", action: "arm-bird", id: "A10" }])];
    if (node === "A") return [{ label: "一个学生", to: "S", id: "A12" }, { label: flags.alyoshaFool ? "一位愚者" : "一位智者", action: flags.alyoshaFool ? "finish-fool" : "arm-fool", id: flags.alyoshaFool ? "A14" : "A13" }];
    if (node === "AN") return [{ label: "十三岁那一天", to: "C", id: "A15" }, { label: "那个小鱼摊", to: "E4", id: "A16" }];
    if (node === "P2") return [{ label: "出发吧", to: "L", id: "B08", primary: true }, { label: "我再想想", stay: true, id: "B09" }, { label: "我想回去", to: "TE_IDENTITY", id: "B10" }];
    return [];
  }

  function wasChoiceSelected(choice) {
    if (state.chosenChoices.includes(choice.id)) return true;
    const to = choice.stay ? state.node : choice.action === 'arm-bird' ? 'RB' : choice.action === 'arm-fool' ? 'AF' : choice.action === 'finish-fool' ? 'E3' : choice.to;
    const from = state.node === 'R' ? ['R','RB'] : state.node === 'A' ? ['A','AF'] : [state.node];
    return from.some(id=>state.seenEdges.includes(`${id}>${to}`));
  }

  function selectChoice(id) {
    const choice = choicesFor(state.node).find((item) => item.id === id);
    if (!choice) return;
    if (!debugProfile && !state.chosenChoices.includes(id)) state.chosenChoices.push(id);
    traceFlow(flowNode(), choice.stay ? flowNode() : choice.action === 'arm-bird' ? 'RB' : choice.action === 'arm-fool' ? 'AF' : choice.action === 'finish-fool' ? 'E3' : choice.to);
    if (choice.stay) {
      log(state.node, choice.label, state.node, "停留");
      readingKey = ''; keepPageRevealed = false;
      saveState();
      render();
      return;
    }
    if (choice.action === "arm-bird") {
      keepPageRevealed = true;
      state.richardBird = true;
      state.page = splitReadingPages(STORY.R.html(), true).findIndex(page => page.includes('bird-word'));
      log("R", choice.label, "R", "鸟已激活");
      saveState(); render(); showToast("有一个词，似乎在等你。 ");
      return;
    }
    if (choice.action === "arm-fool") {
      if(foolPhase)return;
      const change=()=>{keepPageRevealed=true;state.alyoshaFool=true;log('A',choice.label,'A','智者变为愚者');saveState();foolPhase=reducedMotion()?'':'in';foolStartedAt=Date.now();render();};
      if(reducedMotion()){change();return;}
      foolPhase='out';foolStartedAt=Date.now();
      const option=app.querySelector('[data-choice="A13"]');option.classList.add('fool-out');option.disabled=true;
      foolTimer=setTimeout(()=>{if(state.node==='A')change();else foolPhase='';},240);
      return;
    }
    if (choice.action === "finish-fool") { go("E3", { action: choice.label }); return; }
    if (['P1','P2'].includes(state.node) && choice.to === 'L') {
      go('INTRO', {action:choice.label,trace:false});return;
    }
    go(choice.to, { action: choice.label });
  }

  function render() {
    clearTimeout(introTimer);
    clearTimeout(endingTimer);
    syncMusic();
    clearTimeout(letterTimer);
    finishReading = null;
    const node = state.node;
    const previousContent = app.querySelector(".dialogue-content");
    const previousNode = app.querySelector(".game-stage")?.dataset.node;
    const previousScroll = previousContent?.scrollTop || 0;
    const previousPage = previousContent?.dataset.page;
    app.innerHTML = packedMarkup(`<div class="app-shell"><section class="game-stage" data-node="${escapeHtml(node)}" aria-label="小型姜崃漫游功能Demo">
      ${renderScreen(node)}
    </section></div>
    ${debugOpen ? renderDebugDrawer() : ""}${modal ? renderModal() : ""}`);
    bindEvents();
    const samePage = previousNode === node && previousPage === String(state.page);
    app.querySelector('.book-spread')?.classList.toggle('book-enter', previousNode !== node);
    app.querySelector('.text-page')?.classList.toggle('page-turn', previousNode === node && !samePage);
    app.querySelector('.game-stage')?.classList.toggle('motion-off', state.settings.motion === false);
    if (samePage) {
      const content = app.querySelector(".dialogue-content");
      if (content) content.scrollTop = previousScroll;
    }
    prepareReading();
    const option=app.querySelector(foolPhase==='out'?'[data-choice="A13"]':'[data-choice="A14"]');
    if(foolPhase && option){option.classList.add('fool-'+foolPhase);option.style.setProperty('--fool-elapsed', '-'+(Date.now()-foolStartedAt)+'ms');option.disabled=true;if(foolPhase==='in'){clearTimeout(foolTimer);foolTimer=setTimeout(()=>{foolPhase='';if(option.isConnected){option.classList.remove('fool-in');option.disabled=false;}},Math.max(0,1600-(Date.now()-foolStartedAt)));}}
  }

  function renderScreen(node) {
    if (node === "menu") return renderMenu();
    if (node === 'E5_FINAL') return renderFinalEnding();
    if (node === 'INTRO') return renderIntro();
    if (isEnding(node)) return renderEnding(node);
    if (node === "TE_IDENTITY") return renderIdentity();
    if (node === "TE_ERASE") return renderErase();
    if (node === "TE_EMPTY") return renderClickStage(TE_COPY.TE_EMPTY, "继续", "TE_LAST");
    if (node === "TE_LAST" || node === "TE_YOU") return renderDialoguePage({content:TE_COPY.TE_LAST,controls:'<button class="choice primary" data-next="TE_FINAL">你</button>'});
    if (node === "TE_FINAL") return renderClickStage(TE_COPY.TE_FINAL, "继续", "E5");
    const story = STORY[node];
    if (!story) return renderClickStage("节点不存在。", "返回主菜单", "menu");
    const html = typeof story.html === "function" ? story.html() : story.html;
    const choices = choicesFor(node);
    return renderDialoguePage({
      speaker: speakerFor(node),
      content: html,
      controls: choices.map((choice) => `<button class="choice ${choice.primary ? "primary" : ""} ${choice.label.length <= 3 ? "short-label" : ""} ${wasChoiceSelected(choice) ? "chosen" : ""}" data-choice="${choice.id}" ${wasChoiceSelected(choice) ? 'title="曾选择过"' : ''}>${escapeHtml(choice.label)}</button>`).join(""),
      note: node === "R" && state.richardBird ? "“帮我离开”已经消失。" : node === "A" && state.alyoshaFool ? "称谓已经改变。" : "",
    });
  }

  function renderMenu() {
    if (menuView === "cover") {
      const cover = ordinaryEndingComplete() ? "cover-2.png" : "cover-1.png";
      return `<div class="cover-screen" data-action="open-menu" role="button" tabindex="0" aria-label="点击屏幕以继续"><img class="cover-art" src="assets/covers/${cover}" alt="小型姜崃漫游${ordinaryEndingComplete() ? "二" : "一"}周目封面" /><span class="screen-continue cover-enter">点击屏幕以继续...</span></div>`;
    }
    return `<div class="menu-screen main-menu-screen"><img class="main-menu-art" src="assets/covers/${ordinaryEndingComplete() ? "cover-2.png" : "menu-options.png"}" alt="小型姜崃漫游主界面插画" /><div class="main-menu-utility">${debugOpen ? '<button class="menu-utility-button debug-toggle" data-action="debug">调试</button>' : ""}</div><nav class="main-menu-actions" aria-label="主菜单选项"><button class="main-menu-button" data-action="start"><span class="menu-icon icon-new" aria-hidden="true"></span>新游戏</button><button class="main-menu-button" data-action="continue"><span class="menu-icon icon-continue" aria-hidden="true"></span>继续游戏</button><button class="main-menu-button" data-action="settings"><span class="menu-icon icon-settings" aria-hidden="true"></span>设置</button><button class="main-menu-button" data-action="show-cover"><span class="menu-icon icon-exit" aria-hidden="true"></span>退出游戏</button></nav>${debugProfile && debugOpen ? `<span class="menu-debug-note">调试档：${escapeHtml(debugProfile.label)}（不会写入玩家进度）</span>` : ""}</div>`;
  }

  function renderIntro() {
    if (!introStartedAt) introStartedAt=Date.now();
    const elapsed=Date.now()-introStartedAt, duration=reducedMotion()?0:4700;
    introReady=elapsed>=duration;
    const parts=[[310,0,209,684],[131,797,175,175],[695,122,175,175],[615,393,209,687],[1033,0,209,677],[1345,407,209,673],[1559,0,175,170],[1744,639,175,175]];
    // Artwork crops fade in over a permanent paper ground. No opaque cutout masks.
    const order=[4,1,6,3,0,7,2,5];
    const layers=parts.map(([x,y,w,h],i)=>`<div class="intro-fragment" data-reveal-order="${order[i]}" style="left:${x/19.2}%;top:${y/10.8}%;width:${w/19.2}%;height:${h/10.8}%;animation-delay:${reducedMotion()?-10000:order[i]*550-elapsed}ms"><img class="intro-crop" src="assets/scenes/intro-montage.png" alt="" style="width:${1961/w*100}%;height:${1173/h*100}%;left:${-(x+7)/w*100}%;top:${-(y+58)/h*100}%" /></div>`).join('');
    return `<div class="intro-screen ${reducedMotion()?'intro-still':''}" aria-label="小径分岔的花园过渡画面">${layers}<button class="screen-continue intro-continue" data-action="intro-continue" ${introReady?'':'hidden'}>点击屏幕以继续...</button></div>`;
  }
  function bindIntro() {
    if(state.node!=='INTRO')return;
    const remaining=reducedMotion()?0:Math.max(0,4700-(Date.now()-introStartedAt));
    introTimer=setTimeout(()=>{
      if(state.node!=='INTRO')return;
      introReady=true;
      const prompt=app.querySelector('.intro-continue');if(prompt)prompt.hidden=false;
    },remaining);
  }

  function renderEnding(id) {
    const ending = ENDING_INFO[id];
    if(ENDINGS.includes(id)){
      if(!endingStartedAt)endingStartedAt=Date.now();
      const elapsed=Date.now()-endingStartedAt;
      let lineIndex=0;
      const copy=ending.html.replace(/<p /g,()=>'<p style="--line-delay:'+(lineIndex++*650)+'ms" ');
      return `<section class="ending-cinema ${reducedMotion()?'ending-still':''}" style="--ending-elapsed:-${elapsed}ms" aria-label="${escapeHtml(ending.title)}">
        <div class="ending-paper"></div><div class="ending-composition">
        <img class="ending-cg" src="assets/scenes/ending-${id}.png" alt="${escapeHtml(ending.title)}结局插画" />
        <h1 class="ending-heading">${escapeHtml(ending.title)}</h1>
        <svg class="ending-ornament" viewBox="0 0 500 40" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 20H185C215 20 210 3 198 10S208 34 233 20L250 7L267 20C292 34 312 17 302 10S285 20 315 20H490M70 24H175M325 24H430M223 20Q250 44 277 20M240 20L250 30L260 20L250 10Z"/><path d="M165 20Q186 1 192 16M335 20Q314 1 308 16"/></g></svg>
        <div class="ending-copy">${copy}</div></div>
        <button class="screen-continue ending-continue" data-action="ending-continue" hidden>点击屏幕以继续...</button></section>`;
    }
    return renderDialoguePage({
      speaker: id === "E5" ? "旁白" : "后日谈",
      content: `<p class="ending-number">${id === "E5" ? "TRUE END" : `ENDING ${id.slice(1)}`}</p><h1 class="ending-title">${escapeHtml(ending.title)}</h1><!--page-->${ending.html}`,
      controls: '',
      note: id !== "E5" ? "本结局已记录。" : "真正的世界。",
    });
  }

  function bindEnding(){
    if(!ENDINGS.includes(state.node) && state.node!=='E5_FINAL')return;
    const node=state.node;
    endingTimer=setTimeout(()=>{if(state.node!==node)return;endingReady=true;const prompt=app.querySelector('.ending-continue');if(prompt)prompt.hidden=false;},reducedMotion()?0:Math.max(0,ENDING_DURATION-(Date.now()-endingStartedAt)));
  }
  function renderFinalEnding(){
    if(!endingStartedAt)endingStartedAt=Date.now();
    const elapsed=Date.now()-endingStartedAt;
    return `<section class="ending-cinema final-cinema ${reducedMotion()?'ending-still':''}" style="--ending-elapsed:-${elapsed}ms" aria-label="真正的世界最终画面"><div class="ending-paper"></div><div class="ending-composition"><img class="ending-cg" src="assets/scenes/7.png" alt="姜崃的结尾插画" /><div class="ending-copy"><p style="--line-delay:0ms">睡个好觉</p><p style="--line-delay:650ms">面朝世界</p><p style="--line-delay:1300ms">成为自己</p></div></div><button class="screen-continue ending-continue" data-action="ending-continue" hidden>点击屏幕继续</button></section>`;
  }
  function finishEnding(){
    if(!endingReady || turnLocked)return;
    if(state.node==='E5_FINAL' || ordinaryEndingComplete()){
      const old=reducedMotion()?null:app.querySelector('.app-shell').cloneNode(true);
      if(old){old.querySelector('.ending-cinema').classList.add('ending-still');old.querySelector('.ending-continue').remove();}
      go('menu',{action:'结局完成回主菜单',recordEnding:false,remember:false});menuView='menu';render();if(old)dissolveScreen(old,1400);return;
    }
    const old=app.querySelector('.ending-cinema').cloneNode(true);
    old.classList.add('ending-still');
    const prompt=old.querySelector('.ending-continue');if(prompt)prompt.remove();
    flowFromEnding=true;modal='flow';render();
    if(reducedMotion())return;
    turnLocked=true;
    const overlay=document.createElement('div');overlay.className='ending-flow-fade';overlay.setAttribute('aria-hidden','true');
    overlay.appendChild(old);
    app.appendChild(overlay);
    setTimeout(()=>{overlay.remove();turnLocked=false;},1400);
  }
  function closeModal(){
    if(turnLocked && flowFromEnding)return;
    const returnHome=flowFromEnding;
    modal=null;
    if(returnHome){flowFromEnding=false;go('menu',{action:'关闭结局流程图',recordEnding:false,remember:false});menuView='menu';render();}
    else render();
  }
  function fitIllustration(){
    const paper=app.querySelector('.art-paper'),img=app.querySelector('.scene-art');
    if(!paper||!img||!img.naturalWidth)return;
    const area=paper.parentElement,ratio=img.naturalWidth/img.naturalHeight;
    const width=Math.min(area.clientWidth*.96,area.clientHeight*.94*ratio);
    paper.style.width=width+'px';paper.style.height=(width/ratio)+'px';
  }
  window.addEventListener('resize',fitIllustration);

  function renderIdentity() {
    const items = [["luca", "卢卡", "天真是轻盈的"], ["chichi", "ChiChi", "爱恨是杂陈的"], ["student", "学生1", "年轻是痛苦的"], ["richard", "Richard", "骄矜是狂喜的"], ["alyosha", "阿辽沙", "怜悯是酸楚的"], ["anxin", "安欣", "信仰是沉郁的"]];
    return renderDialoguePage({
      speaker: "旁白",
      content: TE_COPY.TE_IDENTITY,
      controls: `<div class="identity-grid">${items.map(([id, name, changed]) => `<button class="identity ${state.teChosen.includes(id) ? "changed" : ""}" data-identity="${id}" ${state.teChosen.includes(id) ? "disabled" : ""}>${state.teChosen.includes(id) ? changed : name}</button>`).join("")}</div>`,
      note: state.teChosen.length === 6 ? "点击名字以外的位置继续。" : "每一个身份都需要被看见。",
    });
  }

  const ERASE_NAMES = ['卢卡','ChiChi','学生1','Richard','阿辽沙','安欣'];
  function eraseState() {
    if (!state.nameErasure) state.nameErasure = { active: null, done: [], strokes: {} };
    return state.nameErasure;
  }
  function renderErase() {
    const ink = eraseState();
    return renderDialoguePage({
      content: '<p>那些名字已经说完了。</p><p>现在，请把它们从这里擦去。</p>',
      controls: `<div class="erase-area" data-erase><div class="erase-names">${ERASE_NAMES.map((name,i)=>`<canvas class="erase-name" data-erase-name="${i}" tabindex="${ink.done.includes(i)?-1:0}" role="button" aria-label="擦去${name}，按住拖动；键盘空格逐渐擦除"></canvas>`).join('')}</div><p class="erase-status" aria-live="polite"></p></div>`,
      note: '按住一次即可连续擦过所有名字。键盘可聚焦名字并按空格。',
    });
  }

  function renderClickStage(copy, button, next, title = "") {
    return renderDialoguePage({ speaker: title || "旁白", content: copy.startsWith("<") ? copy : `<p>${copy}</p>`, controls: state.node.startsWith('TE_') ? '' : `<button class="choice primary" data-next="${next}">${escapeHtml(button)}</button>` });
  }

  function usesScreenAdvance() {
    return ['P1','P2','TE_IDENTITY','TE_ERASE','TE_EMPTY','TE_FINAL','E5'].includes(state.node);
  }
  function nextScreenNode() {
    if (state.node === 'TE_ERASE' && eraseState().done.length === 6) return 'TE_EMPTY';
    if (state.node === 'TE_IDENTITY' && state.teChosen.length === 6) return 'TE_ERASE';
    return {TE_EMPTY:'TE_LAST',TE_FINAL:'E5',E5:'E5_FINAL'}[state.node];
  }

  function renderDialoguePage({ speaker, content, controls = "", note = "" }) {
    note="";
    const pages = splitReadingPages(content, true, false, controls, note);
    currentPageCount = pages.length;
    state.page = Math.max(0, Math.min(Number.isInteger(state.page) ? state.page : 0, pages.length - 1));
    content = pages[state.page];
    const lastPage = state.page === pages.length - 1;
    const art = SCENE_ART[state.node];
    const image = art
      ? `<div class="art-paper" data-action="view-art" role="button" tabindex="0" aria-label="放大查看${escapeHtml(art[1])}插画"><div class="art-deckle"><img class="scene-art" src="assets/scenes/${art[0]}" alt="${escapeHtml(art[1])}的剧情插画" /></div></div>`
      : `<div class="scene-placeholder" aria-hidden="true"><span>小径分岔的花园</span></div>`;
    return `<div class="play-area book-view ${["P1", "P2"].includes(state.node) ? "preface-view" : ""} ${usesScreenAdvance()?'screen-advance':''} ${state.node==='TE_IDENTITY' && state.teChosen.length<6?'identity-pending':''}">${["P1","P2"].includes(state.node)?"":`<nav class="book-rail" aria-label="游戏操作">
      <button class="nav-tab nav-save" data-action="save" aria-label="存档" title="存档">存档</button>
      <button class="nav-tab nav-read" data-action="flow" aria-label="读档" title="读档">读档</button>
      <button class="nav-tab nav-settings" data-action="settings" aria-label="设置" title="设置">设置</button>
      <button class="nav-tab nav-about" data-action="about" aria-label="关于" title="关于">关于</button>
      <button class="nav-tab nav-exit" data-action="menu" aria-label="退出到主菜单" title="退出到主菜单">退出</button>


      ${debugOpen ? '<button class="rail-button debug-toggle" data-action="debug" aria-label="调试" title="调试">⌘</button>' : ""}
      <span class="node-label">${escapeHtml(NODE_NAMES[state.node] || state.node)}</span></nav>`}
      <div class="book-spread"><button class="page-back page-curl" data-action="back" aria-label="返回上一剧情页" title="返回上一页" ${state.page || pageHistory.length ? "" : "disabled"}><svg viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs><linearGradient id="curl-paper" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#e5ddcf"/><stop offset=".5" stop-color="#faf7ef"/><stop offset="1" stop-color="#b5a994"/></linearGradient></defs><path class="curl-shadow" d="M0 0Q26 32 64 64H0Z"/><path class="curl-paper" d="M0 0Q13 38 64 64Q30 61 0 64Z" fill="url(#curl-paper)"/><path class="curl-arrow" d="M16 44Q24 30 40 38M17 34L16 44L26 44"/></svg></button><div class="book-page illustration-page">${image}${art ? '<button class="art-zoom" data-action="view-art" aria-label="放大查看插画"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M10.5 8v5M8 10.5h5"/></svg></button>' : ""}</div>
      <section class="book-page text-page" aria-label="剧情与选项">
      <div class="dialogue-content story-copy" data-page="${state.page}">${content}</div><div class="dialogue-controls" aria-label="选项">${lastPage ? controls : ""}</div><div class="reading-navigation"><button class="btn small" data-action="read-next">${lastPage ? "显示全文" : "下一页 →"}</button></div></section>${usesScreenAdvance()?`<span class="screen-continue reading-hint" hidden>${state.node==='TE_ERASE'?(eraseState().done.length===6?'点击屏幕继续':'按住并擦除名字'):'点击屏幕继续'}</span>`:''}</div></div>`;
  }

  // DOCX blank paragraphs set the reading rhythm; small screens may split a group
  // further at its original line boundaries, keeping every line reachable.
  function splitReadingPages(html, paginate, mergeTail = false, controls = "", note = "") {
    if (!paginate) return [html];
    const source = html.split('<!--page-->').filter(Boolean);
    if (!app.clientWidth) return source;
    const probe = document.createElement('div');
    probe.className = 'play-area book-view ' + (['P1','P2','ABOUT_OPENING'].includes(state.node) ? 'preface-view' : '');
    probe.setAttribute('aria-hidden','true');
    probe.style.cssText = 'position:absolute;left:-100000px;top:0;visibility:hidden;pointer-events:none;width:var(--stage-width);height:calc(var(--stage-width)*.5625);';
    probe.innerHTML = '<section class="book-page text-page"><div class="dialogue-content story-copy"></div><div class="dialogue-controls"></div><div class="choice-note"></div><div class="reading-navigation"><span>1 / 1</span></div></section>';
    app.append(probe);
    const copy=probe.querySelector('.dialogue-content'),options=probe.querySelector('.dialogue-controls'),hint=probe.querySelector('.choice-note');
    const template=document.createElement('template'),pages=[];
    source.forEach((page,index)=>{
      options.innerHTML=index===source.length-1?controls:'';
      hint.textContent=index===source.length-1?note:'';
      template.innerHTML=page;
      let group='';
      Array.from(template.content.children).forEach(element=>{
        copy.innerHTML=group+element.outerHTML;
        if(group && copy.scrollHeight>copy.clientHeight+2){pages.push(group);group='';}
        group+=element.outerHTML;
      });
      if(group)pages.push(group);
    });
    probe.remove();
    return pages.length?pages:source;
  }

  function reducedMotion() {
    return state.settings.motion === false || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function prepareReading() {
    const content = app.querySelector('.dialogue-content');
    if (!content) { readingKey = ''; return; }
    const key = `${state.node}:${state.page}:${content.innerHTML}`;
    const newReadingPage = readingKey !== key;
    if (newReadingPage) { readingKey = key; revealedLetters = 0; }
    const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('zh', { granularity: 'grapheme' }) : null;
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    const letters = [];
    const inlineButtons = Array.from(content.querySelectorAll('button'));
    const syncInline = () => inlineButtons.forEach(button => { button.disabled = !!button.querySelector('.unrevealed'); });
    for (const node of textNodes) {
      const fragment = document.createDocumentFragment();
      const units = segmenter ? Array.from(segmenter.segment(node.textContent), item => item.segment) : Array.from(node.textContent);
      for (const unit of units) {
        const span = document.createElement('span'); span.textContent = unit;
        span.className = 'reading-letter'; fragment.append(span); letters.push(span);
      }
      node.replaceWith(fragment);
    }
    const controls = app.querySelector('.dialogue-controls');
    if (keepPageRevealed) { revealedLetters=letters.length; keepPageRevealed=false; }
    const button = app.querySelector('[data-action="read-next"]');
    const complete = () => {
      clearTimeout(letterTimer);
      revealedLetters = letters.length;
      letters.forEach(letter => letter.classList.remove('unrevealed'));
      syncInline();
      const revealOptions = controls.hidden;
      controls.hidden = false;
      if ((revealOptions || newReadingPage) && !reducedMotion()) controls.classList.add('options-enter');
      button.hidden = state.page === currentPageCount - 1;
      button.textContent = '下一页 →';
      finishReading = null;
      app.querySelector('.book-view').classList.add('reading-complete');
      const hint=app.querySelector('.reading-hint');
      if(hint)hint.hidden=state.node==='TE_IDENTITY'?state.teChosen.length<6:state.node==='TE_ERASE'?false:state.page===currentPageCount-1 && !nextScreenNode();

    };
    letters.forEach((letter, index) => letter.classList.toggle('unrevealed', index >= revealedLetters));
    if (reducedMotion() || state.settings.textSpeed >= 100 || revealedLetters >= letters.length || document.hidden) { complete(); return; }
    syncInline();
    controls.hidden = true;
    button.hidden = false;
    button.textContent = '显示全文';
    finishReading = complete;
    if (modal || debugOpen) return;
    const tick = () => {
      if (document.hidden) { complete(); return; }
      const letter = letters[revealedLetters++];
      letter?.classList.remove('unrevealed');
      syncInline();
      if (revealedLetters >= letters.length) { complete(); return; }
      const delay = 65 - Math.max(0, Math.min(100, Number(state.settings.textSpeed) || 0)) * .5;
      letterTimer = setTimeout(tick, /[，。！？；…]/.test(letter?.textContent || '') ? delay + 90 : delay);
    };
    letterTimer = setTimeout(tick, 25);
  }

  function advanceReading() {
    if (modal || debugOpen || turnLocked) return;
    if (ENDINGS.includes(state.node) || state.node==='E5_FINAL'){finishEnding();return;}
    if (state.node==='INTRO') {if(introReady)go('L',{action:'过渡展示完成，进入正文',trace:false});return;}
    if (finishReading) { finishReading(); return; }
    if (state.page >= currentPageCount - 1) {
      const next = nextScreenNode();
      if (next) {
        turnLocked=true;
        go(next,{action:state.node==='TE_IDENTITY'?'六项身份完成，点击继续':'点击屏幕继续'});
        setTimeout(()=>{turnLocked=false;},260);
      }
      return;
    }
    turnLocked = true;
    state.page++; saveState(); render();

    setTimeout(() => { turnLocked = false; }, reducedMotion() ? 0 : 260);
  }

  function speakerFor(node) {
    return ({ P1: "旁白", P2: "旁白", L: "卢卡", C: "ChiChi", S: "学生1", R: "Richard", A: "阿辽沙", AN: "安欣" })[node] || "旁白";
  }

  function renderDebugDrawer() {
    const options = Object.entries(NODE_NAMES).map(([id, label]) => `<option value="${id}" ${state.node === id ? "selected" : ""}>${id}｜${escapeHtml(label)}</option>`).join("");
    const viewState = { node: state.node, playerEndings: state.endings, effectiveEndings: effectiveEndings(), richardBird: state.richardBird, alyoshaFool: state.alyoshaFool, teChosen: state.teChosen, erasure: Math.round(state.erasure), debugProfile: debugProfile?.label || null, storageOK };
    return `<aside class="drawer" aria-label="开发调试面板"><div class="drawer-header"><h2>开发调试</h2>${ornamentalClose("调试面板", "", "debug")}</div>
      <p class="status-warn">调试跳转和预设档不会写入玩家结局。当前运行的是同一套剧情播放器。</p>
      <section class="debug-section"><h3>跳到节点</h3><select class="debug-select" id="debug-node">${options}</select><p><button class="btn small" data-action="debug-jump">跳转（不记录结局）</button></p></section>
      <section class="debug-section"><h3>测试进度</h3><div class="debug-grid"><button class="debug-button" data-profile="new">新玩家</button><button class="debug-button" data-profile="missing-e4">只差结局4</button><button class="debug-button" data-profile="all">收齐普通结局</button><button class="debug-button" data-profile="te">TE进行中</button><button class="debug-button" data-action="debug-normal">恢复玩家档</button><button class="debug-button" data-action="reload-scene">重载当前场景</button></div></section>
      <section class="debug-section"><h3>当前状态</h3><pre class="state-box">${escapeHtml(JSON.stringify(viewState, null, 2))}</pre></section>
      <section class="debug-section"><h3>辅助</h3><div class="debug-grid"><button class="debug-button" data-action="show-hitboxes">显示点击区域</button><button class="debug-button" data-action="copy-log">复制路由日志</button><button class="debug-button" data-action="clear-log">清空日志</button><button class="debug-button" data-action="simulate-storage">模拟存档失败</button></div></section>
      <section class="debug-section"><h3>路由日志</h3><pre class="log-box">${escapeHtml(debugLogs.map((row) => `${row.time}  ${row.from} --[${row.action}]--> ${row.to}${row.detail ? ` (${row.detail})` : ""}`).join("\n") || "暂无操作")}</pre></section>
      <section class="debug-section"><h3>玩家数据</h3><button class="btn small danger" data-action="reset-player">重置全部玩家进度</button></section>
    </aside>`;
  }

  function ornamentalClose(label, extra = '', action = 'close-modal') {
    return `<button class="modal-close ${extra}" data-action="${action}" aria-label="关闭${label}" title="关闭"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button>`;
  }
  function renderModal() {
    if (modal === 'flow') return renderFlow();
    if (modal === 'save') return renderSave();
    if (modal === "about" || modal === "help" || modal === "load") {
      const titles = { about: "关于", help: "帮助", load: "读档" };
      const saved = loadState();
      const savedNode = saved.resumeNode || saved.node;
      const copy = modal === "about" ? ABOUT_COPY
        : modal === "help" ? '<p>点击正文可显示本页全文，再点击或选择“下一页”翻页。</p><p>选项在最后一页出现。左下返回按钮可回到上一页；放大镜可查看完整插画。</p><p>进度自动保存在当前浏览器。可以在设置中调整文字速度、关闭动效。</p>'
        : savedNode && savedNode !== "menu" ? `<p>最近进度：${escapeHtml(NODE_NAMES[savedNode] || savedNode)}</p><button class="btn primary" data-action="load-player">继续游戏</button>` : '<p>还没有可读取的进度。</p>';
      return `<div class="modal-backdrop" data-action="close-modal"><section class="modal book-modal" role="dialog" aria-modal="true" aria-label="${titles[modal]}">${ornamentalClose(titles[modal])}<div class="modal-header"><h2>${titles[modal]}</h2></div>${copy}</section></div>`;
    }
    if (modal === "art") {
      const art = SCENE_ART[state.node];
      if (!art) return "";
      return `<div class="art-viewer-backdrop" data-action="close-modal"><section class="art-viewer" role="dialog" aria-modal="true" aria-label="${escapeHtml(art[1])}插画放大查看">${ornamentalClose("插画", "art-viewer-close")}<img data-action="close-modal" src="assets/scenes/${art[0]}" alt="${escapeHtml(art[1])}的剧情插画，点击返回" /></section></div>`;
    }
    if (modal === "endings") {
      const all = ["E1", "E2", "E3", "E4", "E5"];
      return `<div class="modal-backdrop" data-action="close-modal"><section class="modal" role="dialog" aria-modal="true" aria-label="结局回看"><div class="modal-header"><h2>结局回看</h2>${ornamentalClose("结局回看")}</div><div class="ending-list">${all.map((id) => { const unlocked = effectiveEndings().includes(id); return `<div class="ending-row ${unlocked ? "" : "locked"}"><div><strong>${id}</strong>　${unlocked ? escapeHtml(ENDING_INFO[id].title) : "尚未解锁"}</div>${unlocked ? `<button class="btn small" data-ending-view="${id}">查看</button>` : ""}</div>`; }).join("")}</div></section></div>`;
    }
    if (modal === "settings") return `<div class="modal-backdrop" data-action="close-modal"><section class="modal book-modal" role="dialog" aria-modal="true" aria-label="设置">${ornamentalClose('设置')}<div class="modal-header"><h2>设置</h2></div><p class="music-caption">当前音乐：${state.node==='E5'?'はっぴいばあすでいつーゆー':'小径分叉的世界 2.1'}</p>${rangeRow("音乐音量", "music", state.settings.music)}<label class="settings-row"><span>翻页与进字动效</span><input type="checkbox" data-setting="motion" ${state.settings.motion !== false ? "checked" : ""}></label>${rangeRow("文字速度", "textSpeed", state.settings.textSpeed)}</section></div>`;
    return "";
  }

  function readSlots() {
    try { const slots=JSON.parse(localStorage.getItem(SLOT_KEY)); return Array.isArray(slots)?slots.slice(0,6):[]; }
    catch (_) { return []; }
  }
  function renderSave() {
    const slots=readSlots();
    return `<div class="modal-backdrop save-backdrop" data-action="close-modal"><section class="save-modal" role="dialog" aria-modal="true" aria-label="存档"><header>${ornamentalClose("存档")}</header><div class="save-grid">${[savePage*2,savePage*2+1].map(index=>{
      const slot=slots[index],target=slot?.state.resumeNode||slot?.state.node,seconds=Math.floor((slot?.state.playedMs||0)/1000);
      return `<article class="save-slot ${slot?'filled':''}"><span class="slot-number">存档 ${index+1}</span><h3>${slot?escapeHtml(NODE_NAMES[target]||target):'点击存档'}</h3><hr/><p>${slot?`${Math.floor(seconds/60)}′${String(seconds%60).padStart(2,'0')}″ · 第 ${(slot.state.resumeNode?slot.state.resumePage:slot.state.page)+1} 页`:'记录此刻的小径'}</p><div>${slot?`<button data-slot-load="${index}">读取</button>`:''}<button data-slot-save="${index}" ${debugProfile?'disabled':''}>${slot?'覆盖存档':'保存至存档 '+(index+1)}</button></div>${slot?`<small>${escapeHtml(new Date(slot.date).toLocaleString('zh-CN'))}</small>`:''}</article>`;
    }).join('')}</div><nav class="save-pages" aria-label="存档分页">${[0,1,2].map(i=>`<button data-save-page="${i}" aria-current="${i===savePage?'page':'false'}">${i+1}</button>`).join('')}</nav><p class="save-hint">${debugProfile?'调试状态不写入手动存档。':'存档保存在当前浏览器，读取时保留已收集的结局。'}</p></section></div>`;
  }
  function bindSave() {
    app.querySelectorAll('[data-save-page]').forEach(button=>button.addEventListener('click',()=>{savePage=Number(button.dataset.savePage);render();}));
    app.querySelectorAll('[data-slot-save]').forEach(button=>button.addEventListener('click',()=>{
      if(debugProfile)return;
      saveState();const slots=readSlots(),index=Number(button.dataset.slotSave);
      const previous=slots[index];slots[index]={date:new Date().toISOString(),state:JSON.parse(JSON.stringify(state)),previous:previous?{date:previous.date,state:previous.state}:null};
      try {localStorage.setItem(SLOT_KEY,JSON.stringify(slots));render();showToast('存档已保存。');}catch(_){showToast('存档未保存：浏览器存储不可用或空间不足。');}
    }));
    app.querySelectorAll('[data-slot-load]').forEach(button=>button.addEventListener('click',()=>{
      const slot=readSlots()[Number(button.dataset.slotLoad)];if(!slot)return;
      const current=loadState(),saved=slot.state;
      state={...blankState(),...JSON.parse(JSON.stringify(saved)),settings:current.settings,birthdayMusicStarted:birthdayMusicStarted||current.birthdayMusicStarted,endings:[...new Set([...current.endings,...saved.endings])],visited:[...new Set([...current.visited,...saved.visited])],seenEdges:[...new Set([...current.seenEdges,...saved.seenEdges])],chosenChoices:[...new Set([...current.chosenChoices,...(saved.chosenChoices||[])])]};
      debugProfile=null;modal=null;pageHistory=[];playClock=Date.now();
      const target=state.resumeNode||state.node,page=state.resumeNode?state.resumePage:state.page;
      go(target,{page,recordEnding:false,remember:false,trace:false,action:'读取手动存档'});
    }));
  }

  function flowLayout() {
    // Reveal one outgoing frontier from reached chapters, without revealing its descendants.
    // Returning routes end in forward reference cards rather than backward arrows.
    const layout=[['E5',5,0],['L',1,400],['C',2,280],['S',2,710],
      ['R',3,210],['A',3,450],['AN',3,890],['E2',5,210],['E3',5,450],['E1',5,710],['E4',5,890]];
    const specs=Object.fromEntries(layout.map(([id,col,y])=>[id,{id,key:id,x:40+col*380,y:y+35,unlocked:flowAllowed(id),label:id==='P2'?'二周目分支':NODE_NAMES[id]}]));
    const nodes=layout.filter(([id])=>flowAllowed(id)).map(([id])=>({...specs[id]}));
    const connections=[];
    const routes=layout.flatMap(([id])=>choicesFor(id,{richardBird:false,alyoshaFool:false})
      .filter(choice=>!choice.stay&&choice.action!=='arm-bird')
      .map(choice=>[id,choice.action==='arm-fool'?'E3':choice.to==='TE_IDENTITY'?'E5':choice.to,choice.label]));
    for (const [from,to,label] of routes) {
      const source=nodes.find(n=>n.key===from);
      if(!source?.unlocked) continue;
      let target=nodes.find(n=>n.key===to);
      if (!target) {target={...specs[to]};nodes.push(target);}
      if(target.x<=source.x) {
        target={...target,key:from+'-return-'+to,x:source.x+380,y:source.y+180,reference:true};
        nodes.push(target);
      }
      connections.push({from:source.key,to:target.key,label});
    }
    nodes.connections=connections;
    return nodes;
  }
  function flowEdges() {
    const edges = [];
    for (const node of ['P1','L','C','S','R','A','AN','P2','RB','AF']) {
      const actual = node === 'RB' ? 'R' : node === 'AF' ? 'A' : node;
      for (const choice of choicesFor(actual, { richardBird: node === 'RB', alyoshaFool: node === 'AF' })) {
        const to = choice.stay ? node : choice.action === 'arm-bird' ? 'RB' : choice.action === 'arm-fool' ? 'AF' : choice.action === 'finish-fool' ? 'E3' : choice.to;
        edges.push({ from: node, to, label: choice.label });
      }
    }
    for (const [from,to,label] of [ ['menu','P1','初次出发'],['menu','P2','收齐普通结局'],['RB','menu','点击「鸟」'],
      ['TE_IDENTITY','TE_ERASE','六项身份完成'],['TE_ERASE','TE_EMPTY','逐个擦完六个名字后点击屏幕'],['TE_EMPTY','TE_LAST','继续'],
      ['TE_LAST','TE_FINAL','你'],['TE_FINAL','E5','继续'] ]) edges.push({from,to,label});
    return edges;
  }
  function flowAllowed(id) {
    if (id === 'menu') return true;
    if (isEnding(id)) return effectiveEndings().includes(id);
    if (id === 'P2' || id === 'TE_IDENTITY') return ordinaryEndingComplete();
    if (id.startsWith('TE_')) return ordinaryEndingComplete() && state.visited.includes(id);
    return state.visited.includes(id);
  }
  function flowLabel(label,x,y) {
    const lines=Array.from(label).join('').match(/.{1,7}/gu)||[''];
    return `<text style="font-size:${Math.max(20,16/flowScale)}px" x="${x}" y="${y}" text-anchor="middle">${lines.map((line,i)=>`<tspan x="${x}" dy="${i?'1.15em':lines.length>1?'-.6em':'0'}">${escapeHtml(line)}</tspan>`).join('')}</text>`;
  }
  function renderFlow() {
    const nodes=flowLayout(), byKey=Object.fromEntries(nodes.map(n=>[n.key,n]));
    const width=Math.max(1000,...nodes.map(n=>n.x+265)),height=Math.max(320,...nodes.map(n=>n.y+175));
    const lines=nodes.connections.map(edge=>{const a=byKey[edge.from],n=byKey[edge.to],sx=a.x+220,sy=a.y+75,tx=n.x,ty=n.y+75;return `<g class="flow-edge seen"><path d="M${sx},${sy} C${sx+35},${sy} ${tx-35},${ty} ${tx},${ty}"/>${flowLabel(edge.label,(sx+tx)/2,(sy+ty)/2-10)}</g>`;}).join('');
    const currentKey=state.node==='R'?'R':state.node==='A'?'A':state.node.startsWith('TE_')?'P2':state.node;

    return `<div class="modal-backdrop flow-backdrop" data-action="close-modal"><section class="flow-modal" role="dialog" aria-modal="true" aria-label="读档流程图"><header class="flow-header"><div><h2>分岔的小径</h2></div>${ornamentalClose("流程图", "flow-close")}</header><nav class="flow-tools" aria-label="流程图缩放"><button data-flow-zoom="out" aria-label="缩小流程图">−</button><output class="flow-percent">${Math.round(flowScale*100)}%</output><button data-flow-zoom="in" aria-label="放大流程图">＋</button><button data-flow-zoom="fit">适应宽度</button><button data-flow-zoom="current">定位当前</button><button data-action="save">存档列表</button></nav><div class="flow-viewport" tabindex="0" aria-label="可滚动分支图"><div class="flow-map" data-width="${width}" data-height="${height}" style="width:${width*flowScale}px;height:${height*flowScale}px"><div class="flow-scene" style="width:${width}px;height:${height}px;transform:scale(${flowScale})"><svg class="flow-lines" style="width:${width}px;height:${height}px" viewBox="0 0 ${width} ${height}" aria-hidden="true">${lines}</svg>${nodes.map(n=>{const art=SCENE_ART[n.id];const src=art?`assets/scenes/${art[0]}`:`assets/covers/${n.id==='P2'?'cover-2.png':'cover-1.png'}`;const label=n.unlocked?n.label:'？';return `<button class="flow-node ${currentKey===n.id?'current':''} ${n.unlocked?'visited':'unknown'} ${n.reference?'reference':''}" style="left:${n.x}px;top:${n.y}px" data-flow-node="${n.id}" ${n.unlocked?'':'disabled'} aria-label="${n.unlocked?'进入'+escapeHtml(label):'未探索的分支'}">${n.unlocked?`<img src="${src}" alt=""/>`:'<div class="flow-mystery" aria-hidden="true">?</div>'}<span>${escapeHtml(label)}</span></button>`;}).join('')}</div></div></div></section></div>`;
  }
  function enterFlow(id) {
    if (!flowAllowed(id)) return;
    modal = null;
    const target = id === 'RB' ? 'R' : id === 'AF' ? 'A' : id;
    state.richardBird = id === 'RB'; state.alyoshaFool = id === 'AF';
    if (id === 'TE_IDENTITY') state.teChosen = [];
    if (id === 'TE_ERASE') { state.erasure = 0; state.nameErasure = null; }
    const html = STORY[target]?.html;
    const routePages = id === 'RB' || id === 'AF' ? splitReadingPages(typeof html==='function'?html():html,true) : [];
    const page = id === 'RB' ? routePages.findIndex(page=>page.includes('bird-word')) : id === 'AF' ? routePages.length-1 : 0;
    visitFlow(id);
    go(target,{action:'流程图进入章节',recordEnding:false,trace:false,page});
  }
  function bindFlow() {
    app.querySelectorAll('[data-flow-node]').forEach(button=>button.addEventListener('click',()=>enterFlow(button.dataset.flowNode)));
    const viewport=app.querySelector('.flow-viewport');
    if (!viewport) return;
    const map=app.querySelector('.flow-map'),scene=app.querySelector('.flow-scene');
    const width=Number(map.dataset.width),height=Number(map.dataset.height);
    const pointers=new Map();let drag=null,pinch=null,suppressClick=false;
    const localPoint=event=>{
      const rect=viewport.getBoundingClientRect(),point=canvasPoint({x:event.clientX,y:event.clientY},rect);
      return {x:point[0]*viewport.clientWidth,y:point[1]*viewport.clientHeight};
    };
    function setPan(x,y) {
      viewport.scrollLeft=Math.max(0,Math.min(Math.max(0,width*flowScale-viewport.clientWidth),x));
      viewport.scrollTop=Math.max(0,Math.min(Math.max(0,height*flowScale-viewport.clientHeight),y));
    }
    function zoom(scale,anchor,world) {
      const origin=world||{x:(viewport.scrollLeft+anchor.x)/flowScale,y:(viewport.scrollTop+anchor.y)/flowScale};
      flowScale=Math.max(.35,Math.min(1.5,scale));
      scene.style.transform=`scale(${flowScale})`;
      map.style.width=`${width*flowScale}px`;map.style.height=`${height*flowScale}px`;
      app.querySelector('.flow-percent').textContent=`${Math.round(flowScale*100)}%`;
      app.querySelectorAll('.flow-edge text').forEach(text=>text.style.fontSize=`${Math.max(20,16/flowScale)}px`);
      setPan(origin.x*flowScale-anchor.x,origin.y*flowScale-anchor.y);
    }
    function centerCurrent() {
      const current=app.querySelector('.flow-node.current');
      if(current)setPan((parseFloat(current.style.left)+110)*flowScale-viewport.clientWidth/2,(parseFloat(current.style.top)+75)*flowScale-viewport.clientHeight/2);
    }
    app.querySelectorAll('[data-flow-zoom]').forEach(button=>button.addEventListener('click',()=>{
      const action=button.dataset.flowZoom;
      if(action==='current') {
        centerCurrent();
        return;
      }
      zoom(action==='fit'?viewport.clientWidth/width:flowScale+(action==='in'?.15:-.15),{x:viewport.clientWidth/2,y:viewport.clientHeight/2});
    }));
    viewport.addEventListener('wheel',event=>{
      event.preventDefault();zoom(flowScale*Math.exp(-(event.deltaY||event.deltaX)*.0015),localPoint(event));
    },{passive:false});
    function startPinch() {
      const points=Array.from(pointers.values()).slice(0,2);
      const middle={x:(points[0].x+points[1].x)/2,y:(points[0].y+points[1].y)/2};
      pinch={distance:Math.max(1,Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y)),scale:flowScale,world:{x:(viewport.scrollLeft+middle.x)/flowScale,y:(viewport.scrollTop+middle.y)/flowScale}};
    }
    viewport.addEventListener('pointerdown',event=>{
      if(event.button>0)return;
      const point=localPoint(event);pointers.set(event.pointerId,point);
      if(pointers.size===1){suppressClick=false;drag={x:point.x,y:point.y,left:viewport.scrollLeft,top:viewport.scrollTop};}
      else {startPinch();suppressClick=true;event.preventDefault();}
    });
    viewport.addEventListener('pointermove',event=>{
      if(!pointers.has(event.pointerId))return;
      const point=localPoint(event);pointers.set(event.pointerId,point);
      if(pointers.size>=2) {
        const points=Array.from(pointers.values()).slice(0,2);
        if(!pinch)startPinch();
        const middle={x:(points[0].x+points[1].x)/2,y:(points[0].y+points[1].y)/2};
        zoom(pinch.scale*Math.hypot(points[0].x-points[1].x,points[0].y-points[1].y)/pinch.distance,middle,pinch.world);
        suppressClick=true;
      } else if(drag) {
        if(Math.hypot(point.x-drag.x,point.y-drag.y)<5&&!suppressClick)return;
        setPan(drag.left+drag.x-point.x,drag.top+drag.y-point.y);suppressClick=true;
      }
      event.preventDefault();
      if(viewport.setPointerCapture)viewport.setPointerCapture(event.pointerId);
      viewport.classList.add('dragging');
    });
    const end=event=>{
      pointers.delete(event.pointerId);pinch=null;
      const point=Array.from(pointers.values())[0];
      drag=point?{x:point.x,y:point.y,left:viewport.scrollLeft,top:viewport.scrollTop}:null;
      if(!point)viewport.classList.remove('dragging');
    };
    ['pointerup','pointercancel','lostpointercapture'].forEach(name=>viewport.addEventListener(name,end));
    viewport.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopImmediatePropagation();suppressClick=false;}},true);
    requestAnimationFrame(()=>{if(viewport.isConnected)centerCurrent();});
  }
  function rangeRow(label, key, value) { return `<label class="settings-row"><span>${label}</span><input type="range" min="0" max="100" value="${value}" data-setting="${key}"><output>${value}</output></label>`; }

  function bindEvents() {
    fitIllustration();
    const scene=app.querySelector('.scene-art');if(scene)scene.addEventListener('load',fitIllustration);
    bindIntro();
    bindEnding();
    bindFlow();
    bindSave();
    app.querySelectorAll("[data-action]").forEach((element) => element.addEventListener("click", (event) => handleAction(event, element.dataset.action)));
    app.querySelectorAll("[data-choice]").forEach((element) => element.addEventListener("click", () => selectChoice(element.dataset.choice)));
    app.querySelectorAll("[data-next]").forEach((element) => element.addEventListener("click", () => go(element.dataset.next, { action: element.textContent.trim() })));
    app.querySelectorAll("[data-identity]").forEach((element) => element.addEventListener("click", () => chooseIdentity(element.dataset.identity)));
    app.querySelectorAll("[data-ending-view]").forEach((element) => element.addEventListener("click", (event) => { event.stopPropagation(); modal = null; go(element.dataset.endingView, { action: "结局回看", recordEnding: false }); }));
    app.querySelectorAll("[data-setting]").forEach((element) => element.addEventListener("input", () => { state.settings[element.dataset.setting] = element.type === 'checkbox' ? element.checked : Number(element.value); const out = element.closest("label").querySelector("output"); if (out) out.textContent = element.value; saveState(); syncMusic(); finishReading?.(); app.querySelector('.game-stage')?.classList.toggle('motion-off', state.settings.motion === false); }));
    const erase = app.querySelector("[data-erase]");
    if (erase) bindErase(erase);
  }

  function handleAction(event, action) {
    if (action === 'close-modal') {
      if (event.currentTarget !== event.target && event.currentTarget.tagName !== 'BUTTON') return;
      closeModal(); return;
    }
    if (action === 'save') { modal='save'; render(); return; }
    if (action === 'flow') { modal = 'flow'; render(); app.querySelector('.flow-close')?.focus(); return; }
    if (["about", "help", "load"].includes(action)) { modal = action; render(); return; }
    if (action === "load-player") {
      debugProfile = null; state = loadState();
      const target = state.resumeNode || state.node;
      const page = state.resumeNode ? state.resumePage : state.page;
      modal = null; pageHistory = [];
      go(target, { page: page || 0, action: "读档", recordEnding: false, remember: false }); return;
    }
    if (action === 'ending-continue') {advanceReading();return;}
    if (action === 'intro-continue') {advanceReading();return;}
    if (action === 'read-next') { advanceReading(); return; }
    if (action === "open-menu") { menuView = "menu"; render(); return; }
    if (action === "show-cover") { menuView = "cover"; render(); return; }
    if (action === "view-art") { modal = "art"; render(); app.querySelector(".art-viewer-close")?.focus(); return; }
    if (action === "start") { beginExperience(); return; }
    if (action === "continue") { const target = state.resumeNode; if (!debugProfile && ((target && isEnding(target)) || (!target && state.visited.some(id=>id!=="menu")))) { modal="flow"; render(); return; } if (target && !debugProfile) { state.resumeNode = null; go(target, { action: "继续", page: state.resumePage || 0 }); } else showToast("暂无可继续的剧情，请选择新游戏。"); return; }
    if (action === "back") { if (turnLocked) return; if (state.page > 0) { state.page--; saveState(); render(); } else { const previous = pageHistory.pop(); if (previous) go(previous.node, { page: previous.page, action: "返回上一剧情页", recordEnding: false, remember: false }); } return; }
    if (action === "menu" || action === "return-menu") { modal = null; go("menu", { action: "返回主菜单", recordEnding: false, remember: false }); return; }
    if (action === "endings" || action === "settings") { modal = action; render(); return; }
    if (action === "debug") { debugOpen = !debugOpen; render(); return; }
    if (action === "bird") { go("menu", { action: "鸟", recordEnding: false }); showToast("一切重新开始。收集进度被保留。"); return; }
    if (action === "debug-jump") { const to = app.querySelector("#debug-node").value; pageHistory = []; go(to, { action: "调试跳转", recordEnding: false, remember: false }); return; }
    if (action === "debug-normal") { debugProfile = null; pageHistory = []; state = loadState(); log("调试", "恢复玩家档", state.node); render(); return; }
    if (action === "reload-scene") { log(state.node, "重载当前场景", state.node); render(); return; }
    if (action === "show-hitboxes") { document.querySelectorAll(".choice, .interactive-word, .identity, .erase-pad").forEach((el) => { el.style.outline = "2px dashed #ffdc76"; }); showToast("当前场景的交互区域已用黄线标出。"); return; }
    if (action === "copy-log") { copyLog(); return; }
    if (action === "clear-log") { debugLogs = []; saveLogs(); render(); return; }
    if (action === "simulate-storage") { storageOK = false; showToast("已模拟存档失败：本次仅保留在内存。刷新页面会恢复原档。 "); render(); return; }
    if (action === "reset-player") { if (window.confirm("确定重置所有玩家结局和当前进度吗？此操作不会影响调试日志。")) { debugProfile = null; pageHistory = []; state = blankState(); birthdayMusicStarted=false; saveState(); log("玩家档", "重置全部进度", "menu"); render(); } return; }
  }

  function chooseIdentity(id) {
    if (state.teChosen.includes(id)) return;
    state.teChosen.push(id);
    log("TE_IDENTITY", id, "TE_IDENTITY", `${state.teChosen.length}/6`);
    saveState(); render();
  }

  function bindErase(target) {
    const model=eraseState(), canvases=Array.from(target.querySelectorAll('[data-erase-name]'));
    model.active=null;
    function status() {
      if(!target.isConnected)return;
      const hint=app.querySelector('.reading-hint');if(hint)hint.textContent=model.done.length===6?'点击屏幕继续':'按住并擦除名字';
      canvases.forEach((canvas,i)=>{canvas.classList.toggle('erased',model.done.includes(i));canvas.tabIndex=model.done.includes(i)?-1:0;canvas.setAttribute('aria-disabled',String(model.done.includes(i)));});
    }
    status();
    // Bind immediately: local Safari can leave FontFaceSet.load pending or reject
    // for file:// HTML, but the canvas eraser must remain usable with fallback ink.
      if(!target.isConnected)return;
      const inks=canvases.map((canvas,i)=>{const ink=new window.NameInk(canvas,ERASE_NAMES[i]);ink.replay(model.strokes[i]||[]);if(model.done.includes(i))ink.clear();return ink;});
      let pointer=null, previous=null;
      function rub(index,points) {
        if(model.done.includes(index))return;
        (model.strokes[index]||=[]).push(points);
        const ink=inks[index];ink.segment(points[0],points[1]);
        if(ink.progress()>=.95){ink.clear();model.done.push(index);state.erasure=model.done.length/6*100;status();}
      }
      // Clip the shared pointer segment into each canvas. A single captured gesture
      // can cross gaps and all six names, including when pointer events are sparse.
      function sweep(from,to) {
        canvases.forEach((canvas,i)=>{
          if(model.done.includes(i))return;
          const r=canvas.getBoundingClientRect();if(!r.width||!r.height)return;
          const a=canvasPoint(from,r),b=canvasPoint(to,r);
          let lo=0,hi=1;
          for(let axis=0;axis<2;axis++){
            const delta=b[axis]-a[axis];
            if(Math.abs(delta)<1e-9){if(a[axis]<0||a[axis]>1)return;}
            else{const u=-a[axis]/delta,v=(1-a[axis])/delta;lo=Math.max(lo,Math.min(u,v));hi=Math.min(hi,Math.max(u,v));if(lo>hi)return;}
          }
          const at=t=>a.map((value,axis)=>value+(b[axis]-value)*t);
          rub(i,[at(lo),at(hi)]);
        });
      }
      target.addEventListener('pointerdown',event=>{
        if(pointer!==null||event.button>0||model.done.length===6)return;
        event.preventDefault();pointer=event.pointerId;previous={x:event.clientX,y:event.clientY};
        target.setPointerCapture?.(pointer);sweep(previous,previous);saveState();
      });
      target.addEventListener('pointermove',event=>{
        if(pointer!==event.pointerId)return;
        event.preventDefault();const next={x:event.clientX,y:event.clientY};
        sweep(previous,next);previous=next;
      });
      const stop=event=>{if(pointer!==event.pointerId)return;pointer=null;previous=null;saveState();};
      ['pointerup','pointercancel','lostpointercapture'].forEach(name=>target.addEventListener(name,stop));
      target.addEventListener('click',event=>{event.stopPropagation();event.preventDefault();});
      canvases.forEach((canvas,index)=>{let row=0;canvas.addEventListener('keydown',event=>{
        if(![' ','Enter'].includes(event.key))return;
        event.preventDefault();event.stopPropagation();const y=(row++%5+.5)/5;
        rub(index,[[.12,y],[.88,y]]);saveState();
      });});
  }

  function applyProfile(profile) {
    const profiles = {
      new: { label: "新玩家", endings: [], node: "menu", teChosen: [] },
      "missing-e4": { label: "只差结局4", endings: ["E1", "E2", "E3"], node: "menu", teChosen: [] },
      all: { label: "收齐普通结局", endings: ["E1", "E2", "E3", "E4"], node: "menu", teChosen: [] },
      te: { label: "TE进行中", endings: ["E1", "E2", "E3", "E4"], node: "TE_IDENTITY", teChosen: ["luca", "chichi"] },
    };
    debugProfile = profiles[profile];
    pageHistory = [];
    state = { ...blankState(), node: debugProfile.node, teChosen: debugProfile.teChosen };
    log("调试", `载入预设：${debugProfile.label}`, state.node);
    render();
  }

  function copyLog() {
    const text = debugLogs.map((row) => `${row.time} ${row.from} --[${row.action}]--> ${row.to}${row.detail ? ` (${row.detail})` : ""}`).join("\n");
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => showToast("路由日志已复制。"), () => showToast("浏览器未允许复制。"));
    else showToast("浏览器未提供复制接口。可直接从日志框复制。 ");
  }

  function paragraphs(text) { return text.split("\n\n").map((piece) => `<p>${escapeHtml(piece).replace(/\n/g, "<br>")}</p>`).join(""); }
  function escapeHtml(text) { return String(text).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]); }
  function showToast(message) { const old = document.querySelector(".toast"); old?.remove(); const toast = document.createElement("div"); toast.className = "toast"; toast.textContent = message; app.append(toast); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.remove(), 2600); }

  document.addEventListener("click", (event) => {
    const profileButton = event.target.closest("[data-profile]");
    if (profileButton) applyProfile(profileButton.dataset.profile);
  });
  app.addEventListener('click', event => {
    if (state.node==='menu' || modal || debugOpen || event.defaultPrevented) return;
    if (event.target.closest('button,a,input,select,textarea,[role="button"],[data-action],[data-choice],[data-next],.art-paper,.illustration-page,.identity-grid,.erase-area,.drawer,[role="dialog"]')) return;
    window.getSelection()?.removeAllRanges();
    advanceReading();
  });
  document.addEventListener("keydown", (event) => {
    if (event.altKey && (event.code==='KeyT' || event.key.toLowerCase()==='t')) {
      event.preventDefault();if(!event.repeat){debugOpen=!debugOpen;render();}return;
    }
    if (['Enter',' '].includes(event.key) && state.node==='menu' && menuView==='cover' && !modal && !debugOpen) {event.preventDefault();handleAction(event,'open-menu');return;}
    if (['Enter',' '].includes(event.key) && event.target.matches('.art-paper')) {
      event.preventDefault();handleAction(event,'view-art');return;
    }
    if (modal && event.key === 'Tab') {
      const dialog = app.querySelector('[role="dialog"]');
      const controls = dialog ? Array.from(dialog.querySelectorAll('button:not(:disabled),input,select,[tabindex="0"]')).filter(el => !el.hidden) : [];
      const first = controls[0], last = controls[controls.length-1];
      if (first && (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement)))) { event.preventDefault();last.focus(); }
      else if (first && !event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault();first.focus(); }
    }
    if (event.key === "Escape" && modal) { closeModal(); }
    if (!modal && !debugOpen && !event.repeat && [' ', 'Enter', 'ArrowRight'].includes(event.key) && !event.target.closest('button, input, select, textarea')) { event.preventDefault(); advanceReading(); }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { finishReading?.(); saveState(); } });
  window.addEventListener('pagehide', saveState);
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', () => { if (reducedMotion()) finishReading?.(); });
  const WEB_PRELOAD_IMAGES = ["assets/covers/cover-1.png","assets/covers/cover-2.png","assets/covers/menu-options.png","assets/scenes/1.png","assets/scenes/2.png","assets/scenes/3.png","assets/scenes/4.png","assets/scenes/5.png","assets/scenes/6.png","assets/scenes/7.png","assets/scenes/ending-E1.png","assets/scenes/ending-E2.png","assets/scenes/ending-E3.png","assets/scenes/ending-E4.png","assets/scenes/ending-paper.png","assets/scenes/intro-montage.png","assets/ui/book-background-32.png","assets/ui/choice-chosen.png","assets/ui/choice-normal.png","assets/ui/choice-selected.png","assets/ui/flow-floral.png","assets/ui/illustration-floral.png","assets/ui/illustration-frame.png","assets/ui/illustration-gold.png","assets/ui/intro-ground.png","assets/ui/preface-background.png","assets/ui/save-background.png","assets/ui/save-empty.png","assets/ui/save-filled.png"];
  // Web-only startup. Offline packages retain the cover and second-cycle entry.
  async function startWeb() {
    if (!/^https?:$/.test(location.protocol) || window.JIANGLAI_OFFLINE) {render();return;}
    if (state.node !== 'menu') {
      state.resumeNode=state.node;state.resumePage=state.page;state.node='menu';state.page=0;
    }
    menuView='menu';
    app.innerHTML='<div class="resource-loading" role="status"><p>正在展开小径…</p><output>0%</output><button type="button">直接进入</button></div>';
    const status=app.querySelector('.resource-loading output');
    let done=0,finished=false,skip;
    const skipped=new Promise(resolve=>{skip=resolve;});
    app.querySelector('.resource-loading button').addEventListener('click',skip,{once:true});
    const images=WEB_PRELOAD_IMAGES;
    const total=images.length+3;
    const report=()=>{done++;if(!finished)status.textContent=Math.round(done/total*100)+'%';};
    const loadImage=path=>new Promise(resolve=>{
      const img=new Image();const timer=setTimeout(finish,15000);
      function finish(){clearTimeout(timer);img.onload=null;img.onerror=null;resolve();}
      img.onload=()=>{if(img.decode)img.decode().then(finish,finish);else finish();};img.onerror=finish;img.src=assetUrl(path);
    }).then(report);
    let cursor=0;
    const worker=async()=>{while(cursor<images.length&&!finished)await loadImage(images[cursor++]);};
    const audio=['garden','true-end'].map(track=>new Promise(resolve=>{
      const media=document.createElement('audio');media.preload='auto';
      const timer=setTimeout(finish,15000);
      function finish(){clearTimeout(timer);media.oncanplaythrough=null;media.onerror=null;resolve();}
      media.oncanplaythrough=finish;media.onerror=finish;media.src=assetUrl('assets/audio/'+track+'.mp3');media.load();
    }).then(report));
    const font=(document.fonts?document.fonts.load('16px GenWanMin2'):Promise.resolve()).then(report,report);
    let deadline;
    await Promise.race([Promise.all([worker(),worker(),worker(),worker(),font,...audio]),skipped,new Promise(resolve=>{deadline=setTimeout(resolve,25000);})]);
    clearTimeout(deadline);finished=true;render();
  }
  startWeb();
})();
