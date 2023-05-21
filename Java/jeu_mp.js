// creation d'une classe pour pouvoir utiliser chaque fonction à n'importe quel moment avec this devant les variables
class Morpion{
  
  constructor(element_id, lgns=3, cols=3) {
    this.lgns = lgns;
    this.cols = cols;

    this.tableau = Array(this.lgns);
    for (var i = 0; i < this.lgns; i++) {
      this.tableau[i] = Array(this.cols).fill(0);
    }
    this.turn = 1;
    this.coups = 0;

   // gagne est une variable qui dit si la partie est en cours : null; perdu : 0; ou gagnée :1 ou 2
    this.gagne = null;

    this.element = document.querySelector(element_id);


    this.element.addEventListener('click', (event) => this.gestion_victoire(event));
    // On fait l'affichage
    this.affichage();
  }
  // fonction qui fait l'affichage du jeu et des détails avec la feuille de style
    affichage() {
    var table = document.createElement('table');
    for (var a = this.lgns - 1; a >= 0; a--) {
      var tr = table.appendChild(document.createElement('tr'));
      for (var b = 0; b < this.cols; b++) {
        var td = tr.appendChild(document.createElement('td'));
        var couleur = this.tableau[a][b];
        if (couleur)
          td.className = 'joueur' + couleur;
        td.dataset.colonne = b;
      }
    }
    this.element.innerHTML = '';
    this.element.appendChild(table);
  }
  // placement d'un pion
    placement(ligne, colonne, joueur) {
      this.tableau[ligne][colonne] = joueur;
    this.coups = this.coups + 1;
    }

   //fonction ajoute un pion dans une colonne
    ajout(colonne) {
    var ligne;
    for (var c = 0; c < this.lgns; c++) {
        if (this.tableau[c][colonne] == 0) {
          ligne = c;
          break;
      }
      }
    if (ligne === undefined) {
      return null;
    } else {
      this.placement(ligne, colonne, this.turn);
      return ligne;
    }
    }
  
  gestion_victoire(event) {
    // on verifie si la partie est finie ou en cours
    if (this.gagne !== null) {
          if (window.confirm("C'est fini \nVoulez vous recommencer ? ")) {
            var mp = new Morpion('#game');
            }
            return;
    }

      var colonne = event.target.dataset.colonne;
      if (colonne !== undefined) {
      colonne = parseInt(colonne);
         var ligne = this.ajout(parseInt(colonne));
      
      if (ligne === null) {
        window.alert("la colonne est pleine");
      } else {
        // On vérifie s'il y a un gagnant, ou si la partie est finie
        if (this.verif_victoire(ligne, colonne, this.turn)) {
          this.gagne = this.turn;
        } else if (this.coups >= 9) {
          this.gagne = 0;
        }
        this.turn = 3 - this.turn;

        // Mettre à jour l'affichage
        this.affichage()
        

        // changement de la variable gagne pour mettre le message de fin qu'il faut
        switch (this.gagne) {
          case 0:
            window.alert("Il n'y a plus de case libre, la partie est donc terminée")
            setTimeout(this.gestion_victoire, 300)
            break;
          case 1:
            window.alert("Le joueur noir à gagné en "+ this.coups + " coups en tout");
            setTimeout(this.gestion_victoire, 300)
            break;
          case 2:
            window.alert("Le joueur rouge à gagné en "+ this.coups + " coups en tout"); 
            setTimeout(this.gestion_victoire, 300)
            break;
        }
      }
    }
  }

  // La fonction renvoie true si la partie est gagnée par le joueur 1 ou 2 
  // ou alors la fonction renvoie false : si la partie n'est pas terminée
    verif_victoire(ligne, colonne, joueur) {
        // Horizontal
    var count = 0;
    for (var j = 0; j < this.cols; j++) {
      count = (this.tableau[ligne][j] == joueur) ? count+1 : 0;
      if (count >= 3){
        return true;
      }
    }
        // Vertical
    count = 0;
    for (var i = 0; i < this.lgns; i++) {
      count = (this.tableau[i][colonne] == joueur) ? count+1 : 0;
        if (count >= 3){
          return true;
        }
    }
        // Diagonal
    count = 0;
    var shift = ligne - colonne;
    for (var i = Math.max(shift, 0); i < Math.min(this.lgns, this.cols + shift); i++) {
      count = (this.tableau[i][i - shift] == joueur) ? count+1 : 0;
        if (count >= 3){
           return true;
        }
    }
        // Anti-diagonal
    count = 0;
    shift = ligne + colonne;
    for (var i = Math.max(shift - this.cols + 1, 0); i < Math.min(this.lgns, shift + 1); i++) {
      console.log(i,shift-i,shift)
      count = (this.tableau[i][shift - i] == joueur) ? count+1 : 0;
      if (count >= 3){
        return true;
      }
    }
    
    return false;
    }

  // Cette fonction vide le plateau et remet à zéro l'état
  reset() {
    for (var i = 0; i < this.lgns; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.tableau[i][j] = 0;
        }
      }
        this.coups = 0;
        this.turn = 1;
        this.gagne = null;
        return;
    }
 
}
var mp = new Morpion('#game');