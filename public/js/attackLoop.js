document.getElementById("atk-btn").addEventListener('click', attack)

function attack() {
  document.body.style.backgroundColor = "orangered";
  let oppHp = document.getElementById("opp-hp")
  oppHp.style.fontSize = "200%";
  setTimeout(function() {
    document.body.style.backgroundColor = "";
    oppHp.style.fontSize = "100%";
  }, 500);

  setTimeout(function() {
    document.body.style.backgroundColor = "orangered";
    let myHp = document.getElementById("my-hp")
  myHp.style.fontSize = "200%";

  setTimeout(function() {
    document.body.style.backgroundColor = "";
    myHp.style.fontSize = "100%";
  }, 500);
  
  }, 2000);
}