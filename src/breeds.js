
var request = new XMLHttpRequest()
const selectBreeds = document.getElementById('selectBreeds');
const selectLimit=document.getElementById('selectLimit');
const grid=document.getElementsByClassName("sectionBreeds-menuTwo-display");
const items = document.getElementsByClassName('sectionBreeds-menuTwo-display-item');

const btnBack=document.getElementById('btnBack');

function fillSelectBreeds(){
    request.open('GET', 'https://api.thecatapi.com/v1/breeds', true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        for(let i=0; i< data.length; i++){
            let opt=data[i];
            let element=document.createElement("option")
            element.textContent=opt.id;
            element.value=opt;
            selectBreeds.appendChild(element);
        }
    }
    request.send()
}
fillSelectBreeds();

selectBreeds.addEventListener('change',function (){
    let breedId= selectBreeds.options[selectBreeds.selectedIndex].text;
    let limit = selectLimit.options[selectLimit.selectedIndex].text;
    request.open('GET', ' https://api.thecatapi.com/v1/images/search?breed_id='+breedId+"&"+"limit="+limit, true)
    request.onload=function (){
        var data = JSON.parse(this.response);
        const imageUrl = data.url;
        const image = document.createElement('img')
        image.src = imageUrl;

        for (let d = 0; d < data.length; d++) {
            const imageUrl = data[d].url;
            const image = document.createElement('img')
            image.src = imageUrl;
            items[d].appendChild(image);
        }

    }
    request.send()
},false)

btnBack.addEventListener('click',function (){
    for (let t = 0; t < items.length; t++) {
        items[t].removeChild(items[t].firstElementChild);
    }
})



