// глобал хувьсагчид
var activePlayer;
var scores;
var roundScore;
var isNewGame;

//шооны зургыг харуулах.
var diceDom = document.querySelector(".dice");

// тоглоом эхлэх
initGame();

// тоглоом эхлэхэд бэлдэх
function initGame() {
  //ee
  isNewGame = true;
  // Тоглогчийн ээлжийг хадгалах хувьсагч, нэгдүгээр тоглогчийг 0, хоёрдугаар тоглогчийг 1 гэж тэмдэглэе.
  activePlayer = 0;

  // Тоглогчдын цуглуулсан оноог хадгалах хувьсагч
  scores = [0, 0];

  // Тоглогчийн ээлжиндээ цуглуулж байгаа оноог хадгалах хувьсагч
  roundScore = 0;
  // Шооны аль талаараа буусныг хадгалах хувьсагч хэрэгтэй, 1-6 гэсэн утгыг энэ хувьсагчид санамсаргүйгээр үүсгэж өгнө.
  //    var diceNumber = Math.floor(Math.random() * 6) + 1;

  // Програм эхлэхэд бэлтгэе
  //window.document.querySelector("#score-0").textContent = "0";
  document.getElementById("score-0").textContent = "0";
  window.document.getElementById("score-1").textContent = "0";
  window.document.getElementById("current-0").textContent = "0";
  window.document.getElementById("current-1").textContent = "0";

  // тоглогчийн нэрийг үндсэн хэлбэрт оруулах
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");

  // шоог нуух
  diceDom.style.display = "none";
}

//Шоог шидэх ивэнт листэнэр
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (isNewGame) {
    // нэгээс зургаа дотор санамсаргүй тоог гаргаж авна
    var diceNumber = Math.floor(Math.random() * 6) + 1;
    //   шооны зургыг гаргаж ирнэ
    diceDom.style.display = "block";
    //   буусан санамсаргүй тоонд харгалзах шооны зургыг гаргаж ирнэ.
    diceDom.src = "./images/d-" + diceNumber + ".png";
    //   буусан тоо нь нэгээс ялгаатай бол тоглогчийн ээлжийн оноог нэмэгдүүлнэ
    if (diceNumber !== 1) {
      // нэгээс ялгаатай тоо буувал оноог нэмнэ
      roundScore = roundScore + diceNumber;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      //тоглогчын ээлжийг солих
      swithcToNextPlayer();
    }
  } else {
    alert("GAME OVER");
  }
});

// ХОЛД товчны ивэнт листенер
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (isNewGame) {
    // уг толглогчын цуглуулсан оноог оноон дээр нэмнэ
    scores[activePlayer] = scores[activePlayer] + roundScore;
    // дэлгэц дээрх тоог өөрчилөх
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];
    // тоглогчын ээлжийг шилжүүлнэ
    // тоглогчийн хожисон эсэхийг шалгах
    if (scores[activePlayer] >= 100) {
      isNewGame = false;
      document.getElementById("name-" + activePlayer).textContent = "WINNER !";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
    } else {
      swithcToNextPlayer();
    }
  } else {
    alert("GAME OVER");
  }
});

// Тоглогчын ээлжийг шилжүүлдэг функц
function swithcToNextPlayer() {
  // тоглогчийн оноог 0 болгох
  roundScore = 0;
  document.getElementById("current-" + activePlayer).textContent = roundScore;
  //тоглогчын ээлжийг солих
  // if (activePlayer === 0) {
  //   activePlayer = 1;
  // } else {
  //   activePlayer = 0;
  // }
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  // идэвхтэй тоглогчийг шилжүүлэх
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //  document
  //   .querySelector(".player-" + activePlayer + "-panel")
  //   .classList.toggle("active");

  // шоог алга болгох
  diceDom.style.display = "none";
}

// шинээр тоглоом эхлүүлэх
document.querySelector(".btn-new").addEventListener("click", initGame);
