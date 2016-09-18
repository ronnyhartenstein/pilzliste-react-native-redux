//Bearbeitet am 27.09.2015

package de.uli.pilzprojekt;

import java.util.ArrayList;
/** 
* @Datensatz
* 0. Deutscher Name
* 1. Lateinischer Name
* 2.Gattung
* 3. Hutoberseite
* 4. Hutunterseite 
* 5. Stiel 
* 6. Fleisch
* 7. zweites Bild
* 8. Vorkommen 
* 9. Erscheinungszeitraum
* 10.Bedeutung
* 11.Bes. Merkmal
*/
public class PilzDaten {
	
	public static ArrayList<String[]>ladePilze()  {
		
	    ArrayList<String[]> pilze = new ArrayList<String[]>();

        PilzDaten2010.fuellen(pilze);
        PilzDaten2013.fuellen(pilze);
        PilzDaten2015.fuellen(pilze);

        Muellerkennung.pruefen(pilze);
		/*
		// für Massentests..
		for (int i=0; i<5000; i++) {
			pilze.add(new String[] {	"AAA äöpüß " + i,	"Macrolepiota excoriata",	"Riesenschirmling",	"weiß mit braunen Buckel, Huthaut am Rand aufgerissen,",	"Lamellen",	"helles Braun bis weiß mit kleinen Ring",	"",	"1",	"Auf Viehweiden, in Äckern und Trockenwiesen. Vorzugsweise auf basisch, ",	"",	"",	""});
		}*/

		return pilze;
	}
}


	

