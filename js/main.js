const board = document.querySelector('.board');
let boardData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
let z = 0;
gameStart();
function gameStart() {
    randomize();
    refresh();
}

function randomize() {
    for (let i = 0; i < 16; i++) {
        let r = Math.floor(16 * Math.random());
        // console.log(r);
        let t = boardData[i];
        boardData[i] = boardData[r];
        boardData[r] = t;
    }
}


board.addEventListener('click', (e) => {
    const tile = e.target;
    const pos = +tile.getAttribute('pos');
    const num = +tile.getAttribute('num');
    let row = Math.floor(pos / 4);
    let col = pos % 4;

    const rowz = Math.floor(z / 4); // row of blank cell
    const colz = z % 4;             // col of blank cell
    if (Math.pow((rowz - row), 2) + Math.pow((colz - col), 2) == 1) {
        const pos = row * 4 + col;
        boardData[pos] = 0;
        boardData[z] = num;
        z = pos;
        refresh();
    }
});

function refresh() {

    board.textContent = "";
    boardData.forEach(
        function (x, i) {
            let t = document.createElement('div');
            t.classList.add('tile');
            t.setAttribute('pos', i);
            t.setAttribute('num', x);
            if (x != 0) {
                t.textContent = x;
            }
            else {
                z = i;
                t.classList.add("blank");
            }

            let pos = i;
            let row = Math.floor(pos / 4);
            let col = pos % 4;
            const rowz = Math.floor(z / 4);
            const colz = z % 4;
            if (Math.pow((rowz - row), 2) + Math.pow((colz - col), 2) == 1) {
                t.classList.add('movable');
            }
            board.append(t);
        }

    );

    // console.log(z);
    // console.log(boardData);
    // console.log(board);
    check();
}
function check() {
    let solved = true;
    for (let i = 0; i < 14; i++) {
        if (boardData[i] != boardData[i + 1] - 1) {
            solved = false;
        }
    }
    if (solved) {
        setTimeout(() => { alert("solved"); }, 100);
    }
}

