const splashscreen = document.getElementById("splashscreen");
const boxGame = document.getElementById("boxGame");
const boxHexa = document.getElementById("boxHexa");
const giliranSpan = document.getElementById("giliran")

const BLACK_HEXA = "./img/black.png";
const RED_HEXA = "./img/red.png";
const BLUE_HEXA = "./img/blue.png";
const GREY_HEXA = "./img/grey.png";
const LEBAR = 10;
const TINGGI = 8;

const player = [
  {
    nama: "Budi",
    score: 0,
    color: "red",
  },
  {
    nama: "Andi",
    score: 0,
    color: "blue",
  },
];


window.angka = 0;

const data_hexa = new Array(TINGGI).fill(null).map(() => new Array(LEBAR).fill(null));

window.addEventListener("load", function () {
  let giliran = 1;

  for (let i = 0; i < TINGGI; i++) {
    const kolom = document.createElement("div");
    kolom.classList.add("kolom");
    for (let j = 0; j < LEBAR; j++) {
      const hexa = document.createElement("div");
      const hexa_img = this.document.createElement("img");
      hexa_img.src = BLACK_HEXA;
      hexa.append(hexa_img);

      hexa.setAttribute("id", `hexa-${i}-${j}`);
      hexa.classList.add("hexa");
      kolom.append(hexa);

      let isClicked = false;

      hexa.addEventListener("mouseover", function () {
         const src = this.childNodes[0].src;
        if(src.split("/")[src.split("/").length - 1].split(".")[0] === "black"){
          hexa_img.src = `./img/${player[giliran == 0 ? 1 : 0].color}.png`;
        }

      });

      hexa.addEventListener("mouseout", function () {
        const imgHexa = this.childNodes[0].src;
      
        const imgColorHexa = imgHexa.split("/")[imgHexa.split("/").length - 1].split(".")[0];
        
        if(!isClicked){
          if(imgColorHexa !== 'black'){
            hexa_img.src = BLACK_HEXA 
           } else{
            hexa_img.src = `./img/${player[giliran].color}.png`;
          }
        }
        
        
      });

      hexa.addEventListener("click", function () {
        giliranSpan.textContent = giliran == 0 ? player[0].color : player[1].color

        isClicked = !isClicked;
        giliran = giliran == 0 ? 1 : 0;
        const hexaID = this.id;
        const columnID = hexaID.split("-")[1];
        const rowID = hexaID.split("-")[2];
      });
    }

    boxHexa.append(kolom);
  }
});
