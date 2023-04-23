let selectedNum = null;
let selectedTile = null;
let eraser = document.querySelector("#delete");
let reloadBtn = document.querySelector(".reset");
let errors = 0;

let randomGame = Math.floor(Math.random() * gamesCount);

let board = games[randomGame];
let solution = solutions[randomGame];

window.onload = function() {
    setGame();
}

function setGame() {
    //digits from 1-9
    for(let i = 1; i < 10; i++) {
        // <div class="number" data-number>number</div>
        let num = document.createElement('div');
        num.innerText = i;
        num.dataset.number = i;
        num.classList.add('number');

        num.addEventListener('click', selectNumber);
        
        document.querySelector('#digits').appendChild(num);
    }

    //board 9x9
    for(let i = 0; i < 9; i++) {
        let row = board[i];
        let k = i;
        for(let j = 0; j < 9; j++) {
            let num = document.createElement('div');
            num.dataset.row = i;
            num.dataset.column = j;
            num.classList.add('tile');
            
            if(row[j] != '-') {
                num.classList.add('set-tile');
                num.innerText = row[j];
            } 
            num.addEventListener('click', selectTitle);
            document.querySelector('#board').appendChild(num);
        }

    }
}

function selectNumber() {
    if (selectedNum != null) {
        selectedNum.classList.remove('active');
    }
    selectedNum = this;
    selectedNum.classList.add('active');
    console.log(selectedNum.dataset.number);

    if(selectedTile != null && !selectedTile.classList.contains('set-tile')) {
        if(selectedNum.dataset.number != solution[selectedTile.dataset.row][selectedTile.dataset.column]) {
            errors += 1;
            document.querySelector('#errors').innerText = errors;
            selectedTile.classList.add('wrongNum');
        }
        else {
            selectedTile.classList.remove('wrongNum');
        }
        selectedTile.innerText = selectedNum.dataset.number;
    }
}

function selectTitle() {
    if(selectedTile != null) {
        selectedTile.classList.remove('active');
    }
    if(selectedNum != null) {
        selectedNum.classList.remove('active');
    }

    selectedTile = this;
    selectedTile.classList.add('active');
    
    // activate all equal titles
    let tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        if(tile.classList.contains('equal_tiles')) {
            tile.classList.remove('equal_tiles');
        }
        if((tile.innerText == selectedTile.innerText) && tile != selectedTile && tile.innerText != '') {
            tile.classList.add('equal_tiles');
        }
    });
}

eraser.addEventListener('click', function() {
    selectedNum ? selectedNum.classList.remove('active') : 0;
    if(selectedTile != null && !selectedTile.classList.contains('set-tile')) {
        selectedTile.innerText = '';
    }
})

reloadBtn.onclick = function() {
    window.location.reload();
};