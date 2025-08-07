
let battleHistory = [];

function addBattleResult(winner) {
  const { my, enemy } = getNicknames();
  let result = {};
  if (winner === "draw") {
    result = { text: `${my} vs ${enemy} → 무승부!`, outcome: "draw" };
  } else if (winner === "me") {
    result = { text: `${my} vs ${enemy} → ${my} 승!`, outcome: "me" };
  } else {
    result = { text: `${my} vs ${enemy} → ${enemy} 승!`, outcome: "enemy" };
  }
  battleHistory.push(result);
  const log = document.createElement("div");
  log.innerText = result.text;
  document.getElementById("battleLog").appendChild(log);
}

function showSummary() {
  const { my, enemy } = getNicknames();
  let win = 0, lose = 0, draw = 0;
  battleHistory.forEach(res => {
    if (res.outcome === "me") win++;
    else if (res.outcome === "enemy") lose++;
    else draw++;
  });
  const summary = `
    ⚔️ ${my} 전투 요약:
    - 승리: ${win}회
    - 패배: ${lose}회
    - 무승부: ${draw}회
    - 총 전투: ${battleHistory.length}회
  `;
  const summaryDiv = document.getElementById("summaryArea");
  summaryDiv.innerText = summary;
}
