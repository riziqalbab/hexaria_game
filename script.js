const gameBox = document.getElementById("gamebox");
const PATH_IMAGE = "./img/";
const elRandomNumber = document.getElementById("randomNumber");
const currentHexa = document.getElementById("currentHexa");

// MEMBUAT TAMPILAN HEXA

class Game {
  /** @param {HTMLDivElement} boxEl  */
  constructor(boxEl, column, row, elRandomNumber, currentHexa) {
    this.boxEl = boxEl;
    this.column = column;
    this.row = row;
    this.currentTurn = 0;
    this.currentHexa = currentHexa;
    this.elRandomNumber = elRandomNumber;
    this.#handleChange();
    this.#createArray();
  }




  #handleChange() {
    this.currentTurn = !this.currentTurn;
      if(this.currentTurn){
          this.currentHexa.src = `${PATH_IMAGE}red.png`;
      } else{
          this.currentHexa.src = `${PATH_IMAGE}blue.png`;
      }
    this.randomNumber = Math.floor(Math.random() * 20) + 1;
    this.elRandomNumber.innerText = this.randomNumber;
    
  }

  #createArray() {
    this.elRandomNumber.innerText = this.randomNumber;
    const n = 5;

    // const
    this.arrayGame = Array(this.column)
      .fill()
      .map(() =>
        Array(this.row)
          .fill()
          .map((item) => {
            return {
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
        console.log(hexa.childNodes[0]);

        if (this.currentTurn) {
          hexa.childNodes[1].src = `${PATH_IMAGE}red.png`;
          hexa.childNodes[0].innerText = this.randomNumber;

          hexa.childNodes[0].classList.toggle("hidden");
          
          this.arrayGame[columnHexa][rowHexa].isActive = true;
          this.arrayGame[columnHexa][rowHexa].value = this.randomNumber;
        } else {
          this.arrayGame[columnHexa][rowHexa].isActive = true;
          hexa.childNodes[1].src = `${PATH_IMAGE}blue.png`;
          hexa.childNodes[0].innerText = this.randomNumber;
          hexa.childNodes[0].classList.toggle("hidden");

          this.arrayGame[columnHexa][rowHexa].value = this.randomNumber;
        }
        
        this.elRandomNumber.innerText = this.randomNumber;
    }
    this.#handleChange(); // <-- random dan mengganti current hexa di htmlnya

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

    // HOVER
    this.#HoverHexa(hexa);
    // ONCLICK
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

const game1 = new Game(gameBox, 6, 5, elRandomNumber, currentHexa);
game1.draw();
