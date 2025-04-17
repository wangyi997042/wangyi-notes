export function b(){
    var div = document.createElement('div')
    div.innerHTML = 1;
    document.body.appendChild(div)
    div.onclick = function (){
        div.innerHTML = parseInt(div.innerHTML, 10) + 1
    }
}
