window.onload = function () {
  let richtig = 0
  let falsch = 0
  let auswertung = document.getElementById('auswertung')

  var questionArea = document.getElementsByClassName('questions')[0],
    answerArea = document.getElementsByClassName('answers')[0],
    checker = document.getElementsByClassName('checker')[0],
    current = 0,


    allQuestions = {
      'Frage 1: Aus wievielen Bits besteht ein Byte?': ['2', '3', '8', 2],

      'Frage 2: Aus wievielen Bytes besteht ein KiloByte?': ['1024', '6', '8', 0],
      'Frage 3: Was ist die Eingabevervollständigung?  ': ['Abfrage nach Datum und Uhrzeit', 'Benutzung der TAB-Taste zur vollständigen Anzeige von Pfad- und Befehlsnamen ', 1],
      'Frage 4: Welche Angabe wird auch als absoluter Pfad unter WINDOWS bezeichnet?': ['system32\find.exe ', '/etc/users/group', 'C:\Windows\system32\find.exe', 2],

      'Frage 5: Was ist ein Prozess?': ['Eine konkrete Beschreibung eines Verfahrens (Algorithmus) mit dem Ziel eine Aufgabe (ein Problem) zu lösen.', 'Ein Prozess ist ein “aktives”, “\ebendes” Programm. Er fordert also Betriebsmittel an und benutzt diese bei Bedarf.', 0],
      'Frage 6: Mit welcher Antwort kann man die Geschwindigkeit eines Prozessors (CPU) angeben?': ['120 Gigabyte', '32 Bit', '2,8 Gigahertz', '300 Kilobit/Ssekunde', 2],
      'Frage 7: Ein PC-Anwender hat auf seiner Festplatte die Laufwerke C und D eingerichtet. Er arbeitet auf C und verwendet das Laufwerk D um nach Arbeitsschluss Sicherungskopien abzuspeichern. Welchen Nachteil hat dieses Sicherungsverfahren? ': ['Der Handhabungsaufwand ist höher als bei Bandsicherungen', 'Die Sicherungszeiten sind deutlich länger als bei Bandsicherungen', 'Die versehentliche Löschung einer Datei auf D: am nächsten Tag führt zu Datenverlust', 'Die versehentliche Löschung einer Datei auf C; am nächsten Tag führt zu Datenverlust', 'Die Daten stehen nach einem Defekt der Festplatte nicht mehr zur verfügung', 4],
      'Frage 8: in Auszubildender kommt nach der Berufsschule in ihren Betrieb und zeigt ihnen seine Notizen. Auf einer steht eine binäre Zahl und er meint, es wäre eine IP-Adresse. Auf der Notiz steht folgende Zahl: 1100 0000 . 1010 1000 . 0000 1010.1001 0100 Er fragt Sie nach dem Dezimalwerten der IP-Adresse. Wie lautet die IP-Adresse in Dezimalschreibweise?': ['192.168.9.10', '192.168.16.10', '192.168.10.148', '172.17.54.148', 2],
      'Frage 9: Können mit dem Konfigurations-Assistent für die Active Directory-Domänendienste Rollen installiert werden? Wenn ja welche?': ['DHCP und DNS', 'Nein', 'IIS', 0],
      'Frage 10: Wie nennt sich das Programm, das unmittelbar nach dem Einschalten des PCs gestartet wird?':['BIOS','B_OS','OS 2',0],
      'Frage 11: Mit welchem Kommando killen Sie einen Vordergrundprozess unter Linux?':['strg+c','strg+k','strg+z',0],
      'Frage 12: Welches Kommando unter Linux zeigt Ihnen alle Partitionen auf allen Festplatten?':['mtab','fstab','fdisk -l','df','du',3],
      'Frage 13: Für welche Geräte wurde der AGP-Port verwendet?':['Grafikkarten','Netzwerkkarten','SCSI_Controller-Karten','Soundkarten',0],
      'Frage 14: Welches RAID-Level ist ein Stripe Set With Parity':['5','7','0','1',0],
      'Frage 15: Regeln für die Kommunikation unter Computern heissen:':['Protokolle','Dienste','schichten','Topologien',0],
      'Frage 16: Wie lange dauert es, eine 5TiB grosse Datei über ein 1GBit-Netzwerk zu übertragen?':['3.150 Sekunden','20.480 Sekunden','51.200 Sekunden','43.980 Sekunden',3],
      'Frage 17: Gegeben ist eine IPv6 Adresse 2001:0DB8:0045:0000:0000:0C00:0000:0000. Bitte kürzen Sie diese:':['2001:DB8:45:0:0:C00::','2001:DB8:45::C00::','2001:DB8:0045::0C00::','2001:0DB8:0045:0000:0000:0C00::',0],
      'Frage 18: Welcher Begriff wird verwendet um Dateneinheiten auf der Sicherungsschicht(Data Link Layer) zu beschreiben?':['Nachricht','Datagramm','Frame','Paket',2],
      'Frage 19: Gegeben ist eine IPv6 Adresse 2003:a835:42fb:f000:: /54. Wieviele Subnetze könnten Sie theoretisch bilden?':['4096','1024','2048','8',1],

    };

  function loadQuestion(curr) {

    var question = Object.keys(allQuestions)[curr];

    questionArea.innerHTML = '';
    questionArea.innerHTML = question;
  }

  function loadAnswers(curr) {


    var answers = allQuestions[Object.keys(allQuestions)[curr]];

    answerArea.innerHTML = '';

    for (var i = 0; i < answers.length - 1; i += 1) {
      var createDiv = document.createElement('div'),
        text = document.createTextNode(answers[i]);

      createDiv.appendChild(text);
      createDiv.addEventListener("click", checkAnswer(i, answers));


      answerArea.appendChild(createDiv);
    }
  }

  function checkAnswer(i, arr) {

    return function () {
      var givenAnswer = i,
        correctAnswer = arr[arr.length - 1];

      if (givenAnswer === correctAnswer) {
        addChecker(true);
      } else {
        addChecker(false);
      }

      if (current < Object.keys(allQuestions).length - 1) {
        current += 1;

        loadQuestion(current);
        loadAnswers(current);
      } else {
        questionArea.innerHTML = 'Done';
        answerArea.innerHTML = '';
      }

    };
  }

  function addChecker(bool) {


    var createDiv = document.createElement('div'),
      txt = document.createTextNode(current + 1);

    createDiv.appendChild(txt);
    
    if (bool) {

      createDiv.className += 'correct';
      checker.appendChild(createDiv);
      richtig++
      auswertung.innerHTML= `Sie haben ${richtig} Fragen richtig und ${falsch} Fragen falsch beantwortet.`
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
      falsch++
      auswertung.innerHTML= `Sie haben ${richtig} Fragen richtig und ${falsch} Fragen falsch beantwortet.`
    }
  }



  loadQuestion(current);
  loadAnswers(current);

};