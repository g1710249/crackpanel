let nowplayer = 0;
let playerposition = [
    [0, 0],
    [4, 4]
];

let panelmap = [
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3]
];

let playermap = [
    [ 0, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1,  1]
];

function paneldraw(){
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            let obj = document.getElementById(String(i) + String(j));
            if(panelmap[i][j] === 3){
                obj.style.backgroundColor = "white";
            }else if(panelmap[i][j] === 2){
                obj.style.backgroundColor = "yellow";
            }else if(panelmap[i][j] === 1){
                obj.style.backgroundColor = "red";
            }else if(panelmap[i][j] === 0){
                obj.style.backgroundColor = "gray";
            }
        }
    }
}

function playerdraw(){
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < 5; j++){
            let obj = document.getElementById(String(i) + String(j));
            if(playermap[i][j] === -1){
                obj.innerText = '　';
            }else if(playermap[i][j] === 0){
                obj.innerText = '0';
            }else if(playermap[i][j] === 1){
                obj.innerText = '1';
            }
            // else if(playermap[i][j] === 2){
            //     obj.innerText = "2";
            // }else if(playermap[i][j] === 3){
            //     obj.innerText = "3";
            // }
        }
    }
}

function changeturn(){
    nowplayer++;
    if(nowplayer > 1){
        nowplayer = 0;
    }
    document.getElementById('nowplayer').innerText = String(nowplayer);
}

function canmove(x, y){
    if(playermap[x][y] === -1){
        if(distance(x, y) === 1){
            return 1;
        }else if(distance(x, y) === 4){
            if(playerposition[nowplayer][0] === x){
                let cy = Math.abs(playerposition[nowplayer][1] - y);
                if(playermap[x][cy] !== -1){
                    return 2;
                }
            }else if(playerposition[nowplayer][1] === y){
                let cx = Math.abs(playerposition[nowplayer][0] - x);
                if(playermap[cx][y] !== -1){
                    return 2;
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
        window.alert('プレイヤー' + String(nowplayer) + 'の負けです！');
    }
}

//init
paneldraw();
playerdraw();

//マスが押されたら
document.addEventListener('click',function(e){
    if(e.target.className === 'panel'){
        let x = e.target.id[0]
        let y = e.target.id[1]
        let i = canmove(x, y);
        if(i === 1 || i === 2){
            move(x, y);
            damagepanel(i, x, y);
            paneldraw();
            playerdraw();
            changeturn();
        }
    }
});

// //地図
// let map = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];
// const MAP_QUANTITY = 81;
// const EDGE_LENGTH = 11;

// //地雷配置のための座標配列
// let random_coordinate = [
//     [1, 1],[1, 2],[1, 3],[1, 4],[1, 5],[1, 6],[1, 7],[1, 8],[1, 9],
//     [2, 1],[2, 2],[2, 3],[2, 4],[2, 5],[2, 6],[2, 7],[2, 8],[2, 9],
//     [3, 1],[3, 2],[3, 3],[3, 4],[3, 5],[3, 6],[3, 7],[3, 8],[3, 9],
//     [4, 1],[4, 2],[4, 3],[4, 4],[4, 5],[4, 6],[4, 7],[4, 8],[4, 9],
//     [5, 1],[5, 2],[5, 3],[5, 4],[5, 5],[5, 6],[5, 7],[5, 8],[5, 9],
//     [6, 1],[6, 2],[6, 3],[6, 4],[6, 5],[6, 6],[6, 7],[6, 8],[6, 9],
//     [7, 1],[7, 2],[7, 3],[7, 4],[7, 5],[7, 6],[7, 7],[7, 8],[7, 9],
//     [8, 1],[8, 2],[8, 3],[8, 4],[8, 5],[8, 6],[8, 7],[8, 8],[8, 9],
//     [9, 1],[9, 2],[9, 3],[9, 4],[9, 5],[9, 6],[9, 7],[9, 8],[9, 9]
// ];
// const MINE_QUANTITY = 10;

// //カウントダウンタイマー
// let TIMER;
// function countdown(){
//     document.getElementById('timer').innerHTML--;
//     if(document.getElementById('timer').innerHTML === '0'){
//         failed();
//     }
// };

// //配列をシャッフルする関数
// function shuffle(array) {
//     for (let i = array.length - 1; i >= 0; i--) {
//       let rand = Math.floor(Math.random() * (i + 1));
//       [array[i], array[rand]] = [array[rand], array[i]]
//     }
//     return array;
// };

// //地図を初期化
// function mapinit(x, y){   
//     random_coordinate = shuffle(random_coordinate);
//     for(let i = 0, j = 0; j < MINE_QUANTITY; i++){
//         if(random_coordinate[i][0] === x && random_coordinate[i][1] === y){
//             ;
//         }else{
//             map[random_coordinate[i][0]][random_coordinate[i][1]] = 1;
//             j++;
//         }
//     }
// };

// //地雷かを判断
// function check(x, y, id){
//     if(map[x][y] === 1){
//         document.getElementById(id).style.backgroundColor = 'red';
//         document.getElementById(id).innerHTML = '💣';
//         failed();
//     }else{
//         document.getElementById(id).innerHTML = calculate(x, y);
//     }
// };

// //失敗した時
// function failed(){
//     for(let i = 0; i < EDGE_LENGTH; i++){
//         for(let j = 0; j < EDGE_LENGTH; j++){
//             if(map[i][j] === 1){
//                 document.getElementById(String(i) + String(j)).style.backgroundColor = 'red';
//                 document.getElementById(String(i) + String(j)).innerHTML = '💣';
//             }else if(1 <= i && i <= 9 && 1 <= j && j <= 9){
//                 document.getElementById(String(i) + String(j)).innerHTML = calculate(i, j);
//             }
//         }   
//     }
//     clearInterval(TIMER);
// };

// //周囲の地雷の数を計算
// function calculate(x, y){
//     let minecounter = 0;
//     if(map[x - 1][y - 1] === 1){
//         minecounter++;
//     }
//     if(map[x][y - 1] === 1){
//         minecounter++;
//     }
//     if(map[x + 1][y - 1] === 1){
//         minecounter++;
//     }
//     if(map[x - 1][y] === 1){
//         minecounter++;
//     }
//     if(map[x + 1][y] === 1){
//         minecounter++;
//     }
//     if(map[x - 1][y + 1] === 1){
//         minecounter++;
//     }
//     if(map[x][y + 1] === 1){
//         minecounter++;
//     }
//     if(map[x + 1][y + 1] === 1){
//         minecounter++;
//     }
//     return minecounter;
// };

// //その他
// const $button = document.getElementsByTagName('button');
// const BUTTON_QUANTITY = $button.length;
// let OPEN_COUNTER = 0;
// let FLAG_COUNTER = 0;

// //ボタンが押されたら反応
// let handler_index = 0;
// while(handler_index < BUTTON_QUANTITY){
//     //左クリック
//     $button[handler_index].addEventListener('click', function(e){
//         document.getElementById(e.target.id).setAttribute("disabled", true);
//         if(OPEN_COUNTER === 0){
//             mapinit(Number(e.target.id[0]), Number(e.target.id[1]));
//             TIMER = setInterval(countdown, 1000);
//         }
//         check(Number(e.target.id[0]), Number(e.target.id[1]), e.target.id);
//         OPEN_COUNTER++;
//         //終了判定
//         if(OPEN_COUNTER === MAP_QUANTITY - MINE_QUANTITY && FLAG_COUNTER === MINE_QUANTITY){
//             clearInterval(TIMER);
//             window.alert('クリア!')
//         }
//     });
//     //右クリック
//     $button[handler_index].addEventListener('contextmenu', function(e){
//         if(document.getElementById(e.target.id).innerHTML !== '🚩'){
//             document.getElementById(e.target.id).innerHTML = '🚩';
//             FLAG_COUNTER++;
//         }else{
//             document.getElementById(e.target.id).innerHTML = '　';
//             FLAG_COUNTER--;
//         }
//         //終了判定
//         if(OPEN_COUNTER === MAP_QUANTITY - MINE_QUANTITY && FLAG_COUNTER === MINE_QUANTITY){
//             clearInterval(TIMER);
//             window.alert('クリア!')
//         }
//     });
//     handler_index++;
// };