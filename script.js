const gameBox = document.getElementById("gamebox");
const PATH_IMAGE = "./img/";
const elRandomNumber = document.getElementById("randomNumber");
const currentHexa = document.getElementById("currentHexa");
const elScore0 = document.getElementById("score0");
const elScore1 = document.getElementById("score1");

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
    disable = 0
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
    this.#createArray();
    this.#handleChange();
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
  #handleChangeHexa(hexa) {
    const idHexa = hexa.id;
    const columnHexa = idHexa.split("-")[0];
    const rowHexa = parseInt(idHexa.split("-")[1]);
    const src = hexa.childNodes[1].src;


    for (let i = 0; i < 3; i++) {
      if (columnHexa % 2) {
        // KOLOM GENAP
        if (rowHexa + 1 > this.row - 1) continue;

        if(this.arrayGame[columnHexa-1+i][rowHexa+1].isActive){
          console.log(this.arrayGame[columnHexa-1+i][rowHexa+1].owner);
        }

      } else {
        // console.log("Ganjil");
      }
    }
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

    // const
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
    const columnHexa = idHexa.split("-")[0];
    const rowHexa = idHexa.split("-")[1];
    const src = hexa.childNodes[1].src;

    hexa.addEventListener("click", (e) => {
      if (
        this.arrayGame[columnHexa][rowHexa].isActive ||
        this.arrayGame[columnHexa][rowHexa].isDisable
      ) {
        return;
      } else {
        if (this.currentTurn) {
          hexa.childNodes[1].src = `${PATH_IMAGE}red.png`;
          hexa.childNodes[0].innerText = this.randomNumber;

          hexa.childNodes[0].classList.toggle("hidden");

          this.arrayGame[columnHexa][rowHexa].isActive = true;
          this.arrayGame[columnHexa][rowHexa].value = this.randomNumber;
          this.arrayGame[columnHexa][rowHexa].owner = "red";
        } else {
          hexa.childNodes[1].src = `${PATH_IMAGE}blue.png`;
          hexa.childNodes[0].innerText = this.randomNumber;
          hexa.childNodes[0].classList.toggle("hidden");

          this.arrayGame[columnHexa][rowHexa].owner = "blue";
          this.arrayGame[columnHexa][rowHexa].isActive = true;
          this.arrayGame[columnHexa][rowHexa].value = this.randomNumber;
        }

        this.elRandomNumber.innerText = this.randomNumber;
      }
      this.#handleChange(hexa); // <-- random dan mengganti current hexa di htmlnya
      this.#handleChangeHexa(hexa); // <-- Mengganti warna musuh jika angka lebih kecil
    });
  }

  /** @param {HTMLDivElement} hexa  */
  #HoverHexa(hexa) {
    const idHexa = hexa.id;
    const columnHexa = idHexa.split("-")[0];
    const rowHexa = idHexa.split("-")[1];
    const src = hexa.childNodes[1].src;

    hexa.addEventListener("mousemove", (e) => {
      if (
        this.arrayGame[columnHexa][rowHexa].isActive ||
        this.arrayGame[columnHexa][rowHexa].isDisable
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
        this.arrayGame[columnHexa][rowHexa].isActive ||
        this.arrayGame[columnHexa][rowHexa].isDisable
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

  draw() {
    for (let i = 0; i < this.column; i++) {
      const column = document.createElement("div");
      column.setAttribute("class", "column");
      for (let j = 0; j < this.row; j++) {
        column.append(this.#hexa(this.arrayGame[i][j].isDisable, `${i}-${j}`));
      }
      this.boxEl.append(column);
    }
  }
}

const game1 = new Game(
  gameBox,
  5,
  5,
  elRandomNumber,
  currentHexa,
  elScore0,
  elScore1,
  
);

game1.draw();
