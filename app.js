console.log("Welcome to pokemon world!!!");

let add = document.querySelector('#add');
let add2 = document.querySelector('#add2');
let display1 = document.querySelector('#display1');
let dan = 0;
let i=0;
display1.innerHTML = ' ';

add.addEventListener("click", function(){
    i=Math.floor(Math.random() * 50); 
    creatediv();
});

add2.addEventListener("click", function(){
    i = document.getElementById("myInput").value;
    console.log(i);
    creatediv();
});

function creatediv() {
    var div = document.createElement('div');
    display1.appendChild(div);
    div.setAttribute("id", `d${dan}`);
        
    fetchit(i,dan);
    dan++;
}

function fetchit(n,i){
    let da = document.querySelector(`#d`+i);

    fetch(`http://pokeapi.co/api/v2/pokemon/${n}/`)
    .then(res => res.json())
    .then(data => {

        img = data.sprites.front_default;
        name = data.species.name;
        ab = data.abilities[0].ability.name;
        urlab = data.abilities[0].ability.url;
        urlev = data.species.url;
        pheight = data.height;
        pweigth = data.weight;
        type = data.types[0].type.name;
    
        fetch(`${urlev}`)
        .then(res => res.json())
        .then(data => {
            if(data.evolves_from_species == null)
                Evo = " none ";
            else
                Evo = data.evolves_from_species.name;

            fetch(`${urlab}`)
            .then(res => res.json())
            .then(data => {
                description = data.effect_entries[0].short_effect;

                da.innerHTML += `
                <div id="display2">
                    <div id="evolution">
                        Evolved from: ${Evo}
                    </div>
                    <h1 id = "pokemon"> ${name}</h1>
                    <img id = "home" src="${img}" style="width:200px; height:200px; margin-top: -30px;"> 
                </div>
                <div id="stats">
                    Height: ${pheight}
                    Weigth: ${pweigth}
                </div>
                <div id = "display3">
                    <div id= "inline">
                    <div id = "ab">
                        Abilities
                    </div>
                    <div id = "ab2">
                        ${ab}
                    </div></div>
                    <div id = "abd">
                        ${description}
                    </div>
                    <div id="type">
                        Type: ${type} 
                    </div>
                </div>`;
            }) 
        })  
    })
}

