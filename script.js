function loadData(_url, _function){
   
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        
        if (this.readyState == 4 && this.status == 200){

                if(_function == assembleRegion){

                    assembleRegion(JSON.parse(this.responseText));

                }

                else if(_function == assembleUF){

                    assembleUF(JSON.parse(this.responseText));

                }

                else{

                    assembleCounty(JSON.parse(this.responseText));

                }    
        
        }

    };

    xhttp.open("GET", _url, true);
    xhttp.send();

}

function assembleRegion(listRegion){
  
    let option;

    for (i in listRegion){

        option = document.createElement("option");
        option.value = listRegion[i].id;
        option.innerHTML = listRegion[i].nome;
        document.getElementById("region").appendChild(option);
        
    }

    document.getElementById("region").addEventListener("change", 
      
        function(){
           
            document.getElementById("uf").innerHTML = "<option value=\"\">Selecione</option>";
            document.getElementById("county").innerHTML = "<option value=\"\">Selecione</option>";
            let index = document.getElementById("region").selectedIndex;
            loadData("https://servicodados.ibge.gov.br/api/v1/localidades/regioes/" + this.options[index].value + "/estados", assembleUF)

        }

    );

}

function assembleUF(listUF){
        
    for (i in listUF){

        let option;
        
        option = document.createElement("option");
        option.value = listUF[i].id;
        option.innerHTML = listUF[i].nome;
        document.getElementById("uf").appendChild(option);
    
    }

    document.getElementById("uf").addEventListener("change", 
      
        function(){

            document.getElementById("county").innerHTML = "<option value=\"\">Selecione</option>";
            let index = document.getElementById("uf").selectedIndex;
            loadData("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + this.options[index].value + "/municipios", assembleCounty);

        }

    );

}

function assembleCounty(listCounty){

    for (i in listCounty){

        let option;
        
        option = document.createElement("option");
        option.value = listCounty[i].id;
        option.innerHTML = listCounty[i].nome;
        document.getElementById("county").appendChild(option);
    
    }
    
}

loadData("https://servicodados.ibge.gov.br/api/v1/localidades/regioes", assembleRegion);
