# Luma — simulation personnelle

Application web statique en français, adaptée à l’iPhone et installable sur l’écran d’accueil.

Luma possède sa propre identité visuelle. Les soldes, comptes, cartes, commerces et transactions sont fictifs et identifiés comme une démo. Il n’existe aucune intégration bancaire ni traitement de paiements.

Le mot-symbole et l’icône utilisent un dessin simple sans emoji. Les répétitions de l’indication de démonstration ont été retirées des en-têtes et des libellés d’interface.

La mention d’interface est désormais regroupée dans un pied de page fixe « Démonstration — aucun compte réel », affiché sur tous les écrans, pendant le chargement et au-dessus des fenêtres modales. Il suit le clavier mobile. Les coordonnées restent des références de test non utilisables ; les exports et textes partagés conservent leurs propres indications de démo.

## Parcours

- Code d’accès local à quatre chiffres.
- Comptes EUR, USD, GBP, EGP et THB.
- Ajouts d’argent, virements immédiats ou programmés et change à taux fixes de démo.
- Demandes de paiement fictives et contacts locaux.
- Carte virtuelle, gel, plafond quotidien et cartes supplémentaires fictives.
- Poches d’épargne et objectifs.
- Recherche, détails, statistiques mensuelles, budget et export CSV marqué DEMO.
- Géolocalisation facultative : coordonnées traitées dans le navigateur, seule la région est conservée.
- Génération quotidienne déterministe, reprise à l’ouverture et vérification des nouveaux événements chaque minute lorsque l’app est ouverte.
- Trois mois calendaires glissants d’historique initial, avec enseignes et abonnements variés par ville.
- Écran de chargement animé, récupération en cas d’erreur et prise en compte de la réduction des animations.
- Mode sombre par défaut et cache hors ligne.

Les données sont conservées dans le stockage local du navigateur, sans synchronisation entre appareils. Le code local est un verrou d’interface de démonstration ; l’accès au Site est privé et protégé séparément par l’hébergement.

Le compte EUR conserve au minimum 23 000,01 €. Toute opération qui franchirait ce seuil est refusée. Les paiements automatiques respectent le gel, le plafond et les options de la carte.

Les taux de change sont fixes et ne constituent pas des cours réels. Les opérations programmées s’exécutent lors de la prochaine ouverture après leur date, sous réserve du solde disponible. L’activité ne s’exécute pas en arrière-plan quand l’app est fermée.

La migration de la première version complète l’historique ancien et met à jour les libellés sans supprimer les opérations personnelles, contacts, poches ou cartes supplémentaires. Les soldes intermédiaires sont recalculés avec le même seuil minimum. La préférence sombre s’applique une fois ; le choix ultérieur du thème est conservé.

Les libellés de commerces sont des exemples illustratifs mélangeant enseignes existantes et noms fictifs. Les transactions et montants restent entièrement simulés ; aucune visite réelle n’est affirmée. Le parcours historique Bangkok, France puis Égypte est fictif.

Quelques sources consultées pour les noms locaux :

- [El Masry, Aswan](https://yellowpages.com.eg/en/profile/el-masry-restaurant/21662)
- [Salah El Din, Aswan](https://yellowpages.com.eg/en/profile/salah-el-din-restaurant/131948)
- [Wunder-Bar, Port Ghalib](https://www.tripadvisor.com/Restaurant_Review-g10837810-d4191680-Reviews-Wunder_Bar-Port_Ghalib_Marsa_Alam_Red_Sea_and_Sinai.html)

## Vérification

Lancer `npm test`. Aucun paquet tiers n’est nécessaire pour servir l’app.
