window.onload = function() {
	//--------------create table > rows > cells--------------
	let board = document.createElement("div"),
	table = document.createElement("table");

	board.id = "board";
	table.classList.add('board__table')
	document.body.prepend(board);
	board.prepend(table);
	for(let i = 0; i < 3; i++) {
		let row = document.createElement("tr");
		row.classList.add('board__table__row');
		table.append(row);
		for(let j = 0; j < 3; j++) {
			let cell = document.createElement("td");
			cell.classList.add('board__table__row__cell');
			row.append(cell);
		}
	}
	//--------------create modal--------------
	let scriptTag = document.getElementsByTagName('script')[0],
	modal = document.createElement("div"),
	modalContent = document.createElement("div"),
	closeButton = document.createElement("button"),
	modalOverlay = document.createElement("div");

	modal.id = "modal";
	modalContent.id = "modal__content";
	closeButton.id = "modal__close";
	modalOverlay.id = "modal-overlay";
	scriptTag.before(modal);
	modal.append(modalContent);
	modal.append(closeButton);
	closeButton.innerText = 'x';
	scriptTag.before(modalOverlay);
	// 0 1 2
	// 3 4 5
	// 6 7 8
	//----------------ARRAY WIN COMBINATIONS----------------------------
	let winComb = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	],
	winText = '';
	//------------------------------GAME---------------------
	let countMove = 0,
	cells = table.querySelectorAll('.board__table__row__cell'),
	cellsStyle = new Array(9).fill(0);
	table.onclick = function(e) {
		//if color changed - no click
		if(cellsStyle.some(element => element != "")){
			cellsStyle = new Array(9).fill(0)
			return;
		}
		//------------------fill with X or 0------------------
		if(e.target.className == 'board__table__row__cell' && e.target.textContent == '') {
			countMove % 2 ? e.target.innerText = '0' : e.target.innerText = 'X'
			countMove++;
			isWinner();
			isDrow();
		}
		for(let j = 0; j < cells.length; j++) {
			cellsStyle[j] = cells[j].style.backgroundColor;
		}
	}
	//----------------------WINNER----------------------
	function isWinner() {
		for(let i = 0; i < winComb.length; i++) {
			let combOne = cells[winComb[i][0]],
			combTwo = cells[winComb[i][1]],
			combThree = cells[winComb[i][2]],
			combOneText = combOne.textContent, 
			combTwoText = combTwo.textContent, 
			combThreeText = combThree.textContent;
			if(combOneText == 'X' && combTwoText == 'X' && combThreeText == 'X') {
				combOne.style.backgroundColor = 'deepskyblue'
				combTwo.style.backgroundColor = 'deepskyblue'
				combThree.style.backgroundColor = 'deepskyblue'
				winText += 'Player with X win!!!';
			} else if(combOneText == '0' && combTwoText == '0' && combThreeText == '0') {
				combOne.style.backgroundColor = 'moccasin'
				combTwo.style.backgroundColor = 'moccasin'
				combThree.style.backgroundColor = 'moccasin'
				winText += 'Player with 0 win!!!';
			}
			if(winText.length) {
				modalContent.innerText = '';
				modalContent.innerText += winText;
				setTimeout(showModal, 300);
			} 
		}
	}
	//--------------------------------------DROW---------------------
	let countEmpty = 0;
	function isDrow() {
		countEmpty = 0;
		let countBgColor = 0;
		for(let i = 0; i < cells.length; i++) {
			if(cells[i].textContent != '') countEmpty++;
			if(cells[i].style.backgroundColor == 'transparent' || cells[i].style.backgroundColor == '') countBgColor++;
		}
		if(countEmpty == 9 && countBgColor != 6) {
			modalContent.innerText = '';
			modalContent.innerText += 'Drow';
			setTimeout(showModal, 300);
			countEmpty = 0;
		}
	}
	//-------------------------MODAL WIN OR DROW----------------------
	modal = document.querySelector("#modal"),
    modalOverlay = document.querySelector("#modal-overlay"),
    closeButton = document.querySelector("#modal__close"),
    modalContent = document.querySelector("#modal__content");
 	function showModal() {
 		modal.style.visibility = 'visible';
	   	modalOverlay.style.visibility = 'visible';
 	}

	closeButton.onclick = function(){
	   modal.style.visibility = 'hidden';
	   modalOverlay.style.visibility = 'hidden';
	   for(let i = 0; i < cells.length; i++) {
	   		cells[i].textContent = '';
	   		cells[i].style.backgroundColor = '';
	   		countMove = 0;
	   		winText = '';
	   }
	};
	modalOverlay.onclick = function(){
	   modal.style.visibility = 'hidden';
	   modalOverlay.style.visibility = 'hidden';
	   for(let i = 0; i < cells.length; i++) {
	   		cells[i].textContent = '';
	   		cells[i].style.backgroundColor = '';
	   		countMove = 0;
	   		winText = '';
	   }
	};

}