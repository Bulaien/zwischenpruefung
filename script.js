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
      'Frage 4: Welche Angabe wird auch als absoluter Pfad unter WINDOWS bezeichnet?': ['system32\find.exe ', '/etc/users/group', 'C:\Windows\system32\find.exe', 2],'Frage 5: Was ist ein Prozess?': ['Eine konkrete Beschreibung eines Verfahrens (Algorithmus) mit dem Ziel eine Aufgabe (ein Problem) zu lösen.', 'Ein Prozess ist ein “aktives”, “\ebendes” Programm. Er fordert also Betriebsmittel an und benutzt diese bei Bedarf.', 0],
      'Frage 6: Mit welcher Antwort kann man die Geschwindigkeit eines Prozessors (CPU) angeben?': ['120 Gigabyte', '32 Bit', '2,8 Gigahertz', '300 Kilobit/Ssekunde', 2],
      'Frage 7: Ein PC-Anwender hat auf seiner Festplatte die Laufwerke C und D eingerichtet. Er arbeitet auf C und verwendet das Laufwerk D um nach Arbeitsschluss Sicherungskopien abzuspeichern. Welchen Nachteil hat dieses Sicherungsverfahren? ': ['Der Handhabungsaufwand ist höher als bei Bandsicherungen', 'Die Sicherungszeiten sind deutlich länger als bei Bandsicherungen', 'Die versehentliche Löschung einer Datei auf D: am nächsten Tag führt zu Datenverlust', 'Die versehentliche Löschung einer Datei auf C; am nächsten Tag führt zu Datenverlust', 'Die Daten stehen nach einem Defekt der Festplatte nicht mehr zur verfügung', 4],
      'Frage 8: Ein Auszubildender kommt nach der Berufsschule in ihren Betrieb und zeigt ihnen seine Notizen. Auf einer steht eine binäre Zahl und er meint, es wäre eine IP-Adresse. Auf der Notiz steht folgende Zahl: 1100 0000 . 1010 1000 . 0000 1010.1001 0100 Er fragt Sie nach dem Dezimalwerten der IP-Adresse. Wie lautet die IP-Adresse in Dezimalschreibweise?': ['192.168.9.10', '192.168.16.10', '192.168.10.148', '172.17.54.148', 2],
      'Frage 9: Können mit dem Konfigurations-Assistent für die Active Directory-Domänendienste Rollen installiert werden? Wenn ja welche?': ['DHCP und DNS', 'Nein', 'IIS', 0],
      'Frage 10: Wie nennt sich das Programm, das unmittelbar nach dem Einschalten des PCs gestartet wird?': ['BIOS', 'B_OS', 'OS 2', 0],
      'Frage 11: Mit welchem Kommando killen Sie einen Vordergrundprozess unter Linux?': ['strg+c', 'strg+k', 'strg+z', 0],
      'Frage 12: Welches Kommando unter Linux zeigt Ihnen alle Partitionen auf allen Festplatten?': ['mtab', 'fstab', 'fdisk -l', 'df', 'du', 3],
      'Frage 13: Für welche Geräte wurde der AGP-Port verwendet?': ['Grafikkarten', 'Netzwerkkarten', 'SCSI_Controller-Karten', 'Soundkarten', 0],
      'Frage 14: Welches RAID-Level ist ein Stripe Set With Parity': ['5', '7', '0', '1', 0],
      'Frage 15: Regeln für die Kommunikation unter Computern heissen:': ['Protokolle', 'Dienste', 'Schichten', 'Topologien', 0],
      'Frage 16: Wie lange dauert es, eine 5TiB grosse Datei über ein 1GBit-Netzwerk zu übertragen?': ['3.150 Sekunden', '20.480 Sekunden', '51.200 Sekunden', '43.980 Sekunden', 3],
      'Frage 17: Gegeben ist eine IPv6 Adresse 2001:0DB8:0045:0000:0000:0C00:0000:0000. Bitte kürzen Sie diese:': ['2001:DB8:45:0:0:C00::', '2001:DB8:45::C00::', '2001:DB8:0045::0C00::', '2001:0DB8:0045:0000:0000:0C00::', 0],
      'Frage 18: Welcher Begriff wird verwendet um Dateneinheiten auf der Sicherungsschicht(Data Link Layer) zu beschreiben?': ['Nachricht', 'Datagramm', 'Frame', 'Paket', 2],
      'Frage 19: Gegeben ist eine IPv6 Adresse 2003:a835:42fb:f000:: /54. Wieviele Subnetze könnten Sie theoretisch bilden?': ['4096', '1024', '2048', '8', 1],
      'Frage 20: Welcher Standard beschreibt WLAN?': ['IEEE 802.15', 'IEEE 802.11', 'IEEE 802.4', 'IEEE 802.3', 'IEEE 802.12', 1],
      'Frage 21: Welche Aussage bzgl. ist korrekt?': ['Eine kopierte Datei erbt die Berechtigungen des Zielordners', 'Freigabeberechtigung und NTFS-Berechtigungen sind das Gleiche', 'Windows-Server unterstützen keine Dateiberechtigung', 0],
      'Frage 22: Ihr Unternehmen will neue Computer anschaffen. Als Betriebssystem soll Windows 10 verwendet werden. Ihr Unternehmen betreibt eine Active Directory der die Computer hinzugefügt werden sollen.Welche Edition des Betriebssystemes müssen sie mindestens anschaffen?':['Windows 10 Professional','Windows 10 Enterprise','Windows 10 Home','Windows 10 Home S',0],
      'Frage 23: Was passiert unter anderem beim Starten (Booten) eines Computers?':['Alle Programme werden in den Arbeitsspeicher geladen','Es wird geprüft, welche Hardware an den Computer angeschlossen ist','Festpatte und Arbeitsspeicher werden formatiert','Das Betriebssystem und die Programme werden installiert',1],
      'Frage 24: Sie verwalten in ihrem Unternehmen die Computer. Sie haben auf einem Computer einen neuen Treiber für die Netzwerkkarte installiert. Nach dem Neustart funktioniert die Netzwerkkarte nicht mehr. Wie werden Sie vorgehen um den Computer wieder mit dem Netzwerk zu verbinden?':['Sie öffnen den Geräte Manager und setzten den Treiber der Netzwerkkarte auf seine vorherige Version zurück.','Sie bauen eine neue Netzwerkkarte ein und installieren den dazugehörigen Treiber.','Sie deinstallieren den Treiber und installieren ihn nach einem Neustart erneut.','Sie öffnen den Geräte Manager und deaktivieren die Netzwerkkarte.',0],
      'Frage 25: Bei der Wahl des Druckers müssen Sie verschiedene Kriterien berücksichtigen, bevor Sie sich für einen bestimmten Druckertyp entscheiden. Geben Sie ein Kriterium an, das für den Laserdrucker spricht!':['Zahl der Durchschläge','Geschwindigkeit','Sehr niedriger Anschaffungspreis','Kostengünstiger Farbdruck bei geringen Stückzahlen pro Jahr','Impactdruckprinzip',1],
      'Frage 26: Benennen sie die Funktionseinheiten des Von-Neumann-Rechners':['Rechen-, Steuer-, Speicher- und I/O-Werk','Rechen- und Steuerwerk','Arbeits- und Datenspeicher','CPU, Chipsatz, Mainboard, Speicher',0],
      'Frage 27: 1983 wurde von Paul Mockapetris das Domain Name System (DNS) spezifiziert. Wie lautet sein dezentraler Vorgänger, den man heute noch auf jedem Betriebssystem findet?':['Nameserver','Bind','Die Datei Hosts','Die Datei Protocols','ADNS',2],
      'Frage 28: Welche der folgenden Aussagen benennt einen Vorteil von IPv6 gegenüber IPv4?':['Umfangreichere Routingtabellen','Mobile IP','integriertes NAT', 'Effektives Broadcasting',1],
      'Frage 29: Welchen Pakettyp benutzt <strong>ping</strong>?':['TCP','UDP','IGMP','ICMP',3],
      'Frage 30: Das OSI-Schichtenmodell und das TCP/IP-Schichtenmodell (DOD) beschreiben die Netzwerkkommunikation mit einer unterschiedlichen Anzahl von Schichten. Um wieviele Schichten unterscheiden sich die Modelle?':['7 Schichten','4 Schichten','3 Schichten','1 Schicht', 2],
      'Frage 31: Welcher der folgenden Aussagen trifft zu?':['Bei einer 1:1-Relation zwischen zwei Tabellen erhalten beide Tabellen den Primärschlüssel der anderen Tabelle als Fremdschlüssel.','Bei einer 1:1-Relation zwischen zwei Tabellen erhält keiner der beiden Tabellen den Primärschlüssel der anderen Tabelle als Fremdschlüssel.', 'Bei einer 1:1-Relation zwischen zwei Tabellen muss eine Hilfstabelle eingeführt werden.','Bei einer 1:1-Relation zwischen zwei Tabellen erhält genau eine der beiden Tabellen den Primärschlüssel der anderen Tabelle als Fremdschlüssel.',3],
      'Frage 32: Welche der folgenden Aussagen trifft zu?':['Bei einer 1:n-Relation zwischen zwei Tabellen erhalten beide Tabellen den Primärschlüssel der anderen Tabelle als Fremdschlüssel.','Bei einer 1:n-Relation zwischen zwei Tabellen erhält die Tabelle mit Kardinalität "n" den Primärschlüssel der anderen Tabelle als Fremdschlüssel.','Bei einer 1:n-Relation zwischen zwei Tabellen muss eine Hilfstabelle eingeführt werden.', 'Bei einer 1:n-Relation zwischen zwei Tabellen erhält keine der beiden Tabellen den Primärschlüssel der anderen Tabelle als Fremdschlüssel.',1],
      'Frage 33: Welche der folgenden Antworten trifft zu?':['Bei einer m:n-Relation zwischen zwei Tabellen erhalten beide Tabellen den Primärschlüssel der anderen Tabelle als Fremdschlüssel.','Bei einer m:n-Relation zwischen zwei Tabellen erhält keine der beiden Tabellen den Primärschlüssel der anderen Tabelle als Fremdschlüssel. Hilfstabellen sind unzulässig.','Bei einer m:n-Relation zwischen zwei Tabellen muss eine Hilfstabelle eingeführt werden, die beide Primärschlüssel der Ausgangstabellen erhält.',' Bei einer m:n-Relation zwischen zwei Tabellen muss eine Hilfstabelle eingeführt werden, die höchstens eine der beiden Primärschlüssel der Ausgangstabellen erhält.',2],
      'Frage 34: Welche der folgenden Aussagen trifft zu?':['Eine Tabelle ist nicht atomisiert, wenn das Attribut " Name" nicht in die beiden Spalten "Vorname" und "Nachname" zerlegt wurde.',' Eine Tabelle ist nicht atomisiert, wenn nicht jede Tabelle einspaltig ist.',' Eine Tabelle ist nicht atomisiert, wenn der Primärschlüssel nicht einspaltig ist.',' Eine Tabelle ist nicht atomisiert, wenn nicht jede Tabelle des Datenbankschemas genau einen Fremdschlüssel besitzt.',0],
      'Frage 35: Welche der folgenden Aussagen trifft zu?':['Die 2. NF ist erfüllt, wenn die 1. NF erfüllt ist und jedes Nichtschlüsselattribut voll funktional vom gesamten Primärschlüssel abhängig ist und nicht nur von einem Teil abhängig ist.',' Die 2. NF ist erfüllt, wenn die 1. NF erfüllt ist und alle Tabellen mindestens einen Fremdschlüssel besitzen.',' Die 2. NF ist erfüllt, wenn die 1. NF erfüllt ist und das Datenbankschema mindestens 2 Tabellen besitzt. ',' Die 2. NF ist erfüllt, wenn die 1. NF erfüllt ist und alle Hilfstabellen einen Primärschlüssel besitzen. ',0],
      'Frage 36: Welche der folgenden Aussagen trifft zu?':['Die 3. NF ist erfüllt, wenn die 1. NF und die 2. NF erfüllt ist und kein Nichtschlüsselattribut von einem anderen Nichtschlüsselattribut abhängt.',' Die 3. NF ist erfüllt, wenn die 1. NF und die 2. NF erfüllt ist und alle Tabellen maximal 3 Spalten besitzen. ',' Die 3. NF ist erfüllt, wenn die 1. NF und die 2. NF erfüllt ist und das Datenbankschema höchstens 3 Hilfstabellen besitzt. ',' Die 3. NF ist erfüllt, wenn die 1. NF und die 2. NF erfüllt ist und mindestens eine Tabelle polythematisch ist. ',0],
      'Frage 37: Welche der folgenden Aussagen trifft zu?':[' Ein Fremdschlüssel-Wert muss zweistellig sein. ',' Pro Tabelle darf es nur eine Fremdschlüssel-Spalte geben. ','Jede Fremdschlüssel-Spalte einer Tabelle steht in Beziehung zu einem Primärschlüssel.',' Jede Fremdschlüssel-Spalte einer Tabelle steht in Beziehung zu einem anderen Fremdschlüssel. ',2],
      'Frage 38: Welche der folgenden Aussagen trifft zu?':['Die Referentielle Integrität ist verletzt, falls eine Tabelle keinen Fremdschlüssel besitzt.','Die Referentielle Integrität ist verletzt, falls eine Tabelle mehrere Fremdschlüssel besitzt.','Die Referentielle Integrität ist verletzt, falls ein Fremdschlüsselwert existiert, zu dem es keinen zugehörigen Primärschlüsselwert der referenzierten Tabelle gibt.','Die Referentielle Integrität ist verletzt, falls mehrere Fremdschlüsselwerte existieren, die auf den selben Primärschlüsselwert referenzieren.',2],
      'Frage 39: Ein Datenpaket muss für die Datenübertragung eine minimale Länge - Anzahl an Bytes - verfügen.Wie lang muss es mindestens sein und warum?':['16 Byte, damit es bei der Übertragung nicht als Rauschen ignoriert wird','64 Byte, damit die Kollisionserkennung korrekt arbeiten kann, muss das Datenpaket diese Mindestlänge haben','4Byte, damit möglichst wenig Kollisionen entstehen','8 Byte, damit die Sendung beendet ist, bevor Datenpakete derselben Sendung wieder beim Sender ankommen',1],
      'Frage 40: Die einfache Paritätsprüfung dient der Fehlererkennung bei der Datenübertragung. Welchen Nachteil hat sie? ':['Sie erkennt nur einen Fehler und kann ihn nicht korrigieren','Sie erkennt nur einen Fehler und kann ihn korrigieren','Sie erkennt mehrere Fehler und kann sie korrigieren','Sie erkennt mehrere Fehler und kann sie nicht korrigieren',0],
      'Frage 41: Sie sollen für einen Server eine Sicherung der Daten konfigurieren. An den Wochentagen ist der Zeitaufwand für die Erstellung einer vollständigen Sicherung höher als die zur Verfügung stehen Zeit. Der Speicherbedarf der Sicherungsdateien braucht nicht beachtet werden. Die Daten sollen mit möglichst geringem Aufwand wiederhergestellt werden können. Welchen Sicherungstyp werden Sie verwenden?':['vollständige Sicherung','inkrementelle Sicherung','differentielle Sicherung','tägliche Sicherung',2],
      'Frage 42: Sie verwalten einen Dateiserver mit dem Betriebssystem Windows Server 2012 R2. Sie sollen die Datenverfügbarkeit auf dem Server erhöhen. Dazu planen Sie einen RAID-Verbund zu erstellen. Sie beschaffen vier neue Festplatten gleicher Größe. Ihr Ziel ist die größtmögliche Verfügbarkeit der Daten mit möglichst viel Speicherplatz. Der Ausfall eines Datenträgers soll toleriert werden. Welchen RAID-Type werden Sie erstellen?':['RAID 0','RAID 1','RAID 5','Übergreifendes Volume',2],
      'Frage 43: Das Bundesdatenschutzgesetz regelt den Umgang mit personenbezogenen Daten, welche in Informations- und Kommunikationssystemen oder manuell verarbeitet werden. Welche der unten aufgeführten Informationen sind keine personenbezogenen Daten im Sinne des Bundesdatenschutzgesetzes? ':['Vorname','Adresse','Geburtsdatum','Position innerhalb des Unternehmens',3],
      'Frage 44: Datenübertragungsraten werden häufig angegeben in:':['Bits pro Sekunde','Dämpfungsrate','Widerstand','Zyklen pro Sekunde', 0],
      'Frage 45: Was ist das wichtigste Merkmal der Stern-Topologie?':['die Möglichkeit, Baum oder hierarchische Netze zu gestalten','begrenzte Kabellängen','leichte Konfigurierbarkeit','ein zentraler Hub/Switch',3],
      'Frage 46: Welche Schicht des OSI-Modells gewährleistet eine Verbindung und die Auswahl einer Route zwischen zwei Endsystemen, auf denen Routing erfolgt?':['Transport Layer','Physical Layer','Network Layer','Presentation Layer',2],
      'Frage 47: Was versteht man bei einem Netzwerkkabel unter Durchgangsdämpfung?':['die Durchgangsdämpfung gibt an, in welchem Maße sich die Signale unterschiedlicher Adern eines Kabels gegenseitig beeinflussen','die Durchgangsdämpfung gibt an, wie das Nutzsignal auf einer bestimmten Länge des Kabels in seinem Signalpegel abgeschwächt wird','die Durchgangsdämpfung gibt an, in wie weit das Medium durch Störeinflüsse von außen beeinträchtigt wird','die Durchgangsdämpfung gibt an, in wie weit das Medium durch Beschädigungen beeinträchtigt wird',1],
      'Frage 48: Das SpanningTree Protocol (STP) wird in Switch-Infrastrukturen zu welchem Zweck eingesetzt?':['zum Routen von Paketen','zur Sicherstellung der Schleifenfreiheit der Topologie','zur Sperrung von Broadcasts','zur Zusammenfassung von logisch getrennten Netzen',1],
      'Frage 49: Bei einem Zahlvorgang an einer elektronischen Kasse entstehen 5kb Daten, welche in einer halben Sekunde an die zentrale Datenbank übermittelt werden sollen. Wählen Sie die Übertragungsgeschwindigkeit in kBit/s, die mindestens zur Übertragung eines Zahlungsvorgangs erforderlich ist. Das Ergebnis ist auf volle kBit/s zu runden. 1 KB = 1024 Byte; 1 kBit/s = 1000 Bit/s':['41 kBit/s','5 kBit/s','82 kBit/s','10 kBit/s',2],
      'Frage 50: Warum müssen Frames im Ethernet eine Mindestlänge haben?':['die Mindestlänge dient zur Sicherstellung der Effektivität in der Übertragung von Nutzdaten','damit eine Kollision festgestellt und eine Sendewiederholung initiiert werden kann','die Mindestlänge gewährt dem Sender eine Mindestsendezeit','ohne die Einhaltung der Mindestlänge würden zu viele kleine Frames entstehen, die dann zu Kollisionen führen',1],
      

    };

    // allQuestions.sort(function() {
    //   return 0.5 - Math.random();
    // })

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
        let prozenterichtig = (richtig/(richtig+falsch)*100)
      let prozenterfalsch = (falsch/(richtig+falsch)*100)
        questionArea.innerHTML = `FERTIG<br><br>Sie haben ${richtig} (${prozenterichtig.toFixed(2)}%) Fragen richtig und ${falsch} (${prozenterfalsch.toFixed(2)}%) Fragen falsch beantwortet.`;
        auswertung.innerHTML = ''
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
      let prozenterichtig = (richtig/(richtig+falsch)*100)
      let prozenterfalsch = (falsch/(richtig+falsch)*100)
      auswertung.innerHTML = `Sie haben ${richtig} (${prozenterichtig.toFixed(2)}%) Fragen richtig und ${falsch} (${prozenterfalsch.toFixed(2)}%) Fragen falsch beantwortet. `
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
      falsch++
      let prozenterichtig = (richtig/(richtig+falsch)*100)
      let prozenterfalsch = (falsch/(richtig+falsch)*100)
      console.log(prozenterichtig)
      auswertung.innerHTML = `Sie haben ${richtig} (${prozenterichtig.toFixed(2)}%) Fragen richtig und ${falsch} (${prozenterfalsch.toFixed(2)}%) Fragen falsch beantwortet. `
    }
  }



  loadQuestion(current);
  loadAnswers(current);

};