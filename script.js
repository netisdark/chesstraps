const traps = {
    'fried-liver': {
        name: 'Fried Liver Attack',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5', 'exd5', 'Nxd5', 'Nxf7', 'Kxf7', 'Qf3+']
    },
    'legals-mate': {
        name: "Legal's Mate",
        moves: ['e4', 'e5', 'Nf3', 'd6', 'd4', 'Bg4', 'dxe5', 'Bxf3', 'Qxf3', 'dxe5', 'Bc4', 'Nf6', 'Qb3', 'Qd7', 'Qxb7', 'Qd1+', 'Kxd1']
    },
    'blackburne-shilling': {
        name: 'Blackburne Shilling Gambit',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nd4', 'Nxe5', 'Qg5', 'Nxf7', 'Qxg2', 'Rf1', 'Qxe4+', 'Be2', 'Nf3#']
    },
    'elephant-trap': {
        name: 'Elephant Trap',
        moves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'cxd5', 'exd5', 'Nxd5', 'Nxd5', 'Bxd8', 'Bb4+']
    },
    'englund-gambit': {
        name: 'Englund Gambit Trap',
        moves: ['d4', 'e5', 'dxe5', 'Nc6', 'Nf3', 'Qe7', 'Bf4', 'Qb4+', 'Bd2', 'Qxb2', 'Nc3', 'Nb4', 'Rc1', 'Nxa2', 'Rb1', 'Nxc3', 'Rxb2', 'Nxd1']
    },
	'lasker-trap': {
    name: 'Lasker Trap (Queen\'s Gambit Declined)',
    moves: [
        'd4', 'd5',
        'c4', 'e6',
        'Nc3', 'Nf6',
        'Bg5', 'Nbd7',
        'cxd5', 'exd5',
        'e3', 'c6',
        'Bd3', 'Qb6',
        'Qc2', 'h6',
        'Bh4', 'Bd6',
        'Nge2', 'O-O',
        'O-O', 'Re8',
        'Rab1', 'a5',
        'a3', 'Qc7',
        'Bg3', 'Bxg3',
        'Nxg3', 'Nf8',
        'b4'
    ]
},
'noahs-ark': {
    name: 'Noah\'s Ark Trap (Budapest Gambit)',
    moves: [
        'd4', 'Nf6',
        'c4', 'e5',
        'dxe5', 'Ng4',
        'Bf4', 'Nc6',
        'Nf3', 'Bb4+',
        'Nbd2', 'Qe7',
        'a3', 'Ngxe5',
        'axb4', 'Nd3#'
    ]
},
'traxler-counterattack': {
    name: 'Traxler Counterattack (Wilkes-Barre/Leipzig Variation)',
    moves: [
        'e4', 'e5',
        'Nf3', 'Nc6',
        'Bc4', 'Nf6',
        'Ng5', 'Bc5',
        'Nxf7', 'Bxf2+',
        'Kxf2', 'Nxe4+',
        'Ke3', 'Qh4',
        'Nxh8', 'Qf4+',
        'Ke2', 'Nd4+',
        'Ke1', 'Qf2#'
    ]
},
'mortimer-trap': {
    name: 'Mortimer Trap (French Defense)',
    moves: [
        'e4', 'e6',
        'd4', 'd5',
        'Nc3', 'Nf6',
        'Bg5', 'dxe4',
        'Nxe4', 'Be7',
        'Bxf6', 'gxf6',
        'Nf3', 'c5',
        'c3', 'Qb6',
        'Qd2', 'cxd4',
        'Nxd4', 'Bd7',
        'O-O-O'
    ]
},
'bodens-mate': {
    name: 'Boden\'s Mate (Classic Checkmate Pattern)',
    moves: [
        'e4', 'e5',
        'Nf3', 'Nf6',
        'Nxe5', 'd6',
        'Nf3', 'Nxe4',
        'd4', 'd5',
        'Bd3', 'Bd6',
        'O-O', 'O-O',
        'c4', 'c6',
        'Nc3', 'Nxc3',
        'bxc3', 'Bg4',
        'Qc2', 'h6',
        'Ne5', 'Be6',
        'cxd5', 'cxd5',
        'f4', 'Nc6',
        'Qf2', 'Qc7',
        'Bd2', 'Rfe8',
        'Rae1', 'Rad8',
        'Qh4', 'Be7',
        'Qh5', 'Bf6',
        'g4'
    ]
}



};

console.log("Initializing chessboard...");
const board = Chessboard('board', {
    pieceTheme: 'img/chesspieces/wikipedia/{piece}.png'
});
var text=document.getElementById('title-text');
text.innerHTML="Chessboard initialized.";

let currentTrap = null;
let currentMoveIndex = 0;
let game = new Chess();

function showCurrentMove() {
    
    board.position(game.fen());
}

function showTrap(trap) {
    document.getElementById(trap).removeAttribute('class');
    document.getElementById(trap).setAttribute('class','list-group-item');
    text.innerHTML= trap;
    currentTrap = trap;
    currentMoveIndex = 0;
    game = new Chess();
    showCurrentMove();
}

function nextMove() {
    if (currentTrap && currentMoveIndex < traps[currentTrap].moves.length) {
        text.innerHTML=traps[currentTrap].moves[currentMoveIndex];
        game.move(traps[currentTrap].moves[currentMoveIndex]);
        currentMoveIndex++;
        showCurrentMove();
    }
}

function prevMove() {
    if (currentTrap && currentMoveIndex > 0) {
		currentMoveIndex--;
        text.innerHTML="back";
        game.undo();
        
        showCurrentMove();
    }
}

$('#traps-list .list-group-item').click(function() {
    const trap = $(this).data('trap');
    showTrap(trap);
});

$('#next-btn').click(nextMove);
$('#prev-btn').click(prevMove);
