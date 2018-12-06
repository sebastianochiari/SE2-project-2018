const tableUser = 'User';

// Funzione per controlllare che un id sia scritto giusto
function isIdCorrect(taskId, res){
    let corretto = true;

    if( isNaN(taskId) ){
        res.status(400).json('We are sorry, but the ID passed is not a number - bad request 400');
        corretto = false; ////console.log(1); 
        //console.log('We are sorry, but the ID passed is not a number - bad request 400');
    }
    else if( taskId == null){
        res.status(400).json('We are sorry, but you did\'t pass any ID - bad request 400');
        corretto = false; ////console.log(2);
        //console.log('We are sorry, but you did\'t pass any ID - bad request 400');
    }
    else if( taskId < 0  ){
        res.status(400).json('We are sorry, but the ID passed is lower than 0 - bad request 400');
        corretto = false; ////console.log(3);
        //console.log('We are sorry, but the ID passed is lower than 0 - bad request 400');
    }
    else if ( taskId % 1 != 0 ){
        res.status(400).json('We are sorry, but the ID passed is not an integer - bad request 400');
        corretto = false; ////console.log(4);
        //console.log('We are sorry, but the ID passed is not an integer - bad request 400');
    }

    return corretto;
}

exports.registerUser = (app, db) =>{
    app.get('/users', (req, res) => {

        let usersList = db.getAll(tableUser);

        if (usersList.length == 0) {
            res.status(404).json('We are sorry, user not found - error 404');
            //console.log('Sorry, no user found - error 404');
        } else {
            res.status(200)
            res.json(usersList)
            //console.log('Print of all the users successfully executed')
        }
    })

    app.get('/users/:userId', (req, res) => {
        if (isIdCorrect(+req.params.userId, res)){
            let user = db.getById(tableUser, +req.params.userId);
            if (user == null) {
                res.status(404).json('We are sorry, user not found - error 404');
                //console.log('We are sorry, user not found - error 404')
            } else if (user.error) {
                res.status(400).json('We are sorry, there was a general error - bad request 400')
                //console.log('We are sorry, there was a general error - bad request 400');
            } else {
                res.status(200)
                res.json(user)
                //console.log('Print of the user successfully executed')
            }
        } else {
            res.status(400).json('We are sorry, there was a general error - bad request 400')
            //console.log('We are sorry, there was a general error - bad request 400');
        }
        
    })

    // quando creo un nuovo user ovviamente non ha esami registrati, però dovrei dire se è un insegnante oppure no?
    // aggiungere il controllo sui parametri required
    app.post('/users', (req, res) => {
        
        const newId = db.getNewId(tableUser);
        
        let newEmail = req.body.email
        let newUniNumber = req.body.uniNumber
        let newIsTeacher = req.body.isTeacher
        let newPassword = req.body.password
        let newName = req.body.name
        let newSurname = req.body.surname
        let newExamsList = req.body.examsList
        
        if (newEmail == null || (!isNaN(newEmail))) {
            res.status(400).json('Ops, there was an error with the email. Please try again - bad request 400');
            //console.log('Ops, there was an error with the email. Please try again - bad request 400')
        } else if (newUniNumber == null) {
            res.status(400).json('Ops, there was an error with the uniNumber. Please try again - bad request 400')
            //console.log('Ops, there was an error with the uniNumber. Please try again - bad request 400')
        } else if (newPassword == null) {
            res.status(400).json('Ops, there was an error with the password. Please try again - bad request 400')
            //console.log('Ops, there was an error with the password. Please try again - bad request 400')
        } else if (newName == null) {
            res.status(400).json('Ops, there was an error with the name. Please try again - bad request 400')
            //console.log('Ops, there was an error with the name. Please try again - bad request 400')
        } else if (newSurname == null) {
            res.status(400).json('Ops, there was an error with the surname. Please try again - bad request 400')
            //console.log('Ops, there was an error with the surname. Please try again - bad request 400')
        } else if (newIsTeacher == null) {
            res.status(400).json('Ops, there was an error with the role of the user. Please try again - bad request 400')
            //console.log('Ops, there was an error with the role of the user. Please try again - bad request 400')
        } else {
            let newUser = {
                id: newId, 
                name: newName, 
                surname: newSurname, 
                uniNumber: newUniNumber, 
                isTeacher: newIsTeacher, 
                email: newEmail, 
                password: newPassword, 
                examsList: newExamsList
            }

            db.addItem(tableUser, newUser);

            res.status(201)
            res.json(newUser)
            //console.log('User created successfully')
        }

    })

    app.put('/users/:userId', (req, res) => {

        let userId = +req.params.userId;

        if( isIdCorrect(userId, res)) {

            let userCurrent = db.getById(tableUser ,parseInt(req.params.userId));
            
            if (userCurrent == null) {
                res.status(404).json('We are sorry, user not found - error 404');
                //console.log('We are sorry, user not found - error 404');
            } else {

                // assegno i parametri a prescindere
                let update = req.body;

                // e se mi passa dei valori che sbagliati? 


    //CODICE MODIFICATO per coprire alcuni bugs trovati durante il testing di user.js
                // qui cambio effettivamente le cose da cambiare
                if (update.email == null) {
                    //userCurrent.email = update.email;
                    res.status(400).json(userCurrent)
                } else if (update.uniNumber == null) {
                    //userCurrent.email = update.email;
                    res.status(400).json(userCurrent)
                } else if (update.password == null) {
                    res.status(400).json(userCurrent)
                    //userCurrent.password = update.password;
                } else if (update.name == null) {
                    res.status(400).json(userCurrent)
                    //userCurrent.name = update.name;
                } else if (update.surname == null) {
                    res.status(400).json(userCurrent)
                    //userCurrent.surname = update.surname;
                } else if (update.examsList == null) {
                    res.status(400).json(userCurrent)
                    //userCurrent.examsList = update.examsList;
                } else if (update.isTeacher == null) {
                    res.status(400).json(userCurrent)
                    //userCurrent.isTeacher = update.isTeacher;
                }

                userCurrent.email = update.email;
                if (!isNaN(update.uniNumber)) {
                        userCurrent.uniNumber = update.uniNumber;
                }
                userCurrent.password = update.password;
                userCurrent.name = update.name;
                userCurrent.surname = update.surname;
                userCurrent.examsList = update.examsList;
                userCurrent.isTeacher = update.isTeacher;

                db.updateItem(tableUser, userCurrent);

                res.status(200)
                res.json(userCurrent);
                //console.log('User updated successfully')
            }
        }
    })

    app.delete('/users', (req, res) => {

        if(db.deleteAll(tableUser)){
            res.status(200).json(db.getAll('User'))
            //console.log('All the users have been deleted successfully');
        } else {
            res.status(400)
        }
        
    })

    app.delete('/users/:userId', (req, res) => {
        
        let userId = parseInt(req.params.userId);

        let usersList = db.getAll(tableUser);

        if( isIdCorrect(userId, res)) {

            let userCurrent = db.getById(tableUser ,parseInt(req.params.userId));

            if (userCurrent == null) {
                res.status(404)
                //console.log('We are sorry, user not found')
            } else { 
                //console.log('Eliminando', userCurrent.name, userCurrent.surname);
                db.deleteById(tableUser, userId);
                usersList = db.getAll(tableUser);
                //console.log('Utenti attualmente registrati: ', usersList)
                res.status(200).json(db.getAll('User'))
            }
        }
    })
}