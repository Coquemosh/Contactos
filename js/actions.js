// Actions
$(function(){
    
document.addEventListener("deviceready",function(){
    $('#cBtn').tap(function(){
        var nom = $('#cName').val();
        var ema = $('#cMail').val();
        var tel = $('#cTel').val();
        
        if(nom!='' && ema!='' && tel!=''){
            //alert(nom+' '+ema+' '+tel);
            crearContactio(nom, ema, tel);
        }
    });
    
    $('#btnListar').tap(function(){
        listarContactos();
    });
},false);
});

function listarContactos(){
    function onSuccess(contacts) {
        $'#lista').html(''); // lo vaciamos aunque no tenga nada.
        for(i=0;i<contacts.length;i++){
            $('<li class="forward"><a href="tel:'+contacts[i].phoneNumbers[0].value+'">'+contacts[i].name.formatted+'</a></li>').appendTo('#lista');
        }
    };
    
    function onError(contactError) {
        alert('onError!');
    };
    
    // find all contacts with 'Bob' in any name field
    var options      = new ContactFindOptions();
    //options.filter   = "Bob";
    options.filter   = "";
    options.multiple = true;
    //var fields       = ["displayName", "name"]; // para listar solamente el displayName y name
    var fields       = ["*"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

function crearContacto(nom,ema,tel){
    // Creamos Contacto
    var myContact = navigator.contacts.create();
    
    
    /*
    http://docs.phonegap.com/en/3.0.0/cordova_contacts_contacts.md.html#ContactName
    Properties

    id: A globally unique identifier. (DOMString)
    
    displayName: The name of this Contact, suitable for display to end-users. (DOMString)
    
    name: An object containing all components of a persons name. (ContactName)
    
    nickname: A casual name by which to address the contact. (DOMString)
    
    phoneNumbers: An array of all the contact's phone numbers. (ContactField[])
    
    emails: An array of all the contact's email addresses. (ContactField[])
    
    addresses: An array of all the contact's addresses. (ContactAddress[])
    
    ims: An array of all the contact's IM addresses. (ContactField[])
    
    organizations: An array of all the contact's organizations. (ContactOrganization[])
    
    birthday: The birthday of the contact. (Date)
    
    note: A note about the contact. (DOMString)
    
    photos: An array of the contact's photos. (ContactField[])
    
    categories: An array of all the user-defined categories associated with the contact. (ContactField[])
    
    urls: An array of web pages associated with the contact. (ContactField[])

    */
    // Asignamos un Nombre para mostrar
    myContact.displayName = nom; 
    myContact.nickname = nom;
    
    // Asignar nombre del Contacto
    var nombre = new ContactName();
    nombre.givenName = nom;
    myContact.name = nombre;
    
    // Asignamos el email
    var email = [];
    email[0] = new ContactField("home",ema,true);
    email[1] = new ContactField("work","ejemplo@algo.com",false);
    myContact.emails = email;
    
    // Asignamos el teléfono
    var telefono = [];
    telefono[0] = new ContactField("home",tel,false);
    telefono[1] = new ContactField("work","222-2222",true); 
    myContact.phoneNumbers = telefono;
    
    //Guardar Contacto
    myContact.save(function(){
        $('#cName').val('');
        $('#cMail').val('');
        $('#cTel').val('');
        
        navigator.notification.alert("Contacto Creado Satisfactoriamente",function(){
            window.location.href="#home";   
        },"Felicidades","Aceptar");
    }, function(err){
        alert(err.code);
    });
    
}