module.exports.index = function (application, req, res) {
	const valor = ["Salvador","Porto Seguro","Santa Cruz Cabrália","Trancoso","Arraial d'Ajuda","Ilhéus","Uruçuca","Valença","Itacaré","Lençóis","Andaraí"];
	res.render('index/padrao',{lista:valor});
	
}