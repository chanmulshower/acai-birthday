const SUPABASE_URL =
  "https://iuruvdxsekadgvfgghmg.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_AYpbTPhwgYPY4UiLRD06rg_SCcAzx8W";

const supabase =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

/* 금액 수정 */
const currentAmount = 26012;
const goalAmount = 158610;

const percent =
  Math.min(
    (currentAmount / goalAmount) * 100,
    100
  );

document.getElementById("acaiFill").style.height =
  percent + "%";

document.getElementById("amount").textContent =
  `${currentAmount.toLocaleString()}원 / ${goalAmount.toLocaleString()}원`;

document.getElementById("percent").textContent =
  `${percent.toFixed(1)}%`;

async function loadGuestbook() {

  const { data, error } =
    await supabase
      .from("guestbook")
      .select("*")
      .order("created_at", {
        ascending:false
      });

  if(error){
    console.error(error);
    return;
  }

  const guestbook =
    document.getElementById("guestbook");

  guestbook.innerHTML =
    data.map(item => `
      <div class="entry">
        <div class="nick">
          ${item.nickname}
        </div>
        <div>
          ${item.message}
        </div>
      </div>
    `).join("");
}

document
.getElementById("submitBtn")
.addEventListener("click",
async () => {

  const nickname =
    document
    .getElementById("nickname")
    .value
    .trim();

  const message =
    document
    .getElementById("message")
    .value
    .trim();

  if(!nickname || !message){
    alert("닉네임과 한마디를 입력해주세요!");
    return;
  }

  const { error } =
    await supabase
      .from("guestbook")
      .insert([
        {
          nickname,
          message
        }
      ]);

  if(error){
  alert(JSON.stringify(error, null, 2));
  console.error(error);
  return;
}

  document
  .getElementById("nickname")
  .value = "";

  document
  .getElementById("message")
  .value = "";

  loadGuestbook();
});

loadGuestbook();
