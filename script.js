class Teclas{
	palavra(palavraCaracteres){
		this.palavraCaracteres = palavraCaracteres
	}

	digitar(letra){
		document.getElementById(`botao${letra}`).disabled = true
		document.getElementById(`botao${letra}`).style.cursor = 'no-drop'

		this.adicionarLetra(letra)
		this.armazenarLetraEscolhida(letra)
		this.verificarSeVenceu()
	}

	armazenarLetraEscolhida(letra){
		if(!document.getElementById('letrasEscolhidas').innerHTML.includes('h1')){
			document.querySelector('#letrasEscolhidas label').style.border = '1px solid black'
			if(document.querySelector('#letrasEscolhidas label').innerHTML == ''){
				document.querySelector('#letrasEscolhidas label').innerHTML = document.querySelector('#letrasEscolhidas label').innerHTML + letra
			}else{
				document.querySelector('#letrasEscolhidas label').innerHTML = document.querySelector('#letrasEscolhidas label').innerHTML + '/' + letra
			}
		}

	}

	verificarSeVenceu(){

		let caracteres = []
		caracteres['letra'] = []
		caracteres['ocupados'] = []

		for (var i = 0; i < this.palavraCaracteres.length; i++) {
			caracteres['letra'].push(i)
			if(document.getElementById(`caracter${i}`).value != ''){
				caracteres['ocupados'].push(i)
			}
		}

		if(caracteres['letra'].length == caracteres['ocupados'].length){
			let venceuPerdeu = new VenceuPerdeu()
			venceuPerdeu.verificar(true)
		}
	}

	adicionarLetra(letra){
		let caracteres = this.palavraCaracteres
		this.letra = letra

		let letrasCertas = []
		letrasCertas['letras'] = [] 
		letrasCertas['posicoes'] = []

		// console.log(caracteres)

		if (caracteres.includes(this.letra)) {
			for (var i = 0; i < caracteres.length; i++) {
				let letraCerta = caracteres[i].indexOf(this.letra)

				// console.log(letraCerta)

				if(letraCerta == 0){
					letrasCertas['letras'].push(this.letra)
					letrasCertas['posicoes'].push(i)
				}

			}

			this.adicionarNoInput(letrasCertas)
		}else{
			pontuacao.pontos(this.letra)
		}
	}

	adicionarNoInput(letrasCertas){
		this.letrasCertas = letrasCertas

		for (var i = 0; i < this.letrasCertas['posicoes'].length; i++) {	
			document.getElementById(`caracter${this.letrasCertas['posicoes'][i]}`).value = this.letrasCertas['letras'][i]
		}
	}

	mostrarGabarito(){ //mostrar gabarito quando perder, arrumar
		// for (var i = 0; i < this.palavraCaracteres.length; i++) {
		// 	document.getElementById(`caracter${i}`).value = this.palavraCaracteres[i]
		// }

		console.log(this.palavraCaracteres.join(''))
	}
}

class Palavras {
	palavrasArmazenadas(){
		let palavras = [
			'abacate',
			'sabao',
			'sapato',
			'uma noite no museu 3',
			'david guetta'
		]

		let random = Math.floor(Math.random() * palavras.length)

		if(document.querySelector('#letrasEscolhidas label').innerHTML == ''){
			document.querySelector('#letrasEscolhidas label').style.border = 'none'
		}
			
		return palavras[random]
	}

	separarPalavra(){	
		let palavra = palavras.palavrasArmazenadas().split('')
		return palavra
	}

	adicionarBot??es(){

		this.bot??es = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o',
			'p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7',
			'8','9','0']

		for (var i = 0; i < this.bot??es.length; i++) {
			let bot??o = document.createElement('button')

			bot??o.setAttribute("onclick", `teclas.digitar('${this.bot??es[i]}')`)
			bot??o.setAttribute("id", `botao${this.bot??es[i]}`)

			bot??o.innerHTML = this.bot??es[i]

			document.getElementById('teclado').appendChild(bot??o)
		}
		
	}

	bloquearDesbloquearBot??es(bool){
		if(bool){
			for (var i = 0; i < this.bot??es.length; i++) {
				document.getElementById(`botao${this.bot??es[i]}`).disabled = true
				document.getElementById(`botao${this.bot??es[i]}`).style.cursor = 'no-drop'
			}
		}else{
			for (var i = 0; i < this.bot??es.length; i++) {
				document.getElementById(`botao${this.bot??es[i]}`).disabled = false
				document.getElementById(`botao${this.bot??es[i]}`).style.cursor = 'pointer'
			}
		}
		
	}

	removerBot??es(){
		document.getElementById('teclado').innerHTML = ''
	}

	adicionarPalavra(){
		let label = document.createElement('label')

		document.getElementById('letrasEscolhidas').appendChild(label)


		let caracteres = this.separarPalavra()

		document.getElementById('letras').innerHTML = ''

		for (var i = 0; i < caracteres.length; i++) {
			let input = document.createElement('input')
			input.setAttribute("type", "text")
			input.setAttribute("id", `caracter${i}`)
			input.setAttribute("maxlength", "1")
			input.setAttribute("readonly", "")

			document.getElementById('letras').appendChild(input)

		}

		teclas.palavra(caracteres)

		if(caracteres.includes(' ')){

			let espa??os = []
			espa??os['posicoes'] = []

			for (var i = 0; i < caracteres.length; i++) {		
				if(caracteres.indexOf(' ') && caracteres[i] == ' '){
					// console.log('o espa??o ta na posicao' + i)

					espa??os['posicoes'].push(i)
				}
			}
			this.adicionarEspa??oNoInput(espa??os['posicoes'])
		}
	}

	adicionarEspa??oNoInput(espa??osPosicoes){
		this.espa??osPosicoes = espa??osPosicoes

		for (var i = 0; i < espa??osPosicoes.length; i++) {
			let caracterposicao = `caracter${this.espa??osPosicoes[i]}`

			document.getElementById(caracterposicao).style.border = 'none'

			document.getElementById(caracterposicao).value = '*'

		}
	}
}

class Pontuacao{
	constructor(){
		this.forca = document.getElementById('forca')
	}

	pontoInicial(reiniciar){
		if(this.forca.innerHTML == ''){
			let img = document.createElement('img')
			img.src = 'img/forca0.png'
			document.getElementById('forca').appendChild(img)
		}

		if(reiniciar){
			document.querySelector('#forca img').src = 'img/forca0.png'
		}
	}
	pontos(letra){
		let imagens = [
			'img/forca0.png',
			'img/forca1.png',
			'img/forca2.png',
			'img/forca3.png',
			'img/forca4.png',
			'img/forca5.png',
			'img/forca6.png'
		]

		for (var i = 0; i < imagens.length; i++) {
			let img = document.querySelector('#forca img')

			if(img.src.includes(imagens[5])){
				img.src = imagens[6]

				let venceuPerdeu = new VenceuPerdeu()
				venceuPerdeu.verificar(false)
				break
			}

			if(img.src.includes(imagens[i])){
				img.src = imagens[i+1]
				break
			}
		}
	}
}

class VenceuPerdeu{
	verificar(bool){
		let h1 = document.createElement('h1')

		document.getElementById('letrasEscolhidas').innerHTML = ''

		if(bool){
			h1.innerHTML = 'VENCEU'
			h1.style.backgroundColor = 'green'
		}else{
			h1.innerHTML = 'PERDEU'
			h1.style.backgroundColor = 'red'
			teclas.mostrarGabarito()
		}

		document.getElementById('letrasEscolhidas').appendChild(h1)

		palavras.bloquearDesbloquearBot??es(true)
		this.reiniciar()
	}

	reiniciar(){
		setTimeout(function(){
			document.getElementById('letrasEscolhidas').innerHTML = ''

			let label = document.createElement('label')

			document.getElementById('letrasEscolhidas').appendChild(label)

			palavras.adicionarPalavra() //inicia
			pontuacao.pontoInicial(true)
			palavras.removerBot??es()
			palavras.adicionarBot??es()
			palavras.bloquearDesbloquearBot??es(false)
		},1500)
	}
}


palavras = new Palavras()
teclas = new Teclas()
pontuacao = new Pontuacao()

palavras.adicionarPalavra() //inicia
palavras.adicionarBot??es()
pontuacao.pontoInicial()
