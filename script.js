let Pokemon = 1;
const PokemonName = document.querySelector(".Pokemon_name");
const PokemonNumber = document.querySelector(".Pokemon_number");
const PokemonImage = document.querySelector(".Pokemon_image");

const form = document.querySelector(".formulario");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

const conexaoApiPokemon = async (pokemonResp) =>{
    const APIresponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonResp}`
    )

    if(APIresponse.status === 200){
        const data = await APIresponse.json();
        return data;
    }
} 

const renderPokemon = async (pokemonResp) =>{
    PokemonName.innerHTML = "loading...";
    PokemonNumber.innerHTML = "";

    const dataOK = await conexaoApiPokemon(pokemonResp)

    if(dataOK){
        PokemonImage.style.display = "block";
        PokemonName.innerHTML = dataOK.name;
        PokemonNumber.innerHTML = dataOK.id;
        PokemonImage.src = dataOK["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        input.value = "";
        Pokemon = dataOK.id;

    }else{
        PokemonImage.style.display = "none";
        PokemonName.innerHTML = "Não encontrado";
        PokemonNumber.innerHTML = "";
    }
}



buttonPrev.addEventListener("click", () =>{
    if(Pokemon > 1){
        Pokemon -=1;
        renderPokemon(Pokemon);
    }
});

buttonNext.addEventListener("click", ()=>{
        Pokemon +=1;
        renderPokemon(Pokemon);
});

form.addEventListener("submit", (evento)=>{
    evento.preventDefault();
    renderPokemon(input.value.toLowerCase())
})

renderPokemon(Pokemon);