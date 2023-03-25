var height = 6; //도전 기회
var width = 5; //글자 개수

var row = 0; //현재 치고 있는 줄
var col = 0; //현재 치고 있는 글자 칸

var gameOver = false;
var wordlist = ["BEACH", "HEART", "MOUSE", "NIGHT", "POWER", "PLANT", "PHONE", "STORY", "WATER", "SUGAR", "PARTY", "MUSIC", "METAL", "FIGHT", "FIELD", "DREAM", "BREAD", "APPLE", "EARTH", "FRUIT", "LIGHT", "MOVIE", "CHAIR", "TRAIN", "PLANE", "FORCE", "SMILE", "WORLD"] //여기다가 단어 넣으면 새로고침 했을 때 이 중에 하나가 정답이 돼요!!!!
var word = wordlist[Math.floor(Math.random()*wordlist.length)].toUpperCase();
console.log(word);


window.onload = function(){
    intialize();
}


function intialize() {
    //게임 보드 만들기
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // 키보드 누르는거
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -=1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (col == 5 && e.code == "Enter") {
            update(); 
            row += 1; //다음 줄으로 넘어가기
            col = 0; //다음 줄 첫번째 칸에서 시작
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })

}

function update() {
    let correct = 0;
    let letterCount = {};
    for (let i =0; i < word.length; i++) {
        let letter = word[i]
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        }
        else {
            letterCount[letter] = 1;
        }
    }

    //올바른 글자 확인하기
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //글자가 맞는 위치에 있을 때
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
            letterCount[letter] -= 1;
        } 
        if (correct == width) {
            gameOver = true;
        }
    }

    //다시 실행->글자가 포함은 돼있는데 위치가 다름
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        if (!currTile.classList.contains("correct")) {
            //글자가 단어 안에 들어있을 때
            if (word.includes(letter) && letterCount[letter] > 0){
            currTile.classList.add("present");
            letterCount[letter] -= 1;
            } //글자가 단어 안에 없을 때
            else {
                currTile.classList.add("absent");
            }
        }

    }
}