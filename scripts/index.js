document.querySelector('button').addEventListener('click', function() {

    var query = document.querySelector('textarea').value;
    var error = document.getElementById('error');
    var text = document.getElementById('text');
    var textbits = document.getElementById('textbits');
    var errortext = document.createElement('p');

    if(query.length < 10) {
        error.innerHTML = ' ';
        text.innerHTML = ' ';
        textbits.innerHTML = ' ';
        errortext.innerHTML = 'A entrada deve conter pelo menos 10 caracteres.'
        error.appendChild(errortext);
    }

    else {

        error.innerHTML = ' ';
        text.innerHTML = ' ';
        textbits.innerHTML = ' ';
        axios.post('https://sentim-api.herokuapp.com/api/v1/', {
            "text": query
        }, {
            headers: {
                Accept: "application/json", "Content-Type": "application/json"
            }
        }).then(function(response) {
            var data = response.data;

            for(var i = 0; i < data.sentences.length; i++) {

                var sentence = document.createElement('p');
                var polarity = document.createElement('p');
                var type = document.createElement('p');

                sentence.innerHTML = "Frase " + (i+1) + ": " + data.sentences[i].sentence;
                polarity.innerHTML = "Polaridade: " + data.sentences[i].sentiment.polarity;

                if(data.sentences[i].sentiment.type === 'negative'){
                    type.innerHTML = "Tipo: Negativo"
                }else if (data.sentences[i].sentiment.type === 'positive') {
                    type.innerHTML = "Tipo: Positivo"
                }else if (data.sentences[i].sentiment.type === 'neutral') {
                    type.innerHTML = "Tipo: Neutro"
                }

                textbits.appendChild(sentence);
                textbits.appendChild(polarity);
                textbits.appendChild(type);

            }

            // var fpolarity = document.createElement('p');
            // var ftype = document.createElement('p');
            // fpolarity.innerHTML = "Polaridade resultante: " + data.result.polarity;
            // if(data.result.type === 'negative'){
            //     ftype.innerHTML = "Tipo: Negativo"
            // }else if (data.result.type === 'positive') {
            //     ftype.innerHTML = "Tipo: Positivo"
            // }else if (data.result.type === 'neutral') {
            //     ftype.innerHTML = "Tipo: Neutro"
            // }

            // textbits.appendChild(fpolarity);
            // textbits.appendChild(ftype);

        }).catch(function(error) {
            console.log(error);
        });

    }

});