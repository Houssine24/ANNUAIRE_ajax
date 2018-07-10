$('.display').hide();

$('#affichage').click(function()
{	
	var contact = JSON.parse(window.localStorage.getItem("annuaire"));
	$(".table").empty();
	$(".table").show();
	if(contact == null)
	{

	}
	else
	{
		for(var i = 0; i<contact.length; i++)
		{
			$(".table").append('<tr><td class="id">'+i+'</td><td class="nom">'+contact[i].nom+'</td><td class="prenom">'
				+contact[i].prenom+'</td><td class="email">'+contact[i].email+'</td><td class="ville">'+contact[i].ville
				+'</td><td><button class="modif btn btn-warning">Modifier</button></td><td><button class="supprime btn btn-danger">Supprimer</button></td></tr>');
		}
	}
	$('.id').hide();
	$('.display').show();

	$('.supprime').click(function()
	{
		console.log('ok');
		var ligne = $(this).closest("tr");
		var idTmp = ligne.find(".id").text();
		var nomTmp= ligne.find(".nom").text();
		var prenomTmp= ligne.find(".prenom").text();

		if (confirm("Voulez-vous vraiment supprimer ?"))
		{
			var contact = JSON.parse(window.localStorage.getItem("annuaire"));
			contact.splice(idTmp, 1);
			var val = JSON.stringify(contact);
			window.localStorage.setItem("annuaire", val);
			location.href="index.html";
		}
	});


	$('.modif').click(function(){
		var ligne = $(this).closest("tr");
		var idTmp = ligne.find(".id").text();
		var nomTmp= ligne.find(".nom").text();
		var prenomTmp= ligne.find(".prenom").text();
		var emailTmp= ligne.find(".email").text();
		var villeTmp= ligne.find(".ville").text();
		console.log(nomTmp);
		ligne.replaceWith('<tr><td class="id">'+idTmp+'</td><td><input class="nom" value="'+nomTmp+'"></td><td><input class="prenom" value="'+prenomTmp+'"></td><td><input class="email" value="'+emailTmp+'"></td><td><input class="ville" value="'+villeTmp+'">'+
			'</td><td><button id="valid" class="btn btn-info">Valider</button></td>'+
			'<td><button class="supprime btn btn-danger">Supprimer</button></td></tr>');
		$('.id').hide();

	
	$('#valid').click(function envoyer(){
		var ligne = $(this).closest("tr");
		var nomMod= ligne.find(".nom").val();
		var prenomMod= ligne.find(".prenom").val();
		var emailMod= ligne.find(".email").val();
		var villeMod= ligne.find(".ville").val();

		var objetTmp = {

			nom: nomMod,
			prenom: prenomMod,
			email: emailMod,
			ville: villeMod
		};

		var contact = JSON.parse(window.localStorage.getItem("annuaire"));
		contact[idTmp] = Object.assign(objetTmp);

		var val = JSON.stringify(contact);
		window.localStorage.setItem("annuaire", val);
		location.href="index.html";
	});
});
});

$('#rechercher').click(function()
{

	$(".table").show();
	$(".table").empty();
	var contact = JSON.parse(window.localStorage.getItem("annuaire"));
	for(i=0; i<contact.length;i++)
	{
		var trouver=$("#inRecherche").val().toUpperCase();
		var comparer=contact[i].nom.toUpperCase();

		if (trouver==comparer) 
		{ 	
			$(".table").append('<tr><td class="id">'+i+'</td><td>'+contact[i].nom+'</td><td>'+contact[i].prenom+'</td><td>'+contact[i].email+'</td><td>'+contact[i].ville+'</td><td><button class="btn btn-warning">Modifier</button></td><td><button class="supprime btn btn-danger">Supprimer</button></td></tr>');
		}
		$('.id').hide();
		$('.display').show();	
	}		
});

function ajouterElement()
{
	$(".table").empty();
	var contact = JSON.parse(window.localStorage.getItem("annuaire"));
	if (contact == null) 
	{
		var contact = [];
	}
	contact.push({nom : $("#nom").val(),prenom : $("#prenom").val(), email : $("#email").val(), ville : $("#ville").val()});
	for (var i = 0; i < contact.length; i++)
		window.localStorage.setItem("annuaire", JSON.stringify(contact));
	{
		$(".table").show();  
	}
	$('.id').hide();
	$('.display').hide();
};


$("#ajout").click(function()
{
	ajouterElement();
	alert('Contact ajouté, afficher la liste')
	$(".table").show();
});



