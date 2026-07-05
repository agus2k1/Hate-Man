// ─── MAP ─────────────────────────────────────────────────────────────────────
// 0=dot  1=wall  2=empty  3=energizer  4=ghost-house-door
const RAW_MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,1,1,1,2,1,1,2,1,1,1,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,4,4,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,2,2,2,2,2,2,1,2,1,1,0,1,1,1,1,1,1],
  [2,2,2,2,2,2,0,2,2,2,1,2,2,2,2,2,2,1,2,2,2,0,2,2,2,2,2,2],
  [1,1,1,1,1,1,0,1,1,2,1,2,2,2,2,2,2,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,2,2,2,2,2,2,2,2,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,1,1,1,1,1,0,1,1,2,1,1,1,1,1,1,1,1,2,1,1,0,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1],
  [1,3,0,0,1,1,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,1,1,0,0,3,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1],
  [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const COLS = RAW_MAP[0].length;
const ROWS = RAW_MAP.length;

// Each entry: [text, css-effect-class, color]
// Palette: #cf57df violeta | #ffff00 amarillo | #ff4444 rojo | #00ff99 verde neón
//          #ff9900 naranja | #00cfff cian      | #ff57a0 rosa | #c8ff00 lima
const DEATH_MESSAGES = [
  ['Sos malisim@',   'fx-glitch',     '#cf57df'],
  ['Sos un bolud@',  'fx-shake',      '#ff4444'],
  ['Das vergüenza',  'fx-flicker',    '#ff9900'],
  ['Qué cringe',     'fx-pulse',      '#ff57a0'],
  ['No tenés idea',  'fx-typewriter', '#00ff99'],
  ['Ridícul@',       'fx-glitch',     '#00cfff'],
  ['Inútil',         'fx-flicker',    '#c8ff00'],
  ['Horrible',       'fx-typewriter', '#ff57a0'],
];

let typewriterTimeout = null;

const PLAYER_SPEED       = 5.5;
const PLAYER_BOOST_SPEED = 10.0;
const BOOST_DURATION     = 3.0;
const PACMAN1_SPEED      = 5.0;
const PACMAN2_SPEED      = 6.2;
const BFS_INTERVAL       = 350;
const BFS2_INTERVAL      = 200;
const RANDOM_CHANCE      = 0.65;

const canvas = document.getElementById('game');
const ctx    = canvas.getContext('2d');
let CELL = 16;

let map;
let player = {};
let pacmans  = [];   // [{ent, path, bfsTimer, isRandom, speed}]
let boostTimer = 0;
let boostColor = '#00c8ff';
let wave = 0;        // how many times dots were fully cleared
let gameRunning = false;
let startTime   = 0;
let bestScore   = 0;
let animFrame   = null;
let lastTime    = 0;

let joystick = { active: false, originX: 0, originY: 0, currentX: 0, currentY: 0 };
const JOY_R    = 55;
const JOY_KNOB = 22;
const JOY_DEAD = 10;

function cloneMap() { return RAW_MAP.map(r => [...r]); }

function isWalkable(c, r) {
  if (r < 0 || r >= ROWS) return false;
  c = ((c % COLS) + COLS) % COLS;
  return map[r][c] !== 1;
}

function wrapC(c) { return ((c % COLS) + COLS) % COLS; }

function resize() {
  const wrap = document.getElementById('canvas-wrapper');
  const cw = Math.floor(wrap.clientWidth  / COLS);
  const ch = Math.floor(wrap.clientHeight / ROWS);
  CELL = Math.max(8, Math.min(cw, ch));
  canvas.width  = COLS * CELL;
  canvas.height = ROWS * CELL;
}
window.addEventListener('resize', () => { resize(); if (!gameRunning) drawScene(); });

function bfs(sc, sr, gc, gr) {
  const visited = Array.from({length: ROWS}, () => new Uint8Array(COLS));
  const parent  = Array.from({length: ROWS}, () => new Array(COLS).fill(null));
  const q = [[sc, sr]];
  visited[sr][sc] = 1;
  const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
  while (q.length) {
    const [c, r] = q.shift();
    if (c === gc && r === gr) {
      const path = [];
      let cur = [c, r];
      while (cur) { path.unshift(cur); cur = parent[cur[1]][cur[0]]; }
      return path;
    }
    for (const [dc, dr] of dirs) {
      const nc = wrapC(c + dc), nr = r + dr;
      if (nr < 0 || nr >= ROWS) continue;
      if (!visited[nr][nc] && isWalkable(nc, nr)) {
        visited[nr][nc] = 1;
        parent[nr][nc]  = [c, r];
        q.push([nc, nr]);
      }
    }
  }
  return [];
}

function drawScene() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * CELL, y = row * CELL;
      const v = map[row][col];
      if (v === 1) {
        ctx.fillStyle = '#686868';
        ctx.fillRect(x, y, CELL, CELL);
        ctx.strokeStyle = '#0f0f0f';
        ctx.lineWidth = Math.max(1, CELL * 0.08);
        ctx.strokeRect(x + 1.5, y + 1.5, CELL - 3, CELL - 3);
      } else if (v === 0) {
        ctx.fillStyle = '#d588df';
        ctx.beginPath();
        ctx.arc(x + CELL/2, y + CELL/2, Math.max(1.5, CELL * 0.1), 0, Math.PI*2);
        ctx.fill();
      } else if (v === 3) {
        const MOGUL = ['#FF8C00', '#FF0000', '#FFD700', '#008000'];
        // 4 energizers: top-left=0, top-right=1, bottom-left=2, bottom-right=3
        const eIdx = (row < 13 ? 0 : 2) + (col > 13 ? 1 : 0);
        const mogulColor = MOGUL[eIdx];
        const er = Math.max(3, CELL * 0.28);
        ctx.fillStyle = mogulColor;
        ctx.beginPath();
        ctx.arc(x + CELL/2, y + CELL/2, er, 0, Math.PI*2);
        ctx.fill();
      } else if (v === 4) {
        ctx.fillStyle = '#ffb8ff';
        ctx.fillRect(x, y + CELL*0.4, CELL, CELL*0.2);
      }
    }
  }

  for (const p of pacmans) {
    drawPacman(p.ent.x, p.ent.y, p.ent.mouthAngle, p.ent.dx, p.ent.dy, '#ffff00');
  }
  drawMask(player.x, player.y, boostTimer > 0, boostColor);
  drawJoystick();
}

// Michael Myers mask: oval white face, dark hollow eyes, subtle nose, thin mouth
function drawMask(px, py, boosted, ringColor) {
  const r = CELL * 0.44;

  // Boost glow ring in energizer color
  if (boosted) {
    const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 80);
    // parse hex color to build rgba
    const rc = ringColor || '#00c8ff';
    const bigint = parseInt(rc.slice(1), 16);
    const rr = (bigint >> 16) & 255;
    const rg = (bigint >> 8) & 255;
    const rb = bigint & 255;
    ctx.beginPath();
    ctx.ellipse(px, py, r * 0.88 + CELL*0.12, r + CELL*0.12, 0, 0, Math.PI*2);
    ctx.strokeStyle = `rgba(${rr},${rg},${rb},${0.5 + 0.4 * pulse})`;
    ctx.lineWidth = Math.max(2, CELL * 0.12);
    ctx.stroke();
  }

  // Face — oval slightly taller than wide
  ctx.fillStyle = '#f0ede8';
  ctx.beginPath();
  ctx.ellipse(px, py, r * 0.88, r, 0, 0, Math.PI * 2);
  ctx.fill();

  // Subtle shading on edges (depth)
  const grad = ctx.createRadialGradient(px - r*0.2, py - r*0.25, r*0.1, px, py, r);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(1, 'rgba(100,90,80,0.25)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.ellipse(px, py, r * 0.88, r, 0, 0, Math.PI * 2);
  ctx.fill();

  // Outline
  ctx.strokeStyle = 'rgba(60,50,40,0.55)';
  ctx.lineWidth = Math.max(1, CELL * 0.06);
  ctx.beginPath();
  ctx.ellipse(px, py, r * 0.88, r, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Left eye — dark hollow ragged ellipse
  ctx.fillStyle = '#1a1008';
  ctx.beginPath();
  ctx.ellipse(px - r*0.3, py - r*0.15, r*0.22, r*0.15, -0.15, 0, Math.PI*2);
  ctx.fill();
  // inner shadow
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(px - r*0.3, py - r*0.14, r*0.15, r*0.09, -0.15, 0, Math.PI*2);
  ctx.fill();

  // Right eye
  ctx.fillStyle = '#1a1008';
  ctx.beginPath();
  ctx.ellipse(px + r*0.3, py - r*0.15, r*0.22, r*0.15, 0.15, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(px + r*0.3, py - r*0.14, r*0.15, r*0.09, 0.15, 0, Math.PI*2);
  ctx.fill();

  // Nose — two small dark nostrils
  ctx.fillStyle = 'rgba(60,45,35,0.5)';
  ctx.beginPath();
  ctx.ellipse(px - r*0.1, py + r*0.15, r*0.07, r*0.04, -0.2, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(px + r*0.1, py + r*0.15, r*0.07, r*0.04, 0.2, 0, Math.PI*2);
  ctx.fill();

  // Mouth — thin straight slit
  ctx.strokeStyle = 'rgba(50,35,25,0.65)';
  ctx.lineWidth = Math.max(1, CELL * 0.04);
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(px - r*0.22, py + r*0.42);
  ctx.bezierCurveTo(px - r*0.1, py + r*0.38, px + r*0.1, py + r*0.38, px + r*0.22, py + r*0.42);
  ctx.stroke();
}

function drawPacman(px, py, mouth, ddx, ddy, color) {
  const r   = CELL * 0.44;
  const dir = Math.atan2(ddy, ddx || 1);
  const m   = Math.abs(Math.sin(mouth)) * 0.36;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(px, py);
  ctx.arc(px, py, r, dir + m, dir + Math.PI * 2 - m);
  ctx.closePath();
  ctx.fill();
}

function drawJoystick() {
  if (!joystick.active) return;
  const rect   = canvas.getBoundingClientRect();
  const scaleX = canvas.width  / rect.width;
  const scaleY = canvas.height / rect.height;
  const ox = joystick.originX  * scaleX, oy = joystick.originY  * scaleY;
  const cx = joystick.currentX * scaleX, cy = joystick.currentY * scaleY;
  const jr = JOY_R * scaleX, kr = JOY_KNOB * scaleX;

  ctx.beginPath();
  ctx.arc(ox, oy, jr, 0, Math.PI*2);
  ctx.fillStyle   = 'rgba(255,255,255,0.1)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth   = 2;
  ctx.stroke();

  const ddx = cx - ox, ddy = cy - oy;
  const dist = Math.sqrt(ddx*ddx + ddy*ddy);
  const lim  = Math.min(dist, jr - kr);
  const ang  = Math.atan2(ddy, ddx);
  const kx = ox + Math.cos(ang) * lim, ky = oy + Math.sin(ang) * lim;

  ctx.beginPath();
  ctx.arc(kx, ky, kr, 0, Math.PI*2);
  ctx.fillStyle   = 'rgba(255,255,255,0.6)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(200,200,200,0.9)';
  ctx.lineWidth   = 2;
  ctx.stroke();
}

function tileCenter(c, r) {
  return { x: c * CELL + CELL/2, y: r * CELL + CELL/2 };
}

function movePlayer(dt, speed) {
  const step = speed * CELL * dt;
  const { x: tx, y: ty } = tileCenter(player.tc, player.tr);
  const ddx = tx - player.x, ddy = ty - player.y;
  const dist = Math.sqrt(ddx*ddx + ddy*ddy);

  if (dist <= step) {
    player.x = tx; player.y = ty;
    const candidates = [];
    if (player.wdx !== 0 || player.wdy !== 0) candidates.push([player.wdx, player.wdy]);
    if ((player.ldx !== 0 || player.ldy !== 0) && !(player.ldx === player.wdx && player.ldy === player.wdy))
      candidates.push([player.ldx, player.ldy]);
    let moved = false;
    for (const [ndx, ndy] of candidates) {
      const nc = wrapC(player.tc + ndx), nr = player.tr + ndy;
      if (isWalkable(nc, nr)) {
        player.ldx = ndx; player.ldy = ndy;
        // Tunnel teleport: column wrapped → snap pixel X to opposite side instantly
        if (nc !== player.tc + ndx) {
          player.x = nc * CELL + CELL / 2;
        }
        player.tc = nc; player.tr = nr;
        moved = true; break;
      }
    }
    if (!moved) { player.ldx = 0; player.ldy = 0; }
  } else {
    player.x += (ddx / dist) * step;
    player.y += (ddy / dist) * step;
  }
}

function movePacEntity(ent, path, speed, dt) {
  const step = speed * CELL * dt;
  const { x: tx, y: ty } = tileCenter(ent.tc, ent.tr);
  const ddx = tx - ent.x, ddy = ty - ent.y;
  const dist = Math.sqrt(ddx*ddx + ddy*ddy);

  if (dist <= step) {
    ent.x = tx; ent.y = ty;
    while (path.length > 0 && path[0][0] === ent.tc && path[0][1] === ent.tr) path.shift();
    if (path.length > 0) {
      const [nc, nr] = path[0];
      if (isWalkable(nc, nr)) {
        ent.dx = nc - ent.tc; ent.dy = nr - ent.tr;
        if (Math.abs(nc - ent.tc) > 1) ent.x = nc * CELL + CELL / 2;
        ent.tc = nc; ent.tr = nr;
      }
    }
  } else {
    ent.x += (ddx / dist) * step;
    ent.y += (ddy / dist) * step;
    if (dist > 0.1) { ent.dx = Math.sign(ddx); ent.dy = Math.sign(ddy); }
  }
}

function buildRandomPath(sc, sr, gc, gr) {
  if (Math.random() < RANDOM_CHANCE) {
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
    // Walk 2-4 random tiles before handing off to BFS
    const detourLen = 2 + Math.floor(Math.random() * 3);
    let cc = sc, cr = sr;
    const detour = [];
    for (let i = 0; i < detourLen; i++) {
      const walkable = dirs.filter(([dc, dr]) => isWalkable(wrapC(cc + dc), cr + dr));
      if (walkable.length === 0) break;
      // avoid immediately reversing
      const prev = detour.length > 0 ? detour[detour.length - 1] : null;
      const candidates = walkable.filter(([dc, dr]) =>
        !prev || !(cc + dc === prev[0] && cr + dr === prev[1])
      );
      const pick = (candidates.length > 0 ? candidates : walkable)[Math.floor(Math.random() * (candidates.length > 0 ? candidates.length : walkable.length))];
      detour.push([cc, cr]);
      cc = wrapC(cc + pick[0]);
      cr = cr + pick[1];
    }
    if (detour.length > 0) {
      const tail = bfs(cc, cr, gc, gr);
      return [...detour, [cc, cr], ...tail];
    }
  }
  return bfs(sc, sr, gc, gr);
}

function screenPos(e) {
  const rect = canvas.getBoundingClientRect();
  const src  = e.touches ? e.touches[0] : e;
  return { x: src.clientX - rect.left, y: src.clientY - rect.top };
}

function readJoystick() {
  if (!joystick.active) return;
  const ddx  = joystick.currentX - joystick.originX;
  const ddy  = joystick.currentY - joystick.originY;
  const dist = Math.sqrt(ddx*ddx + ddy*ddy);
  if (dist < JOY_DEAD) return;
  if (Math.abs(ddx) > Math.abs(ddy)) {
    player.wdx = ddx > 0 ? 1 : -1; player.wdy = 0;
  } else {
    player.wdx = 0; player.wdy = ddy > 0 ? 1 : -1;
  }
}

canvas.addEventListener('mousedown',  e => { e.preventDefault(); if (!gameRunning) return; const p = screenPos(e); joystick.active = true; joystick.originX = joystick.currentX = p.x; joystick.originY = joystick.currentY = p.y; }, { passive: false });
canvas.addEventListener('mousemove',  e => { e.preventDefault(); if (!joystick.active) return; const p = screenPos(e); joystick.currentX = p.x; joystick.currentY = p.y; }, { passive: false });
canvas.addEventListener('mouseup',    e => { e.preventDefault(); joystick.active = false; }, { passive: false });
canvas.addEventListener('mouseleave', e => { joystick.active = false; }, { passive: false });
canvas.addEventListener('touchstart', e => { e.preventDefault(); if (!gameRunning) return; const p = screenPos(e); joystick.active = true; joystick.originX = joystick.currentX = p.x; joystick.originY = joystick.currentY = p.y; }, { passive: false });
canvas.addEventListener('touchmove',  e => { e.preventDefault(); if (!joystick.active) return; const p = screenPos(e); joystick.currentX = p.x; joystick.currentY = p.y; }, { passive: false });
canvas.addEventListener('touchend',   e => { e.preventDefault(); joystick.active = false; }, { passive: false });

window.addEventListener('keydown', e => {
  if (!gameRunning) return;
  if (e.key === 'ArrowLeft')  { player.wdx = -1; player.wdy =  0; }
  if (e.key === 'ArrowRight') { player.wdx =  1; player.wdy =  0; }
  if (e.key === 'ArrowUp')    { player.wdx =  0; player.wdy = -1; }
  if (e.key === 'ArrowDown')  { player.wdx =  0; player.wdy =  1; }
});

function caught(ent) {
  const ddx = player.x - ent.x, ddy = player.y - ent.y;
  return Math.sqrt(ddx*ddx + ddy*ddy) < CELL * 0.75;
}

function anyCaught() {
  return pacmans.some(p => caught(p.ent));
}

function dotsRemaining() {
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (map[r][c] === 0 || map[r][c] === 3) return true;
  return false;
}

function spawnPac(tc, tr, dx, isRandom, speed, bfsOffset) {
  const ent = { x: tc * CELL + CELL/2, y: tr * CELL + CELL/2, tc, tr, dx, dy: 0, mouthAngle: Math.random() * Math.PI };
  pacmans.push({ ent, path: [], bfsTimer: bfsOffset, isRandom, speed });
}

function gameLoop(ts) {
  if (!gameRunning) return;
  const dt = Math.min((ts - lastTime) / 1000, 0.05);
  lastTime = ts;

  readJoystick();
  const playerSpeed = boostTimer > 0 ? PLAYER_BOOST_SPEED : PLAYER_SPEED;
  movePlayer(dt, playerSpeed);

  for (const p of pacmans) {
    p.bfsTimer -= dt * 1000;
    if (p.bfsTimer <= 0) {
      p.bfsTimer = p.isRandom ? BFS2_INTERVAL : BFS_INTERVAL;
      p.path = p.isRandom
        ? buildRandomPath(p.ent.tc, p.ent.tr, player.tc, player.tr)
        : bfs(p.ent.tc, p.ent.tr, player.tc, player.tr);
    }
    movePacEntity(p.ent, p.path, p.speed, dt);
    p.ent.mouthAngle += dt * 8;
  }

  // Boost timer countdown
  if (boostTimer > 0) boostTimer -= dt;

  // Eat dot / energizer under player
  const pc = player.tc, pr = player.tr;
  const tile = map[pr]?.[pc];
  if (tile === 3) {
    map[pr][pc] = 2;
    boostTimer = BOOST_DURATION;
    const MOGUL = ['#FF8C00', '#FF0000', '#FFD700', '#008000'];
    boostColor = MOGUL[(pr < 13 ? 0 : 2) + (pc > 13 ? 1 : 0)];
  } else if (tile === 0) {
    map[pr][pc] = 2;
  }

  // All dots cleared → reset map, keep pacmans, add one more random
  if ((tile === 0 || tile === 3) && !dotsRemaining()) {
    wave++;
    map = cloneMap();
    const newSpeed = PACMAN2_SPEED + wave * 0.4;
    spawnPac(26 - (wave % 2) * 24, 30, wave % 2 === 0 ? -1 : 1, true, newSpeed, 50);
  }

  drawScene();
  document.getElementById('score').textContent = Math.floor((Date.now() - startTime) / 1000);

  if (anyCaught()) { endGame(); return; }

  animFrame = requestAnimationFrame(gameLoop);
}

function startGame() {
  resize();
  map = cloneMap();

  player = { x: 0, y: 0, tc: 1, tr: 1, wdx: 0, wdy: 0, ldx: 0, ldy: 0 };
  player.x = player.tc * CELL + CELL/2;
  player.y = player.tr * CELL + CELL/2;

  pacmans = [];
  wave = 0;
  spawnPac(1,  30,  1, false, PACMAN1_SPEED, 0);
  spawnPac(26, 30, -1, true,  PACMAN2_SPEED, 150);
  boostTimer = 0;
  joystick.active = false;

  gameRunning = true;
  startTime   = Date.now();

  document.getElementById('overlay').classList.add('hidden');
  drawScene();

  requestAnimationFrame(ts => {
    lastTime  = ts;
    animFrame = requestAnimationFrame(gameLoop);
  });
}

function applyDeathEffect(title, text, fx, color) {
  if (typewriterTimeout !== null) { clearTimeout(typewriterTimeout); typewriterTimeout = null; }

  title.className = '';
  title.style.setProperty('--dc', color);

  if (fx === 'fx-typewriter') {
    title.classList.add('fx-typewriter');
    title.innerHTML = '';
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        title.innerHTML = text.slice(0, i) + '<span class="cursor">_</span>';
        i++;
        typewriterTimeout = setTimeout(type, 80);
      } else {
        typewriterTimeout = null;
      }
    };
    type();
  } else {
    title.classList.add(fx);
    title.textContent = text;
  }
}

function endGame() {
  gameRunning = false;
  cancelAnimationFrame(animFrame);
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  if (elapsed > bestScore) {
    bestScore = elapsed;
    document.getElementById('best').textContent = bestScore;
  }
  const [text, fx, color] = DEATH_MESSAGES[Math.floor(Math.random() * DEATH_MESSAGES.length)];
  const title = document.getElementById('overlay-title');
  applyDeathEffect(title, text, fx, color);
  document.getElementById('overlay-msg').style.display   = 'none';
  document.getElementById('overlay-score').style.display = 'none';
  document.getElementById('btn-start').textContent = 'REINTENTAR';
  document.getElementById('overlay').classList.remove('hidden');
}

function resetOverlayForStart() {
  if (typewriterTimeout !== null) { clearTimeout(typewriterTimeout); typewriterTimeout = null; }
  const title = document.getElementById('overlay-title');
  title.className = '';
  title.style.removeProperty('--dc');
  title.textContent = 'HATE-MAN';
  document.getElementById('overlay-msg').style.display   = '';
  document.getElementById('overlay-score').style.display = '';
}

document.getElementById('btn-start').addEventListener('click', () => {
  resetOverlayForStart();
  startGame();
});

resize();
map = cloneMap();
player  = { x: CELL + CELL/2, y: CELL + CELL/2, tc: 1, tr: 1, wdx: 0, wdy: 0, ldx: 0, ldy: 0 };
pacmans = [];
spawnPac(1,  30,  1, false, PACMAN1_SPEED, 0);
spawnPac(26, 30, -1, true,  PACMAN2_SPEED, 150);
drawScene();