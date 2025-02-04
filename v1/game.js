class Game {
  /** @param {HTMLDivElement} boxEl  */
  constructor(
    boxEl,
    column,
    row,
    elRandomNumber,
    currentHexa,
    elScore0,
    elScore1,
    disable = 0,
    player1Name,
    player2Name
  ) {
    this.boxEl = boxEl;
    this.column = column;
    this.row = row;
    this.currentTurn = 0;
    this.elScore0 = elScore0;
    this.elScore1 = elScore1;
    this.currentHexa = currentHexa;
    this.elRandomNumber = elRandomNumber;
    this.disable = disable;
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.#createArray();
    this.#handleChange();


    document.getElementById("player1Name").innerText = player1Name
    document.getElementById("player2Name").innerText = player2Name

    // console.log(this.arrayGame);
    

  }

  



  #handleScore() {
    const blueScore = this.arrayGame
      .flat()
      .filter((item) => item.owner == "blue")
      .map((item) => {
        return item.value;
      })
      .reduce((prev, curr) => prev + curr, 0);




    const redScore = this.arrayGame
      .flat()
      .filter((item) => item.owner == "red")
      .map((item) => {
        return item.value;
      })
      .reduce((prev, curr) => prev + curr, 0);

    this.elScore0.innerText = redScore;
    this.elScore1.innerText = blueScore;
  }

  /** @param {HTMLDivElement} hexa  */
  #detectHexa(hexa) {
    const idHexa = hexa.id;
    const columnHexa = parseInt(idHexa.split("-")[1]);
    const rowHexa = parseInt(idHexa.split("-")[0]);
    const src = hexa.childNodes[1].src;

    const arrayNeighbor = [];
    

    const directionsEvenR = [
      [-1, 0], // Atas kiri
      [-1, 1], // Atas kanan
      [0, -1], // Kiri
      [0, 1], // Kanan
      [1, 0], // Bawah kiri
      [1, 1], // Bawah kanan
    ];

    const directionsOddR = [
      [-1, -1], // Atas kiri
      [-1, 0], // Atas kanan
      [0, -1], // Kiri
      [0, 1], // Kanan
      [1, -1], // Bawah kiri
      [1, 0], // Bawah kanan
    ];

    const direction = !(rowHexa % 2 === 0) ? directionsEvenR : directionsOddR;

    for (let i = 0; i < direction.length; i++) {
      const [dx, dy] = direction[i];
      const nx = rowHexa + dx;
      const ny = columnHexa + dy;

      if (
        nx >= 0 &&
        nx < this.arrayGame.length &&
        ny >= 0 &&
        ny < this.arrayGame[rowHexa].length
      ) {
        arrayNeighbor.push([nx, ny]);
      }
    }

    this.#changeNeighborHexa(
      {
        owner: !this.currentTurn ? "red" : "blue",
        value: parseInt(hexa.childNodes[0].innerHTML),
      },
      arrayNeighbor
    );
  }

  /** @param {Array} position  */
  #changeNeighborHexa(click, position) {

    // console.log(position);
    for (let i = 0; i < position.length; i++) {
      if (this.arrayGame[position[i][0]][position[i][1]].isActive) {
        console.log(position[i]);

        if (
          this.arrayGame[position[i][0]][position[i][1]].owner != click.owner &&
          this.arrayGame[position[i][0]][position[i][1]].value < click.value
        ) {
          document.getElementById(
            `${position[i][0]}-${position[i][1]}`
          ).childNodes[1].src = `${PATH_IMAGE}${click.owner}.png`;

          this.arrayGame[position[i][0]][position[i][1]].owner = click.owner;
        } else if (
          this.arrayGame[position[i][0]][position[i][1]].owner == click.owner
        ) {
          this.arrayGame[position[i][0]][position[i][1]].value += 1;
          document.getElementById(
            `${position[i][0]}-${position[i][1]}`
          ).childNodes[0].innerText =
            parseInt(
              document.getElementById(`${position[i][0]}-${position[i][1]}`)
                .childNodes[0].innerText
            ) + 1;
        }
      }
    }
    this.#handleScore()

  }

  /** @param {HTMLDivElement} hexa  */
  #handleChange(hexa) {
    this.currentTurn = !this.currentTurn;
    if (this.currentTurn) {
      this.currentHexa.src = `${PATH_IMAGE}red.png`;
    } else {
      this.currentHexa.src = `${PATH_IMAGE}blue.png`;
    }
    this.randomNumber = Math.floor(Math.random() * 20) + 1;
    this.elRandomNumber.innerText = this.randomNumber;
    this.#handleScore();
  }

  #createArray() {
    this.elRandomNumber.innerText = this.randomNumber;
    const n = this.disable;

    this.arrayGame = Array(this.column)
      .fill()
      .map(() =>
        Array(this.row)
          .fill()
          .map((item) => {
            return {
              owner: null,
              value: 0,
              isActive: false,
              isDisable: false,
            };
          })
      );

    const totalCell = this.column * this.row;
    const indexArr = Array.from({ length: totalCell }, (item, index) => index);

    for (let i = 0; i < indexArr.length; i++) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexArr[i], indexArr[j]] = [indexArr[j], indexArr[i]];
    }

    indexArr.slice(0, n).forEach((index) => {
      const col = Math.floor(index / this.row);
      const row = index % this.row;
      this.arrayGame[col][row].isDisable = true;
    });
  }

  /** @param {HTMLDivElement} hexa  */
  #handleClick(hexa) {
    const idHexa = hexa.id;
    const columnHexa = idHexa.split("-")[1];
    const rowHexa = idHexa.split("-")[0];
    const src = hexa.childNodes[1].src;

    hexa.addEventListener("click", (e) => {
      if (
        this.arrayGame[rowHexa][columnHexa].isActive ||
        this.arrayGame[rowHexa][columnHexa].isDisable
      ) {
        return;
      } else {
        if (this.currentTurn) {
          hexa.childNodes[1].src = `${PATH_IMAGE}red.png`;
          hexa.childNodes[0].innerText = this.randomNumber;

          hexa.childNodes[0].classList.toggle("hidden");

          this.arrayGame[rowHexa][columnHexa].isActive = true;
          this.arrayGame[rowHexa][columnHexa].value = this.randomNumber;
          this.arrayGame[rowHexa][columnHexa].owner = "red";
        } else {
          console.log(this.currentTurn);

          hexa.childNodes[1].src = `${PATH_IMAGE}blue.png`;
          hexa.childNodes[0].innerText = this.randomNumber;
          hexa.childNodes[0].classList.toggle("hidden");

          this.arrayGame[rowHexa][columnHexa].owner = "blue";
          this.arrayGame[rowHexa][columnHexa].isActive = true;
          this.arrayGame[rowHexa][columnHexa].value = this.randomNumber;
        }

        this.elRandomNumber.innerText = this.randomNumber;
      }
      this.#handleChange(hexa); // <-- random dan mengganti current hexa di htmlnya
      this.#detectHexa(hexa); // <-- Mengganti warna musuh jika angka lebih kecil
      this.#detectEnd()
    });
  }

  /** @param {HTMLDivElement} hexa  */
  #HoverHexa(hexa) {
    const idHexa = hexa.id;
    const columnHexa = idHexa.split("-")[1];
    const rowHexa = idHexa.split("-")[0];
    const src = hexa.childNodes[1].src;

    hexa.addEventListener("mousemove", (e) => {
      if (
        this.arrayGame[rowHexa][columnHexa].isActive ||
        this.arrayGame[rowHexa][columnHexa].isDisable
      ) {
        return;
      } else {
        if (this.currentTurn) {
          hexa.childNodes[1].src = `${PATH_IMAGE}red.png`;
        } else {
          hexa.childNodes[1].src = `${PATH_IMAGE}blue.png`;
        }
      }
    });

    hexa.addEventListener("mouseout", (e) => {
      if (
        this.arrayGame[rowHexa][columnHexa].isActive ||
        this.arrayGame[rowHexa][columnHexa].isDisable
      ) {
        return;
      } else {
        hexa.childNodes[1].src = `${PATH_IMAGE}black.png`;
      }
    });
  }

  #hexa(disable, idPosisi, nomor = 0) {
    const hexa = document.createElement("div");
    hexa.setAttribute("class", "hexa");

    const gambar_hexa = document.createElement("img");
    hexa.setAttribute("id", idPosisi);
    const spanNomorHexa = document.createElement("span");
    spanNomorHexa.setAttribute("class", "nomor_hexa");
    spanNomorHexa.append(nomor);

    if (nomor == 0) {
      spanNomorHexa.classList.add("hidden");
    }

    if (disable) {
      gambar_hexa.setAttribute("src", `${PATH_IMAGE}grey.png`);
    } else {
      gambar_hexa.setAttribute("src", `${PATH_IMAGE}black.png`);
    }
    hexa.append(spanNomorHexa);
    hexa.append(gambar_hexa);

    // UNTUK HOVER
    this.#HoverHexa(hexa);
    // NGKLIK HEXA
    this.#handleClick(hexa);
    return hexa;
  }

  #detectEnd(){
    const allValuesNotNull = this.arrayGame.every(row => 
      row.every(obj => obj.isActive || obj.isDisable)
    );


    if(allValuesNotNull){
      alert("You win")
    }


  }
  

  draw() {
    for (let i = 0; i < this.row; i++) {
      const column = document.createElement("div");
      column.setAttribute("class", "column");

      for (let j = 0; j < this.column; j++) {
        column.append(this.#hexa(this.arrayGame[i][j].isDisable, `${i}-${j}`));
      }
      this.boxEl.append(column);
    }
  }
}


