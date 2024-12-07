// Les variables relatives au canvas
const canvas = document.getElementById("canvas");
const width = canvas.width = 1000;
const height = canvas.height = 400;
const ctx = canvas.getContext("2d");

// La couleure de fond
ctx.fillStyle = "black";
ctx.fillRect(0, 0, width, height);


// Approche orienté object


// Parent
class PianoKey {
    constructor(x, y, note){
        this.x = x;
        this.y = y;
        this.note = note;
        this.width = 0;
        this.height = 0;
        this.color = "";
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "black";
        ctx.strokeStyle = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    
    displayNote(){
        ctx.font = "20px sans-serif";
        ctx.fillText(this.note, this.x, this.height + 60);
    }

    handleClick(mx, my){
        if (mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height){
            console.log("exe");
            playNote(this.note)
        }
    }
}

// Enfants

// Les touches blanches
class WhiteKey extends PianoKey{
    constructor(x, y, note){
        super(x, y, note);
        this.width = 80;
        this.height = 300;
        this.color = "white";
    }
}

// Les touches noires
class BlackKey extends PianoKey{
    constructor(x, y, note){
        super(x, y, note)
        this.width = 30;
        this.height = 175;
        this.color = "black";
    }
}

// Fonction pour jouer une note
function playNote(note){
    // Détermine l'index et convertit la note en format anglophone
    let i = -1;
    let uniNote = "";
    // Si c'est pas une touche blanche
    if (whiteNotes.findIndex(not => not === note) === -1){
        i = blackNotes.findIndex(not => not === note);
        uniNote = blackNotesUni[i]; // Conversion
    }else{
        i = whiteNotes.findIndex(not => not === note);
        uniNote = whiteNotesUni[i];
    }
    let iMp3 = realNotes.findIndex(not => not.includes(uniNote));
    let audio = new Audio("notes/"+realNotes[iMp3]);
    audio.play();
}

// C = Do, D = Ré, E = Mi, F = Fa, G = Sol, A = La, B = Si

let realNotes = ["C5.mp3", "C#5.mp3", "D5.mp3", "D#5.mp3", "E5.mp3", "F5.mp3", "F#5.mp3", "G5.mp3", "G#5.mp3", "A5.mp3", "A#5.mp3", "B5.mp3", "B#5.mp3"];
let whiteNotes = ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si"];
let whiteNotesUni = ["C5", "D5", "E5", "F5", "G5", "A5", "B5"];
let blackNotes = ["Do#", "Ré#", "Sol#", "La#", "Si#"];
let blackNotesUni = ["C#5", "D#5", "F#5", "A#5", "B#5"];

let pianoKeys = [];

for (let i=0; i < whiteNotes.length; i++){
    pianoKeys.push(new WhiteKey(20 + 80*i, 20, whiteNotes[i]));
}

for (let i=0; i < blackNotes.length; i++){
    if(i >= 2){
        pianoKeys.push(new BlackKey(85 + 80*(i+1), 20, blackNotes[i]));
    }else{
        pianoKeys.push(new BlackKey(85 + 80*i, 20, blackNotes[i]));
    }
    
}

for (let i=0; i < pianoKeys.length; i++){
    pianoKeys[i].draw();
    pianoKeys[i].displayNote();
}

canvas.addEventListener("click", (e) => {
    let rect = canvas.getBoundingClientRect();
    for (key of pianoKeys){
        key.handleClick(e.clientX - rect.left, e.clientY - rect.top);
    }
});

