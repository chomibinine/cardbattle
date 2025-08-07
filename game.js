import { db, ref, set, onValue, remove } from './firebaseConfig.js';

let player = '';
let room = '';

window.createRoom = function () {
  room = document.getElementById('roomCode').value;
  player = 'player1';

  set(ref(db, `rooms/${room}`), {
    player1: { hand: [], selected: null },
    player2: { hand: [], selected: null }
  });

  startGame();
}

window.joinRoom = function () {
  room = document.getElementById('roomCode').value;
  player = 'player2';
  startGame();
}

function startGame() {
  document.getElementById('setup').style.display = 'none';
  document.getElementById('gameArea').style.display = 'block';
  document.getElementById('playerLabel').innerText = `${player.toUpperCase()} 접속됨`;

  listenToGame();
  drawInitialHand();
}

function drawInitialHand() {
  const hand = [];
  for (let i = 0; i < 3; i++) {
    hand.push({
      name: ['Fire', 'Shield', 'Thunder'][Math.floor(Math.random() * 3)],
      power: Math.floor(Math.random() * 10) + 1
    });
  }

  set(ref(db, `rooms/${room}/${player}/hand`), hand);
  renderHand(hand);
}

function renderHand(hand) {
  const handDiv = document.getElementById('hand');
  handDiv.innerHTML = '';
  hand.forEach((card, index) => {
    const btn = document.createElement('button');
    btn.innerText = `${card.name} (${card.power})`;
    btn.onclick = () => submitCard(index);
    handDiv.appendChild(btn);
  });
}

function submitCard(index) {
  set(ref(db, `rooms/${room}/${player}/selected`), index);
  document.getElementById('status').innerText = "카드 제출 완료, 상대 대기 중...";
}

function listenToGame() {
  onValue(ref(db, `rooms/${room}`), (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    const p1 = data.player1;
    const p2 = data.player2;

    if (p1.selected != null && p2.selected != null) {
      const card1 = p1.hand[p1.selected];
      const card2 = p2.hand[p2.selected];
      let result = '';

      if (card1.power > card2.power) result = "Player 1 승!";
      else if (card2.power > card1.power) result = "Player 2 승!";
      else result = "무승부!";

      document.getElementById('status').innerText = `결과: ${result}`;

      remove(ref(db, `rooms/${room}/player1/selected`));
      remove(ref(db, `rooms/${room}/player2/selected`));
    }
  });
}
