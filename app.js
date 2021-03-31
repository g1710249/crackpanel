const numplayer = 2;
const playerlist = ['A', 'B', 'C', 'D'];
let nowplayer = 0;
let failedplayer = [];

const playerpositions = [
    [[0, 0],[3, 3]],
    [[0, 0],[0, 3], [3, 0]],
    [[0, 0],[0, 3], [3, 0], [3, 3]]
];
let playerposition = playerpositions[numplayer - 2];

const maplength = 4;
const playermaps = [
    [[0, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, 1]],

    [[0, -1, -1, 1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [2, -1, -1, -1]],

    [[0, -1, -1, 1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [2, -1, -1, 3]]
];
let playermap = playermaps[numplayer - 2];

let panelmap = [
    [3, 3, 3, 3],
    [3, 3, 3, 3],
    [3, 3, 3, 3],
    [3, 3, 3, 3]
];

function paneldraw(){
    for(let i = 0; i < maplength; i++){
        for(let j = 0; j < maplength; j++){
            let obj = document.getElementById(String(i) + String(j));
            if(panelmap[i][j] === 3){
                obj.style.backgroundColor = 'white';
            }else if(panelmap[i][j] === 2){
                obj.style.backgroundColor = 'yellow';
            }else if(panelmap[i][j] === 1){
                obj.style.backgroundColor = 'red';
            }else if(panelmap[i][j] === 0){
                obj.style.backgroundColor = 'gray';
            }
        }
    }
}

function playerdraw(){
    for(let i = 0; i < maplength; i++){
        for(let j = 0; j < maplength; j++){
            let obj = document.getElementById(String(i) + String(j));
            if(playermap[i][j] === -1){
                obj.innerText = '　';
            }else if(playermap[i][j] === 0){
                obj.innerText = 'A';
            }else if(playermap[i][j] === 1){
                obj.innerText = 'B';
            }else if(playermap[i][j] === 2){
                obj.innerText = "C";
            }else if(playermap[i][j] === 3){
                obj.innerText = "D";
            }
        }
    }
}

function changeturn(){
    do{
        nowplayer++;
    }while(failedplayer.includes(nowplayer));
    if(nowplayer >= numplayer){
        nowplayer = 0;
    }
    document.getElementById('nowplayer').innerText = playerlist[nowplayer];
}

function canmove(x, y){
    if(playermap[x][y] === -1){
        if(distance(x, y) === 1){
            return 1;
        }else if(distance(x, y) === 4){
            if(playerposition[nowplayer][0] === x){
                let cy = (playerposition[nowplayer][1] + y) / 2;
                if(playermap[x][cy] !== -1){
                    return 1;
                }
            }else if(playerposition[nowplayer][1] === y){
                let cx = (playerposition[nowplayer][0] + x) / 2;
                if(playermap[cx][y] !== -1){
                    return 1;
                }
            }
        }
    }
}

function distance(x, y){
    return (playerposition[nowplayer][0] - x) ** 2 + (playerposition[nowplayer][1] - y) ** 2;
}

function move(x, y){
    playermap[playerposition[nowplayer][0]][playerposition[nowplayer][1]] = -1;
    playermap[x][y] = nowplayer;
    playerposition[nowplayer][0] = x;
    playerposition[nowplayer][1] = y;
}

function damagepanel(i, x, y){
    panelmap[x][y] -= i;
    if(panelmap[x][y] <= 0){
        window.alert('プレイヤー' + playerlist[nowplayer] + 'の負けです！');
        failedplayer.push(nowplayer);
        if(failedplayer.length === numplayer - 1){
            result();
        }
    }
}

function result(){
    let winner;
    for(let i = 0; i < numplayer; i++){
        if(failedplayer.includes(i) === false){
            winner = i;
        }
    }
    let result = '1位: プレイヤー' + String(playerlist[winner]) + '\n';
    for(let i = 0; i < numplayer - 1; i++){
        result += String(i + 2) + '位: プレイヤー' + String(playerlist[failedplayer[numplayer - i - 2]]) + '\n';
    }
    window.alert(result);
}

//ゲーム開始時
paneldraw();
playerdraw();

//マスが押されたら
document.addEventListener('click',function(e){
    if(e.target.className === 'panel'){
        let x = Number(e.target.id[0]);
        let y = Number(e.target.id[1]);
        let i = canmove(x, y);
        if(i === 1){
            move(x, y);
            damagepanel(i, x, y);
            paneldraw();
            playerdraw();
            changeturn();
        }
    }
});