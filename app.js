// ------> Ao se inscrever no site openweatherapi, você ganha acesso à uma chave, esta chave será a forma a qual você acessará a API.
const apiKey ="25af260b1956e013905cb5c002969df8";
//--------------------------------------------------------------------------------------------------------------

// -------->   Elementos do HTML que serão manipulados pelo DOM.   
const input = document.querySelector("input");    
const button = document.querySelector("button"); 
const mainDiv = document.querySelector(".weather-data");
const cityUser = document.querySelector(".city");
const flag = document.querySelector(".flag");
const temp = document.querySelector(".temperature span");
const description = document.querySelector(".description");
const weatherIcon = document.querySelector(".weather-icon");
const humidity = document.querySelector(".humidity span");
const wind = document.querySelector(".wind span");
const notFound = document.querySelector(".notFound"); 
//--------------------------------------------------------------------------------------------------------------

// ----------> Função que conectará a API, Nessa função é importante destacar o uso do async, para que o navegador continue executando o código enquanto a API faz a sua busca.
async function getApi(city){   
//--------------------------------------------------------------------------------------------------------------
// -----> O link abaixo foi fornecido no site da API. Percebam que há dois parâmetros que nós passaremos nele: ${city}, este será passado pelo valor do input, no evento disparado, e ${apiKey}, que é a chave que a API fornece ao usuário, essa variável está no topo do código.
let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br` 
//--------------------------------------------------------------------------------------------------------------
// ------> Aqui faremos a integração da API, utilizando o fetch(), o fetch buscará o link que passamos acima. O await é um complemento ao async passado na função. Ele fará que o código aguarde a Promisse gerada pela API, e quando ela for concluída, será executada.
let apiFetch = await fetch(api);    
//--------------------------------------------------------------------------------------------------------------
// ------> Aqui pegaremos os dados da API e transformaremos eles em objetos da linguagem JavaScript, que é a que estamos utilizando.
let data = await apiFetch.json();
//--------------------------------------------------------------------------
// ------> Esta parte do IF refere-se ao tratamento de Erro. Se a API lançar o cod "404", significará que a cidade não foi encontrada, ou seja, ela não existe. Foi passado dois parâmetros para serem disparados ao usuário, são eles: Uma mensagem relatando o erro e o bloqueio das imagens passadas pela div.
if(data.cod === "404"){
notFound.style.display = "block";
mainDiv.style.display = "none";
}
//-------------------------------------------------------------------

// -------> O else significará que nenhum erro foi lançado, assim usaremos a manipulação do DOM que separamos no início do código para usando os dados passados pela API, atualizar as informações do tempo, conforme a cidade pesquisada.
else {
cityUser.innerHTML = data.name;
flag.src = ("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
temp.innerHTML = parseInt(data.main.temp);
weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
wind.innerHTML = `${parseInt(data.wind.speed)} KM/H`
humidity.innerHTML = `${parseInt(data.main.humidity)}%`
notFound.style.display = "none";
mainDiv.style.display = "block";
//-----------------------------------------------------------------
}
 }

// --> Por último o evento, ao clicar no botão de pesquisar, o valor passado no input será passado na função getApi, o valor passado será inserido na URL, assim realizando a busca. O preventDefault adicionado evita que a página seja atualizada após o usuário apertar no botão de submit.
   button.addEventListener("click", function(e){
    e.preventDefault();
    getApi(input.value);
    
   })

